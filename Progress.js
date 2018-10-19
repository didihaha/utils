class Progress extends Component {
    static defaultProps = {
        width: 300,
        height: 20,                 // 进度条高度
        percent: 0,                 // 进度条默认百分比
        lineWidth: 2,               // 线宽
        lineCap: 'round',           // 线帽
        strokeStyle: 'red',         // 进度条颜色
        blankStyle: 'black',        // 进度条默认底色
        marginX: 10,
    }
    constructor(props) {
        super(props)
        const { marginX, width, height } = this.props
        this.state = {
            bgData: null,           // 背景数据
            context: null,          // canvas绘图环境
            origin: {               // 起点
                x: marginX,
                y: height / 2 - 0.5
            },
            endPoint: {             // 终点
                x: width - marginX,
                y: height / 2 - 0.5
            }
        }
    }
    render() {
        const { width, height } = this.props
        return <canvas ref={ e => this.progress = e } width={ width } height={ height } />
    }
    drawProgress() {
        const { width, height, lineWidth, lineCap, percent, strokeStyle } = this.props,
            { context, bgData, origin, endPoint } = this.state

        context.strokeStyle = strokeStyle
        context.lineCap = lineCap
        context.lineWidth = lineWidth
        context.clearRect(0, 0, width, height)
        context.beginPath()
        context.putImageData(bgData, 0, 0)
        context.moveTo(origin.x, origin.y)
        // 进度当前位置,进行边界判断
        const currentX = percent * width + origin.x
        if (currentX < endPoint.x) {
            context.lineTo(percent * width + origin.x, origin.y)
        } else {
            context.lineTo(endPoint.x, endPoint.y)
        }
        context.stroke()

        context.beginPath()
        context.fillStyle = strokeStyle
        if (currentX < endPoint.x) {
            context.moveTo(currentX, origin.x)
        } else {
            context.moveTo(endPoint.x, endPoint.y)
        }
        context.arc(currentX, origin.y, 2 * lineWidth, 0, Math.PI * 2, false)
        context.fill()
        context.closePath()
    }
    componentDidMount() {
        // 初始化绘制进度条底色，存储绘图环境和底色数据复用
        const { strokeStyle, lineCap, width, height, lineWidth } = this.props,
            { origin, endPoint } = this.state

        const context = this.progress.getContext('2d')
        context.strokeStyle = 'black'
        context.lineCap = lineCap
        context.lineWidth = lineWidth
        context.moveTo(origin.x, origin.y)
        context.lineTo(endPoint.x, endPoint.y)
        context.stroke()
        // 只有底色是复用，圆球不能包含在内
        this.setState({
            context,
            bgData: context.getImageData(0, 0, width, height)
        })
        context.beginPath()
        context.fillStyle = strokeStyle
        context.moveTo(origin.x, origin.y)
        // 保证进度条的圆球和进度条颜色一致
        context.arc(origin.x, origin.y, 2 * lineWidth, 0, Math.PI * 2, false)
        context.fill()
        context.closePath()
    }
    componentDidUpdate(prevProps, prevState) {
        this.drawProgress()
    }
}

export default Progress