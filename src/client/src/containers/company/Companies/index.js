import React, {useState,useEffect} from 'react'
import Table from '../../../components/Main/Table'
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
  const [loadContent, setLoadContent] = React.useState(true)

  const {setLoad} = useLoaderScreen();
  const {currentUser} = useAuth()
  const notification = useNotification()
  const query = new URLSearchParams(useLocation().search)

  useEffect(() => {
    if (query.get('m') !== queryOld && query.get('m')) setOpen(true); setQueryOld(query.get('m'))
  }, [query])

  React.useEffect(() => {
    onGetAllCompanies(currentUser.company.id,setDataRows,setLoadContent,notification)
  }, [])

  const headCells = [
    { id: 'CNPJ', disablePadding: true, label: 'CNPJ' },
    { id: 'name', disablePadding: false, label: 'Identificação' },
    { id: 'responsavel', disablePadding: false, label: 'Responsável Legal' },
    { id: 'creation', disablePadding: false, label: 'Início/Fim' },
    { id: 'status', align:true, disablePadding: false, label: 'Status' },
  ];

  const tabsLabel = ['Todas'/* , 'Contratantes', 'Laboratório' */]

  const serachParams = ['CNPJ','name','responsavel','status']

  const orderCells = {id:'CNPJ',order:[
    {name:'CNPJ'},
    {name:'name'},
    {name:'responsavel'},
    {name:'creation',type:'start/end'},
    {name:'status',type:'status'}
  ]}


    return (
        <>
            <Header icons={'Business'} title={'Gerenciar suas Empresas'} video={true}/>
            <Container style={{width:'100%',backgroundColor:'#1a1a1e',borderRadius:'15px'}}>
                <Table
                  setLoadContent={setLoadContent}
                  loadContent={loadContent}
                  dataRows={dataRows}
                  headCells={headCells}
                  tabsLabel={tabsLabel}
                  serachParams={serachParams}
                  orderCells={orderCells}
                >
                  <Container.AddUserButton onClick={()=>setOpen(true)}/>
                </Table>
            </Container>
            <Modal setDataRows={setDataRows} open={open} setOpen={setOpen} currentUser={currentUser} notification={notification} setLoad={setLoad}/>
        </>
    )
}

export default Companies
