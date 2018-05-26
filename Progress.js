class Progress extends Component {
    static defaultProps = {
        width: 300,
        height: 5,                  // 进度条高度
        percent: 0,                 // 进度条默认百分比
        lineCap: 'butt',            // 线帽
        strokeStyle: 'red',         // 进度条颜色
        blankStyle: 'black',        // 进度条默认底色
    }
    constructor(props) {
        super(props)
        this.state = {
            bgData: null,           // 进度条底色数据
            context: null           // canvas绘图环境
        }
    }
    render() {
        const { width, height } = this.props
        return <canvas ref={ e => this.progress = e } width={ width } height={ height } />
    }
    drawProgress() {
        const { width, height, lineCap, percent, strokeStyle } = this.props,
            { context, bgData } = this.state

        context.strokeStyle = strokeStyle
        context.lineCap = lineCap
        context.lineWidth = height
        context.clearRect(0, 0, width, height)
        context.beginPath()
        context.putImageData(bgData, 0, 0)
        context.moveTo(0, height / 2)
        context.lineTo(percent * width, height / 2)
        context.stroke()
    }
    componentDidMount() {
        // 初始化绘制进度条底色，存储绘图环境和底色数据复用
        const { strokeStyle, lineCap, width, height } = this.props
        const context = this.progress.getContext('2d')
        context.strokeStyle = 'black'
        context.lineCap = lineCap
        context.lineWidth = height
        context.moveTo(0, height / 2)
        context.lineTo(width, height / 2)
        context.stroke()
        this.setState({
            context,
            bgData: context.getImageData(0, 0, width, height)
        })
    }
    componentDidUpdate(prevProps, prevState) {
        this.drawProgress()
    }
}

export default Progress