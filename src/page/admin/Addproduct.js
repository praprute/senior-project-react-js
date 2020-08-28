import React,{  useState, useEffect } from 'react';
import Layout from '../../component/Layout';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../auth/index';
import { MDBContainer,MDBInput,MDBBtn,MDBRow,MDBAlert } from 'mdbreact'
import { createProduct,getCategories } from './apiAdmin';
// import ReactCrop from 'react-image-crop';

const Addproduct = () => {

    const { user, token } = isAuthenticated();

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        categories: [],
        category: "",
        shipping: "",
        quantity: "",
        photo: "",
        loading: false,
        error: "",
        createdProduct: "",
        redirectToProfile: false,
        farmer: user._id,
        formData: ""
    });

    // console.log(values)


    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        farmer,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    const init = () => {
        getCategories().then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                setValues({...values, categories:data , formData: new FormData()})
            }
        })
    }

    useEffect(() => {
        init();
        // console.log(user._id)
    }, []);

    const handleChange = name => event => {
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        // console.log(formData)
        setValues({ ...values, [name]: value});
        // console.log(setValues)
    };
    
    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
        console.log(formData)
        // console.log(values)
        createProduct(user._id, token, formData)
        .then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: "",
                    description: "",
                    photo: "",
                    price: "",
                    quantity: "",
                    loading: false,
                    createdProduct: data.name
                });
            }
        });
    };


    const showSuccess = () => {
        if(createdProduct){
            return (
                <MDBAlert color="success" >
                    {createdProduct} is created!
                </MDBAlert>
            )
        }else if(error){
            return (
                <MDBAlert color="danger" >
                    {error}
                </MDBAlert>
            )
        }
    }

    const showLoading = () => (
        loading && (
        <MDBAlert color="info" >
            Loading.......
        </MDBAlert>)
    )

    const newPostForm = () => (

        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image/*"
                    />
                </label>
            </div>

            <div className="form-group">
                <label className="text-uppercase">ชื่อสินค้า</label>
                <input
                    onChange={handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>

            <div className="form-group">
                <label className="text-uppercase">รายละเอียด</label>
                <textarea
                    onChange={handleChange("description")}
                    className="form-control"
                    value={description}
                />
            </div>

            <div className="form-group">
                <label className="text-uppercase">ราคา</label>
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    value={price}
                />
            </div>

            <div className="form-group">
                <label className="text-uppercase">หมวดหมู่</label>
                <select
                    onChange={handleChange("category")}
                    className="form-control"
                >
                    <option>Please select</option>
                    {categories && categories.map((c,i) => (
                        <option key={i} value={c._id}>{c.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-uppercase">การขยส่ง</label>
                <select
                    onChange={handleChange("shipping")}
                    className="form-control"
                >
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-uppercase">จำนวน</label>
                <input
                    onChange={handleChange("quantity")}
                    type="number"
                    className="form-control"
                    value={quantity}
                />
            </div>

            {/* <div className="form-group">
                <label className="text-uppercase">จำนวน</label>
                <input
                    onChange={handleChange("farmer")}
                    type="text"
                    className="form-control"
                    value={farmer}
                />
            </div> */}
            
            <button className="btn btn-success">วางจำหน่าย</button>

        </form>
    )

    return(
        <Layout title="Add a new product" description={`Hi ${user.name}, ready to add a new Product ? `} className="container-fluid">
          <br/>
          <MDBContainer>
              {/* {showSuccess()} */}
            <MDBRow>
              <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {newPostForm()}
                {/* {newCategoryFom()} */}
                {/* {goBack()} */}
              </div>
            </MDBRow>
          </MDBContainer>
        </Layout>
    )
}

export default Addproduct