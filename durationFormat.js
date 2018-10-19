// 时间转换 68 => 01:08
function durationFormat (duration) {
    const time = []
    let hours = '0',
        minutes = '0',
        seconds = '0'
    // 处理小时数，如果为‘00’，则不加入到时间中
    hours = Math.floor(duration / 3600)
    hours = hours >= 10 ? hours : `0${hours}`
    if (hours !== '00') {
        time.push(hours)
    }
    duration = duration % 3600

    minutes = Math.floor(duration / 60)
    minutes = minutes >= 10 ? minutes : `0${minutes}`
    time.push(minutes)
    duration = duration % 60

    seconds = duration
    seconds = seconds >= 10 ? seconds : `0${seconds}`
    time.push(seconds)

    return time.join(':')
}

export default durationFormat