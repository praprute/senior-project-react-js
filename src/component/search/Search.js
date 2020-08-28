import React, { useState, useEffect } from 'react';
// import Layout from './../component/Layout';
import Card from './../card/Card'
import { getProduct,list } from './../../page/apiComponent/apiComponent';
import { getCategories } from './../../page/admin/apiAdmin'
import { nav, MDBCard, MDBRow, MDBDropdown,MDBDropdownToggle,MDBDropdownMenu, MDBDropdownItem 
    ,MDBCol, MDBFormInline, MDBIcon, MDBNav, MDBNavItem ,MDBBtn,MDBInputGroup } from "mdbreact";



const Search = () => {

    const [data, setData] = useState({
        categories: [],
        category: "",
        search: "",
        results: [],
        searched: false
    });

    const { categories, category, search, results, searched } = data;

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setData({ ...data, categories: data });
            }
        });
    }

    useEffect(() => {
        loadCategories();
    }, []);

    const searchData = () => {
        if (search) {
            list({ search: search || undefined, category: category }).then(
                response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        setData({ ...data, results: response, searched: true });
                    }
                }
            );
        }
    }

    const searchSubmit = e => {
        e.preventDefault();
        searchData();
    };

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, searched: false });
    };

    const searchMessage =  (searched, results) => {
        if(searched && results.length > 0){
            return `พบ ${results.length} รายการ` 
        }
        if(searched && results.length < 1){
            return `ไม่พบรายการสินค้า` 
        }
    }

    const searchedProducts  = (results = []) => {
       return (
        <div>
            <div className="row">
            <h2>
                {searchMessage(searched, results)}
            </h2>
            </div>
            <div className="row">
            {results.map((product, i) => (
                <MDBCol md="3" className="mb-4">
                <Card  key={i} product={product}/>
                </MDBCol>
            ))}
            </div>
        </div>
       )
    }


    const searchForm = () => (

        <nav class="navbar navbar-dark success-color-dark">
            <div className="container">
            <form onSubmit={searchSubmit} class="form-inline my-2 my-lg-0 ml-auto">
              <input onChange={handleChange("search")} class="form-control" type="search" placeholder="Search" aria-label="Search"/>
              <MDBBtn className="badge-pill btn-outline-white btn-md my-2 my-sm-0 ml-3"  type="submit" color="success">Search</MDBBtn>
              {/* <button class="btn badge-pill btn-outline-white btn-md my-2 my-sm-0 ml-3" type="submit">Search */}
              {/* </button> */}
            </form>
            </div>
        </nav>
       
    
    )

    return (
        <div>
        <div className="">
            {searchForm()}
        </div>
        <br/>
        <div className="container mb-3">
            {searchedProducts(results)}
        </div>     
        </div> 
    )
}

export default Search;