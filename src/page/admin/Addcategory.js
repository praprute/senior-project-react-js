import React,{ Component, useState, useEffect } from 'react';
import Layout from '../../component/Layout';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../auth/index'
import { createCategory } from './apiAdmin'
import { MDBContainer,MDBInput,MDBBtn,MDBRow,MDBAlert } from 'mdbreact'

const AddCategory = () => {

    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const { user, token } = isAuthenticated()

    const handleChange = e => {
        setError('')
        setName(e.target.value)
    }

    const clickSubmit = e => {
        e.preventDefault();
        setError('')
        setSuccess(false)
        createCategory(user._id, token, {name})
        .then(data => {
            if(data.error){
                setError(data.error)
            }else{
                setError('')
                setSuccess(true)
            }
        })
    }

    const newCategoryFom = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
            <MDBInput label="Name" group type="text" 
            validate 
            error="wrong"
            success="right"
            onChange={handleChange}
            value={name}
            autoFocus 
            required
            />
            </div>
            <button className="btn btn-success">Create Category</button>
        </form>
    )

    const showSuccess = () => {
        if(success){
            return (
                <MDBAlert color="success" >
                    {name} ถูกเพิ่มลงในหมวดหมู่ของท่านเรียบร้อย
                </MDBAlert>
            )
        }else if(error){
            return (
                <MDBAlert color="danger" >
                    {name} ถูกเพิ่มไปแล้ว
                </MDBAlert>
            )
        }
    }

    const goBack = () => (

        <button 
        className="btn btn-secondary">
            <Link to="/admin/dashboard" 
            className="text-uppercase"
            style={{color:"inherit"}}
            >
                 Back to Dashboard
            </Link>
        </button>

        // <div className="mt-5">
        //     <Link to="/admin/dashboard" className="text-warning">
        //          Back to Dashboard
        //     </Link>
        // </div>
    )

    return(
        <Layout title="Add a new Category" description={`Hi ${user.name}, ready to add a new Category ? `} className="container-fluid">
          <MDBContainer>
              {showSuccess()}
            <MDBRow>
              <div className="col-md-8 offset-md-2">
                {newCategoryFom()}
                <br/>
                {goBack()}
              </div>
            </MDBRow>
          </MDBContainer>
        </Layout>
    )

}

export default AddCategory;