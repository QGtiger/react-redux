import React,{Component} from 'react'
import {connect} from 'react-redux'
import actions from '../store/actions'

class TodoHeader extends Component{
    state = {
        title: ''
    }

    getUnfinishedCount(){
        return this.props.todos.filter(i=>{
            return i.isComplete === false;
        }).length;
    }

    titleChange(e){
        this.setState({
            title: e.target.value
        })
    }

    addTodo(){
        let todo = {
            id: Number.parseInt(Math.random() * 10000000),
            isComplete: false,
            title: this.state.title
        }
        this.props.addTodo(todo);
        this.setState({
            title: ''
        })
    }

    render(){
        return (
            <div>
                <div>您有{this.getUnfinishedCount()}件事情未完成</div>
                <div>
                    待办项: <input type="text" value={this.state.title} onChange={this.titleChange.bind(this)}/>  <button type="button" onClick={this.addTodo.bind(this)}>添加</button>
                </div>
            </div>
        );
    }
}

export default connect((state)=>({
    ...state
}), actions)(TodoHeader);