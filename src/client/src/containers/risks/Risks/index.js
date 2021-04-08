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
  const [routeInfo, setRouteInfo] = useState(false)
  const [dataRows, setDataRows] = useState([])
  const [selected, setSelected] = useState([]);
  const [tabValue, setTabValue] = React.useState(0);

  const { loaderDash,setLoaderDash } = useLoaderDashboard();
  const {setLoad} = useLoaderScreen();
  const {currentUser} = useAuth()
  const notification = useNotification()
  const { risk,tabId } = useParams();

  useEffect(() => {

    var tabsLabel = []
    var tableCol = []
    var filterId = ''
    var riskGroupName = ''

    if (risk==='quimicos') {
      tableCol = ['all', 'ins','per', 'noc', 'acgh'] //aqu vao ser as colunas da tabela que podem gerar tabs se eu quiser
      filterId = 'qui'
      riskGroupName = 'Químicos'
    }
    else if (risk==='fisicos') {
      tableCol = ['all', 'ins','per', 'noc', 'acgh']
      filterId = 'fis'
      riskGroupName = 'Físicos'
    }
    else if (risk==='biologicos') {
      tableCol = ['all', 'ins','per', 'noc']
      filterId = 'bio'
      riskGroupName = 'Biologicos'
    }
    else if (risk==='acidentes') {
      tableCol = ['all','group']
      filterId = 'aci'
      riskGroupName = 'Acidentes'
    }
    else if (risk==='ergonomicos') {
      tableCol = ['all','group']
      filterId = 'erg'
      riskGroupName = 'Ergonomicos'
    }
    else if (risk==='insalubridade') {
      tableCol = ['all','type','leo','grau','anexo']
      filterId = 'ins'
      riskGroupName = 'Insalubres'
    }
    else if (risk==='nocivos') {
      tableCol = ['all', 'tempoAE','codeA4']
      filterId = 'noc'
      riskGroupName = 'Nocivos'
    }
    else if (risk==='ambientais') {
      tableCol = ['all', 'limitePD']
      filterId = 'amb'
      riskGroupName = 'Ambientais'
    }
    else if (risk==='outros') {
      tableCol = ['all']
      filterId = 'out'
      riskGroupName = 'Outros'
    }
    tableCol.map(item=>{
      if (item === 'all') tabsLabel.push('Todos')
      if (item === 'ins') tabsLabel.push('Insalubres (NR15)')
      if (item === 'noc') tabsLabel.push('Agentes Nocivos ( INSS )')
      if (item === 'acgh') tabsLabel.push('Internacionais')
    })

    if (filterId=='ins' || filterId=='noc') {
      tabsLabel.push('Físicos','Químicos','Biologicos')
    }
    if (loaderDash && dataRows.length > 0) setTimeout(() => { setLoaderDash(false) }, 500);
    setRouteInfo({tabsLabel,tableCol,filterId,riskGroupName})
    setTabValue(0)
  }, [risk])



    return (
        <>
            <Header icons={'Risk'} title={`Fatores de Risco - ${routeInfo.riskGroupName}`} subTitle={['Fatores de Risco',routeInfo.riskGroupName]} video={true}/>
            <Container style={{width:'100%',borderRadius:'15px'}}>
            <TableContainer
                risk={risk}
                tabId={tabId}
                setDataRows={setDataRows}
                dataRows={dataRows}
                notification={notification}
                currentUser={currentUser}
                setOpen={setOpen}
                tabsLabel={routeInfo.tabsLabel}
                selected={selected}
                setSelected={setSelected}
                setLoad={setLoad}
                setLoaderDash={setLoaderDash}
                routeInfo={routeInfo}
                tabValue={tabValue}
                setTabValue={setTabValue}
              />
            </Container>
            <Modal setDataRows={setDataRows} open={open} setOpen={setOpen} currentUser={currentUser} notification={notification} setLoad={setLoad}/>
        </>
    )
}
export default Risks
