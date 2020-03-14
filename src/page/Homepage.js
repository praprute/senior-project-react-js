import React,{ Component, useState, useEffect } from 'react';
import Navbar from './../component/navbar/nav'
import {Container} from 'react-bootstrap'
import Layout from '../component/Layout'
import { API } from './../config'
import { getProduct } from './apiComponent/apiComponent' 

const Homepage = props => {

    const [productBySell, setProductBySell] = useState([])  
    const [productByArrival, setProductByArrival] = useState([])  
    const [error, setError] = useState(false)

    const loadProductBySell = () => {
      getProduct('sold').then(data => {
        if(data.error){
          setError(data.error)
        }else{
          setProductBySell(data)
        }
      })
    }

    const loadProductByArrival = () => {
      getProduct('createdAt').then(data => {
        if(data.error){
          setError(data.error)
        }else{
          setProductByArrival(data)
        }
      })
    }

    useEffect(() => {
      loadProductByArrival()
      loadProductBySell()
      console.log(productBySell)
      console.log(productByArrival)
    }, [])

    return(
      <Layout title="Home Page" description="Node React E-commerce App">
        <Container>
          {JSON.stringify(productByArrival)}
          <hr/>
          {JSON.stringify(productBySell)}
        </Container>
      </Layout>
    )
};
export default Homepage
