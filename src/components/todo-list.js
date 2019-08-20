import React,{Component} from 'react';
import {connect} from 'react-redux';
import actions from '../store/actions';

class TodoList extends Component{
    todoChange = (event) => {
        this.props.toggleComplete(Number.parseInt(event.target.value))
    }

    filterDisplay(){
        return this.props.todos.filter(item=>{
            switch(this.props.display){
                case 'completed':
                    return item.isComplete;
                case 'uncompleted':
                    return !item.isComplete;
                case 'all':
                    return true;
                default:
                    return true;
            }
        })
    }

    deleteTodo(id){
        this.props.deleteTodo(id);
    }

    getTodos(){
        return this.filterDisplay().map((todo, index)=>{
            return (
                <li key={`todo-${index}`}>
                    <input type="checkbox" value={todo.id} checked={todo.isComplete} onChange={this.todoChange}/>{
                        todo.isComplete ? <del>{todo.title}</del>:<span>{todo.title}</span>
                    }
                    <button type="button" data-id={todo.id} onClick={this.deleteTodo.bind(this, todo.id)}>删除</button>
                </li>
            )
        })
    }

    render(){
        return (
            <div>
                <ul>
                    {this.getTodos()}
                </ul>
            </div>
        )
    }
}

export default connect((state) => ({
    ...state
}), actions)(TodoList);