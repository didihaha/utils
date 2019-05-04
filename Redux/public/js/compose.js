export default compose = function (...args) {
    if (args.length === 0) {
        return []
    }
    if (args.length === 1) {
        return args[0]
    }
    return args.reduce((a, b) => (...args) => a(b()))
}