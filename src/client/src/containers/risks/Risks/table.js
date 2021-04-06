import React from 'react'
import WindowTable from '../../../components/Main/WindowTable'
import {filterObject} from '../../../helpers/ObjectArray'
import styled from "styled-components";

const TableComponent = React.memo(({rowsCells,loadContent,search,setSelected,selected,handleCellClick}) => {

  const headCells = [
    { id: 'desc', label: 'Descrição', type:'paragraph',minWidth:280,flex:9},
    { id: 'ins',  label: 'Insalubre (NR 15)', type:'double',align:'center', minWidth: 180,flex:4},
    { id: 'per', label: 'Periculoso (NR 16)', minWidth: 180 ,align:'center',flex:4},
    { id: 'inss', label: 'Previdência (D.3048)',minWidth: 170 ,align:'center',flex:4},
    { id: 'acgh', label: 'Normas Internacionais',minWidth: 170 ,align:'center',flex:4},
    { id: 'padrao', label: 'Padrão', minWidth: 70, type:'status',align:'center',flex:1},
    { id: 'status', label: 'Status', minWidth: 70, type:'status',align:'center',flex:1},
  ];

  const searchParams = ['desc']

  const filterRowCells = []
  rowsCells.map((row)=>{
    if(searchParams[0] && filterObject(row,search,searchParams[0])) filterRowCells.push({...row})
    else if (searchParams[1] && filterObject(row,search,searchParams[1])) filterRowCells.push({...row})
    else if (searchParams[2] && filterObject(row,search,searchParams[2])) filterRowCells.push({...row})
    else if (searchParams[3] && filterObject(row,search,searchParams[3])) filterRowCells.push({...row})
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
            initialOrder={'name'}
            rowSize={60}
          />
        </div>
      :null}
      </>
    )
});

export default TableComponent
