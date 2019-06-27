function maxBag () {
    const arr = [
        {
            weight: 1,
            value: 1500
        },
        {
            weight: 3,
            value: 2000
        },
        {
            weight: 4,
            value: 3000
        },
        {
            weight: 3,
            value: 5000
        }
    ]

    const length = arr.length
    const maxWeight = 7

    const res = []
    for (let i = 0; i < length; i++) {
        res[i] = []
    }
    // 第一行直接以第一件物品来塞
    for (let w = 1; w < maxWeight; w++) {
        res[0][w] = arr[0]['weight'] <= w ? arr[0]['value'] : 0
    }
    for (let i = 1; i < length; i++) {
        for (let w = 1; w < maxWeight; w++) {
            if (arr[i]['weight'] <= w) {
                const topValue = res[i - 1][w]
                // 如果当前物品的重量单独塞不满背包，就用
                const currentValue = arr[i]['weight'] < w ? arr[i]['value'] + res[i - 1][w - arr[i]['weight']] : arr[i]['value']
                res[i][w] = Math.max(topValue, currentValue)
            } else {
                res[i][w] = res[i - 1][w]
            }
        }
    }
    console.log(res)
}

const res = maxBag()
console.log(res)