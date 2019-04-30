//入口文件
import createStore from './createStore'
import combineReducers from './combineReducers'

function plan (state = {
    name: '哈哈哈',
    age: 27
}, action) {
    switch (action.type) {
        case 1:
            return {
                ...state,
                name: '李强1'
            }
        case 2:
            return {
                ...state,
                name: '李强2'
            }
        default:
            return state
    }
}

const store = createStore(combineReducers({
    name: plan
}))

const res1 = store.subscribe(function () {
    console.log('事件监听触发了')
})
const res2 = store.subscribe(function () {
    console.log('老夫哈哈哈哈了')
})

const target = document.getElementById('target')
const cancel = document.getElementById('cancel')
target.addEventListener('click', function () {
    store.dispatch({
        type: 1
    })
    console.log( store.getState() )
})

cancel.addEventListener('click', function () {
    store.dispatch({
        type: 2
    })
    console.log( store.getState() )
})