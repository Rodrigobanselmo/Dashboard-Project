import React, { Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

import './App.css';

class App extends Component {
  state = {
    name: '12312',
    receiptId: 12312,
    price1: 123,
    price2: 123,
  }

  handleChange = ({ target: { value, name }}) => this.setState({ [name]: value })

  createAndDownloadPdf = () => {
    axios.post('http://localhost:3001/api/excel/create', this.state).then(() =>
      axios.get('http://localhost:3001/api/excel/fetch', { responseType: 'blob' })).then((res) => {
      const excelBlob = new Blob([res.data], { type: 'application/xlsx' });
      saveAs(excelBlob, 'newExcel.xlsx');
    }).catch((error)=>{
      console.log('error de:',error)
    })
  }

  render() {
    return (
      <div className="App">
        <input type="text" placeholder="Name" name="name" onChange={this.handleChange}/>
        <input type="number" placeholder="Receipt ID" name="receiptId" onChange={this.handleChange} />
        <input type="number" placeholder="Price 1" name="price1" onChange={this.handleChange} />
        <input type="number" placeholder="Price 2" name="price2" onChange={this.handleChange} />
        <button onClick={this.createAndDownloadPdf}>Download PDF</button>
      </div>
    );
  }
}

export default App;
