// 扩展函数
function extend (o) {
    const protoprops = ['toString', 'valueOf', 'hasOwnProperty', 'constructor', 'isPrototypeOf', 'toLocalString']
    return function () {
        for (let i = 1; i< arguments.length; i++) {
            const source = arguments[i]
            for (let prop in source) {
                o[prop] = source[prop]
            }
            for (let j = 0; j < protoprops.length; j++) {
                if (source.hasOwnProperty(protoprops[j])) {
                    let name = protoprops[j]
                    o[name] = source[name]
                }
            }
        }
    }
}