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
    _this._state = 2
    _this._value = value
    finale(_this)
}

function finale (_this) {
    if (_this._deferreds.length === 0 && _this._state === 2) {
        Promise._immediateFn(function () {
            if (!_this._handled) {
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

Promise._immediateFn = 
    (typeof setImmediate === 'function' && function (fn) {
        setImmediate(fn)
    }) || function () {
        setTimeout(fn, 0)
    }