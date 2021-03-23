import React, {useState,useEffect} from 'react'
import Table from '../../../components/Main/Table'
import {FilterComponent,LoadingContent} from '../../../components/Main/Table/comp'
import {onGetAllCompanies} from './func'
import Container from './comp'
import Modal from './Modal'
import Header from '../../../components/Dashboard/Components/Blocks/Header'
import {useLoaderScreen} from '../../../context/LoaderContext'
import {useNotification} from '../../../context/NotificationContext'
import {useAuth} from '../../../context/AuthContext'
import { useLocation } from 'react-router-dom';

function Companies() {

  const [open, setOpen] = useState(false)
  const [queryOld, setQueryOld] = useState(false)
  const [dataRows, setDataRows] = useState([])
  const [selected, setSelected] = React.useState([]);

  const {setLoad} = useLoaderScreen();
  const {currentUser} = useAuth()
  const notification = useNotification()
  const query = new URLSearchParams(useLocation().search)

  useEffect(() => {
    if (query.get('m') !== queryOld && query.get('m')) setOpen(true); setQueryOld(query.get('m'))
  }, [query])


  const tabsLabel = ['Todas'/* , 'Contratantes', 'Laboratório' */]

    return (
        <>
            <Header icons={'Business'} title={'Gerenciar suas Empresas'} video={true}/>
            <Container style={{width:'100%',backgroundColor:'#1a1a1e',borderRadius:'15px'}}>
            <Container.TableTabs
                setDataRows={setDataRows}
                dataRows={dataRows}
                tabsLabel={tabsLabel}
                notification={notification}
                currentUser={currentUser}
                setOpen={setOpen}
                tabsLabel={tabsLabel}
                selected={selected}
                setSelected={setSelected}
              />
            </Container>
            <Modal setDataRows={setDataRows} open={open} setOpen={setOpen} currentUser={currentUser} notification={notification} setLoad={setLoad}/>
        </>
    )
}

export default Companies
