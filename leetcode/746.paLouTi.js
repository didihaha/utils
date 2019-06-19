/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function(cost) {
    cost.push(0)
    const costInEveryLevel = [cost[0], cost[1]]
    for (let i = 2; i < cost.length; i++) {
        costInEveryLevel.push(cost[i] + Math.min(costInEveryLevel[i - 1], costInEveryLevel[i - 2]))
    }
    return costInEveryLevel.pop()
};

const res = minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])
console.log(res)