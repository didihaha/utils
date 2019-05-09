const lengthOfLongestSubstring = function (str) {
    const initArr = str.split('')
    let res = 0
    const usefulStringArr = []

    for (const item of initArr) {
        const index = usefulStringArr.indexOf(item)
        if (index !== -1) {
            usefulStringArr.splice(0, index + 1)
        }
        const length = usefulStringArr.push(item)
        if (length > res) {
            res = length
        }
    }
    return res
}

const res = lengthOfLongestSubstring('asda123ppp')
console.log(res)