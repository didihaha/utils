function _new (fn) {
    const res = {}
    fn.call(res)
    return res
}

const Log = function () {
    this.name = 'log'
}

const res = _new(Log)

console.log(res)