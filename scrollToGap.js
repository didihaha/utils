
/**
 * 滚动窗口到目标位置
 * @param {*目标位置的offsetTop} gap 
 * @param {*滚动时长: 300s} speed 
 */
const scrollToGap = (gap, speed) => {
    const scrollTop = document.documentElement.scrollTop,
        step = (gap - scrollTop) / (speed / 20)
    
    function toGap (scrollTop) {
        const result = Math.abs( scrollTop + step - gap )                 //每次滚动距离
        if (result >= 10) {
            document.documentElement.scrollTop = scrollTop + step
            requestAnimationFrame(function () {
                toGap(scrollTop + step)
            })
            
        } else {
            document.documentElement.scrollTop = gap
        }
    }
    toGap(scrollTop)
    
}

export default scrollToGap