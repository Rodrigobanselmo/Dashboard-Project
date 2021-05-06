import React, { useState } from 'react';
import {useNotification} from '../../../context/NotificationContext'
import {useLoaderDashboard} from '../../../context/LoadDashContext'
import {useLoaderScreen} from '../../../context/LoaderContext'
import { Container,TableTabs } from './comp'
import { onSetRisks } from './func'
import {useAuth} from '../../../context/AuthContext'
import Header from '../../../components/Dashboard/Components/Blocks/Header'
import * as XLSX from "xlsx";
import { useDispatch } from 'react-redux'

export default function Excel() {

  const [key, setKey] = useState('');
  const {setLoad} = useLoaderScreen();
  const {currentUser} = useAuth()
  const notification = useNotification()
  const { setLoaderDash } = useLoaderDashboard();
  const dispatch = useDispatch()


  React.useEffect(() => {
    setLoaderDash(false)
  }, [])


  const readExcel = (file,type) => {
    if (!file) return
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer"});

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];
        console.log(wb)
        //const data = XLSX.utils.sheet_to_json(ws, {raw: true,header:1});
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      if (type == 'per') {
        console.log(d)
      } else {
        onSetRisks(d,setLoad,currentUser,notification,dispatch)
      }
      setKey(Math.random().toString(36))
    }).catch((error)=>{
      notification.error({message:error})
      setKey(Math.random().toString(36))
    })
  };

  const dragOver = (e) => {
    e.preventDefault();
  }

  const dragEnter = (e) => {
      e.preventDefault();
  }

  const dragLeave = (e) => {
      e.preventDefault();
  }

  const fileDrop = (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length > 1) {
        console.log('Only one');
      } else if (files.length == 1 && files[0].type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        console.log('not accepted');
      } else if (files.length == 1 && files[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        console.log('ok',files[0]);
        readExcel(files[0])
      }
  }

  return (
  <>
    <Header icons={'Storage'} path={'Importação de Dados'} title={'Importação de Dados'} video={true}/>
    <Container>
      <TableTabs
        notification={notification}
        currentUser={currentUser}
        setLoaderDash={setLoaderDash}
        readExcel={readExcel}
        _key={key} //somente para reload/limpar input depois de baixar
      />
    </Container>
    <div style={{height:200,width:1}}/>
  </>
  );
}

  //   <div>
  //   <input
  //     type="file"
  //     accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  //     onChange={(e) => {
  //       const file = e.target.files[0];
  //       readExcel(file);
  //     }}
  //   />
  //   <div style={{width:400,height:200,border:'1px solid #000'}}
  //       onDragOver={dragOver}
  //       onDragEnter={dragEnter}
  //       onDragLeave={dragLeave}
  //       onDrop={fileDrop}
  //   >
  //     Drag
  //   </div>
  // </div>
