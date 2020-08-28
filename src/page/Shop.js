import React, { useState, useEffect } from 'react';
import Layout from './../component/Layout';
import Card from '../component/card/Card';
import {MDBRow, MDBCol, MDBBtn,MDBContainer,
    MDBCard,MDBListGroup,MDBListGroupItem } from 'mdbreact';
import { getCategories } from './admin/apiAdmin';
import { getFillteredProducts } from './apiComponent/apiComponent'
import Checkbox from './../component/checkbox/Checkbox';
import RadioBox from './../component/radiobox/Radiobox';
import { prices } from '../component/radiobox/FixedPrice';
import Search from '../component/search/Search'

const Shop = () => {

    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: []}
    })
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [limit, setLimit] = useState(8)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(0)
    const [filterResults, setFilterResults] = useState([])

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const loadFilteredResults = newFilters => {
        // console.log(newFilters);
        getFillteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilterResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    };

    const loadMore = () => {
        let toSkip = skip+limit
        getFillteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if(data.error){
                setError(data.error)
            }else{
                setFilterResults([...filterResults, ...data.data])
                setSize(data.size)
                setSkip(toSkip)
            }
        })
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">load more</button>
            )
        )
    }


    useEffect(() => {
        init()
        loadFilteredResults(skip, limit, myFilters.filters)
        console.log("effect")
    }, []);

    const handleFillters = (filters, filterBy) => {
        const newFilters = {...myFilters}
        newFilters.filters[filterBy] = filters

        if(filterBy == 'price'){
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues
        }
        loadFilteredResults(myFilters.filters)
        setMyFilters(newFilters)
    }

    const handlePrice = value =>  {
        const data = prices
        let array = []
        for(let key in data){
            if(data[key]._id === parseInt(value)){
                array = data[key].array
            }
        }
        return array;
    }


    return (
    <Layout 
      title="Orgánicos Shop" 
      description="ค้นหาและเลือกผลิตภัณฑ์ทางการเกษตรที่คุณต้องการ"
      className=""
    >
        <Search/>
        <MDBContainer>
        <MDBRow className="mb-5">
        </MDBRow>
        <MDBRow>
            <MDBCol md="3">
                <MDBCard className="mb-4">
                <h4 className="card-header">
                    หมวดหมู่
                </h4>
                <ul>
                <Checkbox categories={categories} 
                handleFillters={filters => handleFillters(filters, 'category')}/>
                </ul>
                </MDBCard>

                <MDBCard className="mb-4">
                <h4 className="card-header">
                    ราคา
                </h4>
                <div>
                <RadioBox prices={prices} 
                handleFillters={filters => 
                handleFillters(filters, 'price')}/>
                </div>
                </MDBCard>
            </MDBCol>
            <MDBCol md="8">
                {/* <MDBRow>
                    <h2 className="mb-4 ml-5">Product</h2>
                </MDBRow> */}
                <MDBRow>
                {filterResults.map((product, i) => (
                <MDBCol md="4" className="mb-4">
                <Card key={i} product={product}/>
                </MDBCol>
                ))}
                </MDBRow>
                {/* {JSON.stringify(filterResults)} */}
                <hr />
                <MDBRow>
                {loadMoreButton()}
                </MDBRow>

            </MDBCol>
        </MDBRow>
       
        </MDBContainer>
        
      </Layout>
    )
}

export default Shop;