// 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

// 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

// 示例:

// 给定 nums = [2, 7, 11, 15], target = 9

// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]

function getIndex (arr, target) {
    const res = []
    const module = {}                               // 给个对象放置每条数组每条元素值和序列
    for (let i = 0; i < arr.length; i++) {
        const leave = target - arr[i]
        // 若module中存在，且不为自身： 3 + 3 = 6
        if (module[leave] !== undefined && module[leave] !== i) {
            res.push([arr[i], arr[module[leave]]])
            // return res
        }
        module[arr[i]] = i                    
    }
    return res
}

const res = getIndex([3, 3, 0, 6, 7, 8, 87, 2, 4], 6)
console.log(res)