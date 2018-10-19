// 处理进入页面的参数
function handleUrl(str) {
    str = decodeURIComponent(str.slice(1))
    const items = str.length ? str.split('&') : []
    const args = {}
    items.forEach(item => (args[item.split('=')[0]] = item.split('=')[1]))
    return args
}

export default handleUrl