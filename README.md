## Redux的特点

1. 统一的状态管理，一个应用中只有一个仓库（store）
2. 仓库中管理了一个状态树（statetree）
3. 仓库不能直接修改，修改只能通过派发器（dispatch）派发一个动作（action）
4. 更新state的逻辑封装到reducer中

## Redux能做什么？

随着JavaScript单页应用开发日趋复杂，管理不断变化的state非常困难，Redux的出现就是为了解决state里的数据问题。在React中，数据在组件中是单向流动的，数据从一个方向父组件流向子组件(通过props)，由于这个特征，两个非父子关系的组件（或者称作兄弟组件）之间的通信就比较麻烦



![img](https:////upload-images.jianshu.io/upload_images/3132667-da2ada12f96965bd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/600/format/webp)

redux.png

## redux中各对象的说明

### store

store是一个数据仓库，一个应用中store是唯一的，它里面封装了state状态，当用户想访问state的时候，只能通过store.getState来取得state对象，而取得的对象是一个store的快照，这样就把store对象保护起来。

### action

action描述了一个更新state的动作，它是一个对象，其中type属性是必须有的，它指定了某动作和要修改的值：

```javascript
{type: UPDATE_TITLE_COLOR, payload: 'green'}
```

### actionCreator

如果每次派发动作时都写上长长的action对象不是很方便，而actionCreator就是创建action对象的一个方法，调用这个方法就能返回一个action对象，用于简化代码。

### dispatch

dispatch是一个方法，它用于派发一个动作action，这是唯一的一个能够修改state的方法，它内部会调用reducer来调用不同的逻辑基于旧的state来更新出一个新的state。

### reducer

reducer是更新state的核心，它里面封装了更新state的逻辑，reducer由外界提供（封装业务逻辑，在createStore时传入），并传入旧state对象和action，将新值更新到旧的state对象上返回。

## 使用redux的流程

1. 定义动作类型：

```javascript
const INCREAMENT='INCREAMENT';
```

1. 定义项目的默认状态，传入reducer

```javascript
let initState={...};
function reducer(state=initState,action){
    //...
}
```

1. 编写reducer，实现更新state的具体逻辑

```javascript
function reducer(state=initState,action){
    let newState;
    switch(action.type){
        //...
    }
    return newState;
}
```

1. 创建容器，传入reducer

```javascript
let store=createStore(reducer);
```

1. 订阅需要的方法，当state改变会自动更新

```javascript
store.subcribe(function(){});
```

1. 在需要更新state的地方调用dispatch即可

```javascript
store.dispatch(/*某个action*/);
```

可以看到通过以上几个步骤，就可以使用redux，且不局限于某种“框架”中，redux是一个设计思想，只要符合你的需求就可以使用redux。

## 在React中使用Redux

以下编写一个待办事项的小功能，描述如下：

- 可以让用户添加待办事项（todo）
- 可以统计出还有多少项没有完成
- 用户可以勾选某todo置为已完成
- 可筛选查看条件（显示全部、显示已完成、显示未完成）

小项目的目录结构：

```javascript
项目根结点
┗━ components 存放组件
    ┗━ todo-header.js
    ┗━ todo-list.js
    ┗━ todo-footer.js
    ┗━ index.js
┗━ store 保存redux的相关文件
        ┗━ actions 定义action
            ┗━ action-type 定义动作类型
                ┗━ action-types.js
            ┗━ index.js
        ┗━ reducers 定义reducer
            ┗━ index.js
        ┗━ index.js 默认文件用于导出store
┗━ index.html 模版页面
```

以上4个功能我们使用redux结合react来实现。

组件拆分为3个：

- TodoHeader 用于展示未办数量和添加待办
- TodoList 按条件展示待办项列表
- TodoFooter 功能按钮（显示全部、未完成、已完成）

### 统计未完成的事项

此功能的核心就是把所有“未完成”的数量统计出来，在编写redux程序时，首先定义好默认state，默认state是写在reducer中的：

```javascript
//定义默认状态
let initState = {
  todos: [
    {
      id: parseInt(Math.random() * 10000000),
      isComplete: false,
      title: '学习redux'
    }, {
      id: parseInt(Math.random() * 10000000),
      isComplete: true,
      title: '学习react'
    }, {
      id: parseInt(Math.random() * 10000000),
      isComplete: false,
      title: '学习node'
    }
  ]
};
```

在reducer目录下创建一个index.js，由于这4个功能点过于简单，不必拆分为多个reducer，因此所有的功能都在这一个index.js文件中完成。这样还可以减少combineReducer这个步骤。

以上定义了一个默认state对象，它里面有3条数据，描述了待办事项的内容。

由于目前没有具体的功能逻辑，我们创建一个空的reducer：

```javascript
function reducer(state=initState,action){
  return state;
}
export default reducer;
```

可以看到，传入了默认的initState，这样就可以基于旧的state对象来作更新，每次reducer都会根据原state更新出一个新的state返回。

之后就可以创建仓库（store），引用刚刚写好的reducer，并把store返回给顶层组件使用：

```javascript
import {createStore} from 'redux';
import reducer from './reducers';

let store = createStore(reducer);//传入reducer
export default store;
```

在store目录下的index.js默认导出store对象，方便组件引入。

在根组件中引入store对象，它是所有组件的容器，因此它要做所有组件的store提供者的角色，所以它的任务要把store提供给所有子组件使用，这就需要react-redux包提供的一个组件：`Provider`：

Provider也是一个组件，它只有一个属性：`store`，传入创建好的store对象即可：

```javascript
import {Provider} from 'react-redux';
import store from '../store';
//其它代码略...
ReactDOM.render(<Provider store={store}>
  <div>
    <TodoHeader/>
    <TodoList/>
    <TodoFooter/>
  </div>
</Provider>, document.querySelector('#root'));
```

这样就意味着`Provider`包裹的所有组件都可合法的取到store。

现在数据已经提供，还需要子组件来接收，同样接收store数据react-redux包也为我们提供了一个方法：`connect`。

connect这个方法非常奇妙，它的功能非常强大，它可以把仓库中state数据注入到组件的属性（this.props）中，这样子组件就可以通过属性的方式拿到仓库中的数据。
 首先定义一个头组件，用于显示未完成的数量：

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

class TodoHeader extends React.Component {
//代码略...
}
```

下面使用connect方法将state数据注入到TodoHeader组件中：

```javascript
import {connect} from 'react-redux';
let ConnectedTodoHeader = connect((state) => ({
  ...state
}))(TodoHeader);
```

可以看到它的写法很怪，connect是一个高阶函数（函数返回函数），它的最终返回值是一个组件，这个组件（ConnectedTodoHeader）最终“连接”好了顶层组件Provider提供的store数据。

connect的第一个参数是一个函数，它的返回是一个对象，返回的对象会绑定到目标组件的属性上，函数参数state就是store.getState的返回值，使用它就可以取到所有state上的数据，目前state就是todos的3条待办事项

而高阶函数传入的参数就是要注入的组件，这里是TodoHeader，这样在TodoHeader组件中就可以通过`this.props.todos`取到待办事项的数据。

这样就可以编写好我们的第一个统计功能，下面附上代码：

```javascript
class TodoHeader extends React.Component {
  //取得未完成的todo数量
  getUnfinishedCount() {
    //this.props.todos就是从connect传入的state数据
    return this.props.todos.filter((i) => {
      return i.isComplete === false;
    }).length;
  }
  render() {
    return (<div>
      <div>您有{this.getUnfinishedCount()}件事未完成</div>
    </div>);
  }
}

//导出注入后的组件
export default connect((state) => ({
  ...state//此时的state就是todos:[...]数据
}))(TodoHeader);
```

可以看到，通过connect取得state注入到组件属性上，即可编写逻辑完成功能。

### 添加待办项

接下来完成添加待办项的功能，用户在一个文本框中输入待办项，把数据添加到仓库中，并更新视图。

由于有用户的操作了，我们需要编写动作（Action），Action需要一个具体的动作类型，我们在action-types.js中创建需要动作类型即可：

```javascript
//添加待办事项
export const ADD_TODO = 'ADD_TODO';
```

可以看到它非常简单，就定义了一个动作类型，也就是一个描述Action动作的指令，导出它给reducer来使用。

接下来编写ActionCreator，它是一个函数，只返回用刚刚这个指令生成的Action对象：

```javascript
import {ADD_TODO} from './action-type/action-types';

let actions = {
  addTodo: function(payload) {
    return {type: ADD_TODO, payload};
  }
};

export default actions;//导出ActionCreators
```

可以看到引入了action-type，addTodo返回了一个形如`{type:XXX, payload:XXX}`的一个Action对象。这就是一个标准的Action对象的形式，第二个参数payload就是用户传入的参数。

注意在导出时一定要将ActionCreator函数包到一个对象中返回，这样redux内部会通过bindActionCreators将dispatch的功能封装到每个函数中，这样在connect连接时极大的方便了用户的操作，稍候会看到。

下面编写reducer，它里面封装了“添加待办项”的逻辑：

```javascript
import {ADD_TODO} from '../actions/action-type/action-types';
//部分代码略...
function reducer(state = initState, action) {
  let newState;
  switch (action.type) {
    case ADD_TODO:
      newState = {
        todos: [
          ...state.todos,
          action.payload
        ]
      };
      break;
    default:
      newState = state;
      break;
  }
  return newState;
}
```

以上通过switch语句的一个分支，判断动作类型是不是“添加待办”这个功能（ADD_TODO），这样在原state对象的基础上追加这条数据即可。

注意，每次reducer都返回一个新的对象，不要直接在原state.todos.push这条数据，因为reducer是一个纯函数。

`...`是ES6的写法，意为展开运算符，它是将原state.todos的数据展开，并在后面添加一条新数据，相当于合并操作。

好了，到此处理数据的部分已经写好，又到了注入组件的工作了，创建展示待办的组件TodoList：

```javascript
import React from 'react';
import {connect} from 'react-redux';
class TodoList extends React.Component {
//代码略...
}
export default connect((state) => ({
  ...state
}))(TodoList);
```

再次通过connect方法将state数据注入到组件 （TodoList）的属性上，让组件内部可以通过this.props取得state数据。

下面编写展示待办项的功能：

```javascript
class TodoList extends React.Component {
  getTodos() {
    return this.props.todos.map((todo, index) => {
      return (<li key={index}>
        <input type="checkbox" checked={todo.isComplete}/> {
          todo.isComplete
            ? <del>{todo.title}</del>
            : <span>{todo.title}</span>
        }
        <button type="button" data-id={todo.id}>删除</button>
      </li>);
    });
  }
  render() {
    return (<div>
      <ul>
        {this.getTodos()}
      </ul>
    </div>);
  }
}
```

在组件中定义一个getTodos方法用于循环所有待办项，可以看到通过this.props.todos即可拿到connect传入的数据，并在render中调用getTodos渲染即可。

现在可以初探整个小项目的逻辑，我们取数据不再是通过一层一层的组件传递了，而是所有的数据操作都交由redux来解决，组件只负责展示数据。

### 更改待办项状态

接下来实现更改一条待办项的状态，当用户给一条待办打勾就记为已完成，否则置为未完成。

还是一样，新建一个action-type：

```javascript
//更改待办项的完成状态
export const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE';
```

创建actionCreator，引入这个action-type：

```javascript
let actions = {
  //更改完成状态，此处payload传id
  toggleComplete: function(payload) {
    return {type: TOGGLE_COMPLETE, payload};
  }
    //其它略...
};
```

由于用户勾选一条记录，应传入id作为唯一标识，因此这里的payload参数就是待办项的id。

payload并不是一定要叫payload可以更改变量名，如`todoId`，redux中管个这变量叫载荷，因此这里使用payload。

同样在reducer中再加一个swtich分支，判断TOGGLE_COMPLETE：

```javascript
function reducer(state = initState, action) {
  let newState;
  switch (action.type) {
    case TOGGLE_COMPLETE:
      newState = {
        //循环每一条待办，把要修改的记录更新
        todos: state.todos.map(item => {
          if (item.id == action.payload) {
            item.isComplete = !item.isComplete;
          }
          return item;
        })
      };
      break;
    //其它代码略...
    default:
      newState = state;
      break;
  }
  return newState;
}
```

可以看到这次是修改某一条记录的isComplete属性，因此使用map函数循环，找到id为action.payload的那一条，修改isComplete的状态。

仍要注意，不要使用slice函数去修改原state，一定要返回一个基于state更新后的新对象，map函数的执行结果就是返回一个新数组，因此使用map符合这里的需求。

接下来为组件的checkbox元素添加事件，当用户勾选时，调用对应的Action toggleComplete动作即可完成逻辑：

```javascript
//引入actionCreators
import actions from '../store/actions';
//其它 代码略...
class TodoList extends React.Component {
  todoChange = (event) => {
    //当onChange事件发生时，调用toggleComplete动作
    this.props.toggleComplete(event.target.value);
  }
  getTodos() {
    return this.props.todos.map((todo, index) => {
      return (<li key={index}>
        <input type="checkbox" value={todo.id} checked={todo.isComplete} onChange={this.todoChange}/> {
          todo.isComplete
            ? <del>{todo.title}</del>
            : <span>{todo.title}</span>
        }
        <button type="button" data-id={todo.id}>删除</button>
      </li>);
    });
  }
  render() {
    //略...
  }
}
export default connect((state) => ({
  ...state
}), actions)(TodoList); //第二个参数传入actionCreators
```

这里的connect函数传入了第二个参数，它是一个actionCreator对象，同理由于组件中需要调用Action派发动作以实现某个逻辑，比如这里就是组件需要更新待办项的状态，则“功能”也是由redux传给组件的。

这样组件里的this.props就可以拿到actionCreator的方法，以调用逻辑：
 `this.props.toggleComplete()`。

现在可以看到connect函数的强大之处，不管是数据state和功能actionCreators，都是由redux传给需要调用的组件。redux在内部自动处理了更新组件、数据传递的工作，我们开发者不必再为组件之间的通信花费精力了。

我们的今后的工作就是按照redux的架构定义好动作（Action）和reducer，也就是业务逻辑，而其它繁复的工作都由redux来完成。

删除待办项的功能类似，不再详述。

### 筛选查看条件

筛选查看条件需要预先定义好3个状态，即查看全部（all）只查看未完成（uncompleted）和查看已完成（completed）。

因此，我们修改初始化的状态，让它默认为“查看全部”：

```javascript
//定义默认状态
let initState = {
    //display用于控制待办项列表的显示
  display:'all', 
  todos: [
  //略...
  ]
};
```

同样的套路，创建action-type：

```javascript
//更改显示待办项的状态
export const CHANGE_DISPLAY = 'CHANGE_DISPLAY';
```

创建actionCreator：

```javascript
//部分代码略...
let actions = {
  //更改显示待办项的状态，
  //payload为以下3个值（all,uncompleted,completed）
  changeDisplay: function(payload) {
    return {type: CHANGE_DISPLAY, payload};
  }
};
```

为reducer增加CHANGE_DISPLAY的逻辑：

```javascript
//部分代码略...
function reducer(state = initState, action) {
  let newState;
  switch (action.type) {
    case CHANGE_DISPLAY:
      newState = {
        display: action.payload,
        todos: [...state.todos]
      };
      break;
    default:
      newState = state;
      break;
  }
  return newState;
}
```

在组件中，根据display条件过滤待办项的数据即可，这里抽出一个方法`filterDisplay`来实现：

```javascript
class TodoList extends React.Component {
  //按display条件过滤数据
  filterDisplay() {
     return this.props.todos.filter(item => {
      switch (this.props.display) {
        case 'completed':
          return item.isComplete;
        case 'uncompleted':
          return !item.isComplete;
        case 'all':
        default:
          return true;
      }
    });
  }
  getTodos() {
    return this.filterDisplay().map((todo, index) => {
      //略...
    });
  }
  render() {
    //略...
  }
}
export default connect((state) => ({
  ...state
}), actions)(TodoList);
```

以上还是由connect方法注入数据到组件，根据状态的display条件过滤出符合条件的数据即可。

到此，全部的功能已实现。

运行效果：



![img](https:////upload-images.jianshu.io/upload_images/3132667-b75a361c79151817.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/503/format/webp)

app.png

这个例子虽简单却完整的展示了redux的使用，真正项目开发时只要遵循redux的“套路”即可。

要需了解redux的更深层逻辑原理，就要读redux的源码，其实也并不复杂