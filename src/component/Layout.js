import React, {Component} from 'react';
import Navbar from "../component/navbar/nav";
import Footer from './footer/Footer';
import {Jumbotron, Button, Container} from 'react-bootstrap';
import { MDBContainer, MDBCol, MDBRow } from 'mdbreact';
import "./../styles.css"

const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
    <div>
        <Navbar /> 
        <div className="backdrop">
        <div className="jumbotron card card-image">
        
        <Container className="container-fluid ">
        <MDBRow className="row-jumbotron">
        {/* <MDBCol size = "7" >
        </MDBCol>
        <MDBCol size = "5"> */}
          <div className="jumbotext">
            <h2 >{title}</h2>
            <p className="lead">{description}</p>
          </div>
        {/* </MDBCol> */}
        </MDBRow>
        
        </Container> 
        </div> 
        </div>
       
        <div className={className}>{children}</div>

        <Footer />
    </div>
);
export default Layout