/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
    let max = -Infinity, iMax = 1, iMin = 1
    
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] < 0) {
            const temp = iMax
            iMax = iMin
            iMin = temp
        }
        iMax = Math.max(iMax * nums[i], nums[i])
        iMin = Math.min(iMin * nums[i], nums[i])

        max = Math.max(max, iMax)
    }
    return max
};