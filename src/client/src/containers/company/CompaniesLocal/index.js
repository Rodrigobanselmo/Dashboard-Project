import React, {useState,useEffect} from 'react'
import Table from '../../../components/Main/Table'
import {FilterComponent,LoadingContent} from '../../../components/Main/Table/comp'
import Container from './comp'
import Modal from './Modal'
import Header from '../../../components/Dashboard/Components/Blocks/Header'
import {useLoaderScreen} from '../../../context/LoaderContext'
import {useNotification} from '../../../context/NotificationContext'
import {useAuth} from '../../../context/AuthContext'
import { useParams } from 'react-router-dom';
import {useLoaderDashboard} from '../../../context/LoadDashContext'

function Companies() {

  const {setLoad} = useLoaderScreen();
  const { setLoaderDash } = useLoaderDashboard();
  const {currentUser} = useAuth()
  const notification = useNotification()
  const [open, setOpen] = useState(false)

  let { cnpj,tabId } = useParams();
  const tabsLabel = ['Estabelecimentos','Informações Principais']

    return (
        <>
            <Header icons={'Business'} path={'Gerenciar suas Empresas / Editar'} title={'Editar Empresa'} video={true}/>
            <Container style={{width:'100%',backgroundColor:'#1a1a1e',borderRadius:'15px'}}>
              <Container.TableTabs
                tabsLabel={tabsLabel}
                setOpen={setOpen}
                notification={notification}
                currentUser={currentUser}
                cnpj={cnpj}
                tabId={tabId}
                setLoaderDash={setLoaderDash}
              />
            </Container>
            <div style={{height:200,width:1}}/>
        </>
    )
}

export default Companies
