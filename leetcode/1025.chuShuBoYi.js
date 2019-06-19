

/**
 * 输入2赢，输入3输，那么每次增加一就会改变一次结果，4:赢，5:输。。。。。。因此奇数输，偶数赢
 * @param {number} N
 * @return {boolean}
 */
var divisorGame = function(N) {
    return N % 2 === 0
};