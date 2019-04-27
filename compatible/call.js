const a = {
    name: '李强'
}

function logName (arg1, arg2) {
    console.log(this.name, arg1, arg2)
}

Function.prototype._call = function (obj) {
    if (obj === null || obj === undefined) {
        obj = process
    }
    const params = []
    const args = Array.prototype.slice.call(arguments, 1)
    args.forEach((arg, index) => {
        params.push(`args[${ index }]`)
    })
    obj.fn = this
    const res = eval('obj.fn(' + params + ')')
    delete obj.fn
    return res
}

logName._call(a, '呵呵呵', '哈哈哈')