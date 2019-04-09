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
        reject(_this, value)
    }
}

function reject (_this, value) {
    _this._value = value
}

function finale (_this) {
    for (let i = 0; i < _this._deferreds.length; i++) {
        const deferred = _this._deferreds[i]
        handle((_this, deferred))
    }
    _this._deferreds = null
}

function handle (_this, deferred) {
    if (_this._state === 0) {
        _this._deferreds.push(deferred)
        return null
    }
    _this._handled = true
    Promise._immediateFn(function () {
        const cb = _this._state === 1 ? deferred.onFulfilled : deferred.onRejected
        if (cb === null) {
            ;(_this._state === 1 ? resolve : reject)(deferred.promise, _this._value)
            return null
        }
    })
}