import React, {useState,useEffect} from 'react'
import {Container,TableContainer} from './comp'
import Header from '../../../components/Dashboard/Components/Blocks/Header'
import Modal from './Modal'
import {useLoaderScreen} from '../../../context/LoaderContext'
import {useLoaderDashboard} from '../../../context/LoadDashContext'
import {useNotification} from '../../../context/NotificationContext'
import {useAuth} from '../../../context/AuthContext'
import { useLocation,useParams } from 'react-router-dom';

function Risks() {

  const [open, setOpen] = useState(false)
  const [dataRows, setDataRows] = useState([])
  const [selected, setSelected] = useState([]);
  const [tabValue, setTabValue] = React.useState(0);

  const { loaderDash,setLoaderDash } = useLoaderDashboard();
  const {setLoad} = useLoaderScreen();
  const {currentUser} = useAuth()
  const notification = useNotification()
  // const { tabId } = useParams();

  const tabsLabel = ['Todas'/* , 'Contratantes', 'Laboratório' */]

    return (
        <>
            <Header icons={'Risk'} title={`Periculosidade`} subTitle={['Fatores de Risco','Periculosidade']} video={true}/>
            <Container style={{width:'100%',borderRadius:'15px'}}>
            <TableContainer
                // tabId={tabId}
                setDataRows={setDataRows}
                dataRows={dataRows}
                notification={notification}
                currentUser={currentUser}
                setOpen={setOpen}
                tabsLabel={tabsLabel}
                selected={selected}
                setSelected={setSelected}
                setLoad={setLoad}
                setLoaderDash={setLoaderDash}
                tabValue={tabValue}
                setTabValue={setTabValue}
              />
            </Container>
            <Modal setDataRows={setDataRows} open={open} setOpen={setOpen} currentUser={currentUser} notification={notification} setLoad={setLoad}/>
        </>
    )
}
export default Risks
