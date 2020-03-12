import React, { Component, useState, useEffect } from 'react';
import Layout from '../../component/Layout';
import { isAuthenticated } from '../../auth/index'
import { MDBCard,MDBListGroup, MDBListGroupItem, MDBContainer, MDBRow, MDBCol } from 'mdbreact'
import { Link } from 'react-router-dom' 

const AdminDashboard = props => {

  const { user:{ _id, name, email, role } } = isAuthenticated();

  const adminLink = () => {
    return (
      <MDBCard>
        <h4 className="card-header">
              Admin Link
        </h4>
        <MDBListGroup>
          <MDBListGroupItem>
            <Link className="nav-link" to="/card/category">Create Category</Link>
          </MDBListGroupItem>
          <MDBListGroupItem>
            <Link className="nav-link" to="/card/product">Create Product</Link>
          </MDBListGroupItem>
          <MDBListGroupItem>
            <Link className="nav-link" to="/profile/update">Update Profile</Link>
          </MDBListGroupItem>
        </MDBListGroup>
      </MDBCard>
    )
  };

  const adminInfo = () => {
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

//   const PurchaseHistory = () => {
//     return(
//             <MDBCard className="card mb-5">
//             <h3 className="card-header">Purchase history</h3>
//             <MDBListGroup>
//             <MDBListGroupItem>history</MDBListGroupItem>
//             </MDBListGroup>
//             </MDBCard>
//     )
//   }
    return(
      
        <Layout title="Dashboard" description={`Hi ${name}, email: ${email}`} className="container-fluid">
          <MDBContainer>
            <MDBRow>
              <div className="col-md-3">
                {adminLink()}
              </div>
              <div className="col-md-9">
                {adminInfo()}
                {/* {PurchaseHistory()} */}
              </div>
            </MDBRow>
          </MDBContainer>
        </Layout>
    )
}

export default AdminDashboard