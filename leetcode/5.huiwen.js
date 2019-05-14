function longestPalindrome (s) {
    const length = s.length
    let start = 0, end = 0
    for (let i = 0; i < length; i++) {
        const lengthLeft = expandAroundCenter(s, i - 1, i)
        const lengthRight = expandAroundCenter(s, i, i)
        const maxLength = Math.max(lengthLeft, lengthRight)
        if (maxLength > end - start) {
            start = Math.floor(i - (maxLength - 1) / 2)
            end = i + Math.floor(maxLength / 2)
        }
    }
    return s.substring(start, end + 1)
}

function expandAroundCenter (s, left, right) {
    const length = s.length
    while (left >= 0 && right < length && s[left] === s[right]) {
        left--
        right++
    }
    return right - left - 1
}

const res = longestPalindrome("babad")
console.log(res)