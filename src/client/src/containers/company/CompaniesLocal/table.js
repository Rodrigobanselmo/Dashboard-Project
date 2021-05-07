import React from 'react'
import WindowTable from '../../../components/Main/WindowTable'
import {filterObject} from '../../../helpers/ObjectArray'
import styled from "styled-components";

const TableComponent = React.memo(({rowsCells,loadContent,search,setSelected,selected,handleCellClick}) => {

  const headCells = [
    { id: 'name', label: 'Estabelecimento',minWidth:220,flex:10},
    { id: 'city', label: 'Cidade',minWidth:220,flex:4},
    { id: 'status', align:'center', label: 'Status',minWidth:100,flex:1, type:'status'},
  ];

  const searchParams = ['name','status']

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
          />
        </div>
      :null}
      </>
    )
});

export default TableComponent
