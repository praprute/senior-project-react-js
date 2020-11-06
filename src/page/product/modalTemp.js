import React, { Component, useEffect, useState } from 'react'
import { Modal, Button, Form} from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import { getSensor } from './../admin/apiAdmin'
import { isAuthenticated } from './../../auth/index'
import CanvasJSReact from './canvasjs.react'
import {Line} from 'react-chartjs-2'
import './modalStyle.css'

const ModalTemp = props => {

    var CanvasJS = CanvasJSReact.CanvasJS
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;

    const [chartData, setChartData ] = useState({});
    const { user, token } = isAuthenticated();
    const [fetchAPI, setFetchAPI] = useState(false);

    var modalId = props.productforsensorId

    const data = {
        labels:props.labelx,
        datasets:[{
            label:'Temp',
            data:props.dataTemp	,
            borderColor:['rgba(255,206,86,0.2)'],
            backgroundColor:['rgba(255,206,86,0.2)'],
            pointBankgroundColor:['rgba(255,206,86,0.2)'],
            pointBorderColor:['rgba(255,206,86,0.2)'],
        },{
            label:'Mouiser',
            data:props.dataMoise,
            borderColor:['rgba(54,162,235,0.2)'],
            backgroundColor:['rgba(54,162,235,0.2)'],
            pointBankgroundColor:['rgba(54,162,235,0.2)'],
            pointBorderColor:['rgba(54,162,235,0.2)'],
        }]
    }

    const options = {
        title:{
            display: true,
            text:'Temp and Mouiser'
        }
        // maintainAspectRatio: false
    }


    useEffect(() => {
    })

   
    return(
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
        >
        <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Temp and Mouiser
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/* <CanvasJSChart options = {options} 
				
			/> */}
            
            <div class="chartWrapper">
    <div class="chartAreaWrapper">
        <Line  id="myChart" height="50%" width="100%" data={data} options={{responsive:true}} />
    </div>
    {/* <Line  id="myChartAxis" height="300" width="0" data={data} options={{responsive:true}} /> */}
</div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
        </Modal>
    )
}

export default ModalTemp
