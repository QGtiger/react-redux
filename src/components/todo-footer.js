import React,{Component} from 'react'
import {connect} from 'react-redux'
import actions from '../store/actions'

class TodoFooter extends Component{
    changeDisplay(type){
        this.props.changeDisplay(type);
    }

    render(){
        return (
            <div>
                <button type="button" onClick={this.changeDisplay.bind(this,'all')}>全部</button>
                <button type="button" onClick={this.changeDisplay.bind(this,'uncompleted')}>未完成</button>
                <button type="button" onClick={this.changeDisplay.bind(this,'completed')}>已完成</button>
            </div>
        )
    }
}

export default connect((state)=>({
    ...state
}),actions)(TodoFooter);