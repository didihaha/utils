/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    let sumOdd = 0, sumEven = 0

    for (let i = 0; i < nums.length; i++) {
        if (i % 2 === 0) {
            sumOdd += nums[i]
            sumOdd = Math.max(sumOdd, sumEven)
        } else {
            sumEven += nums[i]
            sumEven = Math.max(sumOdd, sumEven)
        }
    }
    return Math.max(sumOdd, sumEven)
};