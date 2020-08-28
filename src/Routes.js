import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from '../src/page/Homepage';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Dashboard from '../src/page/user/UserDashboard';
import AdminDashboard from '../src/page/user/AdminDashboard';
import AddCategory from './page/admin/Addcategory';
import Addproduct from './page/admin/Addproduct';
import Shop from './page/Shop';
import Product from './page/product/Product'
import Cart from './component/card/Cart';
import Orders from './page/admin/Orders';
import Profile from '../src/page/user/Profile';
import ManageProducts from './page/admin/ManageProducts'
import UpdateProduct from './page/admin/UpdateProduct.js'

const Routes = () => {
    return(
        <div>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Homepage}/>
                <Route path="/shop" exact component={Shop}/>
                <Route path="/product/:productId" exact component={Product}/>
                <Route path="/cart" exact component={Cart}/>
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
                <AdminRoute
                    path="/card/product"
                    exact
                    component={Addproduct}
                />
                <AdminRoute 
                path="/admin/orders" 
                exact 
                component={Orders}
                />
                <PrivateRoute
                    path="/profile/:userId"
                    exact
                    component={Profile}
                />
                <AdminRoute 
                path="/admin/products"
                exact
                component={ManageProducts}
                />
                <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
                {/* <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory} /> */}
            </Switch>
        </BrowserRouter>
        </div>
    );
};

export default Routes;