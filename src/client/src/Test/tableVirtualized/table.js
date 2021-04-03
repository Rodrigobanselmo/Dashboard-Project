import React from 'react'
import WindowTable from './windowTable'
import {filterObject} from '../../helpers/ObjectArray'
import styled from "styled-components";

const Block = styled.div`
  position: absolute;
  bottom: 0px;
  right: 20px;
  height: 21px;
  width: 20px;
  background-color: ${props=>props.theme.palette.background.paper};
`;
const BlockLeft = styled.div`
  position: absolute;
  bottom: 0px;
  left: 20px;
  height: 21px;
  width: 20px;
  background-color: ${props=>props.theme.palette.background.paper};
`;

const TableComponent = React.memo(({rowsCells,loadContent,search,setSelected,selected,handleCellClick}) => {

  const headCells = [
    { id: 'CNPJ', label: 'CNPJ', minWidth: 220},
    { id: 'name',  label: 'Identificação', width: 220},
    { id: 'responsavel', label: 'Responsável Legal', width: 220 },
    { id: 'creation', label: 'Início/Fim',width: 170, type:'start/end' },
    { id: 'status', align:'center', label: 'Status', width: 110, type:'status'},
  ];

  const searchParams = ['CNPJ','name','responsavel','status']

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
        <div style={{height:filterRowCells.length > 7?'fit-content': filterRowCells.length*55+80,marginBottom:0,overflowY: 'hidden',paddingBottom:20,position:'relative'}}>
          <WindowTable
            headCells={headCells}
            rowsCells={filterRowCells}
            setSelected={setSelected}
            selected={selected}
            handleCellClick={handleCellClick}
            initialOrder={'name'}
          />
          <Block />
          <BlockLeft/>
        </div>
      :null}
      </>
    )
});

export default TableComponent
