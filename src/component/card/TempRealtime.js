import React, { Component, useState, useEffect } from 'react'
import { isAuthenticated } from '../../auth/index'
import {API} from './../../config'
import { readSensorRealTime } from '../../page/admin/apiAdmin'

const RealtimeTemp = props => {

    const { user, token } = isAuthenticated();
    const [Tdata, setData] = useState({});

    const idpro = {
        id:props.productId
    }

    useEffect(() => {
        tempProduct()
    },[])

    const tempProduct = () => {
        readSensorRealTime(token,props.productId)
            .then(data => {
                if(data.error){
                    console.log(data.error)
                }else{
                    console.log(data[0])
                    if(data[0] == undefined){
                        setData(null)
                    }else{
                        setData(parseFloat(data[0].temp.$numberDecimal))
                    }
                    // if(data[0].temp.$numberDecimal == null){
                    //     setData(parseFloat(data[0].temp.$numberDecimal))
                    // }else{
                    //     setData(0)
                    // }
                    

                }
        })
    }
    return(
        <div>
            <p>{JSON.stringify(Tdata)} &#x2103;</p>
        </div>
    )
}
export default RealtimeTemp