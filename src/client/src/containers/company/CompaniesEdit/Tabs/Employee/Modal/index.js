import React, {useState, useEffect,useMemo} from 'react';
import {AddModal} from './comp'
import {SubText,DescText,TextArea,} from './styles'
import { useSelector,useDispatch } from 'react-redux'
import {EspecialSelector} from '../../../../../../components/Main/MuiHelpers/EspecialSelector'
import {filterObject} from '../../../../../../helpers/ObjectArray'
import {ContinueButton} from '../../../../../../components/Main/MuiHelpers/Button'
import {useNotification} from '../../../../../../context/NotificationContext'
import {useLoaderScreen} from '../../../../../../context/LoaderContext'
import {useAuth} from '../../../../../../context/AuthContext'
import Carrousel from '../../../../../../components/Main/Carrousel/CarrouselFirst'
import {Organograma} from '../../Organograma'
import {onCreateEmployee} from './func'

export default function Modal({open,setOpen,setEmployee,companyInfo={},setData, data}) {

    const [data1, setData1] = useState('')
    const [position, setPosition] = useState(1)
    const [dataSelected, setDataSelected] = useState('')
    const {currentUser} = useAuth()
    const {setLoad} = useLoaderScreen();
    const [unform, setUnform] = useState({status:'Ativo',creation:(new Date()-1),end:null,...companyInfo}) //dados dos email inseridos nos inputs
    const notification = useNotification()
    const dispatch = useDispatch()

    function onClose(allGood) {
      setOpen(false)
      setPosition(1)
      setUnform({status:'Ativo',creation:(new Date()-1),end:null,...companyInfo})
      if (allGood) setTimeout(() => {notification.success({message:allGood})}, 1000);
    }

    function onGoBack() {
      setPosition(position=>position-1)
    }

    function onHandleCreateEmployee(setSave) {
      console.log(unform,dataSelected)
      onCreateEmployee({data:{...unform,...dataSelected},setEmployee,notification,setLoad,currentUser,onClose})
      setSave(true)
    }

    const infoModal = {
      title:'Você tem certeza?',text:'Ao sair as informações inseridas serão perdidas.'
    }

    return (
            <AddModal open={open} onClose={onClose} infoModal={infoModal} arrow={position >= 2 ? true : false} onGoBack={onGoBack}>
              {open ?
                <Carrousel sections={2} position={position}>
                  <div style={{display:'flex',flexDirection:'column',alignItems:'center',maxWidth:700,margin:'auto'}}>
                      <div style={{alignItems:'center',display:'flex',flexDirection:'column',margin:'0px 20px'}}>
                          <AddModal.Header />
                          <AddModal.LastInput setPosition={setPosition} notification={notification} currentUser={currentUser} setUnform={setUnform} unform={unform} />
                      </div>
                  </div>
                  <div id='randomId2' style={{margin:'auto',zIndex:1,height:'100vh',width:'100vw',overflowY:'scroll',overflowX:'visible', alignItems:'center',justifyContent:'center'}}>
                      <div style={{ maxWidth:1050/* ,backgroundColor:'red' */, alignItems:'start',display:'flex',flexDirection:'column',margin:'auto',padding:'30px 40px'}}>
                        {companyInfo.workplaceId && position == 2 &&
                          <Organograma
                            setDataSelected={setDataSelected}
                            randomId={'randomId2'}
                            modalType={'employee'}
                            onModalClick={onHandleCreateEmployee}
                            modalPosition={1}
                            widthContent={1000}
                            setData={setData}
                            data={data}
                            workplaceId={companyInfo.workplaceId}
                            cnpj={companyInfo.cnpj}
                            currentUser={currentUser}
                            notification={notification}
                          />
                        }
                      </div>
                  </div>
                </Carrousel>
              :null}
            </AddModal>
    );
}
