/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
    if (s[0] === '0') return 0
    const dp = [1, 1], len = s.length

    for (let i = 0; i < len; i++) {
        if (s[i - 1] !== '0') {
            const num = +(s[i - 1] + s[i])
            if (num >= 1 && num <= 26) {
                dp[i + 1] = s[i] !== '0' ? dp[i] + dp[i - 1] : dp[i - 1]
            } else if (s[i] !== '0') {
                dp[i + 1] = dp[i]
            } else {
                // num > 26且s[i] === '0'
                return 0
            }
        } else if (s[i] !== '0') {
            dp[i + 1] = dp[i - 1]
        } else {
            return 0
        }
    }

    return dp[len]
}