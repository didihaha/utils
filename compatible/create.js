// Object.create方法
function inherit (p) {
    if (p === null) throw new TypeError('参数必须为一个对象，但不能为null')
    if (Object.create) {
        return Object.create(p)
    }
    if (typeof p !== 'object' && typeof p !== 'function') {
        throw TypeError('参数数据类型错误')
    }
    function F () {}
    F.prototype = p
    return new F()
}