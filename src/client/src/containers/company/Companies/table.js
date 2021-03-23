import React from 'react'
import Table from '../../../components/Main/Table'

function TableCompany({dataRows,loadContent,search,setSelected,selected}) {

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
          setSelected={setSelected}
          selected={selected}
          search={search}
          headCells={headCells}
          serachParams={serachParams}
          orderCells={orderCells}
          >
      </Table>
    )
}

export default TableCompany
