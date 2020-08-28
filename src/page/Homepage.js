import React,{ Component, useState, useEffect } from 'react';
import Navbar from './../component/navbar/nav'
import Footer from './../component/footer/Footer'
import {Container} from 'react-bootstrap'
import Layout from '../component/Layout'
import { API } from './../config'
import { getProduct } from './apiComponent/apiComponent' 
import Card from './../component/card/Card'
import Search from '../component/search/Search'
import {MDBRow, MDBCol, MDBContainer } from 'mdbreact';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './home.css'

const Homepage = props => {

    const [productBySell, setProductBySell] = useState([])  
    const [productByArrival, setProductByArrival] = useState([])  
    const [error, setError] = useState(false)
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4
    }

    const loadProductBySell = () => {
      getProduct('sold').then(data => {
        if(data.error){
          setError(data.error)
        }else{
          setProductBySell(data)
          console.log(data[1])
        }
      })
    }

    const loadProductByArrival = () => {
      getProduct('createdAt').then(data => {
        if(data.error){
          setError(data.error)
        }else{
          setProductByArrival(data)
          console.log(data[1])
        }
      })
    }

    useEffect(() => {
      loadProductByArrival()
      loadProductBySell()
    }, [])

    return(
      <Layout 
      title="Orgánicos" 
      description="ผลิตภัณฑ์ทางการเกษตรปลอดสารพิษอยู่ตรงหน้าคุณเเล้ว"
      className=""
      >
      <div className="container-fluid">
        <Container>
          <br/>
          <div className="row">
          <MDBCol md="3" className="mb-5 mt-3">
          <div className="iconbar-homepage">
            <div className="iconbar-rad" >
            <img src={require('./../img/truck.png')} />
            <br/>
            บริการขนส่งสินค้า
            </div>
          </div>
          </MDBCol>
          <MDBCol md="3" className="mb-5 mt-3">
          <div className="iconbar-homepage">
          <div className="iconbar-rad1" >
            <img src={require('./../img/vegetable.png')} />
            <br/>
            สดและสะอาด
            </div>
          </div>
          </MDBCol>
          <MDBCol md="3" className="mb-5 mt-3">
          <div className="iconbar-homepage">
          <div className="iconbar-rad2" >
            <img src={require('./../img/award.png')} />
            <br/>
            รับรองคุณภาพ
            </div>  
          </div>
          </MDBCol>
          <MDBCol md="3" className="mb-5 mt-3">
          <div className="iconbar-homepage">
          <div className="iconbar-rad3" > 
            <img src={require('./../img/support.png')} />
            <br/>
            ช่วยเหลือ
            </div>  
          </div>
          </MDBCol>
          </div>
        </Container>
        
      {/* <MDBRow>
      <div className="new-arrivals">
        <div className="container">
          <Container className="text-new-arrivals">
            <p className="p-green">Best Sellers</p>
            <h2 className="h2-newarrival">OUR PRODUCTS</h2>
            <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
          </Container>
          <div className="row">

          </div>
        </div>
      </div>
      </MDBRow> */}
      <MDBContainer>

        <MDBRow>
        <h2 className='mb-4'>New Arrivals</h2>
        </MDBRow>
        <MDBRow>
          {productByArrival.map((product, i) => 
          (
          <MDBCol key={i} md="3" className="mb-4">
            <Card product={product}/>
          </MDBCol>
          ))}
        </MDBRow>
        </MDBContainer>
        <MDBRow>
        <div className="section-promote" >
          <div className="img-promote">
            <div className="container">
              <div class="row justify-content-end">
                <div class="col-md-6 heading-section ftco-animate deal-of-the-day ftco-animate">
          	    <span class="subheading">Best Price For You</span>
                  <h2 class="mb-4">Deal of the day</h2>
                  <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia</p>
                  <h3><a href="#">Spinach</a></h3>
                  <span class="price">$10 <a href="#">now $5 only</a></span>
                  <div id="timer" class="d-flex mt-5">
						        <div class="time" id="days"></div>
						        <div class="time pl-3" id="hours"></div>
						        <div class="time pl-3" id="minutes"></div>
						        <div class="time pl-3" id="seconds"></div>
						      </div>
                </div>
              </div>   
            </div>
          </div>
        </div>
        </MDBRow>
        <MDBContainer>
          <br/>
        <MDBRow>
          <h2 className='mb-4'>Best Sellers</h2>
        </MDBRow>

        <MDBRow>
          
          {productBySell.map((product, i) => 
          (
          <MDBCol md="3" className="mb-4">
          <Card key={i} product={product}/>
          </MDBCol>
          ))}

        </MDBRow>
        </MDBContainer>
         
      </div>
      </Layout>
    )
};
export default Homepage
