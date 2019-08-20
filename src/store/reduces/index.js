import {
    ADD_TODO,
    TOGGLE_COMPLETE,
    CHANGE_DISPLAY,
    DELETE_TODO} from '../actions/action-type';

let initState = {
    display:'all',
    todos: [
        {
            id: Number.parseInt(Math.random() * 10000000),
            isComplete: false,
            title: '学习react'
        },
        {
            id: Number.parseInt(Math.random() * 10000000),
            isComplete: true,
            title: '学习redux'
        },
        {
            id: Number.parseInt(Math.random() * 10000000),
            isComplete: false,
            title: '学习Dva'
        },
        {
            id: Number.parseInt(Math.random() * 10000000),
            isComplete: false,
            title: '学习Python'
        }
    ]
}

function reducer(state=initState, action){
    let newState;
    switch(action.type){
        case ADD_TODO:
            newState = {
                todos: [
                    ...state.todos,
                    action.payload
                ]
            };
            break;
        case TOGGLE_COMPLETE:
            console.log(action.payload)
            newState = {
                todos: state.todos.map(item => {
                    if (item.id === action.payload){
                        item.isComplete = !item.isComplete;
                    }
                    return item;
                })
            };
            break;
        case CHANGE_DISPLAY:
            newState = {
                display: action.payload,
                todos: [...state.todos]
            };
            break;
        case DELETE_TODO:
            newState = {
                todos: state.todos.filter(item=>{
                    return item.id !== action.payload
                })
            };
            break;
        default:
            newState = state;
            break;
    }
    return newState;
}

export default reducer;