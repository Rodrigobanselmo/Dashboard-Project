import React from 'react'
import WindowTable from '../../../components/Main/WindowTable'
import {filterObject} from '../../../helpers/ObjectArray'
import styled from "styled-components";

const TableComponent = React.memo(({rowsCells,loadContent,search,setSelected,selected,handleCellClick}) => {

   const headCells = [
    { id: 'atv', label: 'Atividades', type:'paragraph',minWidth:260,flex:7},
    { id: 'area',  label: 'Área de Risco', type:'paragraph',minWidth:260,flex:7},
    { id: 'padrao', label: 'Padrão', minWidth: 90, type:'status',align:'center',flex:1.5},
  ];

  const searchParams = ['atv','area']

  const filterRowCells = []
  rowsCells.map((row)=>{
    if(searchParams[0] && filterObject(row,search,searchParams[0])) filterRowCells.push({...row})
    else if (searchParams[1] && filterObject(row,search,searchParams[1])) filterRowCells.push({...row})
  })

    return (
      <>
      {!loadContent ?
        <div style={{marginBottom:20,paddingBottom:30,position:'relative'}}>
          <WindowTable
            headCells={headCells}
            rowsCells={filterRowCells}
            setSelected={setSelected}
            selected={selected}
            handleCellClick={handleCellClick}
            initialOrder={'name'}
            rowSize={60}
          />
        </div>
      :null}
      </>
    )
});

export default TableComponent
