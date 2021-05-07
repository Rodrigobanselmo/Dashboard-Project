import React, {useState, useEffect,useMemo} from 'react';
import {AddModal} from './comp'
import {onCreateNewRiskData,onDeleteRiskData,onEditRiskData} from './func'
import {SubText,DescText,TextArea,} from './styles'
import { useSelector,useDispatch } from 'react-redux'
import {EspecialSelector} from '../../../../../../components/Main/MuiHelpers/EspecialSelector'
import {filterObject} from '../../../../../../helpers/ObjectArray'
import {ContinueButton} from '../../../../../../components/Main/MuiHelpers/Button'
import {useNotification} from '../../../../../../context/NotificationContext'
import {useLoaderScreen} from '../../../../../../context/LoaderContext'
import {useAuth} from '../../../../../../context/AuthContext'

export default function Modal({open,setOpen}) {

    const [data1, setData1] = useState('')
    const {currentUser} = useAuth()
    const {setLoad} = useLoaderScreen();
    const notification = useNotification()
    const dispatch = useDispatch()

    function onClose(allGood) {
      setOpen(false)
      if (allGood) setTimeout(() => {notification.success({message:allGood})}, 1000);
    }

    const infoModal = {
      title:'Você tem certeza?',text:'Ao sair as informações inseridas serão perdidas.'
    }

    return (
            <AddModal open={open} onClose={onClose} infoModal={infoModal}>
              {open ?
              <div style={{display:'flex',minWidth:'100vw',flexDirection:'row',flexGrow:1,padding:'5% 8% 10% 8%',backgroundColor:'#aaa'}}>
                <div style={{display:'flex',width:'100%',justifyContent:'space-between',flexDirection:'column',flexGrow:100,backgroundColor:'#324432'}}>

                </div>
                <div style={{position:'relative',display:'flex',flexDirection:'column',width:'100%',flexGrow:100,backgroundColor:'#a3a3ff'}}>
                  <ContinueButton onClick={()=>{}} style={{position:'absolute',right:0,bottom:-80,width:110}} primary={'true'} size={'medium'} disable={`${false}`}>
                    <p>Salvar</p>
                  </ContinueButton>
                </div>
              </div>
              :null}
            </AddModal>
    );
}
