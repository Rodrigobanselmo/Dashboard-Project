import React from 'react'
import WindowTable from '../../../components/Main/WindowTable'
import {filterObject} from '../../../helpers/ObjectArray'
import styled from "styled-components";

const TableComponent = React.memo(({rowsCells,loadContent,search,setSelected,selected,handleCellClick,routeInfo,filterTabs,filterButton}) => {

  const headCells = [ { id: 'name', label: 'Descrição', type:'paragraph',minWidth:280,flex:9},];
  const searchParams = ['name']

  if (routeInfo?.tableCol) routeInfo.tableCol.map(item=>{
    if (item === 'ins') {
      headCells.push({ id: 'ins',  label: 'Insalubridade (NR 15)', type:'double',align:'center', minWidth: 195,flex:4})
      searchParams.push('ins') //dado que vou filtrar consderando json do backend
    }
    if (item === 'per') {
      headCells.push({ id: 'per', label: 'Periculoso (NR 16)', minWidth: 180 ,align:'center',flex:4})
      searchParams.push('ins')
    }
    if (item === 'noc') {
      headCells.push({ id: 'noc', label: 'Previdência (D.3048)',minWidth: 170 ,align:'center',flex:4})
      searchParams.push('noc')
    }
    if (item === 'acgh') {
      headCells.push({ id: 'acgh', label: 'Normas Internacionais',minWidth: 170 ,align:'center',flex:4})
      searchParams.push('acgh')
    }
    if (item === 'type') {
      headCells.push({ id: 'type', label: 'Tipo',minWidth: 160 ,align:'center',flex:4})
      searchParams.push('type')
    }
    if (item === 'grau') {
      headCells.push({ id: 'grau', label: 'Insalubridade',minWidth: 160 ,align:'center',flex:3})
      searchParams.push('grau')
    }
    if (item === 'anexo') {
      headCells.push({ id: 'anexo', label: 'Anexo',type:'doubleFirstOnly',minWidth: 160 ,align:'center',flex:3})
      searchParams.push('ins')
    }
    if (item === 'leo') {
      headCells.push({ id: 'leo', label: 'L.E.O.',type:'doubleSecondOnly',tooltip:'Limite de Exposição Ocupacional',minWidth: 160 ,align:'center',flex:3})
      searchParams.push('ins')
    }
    if (item === 'tempoAE') {
      headCells.push({ id: 'tempoAE', label: 'Aposentadoria Especial',tooltip:'Tempo de exposção para aposentadoria especial',minWidth: 160 ,align:'center',flex:5})
      searchParams.push('tempoAE')
    }
    if (item === 'codeA4') {
      headCells.push({ id: 'codeA4', label: 'Cd. Anexo 4',tooltip:'Codigo Anexo 4',minWidth: 160 ,align:'center',flex:5})
      searchParams.push('codeA4')
    }
    if (item === 'limitePD') {
      headCells.push({ id: 'limitePD', label: 'Limite / Padrão',minWidth: 160 ,align:'center',flex:5})
      searchParams.push('limitePD')
    }
    if (item === 'group') {
      headCells.push({ id: 'group', label: 'Grupo',minWidth: 160 ,align:'center',flex:5})
      searchParams.push('group')
    }
  })

  function onCorrectData(columnId,itemData,item) {
    if (columnId==='type') {
      if (itemData ==='fis') return 'Físico'
      if (itemData ==='qui') return 'Químico'
      if (itemData ==='bio') return 'Biologico'
    }
    if (columnId==='leo') {
      const ItemToShow = item?.ins ? item.ins : item.leo
      if (typeof ItemToShow === 'string' && ItemToShow.slice(0,5).toLowerCase() !='anexo') return ItemToShow && typeof ItemToShow === 'string' ? ItemToShow.split('/')[0] : '- - -'
      return ItemToShow && typeof ItemToShow === 'string' && ItemToShow.split('/')[1] ? ItemToShow.split('/')[1] : '- - -';
    }
    if (columnId==='anexo') {
      const ItemToShow = item?.ins ? item.ins : item.leo
      if (typeof ItemToShow === 'string' && ItemToShow.slice(0,5).toLowerCase() =='anexo') return ItemToShow && typeof ItemToShow === 'string' ? ItemToShow.split('/')[0] : '- - -'
      return ('- - -')
    }
    return itemData
  }

  headCells.push(
    { id: 'padrao', label: 'Padrão', minWidth: 90, type:'status',align:'center',flex:2.5},
    // { id: 'status', label: 'Status', minWidth: 70, type:'status',align:'center',flex:1}
  )

  function filterByTabs(filterList) {
    if (filterTabs) {
      var filterRowCellsAgain = [...filterList];
      if (filterTabs === 'Insalubres (NR15)')  filterRowCellsAgain=filterRowCellsAgain.filter(i=>i['ins'])
      else if (filterTabs === 'Agentes Nocivos ( INSS )')  filterRowCellsAgain=filterRowCellsAgain.filter(i=>i['noc'])
      else if (filterTabs === 'Internacionais')  filterRowCellsAgain=filterRowCellsAgain.filter(i=>i['acgh'])
      else if (filterTabs === 'Físicos')  filterRowCellsAgain=filterRowCellsAgain.filter(i=>i.type=='fis')
      else if (filterTabs === 'Químicos')  filterRowCellsAgain=filterRowCellsAgain.filter(i=>i.type=='qui')
      else if (filterTabs === 'Biologicos')  filterRowCellsAgain=filterRowCellsAgain.filter(i=>i.type=='bio')
    }
    return filterRowCellsAgain
  }

  function filter(filterList) {
    if (search && search.length > 0) {
      var filterRowCellsAgain = [];

      filterList.map((row)=>{
        if(searchParams[0] && filterObject(row,search,searchParams[0])) filterRowCellsAgain.push({...row})
        else if (searchParams[1] && filterObject(row,search,searchParams[1])) filterRowCellsAgain.push({...row})
        else if (searchParams[2] && filterObject(row,search,searchParams[2])) filterRowCellsAgain.push({...row})
        else if (searchParams[3] && filterObject(row,search,searchParams[3])) filterRowCellsAgain.push({...row})
        else if (searchParams[4] && filterObject(row,search,searchParams[4])) filterRowCellsAgain.push({...row})
        else if (searchParams[5] && filterObject(row,search,searchParams[5])) filterRowCellsAgain.push({...row})
        else if (searchParams[6] && filterObject(row,search,searchParams[6])) filterRowCellsAgain.push({...row})
      })
      return filterRowCellsAgain
    }
    return filterList
  }

  function onFilterButton(filterList) {
    if (filterButton.column != '') {
      var filterRowCellsAgain = [];
      filterList.map((row)=>{
        if(filterObject(row,filterButton.filter,filterButton.column)) filterRowCellsAgain.push({...row})
      })
      return filterRowCellsAgain
    }
    return filterList
  }

  var filterRowCells = [];
  if (['ins','noc','amb','out'].includes(routeInfo.filterId)) filterRowCells = onFilterButton(filter(filterByTabs(rowsCells.filter(i=>i[routeInfo.filterId]))))
  if (['fis','qui','aci','bio','erg'].includes(routeInfo.filterId)) filterRowCells = onFilterButton(filter(filterByTabs(rowsCells.filter(i=>i.type==routeInfo.filterId))))

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
            onCorrectData={onCorrectData}
          />
        </div>
      :null}
      </>
    )
});

export default TableComponent
