import React,{ useState,useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {MDBRow, MDBInput, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from 'mdbreact';
import ShowImage from './Showimage';
import ModalTemp from '../../page/product/modalTemp';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './CardHelper'
import './style-card.css'
import { getSensor, readSensorRealTime } from '../../page/admin/apiAdmin'
import { isAuthenticated } from '../../auth/index'
import RealtimeTemp from './TempRealtime'

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  showTemp = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  showDescriptionprops = true,
  setRun = f => f,
  run = undefined
},props) => {

  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count)
  const [modalGraph, setModalGraph] = useState(false)
  const [TempData, setTempData ] = useState([]);
  const [moiseData, setMoiseData ] = useState([]);
  const [Label, setLabel] = useState([]);

  const { user, token } = isAuthenticated();
  
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

  // const realtime = () => {
  //   readSensorRealTime(token, product._id)
  //     .then(data => {
  //       console.log(data)
  //     }
  //     )
  // }

  useEffect(() => {
    // realtime()
  }, )

  const fetchTemp = event => {
    event.preventDefault();
    getSensor(token, product._id)
        .then(data => {
          // console.log(data)
                        if(data.error){
                            console.log(data.error)
                        }else{
                          // console.log(data)
                          var TempValue = []
                          var Label = []
                            for(var i = 0; i < data.length; i ++ ){
                              console.log('log push')
                              var dateTrans = moment(data[i].createdAt).format('YYYY-MM-DD HH:mm:ss')
                              Label.push(dateTrans)
                              TempValue.push(parseFloat(data[i].temp.$numberDecimal))
                            }
                            console.log(TempValue)
                          var MoiseData = []
                          for(var i = 0; i < data.length ; i ++ ){
                            console.log('log push')
                            MoiseData.push(parseFloat(data[i].moisture.$numberDecimal))
                          }
                            setLabel(Label)
                            setMoiseData(MoiseData)
                            setTempData(TempValue)
                            setModalGraph(true)
                        }
        }) 
  }

  const showTempButton = (showTemp) => {
    return(
      showTemp && (
        <MDBBtn  onClick={fetchTemp} color="indigo">  
          อุณหภูมิและความชื้น
        </MDBBtn>
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
        <span className="badge orange lighten-2 badge-pill mt-3 mb-3 ml-2">inStock</span>
    ) : (
        <span className="badge deep-orange darken-1 badge-pill mt-3 mb-3 ml-2">outStock</span>
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
          <div className="input-group mb-3 mt-4">
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
        <MDBBtn color="danger"
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn mt-3"
        >
          Remove Product
        </MDBBtn>
      )
    );
  };

  const showDescription = showDescriptionprops => {
    if(showDescriptionprops){
      return(
      <p className="lead mt-1">{product.description.substring(0, 100)}</p> 
      )
    }else{
      return(
      null
    )
    }
    
  }


  return (
<div>
  <MDBCard className="card-goods">
      {/* <div className="card-header name">{product.name}</div> */}
      <div className="img-box">
      <ShowImage item={product} url="product"/>
      </div>
      <MDBCardBody>
      {shouldRedirect(redirect)}
      <MDBCardTitle>{product.name}</MDBCardTitle>
      <MDBCardText>
        {showDescription(showDescriptionprops)}
        <RealtimeTemp productId={product._id}/>
        {/* {<p className="lead mt-1">{showDescription(props.showDescriptionprops)}</p>} */}
        <p className="black-8">{product.price} ฿</p>
         <p className="black-8">
          Added on : {moment(product.createdAt).fromNow()}
        </p>
      </MDBCardText>
      <MDBRow>
      {showStock(product.quantity)}
      </MDBRow>
      <MDBRow>
        {showTempButton(showTemp)}
        {showViewButton(showViewProductButton)}
        {showAddToCartBtn(showAddToCartButton, product.quantity)}
        </MDBRow>
      <MDBRow >
         {showRemoveButton(showRemoveProductButton)}
        {showCartUpdateOptions(cartUpdate)}
      </MDBRow>    
      </MDBCardBody>
      </MDBCard> 
      <ModalTemp
          show = {modalGraph}
          productforsensorId = {product._id}
          onHide = {()=> setModalGraph(false)}
          dataTemp = {TempData}
          dataMoise = {moiseData}
          labelx = {Label}
      />
</div>
      
    )
} 

export default Card;