
import React, {useState, useEffect,useMemo} from 'react';
import {useNotification} from '../../../context/NotificationContext'
import {useLoaderScreen} from '../../../context/LoaderContext'
import { useAuth } from '../../../context/AuthContext'

import Carrousel from '../../Main/Carrousel/CarrouselFirst'
import Page from './comp'
import {onAddUserData} from './func'
import { onLogout } from '../NavSystem/func';

const initialData =[{data:'',name:'Nome',status:'',message:'',placeholder:'Nome',required:true},{data:'',name:'Sobrenome',status:'',message:'',placeholder:'Sobrenome',required:true},{data:'',name:'CPF',status:'',message:'',placeholder:'000.000.000-00',required:true}]
const engineryData = {data:'',name:'CREA',status:'OK',message:'',placeholder:'CREA'}
const doctorData = {data:'',name:'CRM',status:'OK',message:'',placeholder:'CRM'}
const nurseData = {data:'',name:'COREN',status:'OK',message:'',placeholder:'COREN'}

export default function InputUserData() {

    const [data, setData] = useState([...initialData]) 
    const [infoModal, setInfoModal] = useState({title:'Você tem certeza?',text:'Ao sair você irá pausar sua inscrição e poderá perder as informaçoes inseridas até o momento.'}) //para mandar pro modalFullScreen e dizer se ao fechar da um alerta
    const [position, setPosition] = useState(1)
    const [checked, setChecked] = useState(false);
  

    const {currentUser,setCurrentUser} = useAuth();
    const {setLoad} = useLoaderScreen();
    const notification = useNotification();

    useEffect(() => {
        if (currentUser && currentUser?.type) {
            const dt = [...initialData]
            if (currentUser.type === 'Engenheiro de Segurança') dt.push(engineryData)
            if (currentUser.type === 'Médico do Trabalho') dt.push(doctorData)
            if (currentUser.type === 'Enfermeiro do Trabalho') dt.push(nurseData)
            setData([...dt])
        } else {
            setData([...initialData])
        }
    }, [])

    function onAddData() {
        onAddUserData({data,currentUser,setCurrentUser,setLoad,notification})
    }

    return (
        <Page>
            <Carrousel position={position}>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',maxWidth:600,margin:'auto'}}>
                    <div style={{alignItems:'center',display:'flex',flexDirection:'column',margin:'0px 20px'}}>
                        <Page.Header/>
                        <Page.Input data={data} setData={setData}/> 
                        <Page.Continue data={data} setInfoModal={setInfoModal} notification={notification} setPosition={setPosition}/> 
                    </div>
                </div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',maxWidth:850,margin:'auto'}}>
                    <div style={{alignItems:'center',display:'flex',flexDirection:'column',margin:'0px 20px'}}>
                        <Page.Header second/>
                        <Page.Politics setChecked={setChecked} checked={checked} />
                        <Page.Continue checked={checked} second setPosition={setPosition} onAddData={onAddData} position={position}/> 
                    </div>
                </div>
            </Carrousel>
            <Page.IconClose notification={notification} setLoad={setLoad} infoModal={infoModal} onLogout={onLogout}/>
            {position > 1 ? 
                <Page.IconBack setPosition={setPosition} />
            : null }
        </Page>
    );
}

