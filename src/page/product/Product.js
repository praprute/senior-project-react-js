import React, { useState, useEffect } from 'react';
import Layout from '../../component/Layout';
import { read, listRelated } from '../apiComponent/apiComponent';
import Card from '../../component/card/Card';
import { Container } from 'react-bootstrap';

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
          product.description.substring(0,100)}
        className="container-fluid"
        >
          <br/>
          <br/>
          <Container>
            <div className="row">
        <div className="col-7">
        <h4>{product.name}</h4>
        {
          product && 
          product.description && (
          <Card product={product} showViewProductButton={false}/>
        )}
        </div>
        <div className="col-5">
        <h4>Related products</h4>
            {relatedProduct.map((p, i) => (
                <div className="mb-3" key={i} >
                    <Card product={p} />
                </div>
            ))}
        </div>
        </div>
          </Container>
        
        </Layout>
      )
}

export default Product;