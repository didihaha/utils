function bind (fn, context) {
    return function () {
        fn.apply(context, arguments)
    }
}

function Promise (fn) {
    if (!(this instanceof Promise)) {
        throw new TypeError('初始化必须使用new操作符')
    }
    if (typeof fn !== 'function') {
        throw new TypeError('不是一个函数')
    }
    this._state = 0
    this._handled = false
    this._value = null
    this._deferreds = []
    doResolve(this, fn)
}


function doResolve (_this, fn) {
    let done = false
    try {
        fn(
            function (value) {
                if (done) return null
                done = true
                resolve(_this, value)
            },
            function (err) {
                if (done) return null
                done = true
                reject(_this, err)
            }
        )
    } catch (err) {
        if (done) return null
        done = true
        reject(_this, err)
    }
}

function resolve (_this, value) {
    try {
        if (value === _this) {
            throw new TypeError('promise不能调用自身')
        }
        if (value && (typeof value === 'object' || typeof value === 'function')) {
            const then = value.then
            if (value instanceof Promise) {
                _this._state = 3
                _this._value = value
                finale(_this)
                return null
            }
            if (typeof then === 'function') {
                doResolve(_this, bind(then, value))
                return null
            }
        }
        _this._value = value
        _this._state = 1
        finale(_this)
    } catch (err) {
        reject(_this, value)
    }
}

function reject (_this, value) {
    _this._state = 2
    _this._value = value
    finale(_this)
}

function finale (_this) {
    if (_this._state === 2 && _this._deferreds.length === 0) {
        Promise._immediateFn(function () {
            if (!_this._handled) {
                console.log(_this)
                console.warn('请在尾部添加catch进行错误处理')
            }
        })
    }
    for (let i = 0; i < _this._deferreds.length; i++) {
        const deferred = _this._deferreds[i]
        handle(_this, deferred)
    }
    _this._deferreds = null
}

function handle (_this, deferred) {
    // _state为3代表_value是Promise对象
    while (_this._state === 3) {
        _this = _this._value
    }
    if (_this._state === 0) {
        _this._deferreds.push(deferred)
        return null
    }
    _this._handled = true
    Promise._immediateFn(function () {
        const cb = _this._state === 1 ? _this.onFulfilled : _this.onRejected;
        if (cb === null) {
            (_this._state === 1 ? resolve : reject)(deferred.promise, _this._value)
        }
        let ret = null
        try {
            ret = cb(_this._value)
        } catch (err) {
            reject(deferred.promise, err)
            return null
        }
        resolve(deferred.promise, ret)
    })
}

Promise.prototype.then = function (onFulfilled, onRejected) {
    const prom = new this.constructor(function () {})
    handle(this, new Handler(onFulfilled, onRejected, prom))
    return prom
}

Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
}

function Handler (onFulfilled = null, onRejected = null, prom) {
    this.promise = prom
    this.onFulfilled = onFulfilled
    this.onRejected = onRejected
}

Promise.resolve = function (value) {
    // 传入的参数为promise对象直接返回
    if (value && typeof value === 'object' && this.constructor === Promise) {
        return value
    }
    return new Promise(function (resolve) {
        resolve(value)
    })
}

Promise.reject = function (err) {
    return new Promise(function (resolve, reject) {
        reject(err)
    })
}

Promise.all = function (arr) {
    return new Promise(function (resolve, reject) {
        if (!arr || arr.length === undefined) {
            throw new TypeError('Promise.all的参数应该是一个数组')
        }
        const args = Array.from(arguments)
        if (args.length === 0) {
            resolve([])
            return null
        }
        const length = args.length

        function res (i, value) {
            try {
                if (value && (typeof value === 'object' || typeof value === 'function')) {
                    const then = value.then
                    if (typeof then === 'function') {
                        // 调用then方法，将包裹res函数的函数推到deferreds中缓存起来，直到状态改变再次从deferreds中抛出来
                        then.call(
                            value,
                            function (value) {
                                res(i, value, reject)
                            },
                            reject)
                        return null
                    }
                }
                args[i] = value
                if (--length === 0) {
                    resolve(args)
                }
            } catch (err) {
                reject(err)
            }
        }

        for (let i = 0; i < args.length; i++) {
            res(i, args[i])
        }
    })
}

Promise.race = function (arr) {
    return new Promise(function (resolve, reject) {
        for (let i = 0; i < arr.length; i++) {
            arr[i].then(resolve, reject)
        }
    })
}

Promise._immediateFn = 
    (typeof setImmediate === 'function' && function (fn) {
        setImmediate(fn)
    }) || function (fn) {
        setTimeout(fn, 0)
    }

// export default Promise