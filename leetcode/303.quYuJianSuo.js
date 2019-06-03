/**
 * @param {number[]} nums
 */
var NumArray = function(nums) {
    this.temp = nums
    this.sums = []
    let sum = 0
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i]
        this.sums.push(sum)
    }
};

/** 
 * @param {number} i 
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function(i, j) {
    if (i === 0) {
        return this.sums[j]
    }
    if (j === i) {
        return this.temp[i]
    }
    return this.sums[j] - this.sums[i - 1] 
};

/** 
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(i,j)
 */
