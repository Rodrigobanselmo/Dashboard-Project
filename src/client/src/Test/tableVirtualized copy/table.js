import React from 'react'
import Table from './TableCp'

function TableCompany({dataRows,loadContent,search,setSelected,selected,handleCellClick}) {

  const headCells = [
    { id: 'CNPJ', disablePadding: true, label: 'CNPJ' },
    { id: 'name', disablePadding: false, label: 'Identificação', minWidth: 200 },
    { id: 'responsavel', disablePadding: false, label: 'Responsável Legal' },
    { id: 'creation', disablePadding: false, label: 'Início/Fim' },
    { id: 'status', align:true, disablePadding: false, label: 'Status', minWidth: 100 },
  ];

  const searchParams = ['CNPJ','name','responsavel','status']

  const orderCells = {id:'CNPJ',order:[
    {name:'CNPJ'},
    {name:'name',width:200},
    {name:'responsavel'},
    {name:'creation',type:'start/end'/* ,width:195 */},
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
