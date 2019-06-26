var threeSum = function (nums) {
    nums = nums.sort((a, b) => a - b)
    const arr = []

    for (let i = nums.length - 1; i > 1 && nums[i] + nums[i - 1] + nums[i - 2] >= 0; i--) {
        // 如果当前值和上一位值相同 或者 当前值和第一个及第二个值都相同，就
        if (nums[i] === nums[i + 1] || nums[i] + nums[0] + nums[1] > 0) continue
        const lost = 0 - nums[i]
        let l = 0, r = i - 1
        while (l < r) {
            if (nums[l] + nums[r] > lost) {
                do {
                    --r
                } while (nums[r] === nums[r + 1])
            } else if (nums[l] + nums[r] < lost) {
                do {
                    ++l
                } while (nums[l] === nums[l - 1])
            } else {
                arr.push([nums[l], nums[r], nums[i]])
                do {
                    --r
                } while (nums[r] === nums[r + 1])
                do {
                    ++l
                } while (nums[l] === nums[l - 1])
            }
        }
    }
    return arr
}