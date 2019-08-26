import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import Test from './components/test'

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" component={App}></Route>
            <Route path="/test" component={Test}></Route>
        </Switch>
    </Router>
)
