import {createStore} from 'redux'
import reducer from './reduces'

let store = createStore(reducer);//传入reducer
export default store;