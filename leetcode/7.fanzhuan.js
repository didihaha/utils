var reverse = function(x) {
    let str = x.toString()
    let start = 1
    if (str[0] === '-') {
        str = str.substring(1)
        start = -1
    }
    let i = j = Math.floor(str.length / 2)
    while (i >= 0) {
        const mbp = str[i]
        str[i] = str[j]
        str[j] = mbp
        i--
        j++
    }
    return +str * start
};

const res = reverse(-9879)
console.log(res)