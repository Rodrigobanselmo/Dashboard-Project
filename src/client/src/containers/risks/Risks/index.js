import React, {useState,useEffect} from 'react'
import Container from './comp'
import Header from '../../../components/Dashboard/Components/Blocks/Header'
import Modal from './Modal'
import {useLoaderScreen} from '../../../context/LoaderContext'
import {useLoaderDashboard} from '../../../context/LoadDashContext'
import {useNotification} from '../../../context/NotificationContext'
import {useAuth} from '../../../context/AuthContext'
import { useLocation } from 'react-router-dom';

function Risks() {

  const [open, setOpen] = useState(false)
  const [queryOld, setQueryOld] = useState(false)
  const [dataRows, setDataRows] = useState([])
  const [selected, setSelected] = useState([]);

  const { setLoaderDash } = useLoaderDashboard();
  const {setLoad} = useLoaderScreen();
  const {currentUser} = useAuth()
  const notification = useNotification()

  const tabsLabel = ['Todos', 'Insalubres (NR15)', 'Agentes Nocivos ( INSS )', 'Internacionais']

    return (
        <>
            <Header icons={'Risk'} title={'Fatores de Risco'} video={true}/>
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
                setLoad={setLoad}
                setLoaderDash={setLoaderDash}
              />
            </Container>
            <Modal setDataRows={setDataRows} open={open} setOpen={setOpen} currentUser={currentUser} notification={notification} setLoad={setLoad}/>
        </>
    )
}
export default Risks
