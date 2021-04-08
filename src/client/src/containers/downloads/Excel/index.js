import React, { Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import {useNotification} from '../../../context/NotificationContext'
import {useLoaderDashboard} from '../../../context/LoadDashContext'

import './App.css';

const data = {
  name: '12312',
  receiptId: 12312,
  price1: 123,
  price2: 123,
}

export default function Excel() {

  const [state, setState] = React.useState(data)
  const { setLoaderDash } = useLoaderDashboard();

  React.useEffect(() => {
    setLoaderDash(false)
  }, [])

  const handleChange = ({ target: { value, name }}) => setState({ [name]: value })

  const createAndDownloadPdf = () => {
    axios.post('http://localhost:3001/api/excel/create', state).then(() =>
      axios.get('http://localhost:3001/api/excel/fetch', { responseType: 'blob' })).then((res) => {
      const excelBlob = new Blob([res.data], { type: 'application/xlsx' });
      saveAs(excelBlob, 'newExcel.xlsx');
    }).catch((error)=>{
      console.log('error de:',error)
    })
  }

  return (
    <div className="App">
      <input type="text" placeholder="Name" name="name" onChange={handleChange}/>
      <input type="number" placeholder="Receipt ID" name="receiptId" onChange={handleChange} />
      <input type="number" placeholder="Price 1" name="price1" onChange={handleChange} />
      <input type="number" placeholder="Price 2" name="price2" onChange={handleChange} />
      <button onClick={createAndDownloadPdf}>Download PDF</button>
    </div>
  );
}

