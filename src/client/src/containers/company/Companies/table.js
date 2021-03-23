import React, {useState,useEffect} from 'react'
import Table from '../../../components/Main/Table'
import {onGetAllCompanies} from './func'
import {useNotification} from '../../../context/NotificationContext'
import {useAuth} from '../../../context/AuthContext'

function TableCompany({setDataRows,dataRows,loadContent,setLoadContent,search}) {

  const {currentUser} = useAuth()
  const notification = useNotification()

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

  const serachParams = ['CNPJ','name','responsavel','status']

  const orderCells = {id:'CNPJ',order:[
    {name:'CNPJ'},
    {name:'name'},
    {name:'responsavel'},
    {name:'creation',type:'start/end'},
    {name:'status',type:'status'}
  ]}


    return (
      <Table
          loadContent={loadContent}
          dataRows={dataRows}
          search={search}
          headCells={headCells}
          serachParams={serachParams}
          orderCells={orderCells}
          >
      </Table>
    )
}

export default TableCompany
