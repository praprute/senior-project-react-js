import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from '../src/page/Homepage';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Dashboard from '../src/page/user/UserDashboard';
import AdminDashboard from '../src/page/user/AdminDashboard';
import AddCategory from './page/admin/Addcategory';

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
                <AdminRoute
                    path="/admin/dashboard"
                    exact
                    component={AdminDashboard}
                />
                <AdminRoute
                    path="/card/category"
                    exact
                    component={AddCategory}
                />
            </Switch>
        </BrowserRouter>
        </div>
    );
};

export default Routes;