import React, {Component, useState, useEffect} from 'react'
import { Modal, Button, Form} from 'react-bootstrap'
import { signin,authenticate,isAuthenticated } from '../../auth/index'
import { Link, Redirect } from 'react-router-dom'

const Signin = props => {
  const [values, setValues] = useState({
    email:"",
    password:"",
    error:"",
    loading:false,
    redirectToReferrer: false,
}) 

const { email, password, loading, error, redirectToReferrer} = values;

const { user } = isAuthenticated();

const handleChange = name => event => {
    setValues({...values, error:false , [name]: event.target.value})
}

const clickSubmit = event => {
  event.preventDefault();
  setValues({ ...values, error: false, loading: true });
  signin({ email, password })
  .then(data => {
      if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true
        });
        })
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
const showLoading = () => (
   loading && (<div className="alert alert-info">
     <h2>Loading...</h2>
   </div>)
)
const redirectUser = () => {
  if(redirectToReferrer) {
    if(user && user.role === 1){
      return (
        <Redirect to="/admin/dashboard" /> 
      ) 
    }else{
      return (
        <Redirect to="/" /> 
      )
    }
  }else{
    return(
      <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Signin
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
        {showError()}
        {showLoading()}
        <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  onChange={handleChange('email')} value={email}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={handleChange('password')} value={password}/>
        </Form.Group>
        {/* <Button variant="primary" type="submit" size="lg" block>
          facebook
        </Button> */}
      </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={clickSubmit} variant="success" >Login</Button>
        <Button onClick={props.onHide} variant="danger">Close</Button>
      </Modal.Footer>
    </Modal>
    )
  }
  if(isAuthenticated()){
    return <Redirect to="/" />
  }
}
    return(
        <div className="Signin">
          {redirectUser()}
        </div>
       
    );
}
export default Signin