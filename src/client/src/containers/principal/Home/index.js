import React, { Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import {useNotification} from '../../../context/NotificationContext'
import {useLoaderDashboard} from '../../../context/LoadDashContext'
//undraw_mobile_testing_reah
import { ReactComponent as Logo } from './undraw_mobile_testing_reah.svg';
export default function Home() {

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',flex:1,height:'93%'}}>
      <Logo  height="400px" width="400px"/>
    </div>
  );
}

