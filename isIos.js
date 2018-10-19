export default function isIphone() {
    // 区分iOS平台或者安卓平台
    const deviceType = !!window.navigator.userAgent.match(
        /\(i[^;]+;( U;)? CPU.+Mac OS X/
    )
        ? true
        : false
}