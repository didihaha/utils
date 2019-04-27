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
    doResolve(fn)
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
            if (_this instanceof Promise) {
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

}

function finale (_this) {

}

function handle (_this, deferred) {
    // _state为3代表_value是Promise对象
    while (_this._state === 3) {
        _this = _this._value
    }
}