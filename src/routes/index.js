import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from '../components/home/Home';
import History from '../components/history/History';

function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/history" component={History} />
        </Switch>
    );
}

export default Routes;