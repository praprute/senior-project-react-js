import React, { Component, useState, useEffect } from 'react';
import Layout from '../../component/Layout';
import { isAuthenticated } from '../../auth/index'
import { MDBCard,MDBListGroup, MDBListGroupItem, MDBContainer, MDBRow, MDBCol } from 'mdbreact'
import { Link } from 'react-router-dom' 
import { getPurchaseHistory } from '../admin/Apiuser'
import moment from "moment";

const Dashboard = props => {

  const [history, setHistory] = useState([]);

  // const { user:{ _id, name, email, role } } = isAuthenticated();
  const {
          user: { _id, name, email, role }
        } = isAuthenticated();
const token = isAuthenticated().token;

const init = (userId, token) => {
    getPurchaseHistory(userId, token).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            setHistory(data);
        }
    });
};

useEffect(() => {
    init(_id, token);
}, []);


  const userLink = () => {
    return (
      <MDBCard>
        <h4 className="card-header">
              User Link
        </h4>
        <MDBListGroup>
          <MDBListGroupItem>
            <Link className="nav-link" to="/card">My card</Link>
          </MDBListGroupItem>
          <MDBListGroupItem>
            <Link className="nav-link" to={`/profile/${_id}`}>Update Profile</Link>
          </MDBListGroupItem>
        </MDBListGroup>
      </MDBCard>
    )
  };

  const userInfo = () => {
    return(
            <MDBCard className="card mb-5">
            <h3 className="card-header">
              User Imformation
            </h3>
            <MDBListGroup>
                <MDBListGroupItem>{name}</MDBListGroupItem>
                <MDBListGroupItem>{email}</MDBListGroupItem>
                <MDBListGroupItem>{role === 1 ? "Admin" : "Registered User"}</MDBListGroupItem>
            </MDBListGroup>
            </MDBCard>
    )
  };

  // const PurchaseHistory = () => {
  //   return(
  //           <MDBCard className="card mb-5">
  //           <h3 className="card-header">Purchase history</h3>
  //           <MDBListGroup>
  //           <MDBListGroupItem>history</MDBListGroupItem>
  //           </MDBListGroup>
  //           </MDBCard>
  //   )
  // }

  const purchaseHistory = history => {
    return (
        <div className="card mb-5">
            <h3 className="card-header">Purchase history</h3>
            <ul className="list-group">
                <li className="list-group-item">
                    {history.map((h, i) => {
                        return (
                            <div>
                                <hr />
                                {h.products.map((p, i) => {
                                    return (
                                        <div key={i}>
                                            <h6>Product name: {p.name}</h6>
                                            <h6>
                                                Product price: ${p.price}
                                            </h6>
                                            <h6>
                                                Purchased date:{" "}
                                                {moment(
                                                    p.createdAt
                                                ).fromNow()}
                                            </h6>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </li>
            </ul>
        </div>
    );
};
    return(
      
        <Layout title="Dashboard" description={`Hi ${name}, email: ${email}`} className="container-fluid">
          <MDBContainer>
            <br/>
            <br/>
            <MDBRow>
              <div className="col-md-3">
                {userLink()}
              </div>
              <div className="col-md-9">
                {userInfo()}
                {purchaseHistory(history)}
              </div>
            </MDBRow>
          </MDBContainer>
        </Layout>
    )
}

export default Dashboard