import compose from './compose'

export default applyMiddleware = function (...middlewares) {
    return createStore => (...args) => {
        const store = createStore(...args)
        // 给个初始化dispatch函数，后续再覆盖
        let dispatch = function () {

        }

        const middlewareApi = {
            getState: store.getState,
            dispatch: (...args) => dispatch(args)
        }
        // middlewareApi限制后的store，仅暴露dispatch和getState给第三方中间件
        const chain = middlewares.map(middleware => middleware(middlewareApi))
        dispatch = compose(chain)(dispatch)

        return {
            ...store,
            dispatch
        }
    }
}