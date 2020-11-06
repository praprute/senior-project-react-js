import React, { useState, useEffect } from 'react';
import Layout from '../../component/Layout';
import { read, listRelated } from '../apiComponent/apiComponent';
import Card from '../../component/card/Card';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loaSingleProduct = productId => {
    read(productId).then(data => {
      if(data.error){
        setError(data.error);
      }else{
        setProduct(data);
        listRelated(data._id).then(data => {
          if(data.error){
            setError(data.error);
          }else{
            setRelatedProduct(data)
          }
        })
      }
    })
  }

  useEffect(() => {
    const productId = props.match.params.productId
    loaSingleProduct(productId)
  }, [props])

    return(
        <Layout 
        title={product && product.name}
        description={product && 
          product.description &&
          product.description.substring(0,300)}
        className=""
        >
          <br/>
          <br/>
          <MDBContainer>
            <MDBRow >
        <MDBCol  md={7} xs={12}>
        <h4>Your Product</h4>
        {
          product && 
          product.description && (
          <Card showTemp={true} showDescriptionprops={true} product={product} showViewProductButton={false} />
        )}
        </MDBCol>
        <MDBCol  md={5} xs={12}>
        <h4>Related products</h4>
            {relatedProduct.map((p, i) => (
                <div className="mb-3" key={i} >
                    <Card product={p} showDescriptionprops={true} showTemp={false} />
                </div>
            ))}
        </MDBCol>
        </MDBRow>
          </MDBContainer>
          <br/>
          <br/>
        
        </Layout>
      )
}

export default Product;