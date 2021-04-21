import React, {useState,useEffect} from 'react'
import Table from '../../../components/Main/Table'
import {FilterComponent,LoadingContent} from '../../../components/Main/Table/comp'
import { Container,TableTabs } from './comp'
import Modal from './Modal'
import Header from '../../../components/Dashboard/Components/Blocks/Header'
import {useLoaderScreen} from '../../../context/LoaderContext'
import {useNotification} from '../../../context/NotificationContext'
import {useAuth} from '../../../context/AuthContext'
import { useParams } from 'react-router-dom';
import {useLoaderDashboard} from '../../../context/LoadDashContext'

function Companies() {

  const [data, setData] = useState({}) //risco atual
  const {setLoad} = useLoaderScreen();
  const { setLoaderDash } = useLoaderDashboard();
  const {currentUser} = useAuth()
  const notification = useNotification()

  let { itemId,tabId } = useParams();

  const tabsLabel = ['Principal', 'Fonte Geradora','Medidas de Controle', 'Recomendações',/* 'Meio de Propagação','Possiveis Danos A Saúde' */]

    console.log('tabId',tabId);
    console.log('itemId',itemId);
    return (
        <>
            <Header icons={'Risk'} path={'Fator de Risco'} title={'Fator de Risco'} video={true}/>
            <Container>
              <TableTabs
                data={data}
                tabsLabel={tabsLabel}
                notification={notification}
                currentUser={currentUser}
                itemId={itemId}
                setData={setData}
                tabId={tabId}
                setLoaderDash={setLoaderDash}
              />
            </Container>
            <div style={{height:200,width:1}}/>
        </>
    )
}

export default Companies
