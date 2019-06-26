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
        }
    ]

    // 根据性价比排序
    const valueByWeight = arr.sort((a, b) => (a.value / a.weight) - (b.value / b.weight))
    let lost = 4
    let res = 0

    let i = arr.length - 1
    while (lost > 0 && i >= 0) {
        if (valueByWeight[i].weight <= lost) {
            // 如果当前物品能放入背包就放入
            res += valueByWeight[i].value
            lost -= valueByWeight[i].weight
        }
        i--
    }
    return res
}

const res = maxBag()
console.log(res)