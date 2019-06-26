// 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
// 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
// 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

// 示例：
// 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
// 输出：7 -> 0 -> 8
// 原因：342 + 465 = 807

// 用字符串来存储超过计算机存储限制的数字
class ChainItem {
    constructor (value) {
        this.value = value
        this.next = null
    }
    setNext (next) {
        return this.next = next
    }
}

function getChain (number) {
    console.log(number)
    const arr = number.reverse()
    const res = new ChainItem(arr.shift())
    arr.reduce((a, b) => {
        const nextChainItem = new ChainItem(b)
        return a.setNext(nextChainItem)
    }, res)
    return res
}

function addTwoNumbers () {
    const _args = Array.prototype.slice.call(arguments).map(arg => getChain(arg))
    let finalChain = _args.reduce((a, b) => chainWithChain(a, b))
    const res = []
    while (finalChain) {
        res.push(finalChain.value)
        finalChain = finalChain.next
    }
    return res
}

function chainWithChain (chain1, chain2) {
    // 先计算初第一条，并从第一条的next开始进行计算
    const res = new ChainItem( (chain1 && +chain1.value || 0) + (chain2 && +chain2.value || 0) )
    let next = res
    let chain1Item = chain1.next
    let chain2Item = chain2.next

    let modified = 0
    do {
        let resultOfAdd = (chain1Item && +chain1Item.value || 0) + (chain2Item && +chain2Item.value || 0) + modified
        if (resultOfAdd >= 10) {
            modified = Math.floor(resultOfAdd / 10)
            resultOfAdd %= 10
        } else {
            modified = 0
        }
        const resultChainItem = new ChainItem( resultOfAdd )
        chain1Item = chain1Item && chain1Item.next
        chain2Item = chain2Item && chain2Item.next
        // 重写next为下一个链表的子值
        next = next.setNext(resultChainItem)
    } while (chain1Item || chain2Item || modified)
    return res
}

const res = addTwoNumbers([2,4,3], [5, 6, 4])
// console.log(res)
