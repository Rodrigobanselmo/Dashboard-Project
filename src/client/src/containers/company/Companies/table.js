import React from 'react'
import Table from '../../../components/Main/Table'

function TableCompany({dataRows,loadContent,search,setSelected,selected,handleCellClick}) {

  const headCells = [
    { id: 'CNPJ', disablePadding: true, label: 'CNPJ' },
    { id: 'name', disablePadding: false, label: 'Identificação' },
    { id: 'responsavel', disablePadding: false, label: 'Responsável Legal' },
    { id: 'creation', disablePadding: false, label: 'Início/Fim' },
    { id: 'status', align:true, disablePadding: false, label: 'Status' },
  ];

  const searchParams = ['CNPJ','name','responsavel','status']

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
          searchParams={searchParams}
          orderCells={orderCells}
          handleCellClick={handleCellClick}
          styleCell={{padding:'10px 0'}}
          >
      </Table>
    )
}

export default TableCompany
