import React from 'react'
import WindowTable from '../../../../../components/Main/WindowTable'
import {filterObject} from '../../../../../helpers/ObjectArray'
import styled from "styled-components";

const TableComponent = React.memo(({
  rowsCells,
  loadContent,
  search,
  setSelected,
  selected,
  handleCellClick,
}) => {

  const headCells = [
    { id: 'text', label: 'Descrição', type:'paragraph',minWidth:280,flex:9},
    { id: 'rec', label: 'Medida de Controle', minWidth: 200, type:'status',align:'center',flex:2},
    { id: 'padrao', label: 'Padrão', minWidth: 90, type:'status',align:'center',flex:1},
    { id: 'status', label: 'Status', minWidth: 90, type:'status',align:'center',flex:1}
  ];
  const searchParams = ['text']

  const filterRowCells = []
  rowsCells.map((row)=>{
    if(searchParams[0] && filterObject(row,search,searchParams[0])) filterRowCells.push({...row})
  })
  console.log('table.js');

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
            initialOrder={'desc'}
            rowSize={60}
            //onCorrectData={onCorrectData}
          />
        </div>
      :null}
      </>
    )
});

export default TableComponent
