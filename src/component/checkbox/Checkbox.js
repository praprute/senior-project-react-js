import React,{ useState, useEffect } from 'react'
import {MDBRow, MDBCol, MDBBtn,MDBContainer,MDBListGroupItem } from 'mdbreact';

const Checkbox = ({categories, handleFillters}) => {

    const [checked, setChecked] = useState([])

    const handleToggle = c => () => {
         // return first index or -1
        const currentCategoryId = checked.indexOf(c) 
        const newCheckedCategoryId = [...checked]

        if(currentCategoryId === -1){
            newCheckedCategoryId.push(c)
        }else{
            newCheckedCategoryId.splice(currentCategoryId,1)
        }
        //  console.log(newCheckedCategoryId)
        setChecked(newCheckedCategoryId)
        handleFillters(newCheckedCategoryId)
    }

    return categories.map((c, i) => (

        <li key={i} className="list-unstyled">
            <input onChange={handleToggle(c._id)}
             value={checked.indexOf(c._id === -1)}
             type="checkbox" 
             className="form-check-input" />
            <label className="form-check-label">{c.name}</label>
        </li>

    ))
}

export default Checkbox;