class MyPromise {
    constructor (fn) {
        this._state = 0
        this._deferreds = []
        this._handled = false
        this._value = null

        doResolve(fn, this)
    }
}

function doResolve (fn, _this) {
    let done = false
    try {
        fn(function (value) {
            if (done) return null
            done = true
            resolve(value)
        }, function (err) {
            if (done) return null
            done = true
            reject(err)
        })
    } catch (err) {
        if (done) return null
        done = true
        reject(_this, err)
    }
}

function resolve (_this, value) {
    try {
        if (value === _this) throw new TypeError('不能resolve它自身')
        _this._state = 1
        _this._value = value
        finale(_this)
    } catch (err) {
        reject(_this, err)
    }
}

function reject (_this, value) {
    _this._value = value
    _this._state = 2
    finale(_this)
}

function finale (_this) {
    for (let i = 0; i < _this._deferreds.length; i++) {
        const deferred = _this._deferreds[i]
        handle((_this, deferred))
    }
    _this._deferreds = null
}

function handle (_this, deferred) {
    // 状态未改变时，将then中传入的函数缓存
    if (_this._state === 0) {
        _this._deferreds.push(deferred)
        return null
    }
    // 已处理的标识
    _this._handled = true
    // 放置到微栈队列处理事务
    MyPromise._immediateFn(function () {
        const cb = _this._state === 1 ? deferred.onFulfilled : deferred.onRejected
        // then中若未传入任何参数直接使用resolve或reject方法处理
        if (cb === null) {
            ;(_this._state === 1 ? resolve : reject)(deferred.promise, _this._value)
            return null
        }
        let res = null
        try {
            res = cb(_this._value)
        } catch (err) {
            reject(deferred.promise, err)
            return null
        }
        resolve(deferred.promise, res)
    })
}

MyPromise._immediateFn = function (fn) {
    typeof setImmediate === 'function' ? setImmediate(fn) : setTimeoutFunc(fn, 0)
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
    const prom = new this.constructor(function () {})

    handle(this, new Handler(onFulfilled, onRejected, prom))
    return prom
}

MyPromise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
}

function Handler (onFulfilled, onRejected, promise) {
    this.onFulfilled = onFulfilled
    this.onRejected = onRejected
    this.promise = promise
}

MyPromise.race = function (promiseArray) {
    return new MyPromise(function (resolve, reject) {
        for (let i = 0; i < promiseArray.length; i++) {
            promiseArray[i].then(resolve, reject)
        }
    })
}
MyPromise.all = function (promiseArray) {
    return new MyPromise(function (resolve, reject) {
        const args = Array.from(promiseArray)
        const length = args.length
        function res (i, value) {           
            try {
                args[i] = value
                if (--length === 0) {
                    resolve(args)
                }
            } catch (err) {
                    reject(err)
            }
        }
        for (let i = 0; i < length; i++) {
            res(i, args[i])
        }
    })
}
