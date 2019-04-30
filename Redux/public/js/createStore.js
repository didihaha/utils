function createStore (plan, initState) {
    let state = initState
    const listeners = []

    function getState () {
        return state
    }

    function subscribe (fn) {
        listeners.push(fn)
        return function unsubscribe () {
            console.log('解除事件监听了')
            const index = listeners.indexOf(fn)
            listeners.splice(index, 1)
        }
    }

    function dispatch (action) {
        state = plan(state, action)
        for (let i = 0; i < listeners.length; i++) {
            const listen = listeners[i]
            listen()
        }
    }

    return {
        getState,
        dispatch,
        subscribe
    }
}

export default createStore