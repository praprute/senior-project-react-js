import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from '../src/page/Homepage'
import PrivateRoute from './auth/PrivateRoute'
import Dashboard from '../src/page/user/UserDashboard'
// import Signin from './component/Signin';
// import Signup from './component/Signup';

const Routes = () => {
    return(
        <div>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Homepage}/>
                <PrivateRoute
                    path="/user/dashboard"
                    exact
                    component={Dashboard}
                />
            </Switch>
        </BrowserRouter>
        </div>
    );
};

export default Routes;