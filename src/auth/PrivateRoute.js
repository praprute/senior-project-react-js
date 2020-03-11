import React,{ Component ,Fragment } from 'react';
import {Route, Redirect} from 'react-router-dom';
import { isAuthenticated } from './index'
import { MDBAlert } from 'mdbreact';

import Signin from './../component/sign&signup/Signin'


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/",
                        state: { from: props.location }
                    }}
                />,
                alert("Please Sigin")
            )
        }
    />
);

export default PrivateRoute;
