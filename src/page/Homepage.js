import React,{ Component, useState } from 'react';
import Navbar from './../component/navbar/nav'
import {Container} from 'react-bootstrap'
import Layout from '../component/Layout'
import { API } from './../config'

const Homepage = props => {
    return(
      <Layout title="Home Page" description="Node React E-commerce App">
        <Container>
          ...
          { API }
        </Container>
      </Layout>
    )
};
export default Homepage
