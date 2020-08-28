import React,{ useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {MDBRow, MDBInput, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from 'mdbreact';
import ShowImage from './Showimage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './CardHelper'
import './style-card.css'

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
}) => {

  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count)
  
  const showViewButton = (showViewProductButton) => {
    return(
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
        <MDBBtn color="indigo">  
        ดูข้อมูลสินค้า
        </MDBBtn>
        </Link>
      )
    )
  }

  const addToCart = () => {
    addItem(product, setRedirect(true));
    console.log(product)
};

const shouldRedirect = redirect => {
  if (redirect) {
    return <Redirect to="/cart" />;
  }
  }

  const  showAddToCartBtn = (showAddToCartButton, quantity) => {
    console.log(quantity)
    if(quantity > 0){
      return (
        showAddToCartButton && (
        <MDBBtn onClick={addToCart} color="light-green">
        หยิบสินค้า
        </MDBBtn>
      )
      )
    }else{
      return (
        showAddToCartButton && (
          <MDBBtn  color="danger">
          -----
          </MDBBtn>
      )
      )
    }
  }

  const showStock = quantity => {
    return quantity > 0 ? (
        <span className="badge orange lighten-2 badge-pill mt-3 mb-3 ml-2">สินค้ายังมีอยู่</span>
    ) : (
        <span className="badge deep-orange darken-1 badge-pill mt-3 mb-3 ml-2">สินค้าหมดจ้า</span>
    );
  };

  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          {/* <div className="input-group mb-3">
            <div className="input-group-prepend">
            <span className="input-group-text">จำนวน</span>
            <MDBInput type="number" value={count} onChange={handleChange(product._id)}/>
            </div>
          </div> */}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">จำนวน</span>
            </div>
            <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
          </div>
        </div>
      )
    );
  };

  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };


  return (

      <MDBCard className="card-goods">
      {/* <div className="card-header name">{product.name}</div> */}
      <div className="img-box">
      <ShowImage item={product} url="product"/>
      </div>
      <MDBCardBody>
      {shouldRedirect(redirect)}
      <MDBCardTitle>{product.name}</MDBCardTitle>
      <MDBCardText>
       {/* {product._id} */}
        <p className="lead mt-1">{product.description.substring(0, 10)}</p>
        
        <p className="black-8">{product.price} ฿</p>
        {/* <p className="black-9">หมวดหมู่:{product.category && product.category.name}</p> */}
        <p className="black-8">
          Added on : {moment(product.createdAt).fromNow()}
        </p>

        {/* <p>
          {JSON.stringify(product.farmer._id)}
        </p> */}
        
      </MDBCardText>
      <MDBRow>
      {showStock(product.quantity)}
      </MDBRow>
      <MDBRow>
        {showViewButton(showViewProductButton)}
        {showAddToCartBtn(showAddToCartButton, product.quantity)}
        {showRemoveButton(showRemoveProductButton)}
        {showCartUpdateOptions(cartUpdate)}
      </MDBRow>
      </MDBCardBody>
      </MDBCard> 
    )
} 

export default Card;