function combineReducers (reducers) {
    const keysForReducers = Object.keys(reducers),
        finalReducers = {}
    for (let i = 0; i < keysForReducers.length; i++) {
        const key = keysForReducers[i]
        const reducer = reducers[key]
        if (typeof reducer === 'function') {
            finalReducers[key] = reducer
        }
    }

    const keysForFinalReducers = Object.keys(finalReducers)

    return function (state, action) {
        const nextState = {}
        let hasChanged = false
        for (let i = 0; i < keysForFinalReducers.length; i++) {
            const key = keysForFinalReducers[i],
                reducer = finalReducers[key],
                prevReducerState = state[key]
            
            const nextReducerState = reducer(prevReducerState, action)
            nextState[key] = nextReducerState
            hasChanged |= nextReducerState !== prevReducerState
        }
        return hasChanged ? nextState : state
    }
}

export default combineReducers