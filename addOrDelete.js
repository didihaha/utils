/**
 * @description 根据传入的数据是否存在传入的数组中，决定是添加还是删除
 * @param {*} arr 传入的数组
 * @param {*} data 数组的子元素，判断是否存在
 */
const addOrDelete = (arr, data) => {
    const index = arr.findIndex(item => JSON.stringify(item) === JSON.stringify(data))
    if (index > -1) {
        arr.splice(index, 1)
    } else {
        add.push(data)
    }

    return arr
}

export default addOrDelete