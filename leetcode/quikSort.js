const arr = [95, 12, 75, 5, 9, 3, 46, 6, 221, 2, 86, 32]

const quick = function (arr, left, right) {
    let index = null
    if (arr.length > 1) {
        index = partition(arr, left, right)
        if (left < index - 1) {
            quick(arr, left, index -1)
        }
        if (right > index) {
            quick(arr, index, right)
        }
    }
}

/**
 * 
 * @param {数组} arr 
 * @param {*左序列值} left 
 * @param {*右序列值} right 
 */
function partition (arr, left, right) {
    const middle = arr[Math.floor((left + right) / 2)]
    let i = left, j = right
    while (i <= j) {
        while (arr[i] < middle) {
            i++
        }
        while (arr[j] > middle) {
            j--
        }
        if (i <= j) {
            swap(arr, i, j)
            i++
            j--
        }
    }
    return i
}

function swap (arr, i, j) {
    let x = arr[i]
    arr[i] = arr[j]
    arr[j] = x
}

quick(arr, 0, arr.length - 1)
console.log(arr)