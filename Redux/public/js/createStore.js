function createStore (reducer) {
    let state = {}
    const listeners = []

    function getState () {
        return state
    }

    function subscribe (fn) {
        listeners.push(fn)
        return function unsubscribe () {
            const index = listeners.indexOf(fn)
            listeners.splice(index, 1)
        }
    }

    function dispatch (action) {
        state = reducer(state, action)
        for (let i = 0; i < listeners.length; i++) {
            const listen = listeners[i]
            listen()
        }
    }
    dispatch({
        type: '$$reduxInit'
    })
    return {
        getState,
        dispatch,
        subscribe
    }
}

export default createStore