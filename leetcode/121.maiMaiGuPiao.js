/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    var minPrice = Infinity
    var maxprofit = 0
    for (var i = 0; i < prices.length; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i]
        } else if (prices[i] - minPrice > maxprofit) {
            maxprofit = prices[i] - minPrice
        }
    }
    return maxprofit
};