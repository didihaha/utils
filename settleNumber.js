export const dropNumber = (number, fix) => {
    fix = fix || 0
    if ( isNaN(+number) ) {
        throw new Error('将要处理的数据为必传参数,且为数字')
    } else if ( isNaN(fix) ) {
        throw new Error('将要舍弃的位数为可选参数，但必须为数字')
    } else if (fix < 0) {
        throw new Error('将要舍弃的位数必须小于0')
    }
    number = number.toString()
    const int = number.split('.')[0],
        float = number.split('.')[1] || '0'

    if (fix === 0) {
        number = int
    } else {
        number = int + '.' + float.slice(0, fix)
    }

    return +number
}