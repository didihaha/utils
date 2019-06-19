var reverse = function(x) {
    let arr = x.toString().split('')
    let start = 1
    if (arr[0] === '-') {
        arr.shift()
        start = -1
    }
    let i = j = Math.floor(arr.length / 2)
    while (i >= 0) {
        const mbp = arr[i]
        arr[i] = arr[j]
        arr[j] = mbp
        i--
        j++
    }
    let res = arr.join('').replace(/^0+/g, '')
    if (res > (2 ** 31 - 1) ) {
        return 0
    }
    return +(res) * start
};

const res = reverse(-123)
console.log(res)