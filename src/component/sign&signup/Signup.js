import React, {Component, useState, useEffect} from 'react'
import { Modal, Button, Form, Row, Col} from 'react-bootstrap'
import {  MDBAlert } from 'mdbreact';
import { signup } from '../../auth/index'

const Signup = props => {
    const [values, setValues] = useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false
    }) 

    const {name, email, password, success, error} = values

    const handleChange = name => event => {
        setValues({...values, error:false , [name]: event.target.value})
    }

    const clickSubmit = event => {
      event.preventDefault();
      setValues({ ...values, error: false });
      signup({ name, email, password })
      .then(data => {
          if (data.error) {
              setValues({ ...values, error: data.error, success: false });
          } else {
              setValues({
                  ...values,
                  name: "",
                  email: "",
                  password: "",
                  error: "",
                  success: true
              });
          }
      });
  };

    const showError = () => (
      <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
      >
      {error}
      </div>
    )

    const showSuccess = () => (
       <div
       className="alert alert-info"
       style={{ display: success ? "" : "none" }}
      >
       New account is created. Please 
      </div>
    )

    return(
        <div className="Signup">
        <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Signup
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
        <Form>
        {showError()}
        {showSuccess()}
        <Form.Group controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control placeholder="Your name" onChange={handleChange('name')} value={name}/>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={handleChange('email')} value={email}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={handleChange('password')} value={password}/>
        </Form.Group>
        
        <Button variant="primary" type="submit" size="lg" block>
          facebook
        </Button>

       {/* {JSON.stringify(values)} */}
      </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button onClick={clickSubmit} variant="success">Submit</Button>
      <Button onClick={props.onHide} variant="danger">Close</Button>
      </Modal.Footer>
      </Modal>
        
        </div>
    );
}

export default Signup