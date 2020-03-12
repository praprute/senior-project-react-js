import React,{ Component ,Fragment } from 'react';
import {Route, Redirect} from 'react-router-dom';
import { isAuthenticated } from './index'
import { MDBAlert } from 'mdbreact';

import Signin from './../component/sign&signup/Signin'


const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() && isAuthenticated().user.role === 1 ? (
                <Component {...props} />
            ) : (
                // alert("You are not an administrator."),
                <Redirect
                    to={{
                        pathname: "/",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default AdminRoute;
