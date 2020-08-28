import React,{ Component, useState, useEffect } from 'react';
import Layout from '../../component/Layout';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../auth/index'
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin'
import { MDBContainer,MDBInputGroup,MDBInput,MDBBtn,MDBRow,MDBAlert,MDBListGroup, MDBListGroupItem } from 'mdbreact'
import moment from 'moment'

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState();
    const { user, token } = isAuthenticated();

    const loadOrders = () => {
        var farmer = user._id
        console.log('farmer')
        console.log(farmer)
        listOrders(user._id, token, farmer).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
                console.log(data)
            }
        });
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setStatusValues(data);
                console.log(data)
            }
        });
    }

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    }, []);

    const showOrdersLength = () => {
        if(orders.length > 0){
            return (
            <h1 className="red-text display-2">Total orders : {orders.length}</h1>
            )
        }else {
            return (
                <h1 className="red-text display-2">No orders</h1>
            )
        }
    };

    // const showInput = (key, value) => (
    //         <MDBInputGroup 
    //         material 
    //         containerClassName="mb-3 mt-0" 
    //         prepend={key} 
    //         hint={value}
    //         readOnly  />    
    // )

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(
            data => {
                if (data.error) {
                    console.log("Status update failed");
                } else {
                    loadOrders();
                }
            }
        );
    };

    const showStatus = o => (
        <div className="form-group">
            <h3 className="mark mb-4">Status: {o.status}</h3>
            <select
                className="form-control"
                onChange={e => handleStatusChange(e, o._id)}
            >
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );

    return (
        <Layout
            title="Orders"
            description={`G'day ${
                user.name
            }, you can manage all the orders here`}
        >
            {/* {JSON.stringify(orders)}
            {JSON.stringify(user._id)} */}
            <br/>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength(orders)}  

                    {orders.map((o, oIndex) => {
                        return (
                            <div className="mt-5" 
                                 key={oIndex} 
                                 style={{ borderBottom: "5px solid indigo"}}
                            >
                                <h4 className="mb-2">
                                    <span>
                                        Order ID:{o._id}
                                    </span>
                                </h4>

                                <MDBListGroup className="mb-2">
                                    <MDBListGroupItem>
                                        {showStatus(o)}
                                    </MDBListGroupItem>
                                    {/* <MDBListGroupItem>
                                        Transaction ID : {o.transaction_id}
                                    </MDBListGroupItem> */}
                                    <MDBListGroupItem>
                                      Product name : {o.product.name}
                                    </MDBListGroupItem>
                                    <MDBListGroupItem>
                                      Product price : ฿ {o.product.price} 
                                    </MDBListGroupItem>
                                    <MDBListGroupItem>
                                      Total price : ฿ {o.product.price*o.count} 
                                    </MDBListGroupItem>
                                    <MDBListGroupItem>
                                        Ordered by : {o.user.name}
                                    </MDBListGroupItem>
                                    <MDBListGroupItem>
                                        Email user : {o.user.email}
                                    </MDBListGroupItem>
                                    <MDBListGroupItem>
                                        Ordered on : {moment(o.createdAt).fromNow()}
                                    </MDBListGroupItem>
                                    <MDBListGroupItem>
                                        Delivery address : {o.address}
                                    </MDBListGroupItem>
                                    
                                </MDBListGroup>

                                <h3 className=" mt-4 mb-4 font-italic">
                                    Total products in the order :{" "}
                                    {o.count}
                                </h3>

                                {/* {o.count.map((p, pIndex) => (
                                    <div className = "mb-4" 
                                         key={pIndex}
                                         style={{padding: '20px', border: '1px solid indigo'}}
                                         >
                                    
                                    {showInput('Product name', p.name)}
                                    {showInput('Product price', p.price)}
                                    {showInput('Product total', p.count)}
                                    {showInput('Product Id', p._id)}
                                    {showInput('Product farmer', p.farmer)}
                                    </div>
                                ))} */}
                            </div>
                        ) 
                    })}
                </div>
            </div>
            <br/>
        </Layout>
    );
};
export default Orders 