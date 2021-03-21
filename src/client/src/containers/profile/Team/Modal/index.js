import React, {useState, useEffect,useMemo} from 'react';
import AddModal from './comp'
import LinearProgress from '@material-ui/core/LinearProgress';
import {userTypes,headCells,rows} from '../../../../constants/userTypes'
import {useNotification} from '../../../../context/NotificationContext'
import {useLoaderScreen} from '../../../../context/LoaderContext'
import { useAuth } from '../../../../context/AuthContext'
import {ModalInfo} from '../../../../components/Main/Modal/ModalInfo'
import Carrousel from '../../../../components/Main/Carrousel/CarrouselFirst'
import {onCreatePendingUser,onCheckUser} from './func'

export default function Modal({open,setOpen,setUsersRows}) {

    const [numInput, setNumInput] = useState(3) //numeros de inputs
    const [emails, setEmails] = useState([{email:'',status:'',message:'',type:''}]) //dados dos email inseridos nos inputs
    const [infoModal, setInfoModal] = useState({title:'',text:''}) //para mandar pro modalFullScreen e dizer se ao fechar da um alerta
    const [position, setPosition] = useState(1) //posicao do carrousel
    

    const {currentUser} = useAuth();
    const {setLoad} = useLoaderScreen();
    const notification = useNotification();

    function onClose(allGood) {
        setOpen(false)
        setNumInput(3)
        setEmails([{email:'',status:'',message:'',type:''}])
        setInfoModal({title:'',text:''})
        setPosition(1)
        if (allGood) setTimeout(() => {notification.success({message:allGood})}, 1000);
    }

    function onGoBack() {
        setInfoModal({title:'',text:''})
        setPosition(position=>position-1)
    }

    function onSendRequest() {
        setLoad(true)
        onCreatePendingUser({dataToTreat:noRepeatEmails,currentUser,notification,setLoad,onClose,setUsersRows})
    }
    
    const filteredEmails = emails.filter(i =>i?.status && i.status==='Check')
    const noRepeatEmails = filteredEmails.filter((item,index)=>filteredEmails.findIndex((i)=>i?.email && item?.email && i.email===item.email) === index)

    return (
            <AddModal open={open} onClose={onClose} infoModal={infoModal} arrow={position >= 2 ? true : false} onGoBack={onGoBack}>
                <Carrousel position={position}>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center',maxWidth:550,margin:'auto'}}>
                        <div style={{alignItems:'center',display:'flex',flexDirection:'column',margin:'0px 20px'}}>
                            <AddModal.Header/>
                            <AddModal.EmailInput setEmails={setEmails} emails={emails} numInput={numInput} setNumInput={setNumInput} notification={notification} onCheckUser={onCheckUser} companyId={currentUser.company.id}/>
                            <AddModal.Continue disable={!emails.find(i=>i && i?.status && i.status==='Check')} setInfoModal={setInfoModal} notification={notification} setPosition={setPosition}/> 
                        </div>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center',maxWidth:550,margin:'auto'}}>
                        <div style={{alignItems:'center',display:'flex',flexDirection:'column',margin:'0px 20px'}}>
                            <AddModal.Header second/>
                            <AddModal.Type noRepeatEmails={noRepeatEmails} emails={emails} setEmails={setEmails} userTypes={userTypes}/>
                            <AddModal.Continue onSendRequest={onSendRequest} second disable={!(noRepeatEmails.findIndex(i=>i.type==='') === -1)} setInfoModal={setInfoModal} setPosition={setPosition}/> 
                        </div>
                    </div>
                </Carrousel>
            </AddModal>
    );
}
