const scrollToGap = (gap, speed) => {
    const scrollTop = document.documentElement.scrollTop,
        step = (gap - scrollTop) / (speed / 20)
    
    function toGap (scrollTop) {
        const result = Math.abs( scrollTop + step - gap )                 //每次滚动距离
        if (result >= 10) {
            document.documentElement.scrollTop = scrollTop + step
            setTimeout(function () {
                toGap(scrollTop + step, gap, step)
            }, 20)
            console.log(result)
        } else {
            document.documentElement.scrollTop = gap
        }
    }
    toGap(scrollTop)
    
}

export default scrollToGap