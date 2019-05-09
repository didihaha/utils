function findMedianSortedArrays (nums1, nums2) {
    let m = nums1.length,
        n = nums2.length

    if (m > n) {
        const temp = nums1
        nums1 = nums2
        nums2 = temp
        m = nums1.length
        n = nums2.length
    }
    let iMin = 0, iMax = m, lenLeft = Math.floor((m + n + 1) / 2)
    while (iMin <= iMax) {
        let i = Math.floor((iMin + iMax) / 2),
            j = lenLeft - i
        // i太小
        if (i < iMax && nums1[i] < nums2[j - 1]) {
            iMin += 1
        } else if (i > iMin && nums1[i - 1] > nums2[j]) {
            iMax -= 1
        } else {
            let maxLeft = 0
            if (i === 0) {
                maxLeft = nums2[j - 1]
            } else if (j === 0) {
                maxLeft = nums1[i - 1]
            } else {
                maxLeft = Math.max(nums1[i - 1], nums2[j - 1])
            }
            // 若m+n值为奇数，直接返回中间值即可
            if ((m + n) % 2 === 1) {
                return maxLeft
            }
            let minRight = 0
            if (i === m) {
                minRight = nums2[j]
            } else if (j === n) {
                minRight = nums1[i]
            } else {
                minRight = Math.min(nums1[i], nums2[j])
            }
            return (maxLeft + minRight) / 2
        }
    }
    return 0
}