import {
    ADD_TODO,
    TOGGLE_COMPLETE,
    CHANGE_DISPLAY,
    DELETE_TODO
} from './action-type'

let actions = {
    addTodo: function(payload){
        return {type: ADD_TODO, payload};
    },
    toggleComplete: function(payload){
        return {type: TOGGLE_COMPLETE, payload};
    },
    changeDisplay: function(payload){
        return {type:CHANGE_DISPLAY, payload};
    },
    deleteTodo: function(payload){
        return {type:DELETE_TODO, payload};
    }
}

export default actions;