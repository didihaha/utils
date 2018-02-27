function co (fn) {
    const _this = this,
        ars = Array.prototype.slice.call(arguments, 1)
    return new Promise((resolve, reject) => {
        if (typeof fn === 'function') fn = fn.apply(_this, ars)
        if (!fn || typeof fn.next !== 'function') {
            return resolve(fn)
        }

        onFullfilled()

        function onFullfilled (val) {
            let res
            try {
                res = fn.next()
            } catch (e) {
                return reject(e)
            }
            next(res)
        }

        function next (res) {
            // debugger
            if (res.done) return resolve(res.value)
            var value = toPromise.call(_this, res.value)
            if (value && isPromise(value)) return value.then(onFullfilled)
        }
    })
    
}

//（数组，对象，generator等）转换成Promise对象，待完成
function toPromise (obj) {
    if (!obj) return obj
    if (isPromise(obj)) return obj
    return obj
}

//是否是Promise对象
function isPromise (obj) {
    return typeof obj.then === 'function'
}

co(function * () {
    yield axios.get('/users').then(data => {
        console.log(data.data)
    })
    console.log('最简单的成功一次')
    
})