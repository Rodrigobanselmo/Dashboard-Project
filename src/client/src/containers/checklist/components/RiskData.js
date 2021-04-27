import React, {useState} from 'react';
import {Icons} from '../../../components/Icons/iconsDashboard';
import {
  ContainerDiv,
  ButtonContainer
} from '../styles';
import NewTabs, {TabPanel} from '../../../components/Main/MuiHelpers/NewTabs'
import {FilterComponent,LoadingContent,AddUserButton} from '../../../components/Main/Table/comp'
import {COMPANY} from '../../../routes/routesNames.ts'
import {onGetAllCompanies} from '../func'
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import styled, {css,ThemeContext} from "styled-components";
import {Card} from './Card';
import {NoCard,InputTitle,AddCircle,ErrorMessage,EmptyField,RiskFilter,AddedRiskContainer} from '../styles';
import {ModalButtons} from '../../../components/Main/MuiHelpers/ModalButtons'
import { lighten,darken,fade } from "@material-ui/core/styles";
import {BootstrapTooltip} from '../../../components/Main/MuiHelpers/Tooltip'
import { Paper } from '@material-ui/core';
import {InputCard} from './InputCard';
import {Menu} from '../../../components/Main/MuiHelpers/Selected'
import {ContinueButton} from '../../../components/Main/MuiHelpers/Button'
import InputSearch from '../../../components/Dashboard/Components/Standard/Search';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useSelector } from 'react-redux'
import {RiskDrop} from './RiskDrop';
import { Droppable, Draggable,DragDropContext } from 'react-beautiful-dnd';


const RISK_DATA = [{text:'Físicos',icon:'Fis'},{text:'Químicos',icon:'Qui'},{text:'Biologicos',icon:'Bio'},{text:'Acidentes',icon:'Aci'},{text:'Ergonomicos',icon:'Erg'}]

const sort = function (a, b) {
  if (a.name > b.name) {
      return 1;
  }
  if (b.name > a.name) {
      return -1;
  }
  return 0;
};


export function RiskData({
  position,
  data,
  index,
  searchRisk,
  loading,
  dataAll,
  dataChecklist,
}) {
  const [open, setOpen] = useState(false)
  const [filterSelected, setFilterSelected] = useState(['fis'])
  const theme = React.useContext(ThemeContext)
  const risk = useSelector(state => state.risk)

  const dataLast = dataAll[parseInt(index)-1]
  const categoryIndex = dataChecklist.data.findIndex(i=>i.id==position[1].id)
  const questionIndex = dataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==dataLast.questionId)
  const _data = dataChecklist.data[categoryIndex].questions[questionIndex].action[dataLast.action]

  function onFilterRisk(item) {
    if(filterSelected.includes(item.icon.toLocaleLowerCase())) {
      setFilterSelected([])
      return
    }
    setFilterSelected([item.icon.toLocaleLowerCase()])
  }

  function filter() {
    let normalized = searchRisk.toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "")

    let filterButtons = []
    if (filterSelected.length > 0) {
      let filterData = [];
      filterSelected.map((type)=>{
        risk.map((item)=>{
          if (item.type == type) filterData.push({...item})
        })
      })
      filterButtons.push(...filterData)
    } else {
      filterButtons = [...risk]
    }

    let filtered = [];
    if (searchRisk.length > 0) filtered = [...filterButtons].filter(i=>i.name.toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "").includes(normalized)).slice(0,30)
    else if (filterSelected.length > 0) {
      filtered = [...filterButtons].filter(i=>i.type!=='qui')
      filtered.push(...[...filterButtons].filter(i=>i.type==='qui').slice(0,10))
    }

    return filterSelected.length == 0 ?
      filtered.filter(i=>( !_data?.data||(_data?.data && _data.data.findIndex(item=>item.risk == i.id) == -1) )).sort(sort).slice(0,40)
      :
      filtered.filter(i=>!_data?.data||(_data?.data && _data.data.findIndex(item=>item.risk == i.id) == -1)).sort(sort).slice(0,40)
  }

  return (
    <>
    <p className={'noBreakText'} style={{marginBottom:15,maxWidth:150}}>{`Fatores de Risco`}</p>
    <div style={{padding:'0 10px',marginBottom:15,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
      {RISK_DATA.map((item,index)=>{
        return(
          <BootstrapTooltip key={index} placement="bottom" enterDelay={500} TransitionProps={{ timeout: {enter:500, exit: 50} }} title={item.text} styletooltip={{transform: 'translateY(2px)'}}>
            <RiskFilter onClick={()=>onFilterRisk(item)} disable={!filterSelected.includes(item.icon.toLocaleLowerCase())} type={item.icon.toLowerCase()} >
              <Icons style={{filter: theme.palette.type!=="dark"?`invert(${filterSelected.includes(item.icon.toLocaleLowerCase())?100:0}%)`:`invert(${filterSelected.includes(item.icon.toLocaleLowerCase())?100:60}%)`}} height='24px' width='24px' type={item.icon}/>
            </RiskFilter>
          </BootstrapTooltip>
        )
      })}
    </div>
    <Droppable droppableId={'risks'} isDropDisabled={data.disabled}>
    {(provided,snapshot) => (
      <AddedRiskContainer
        ref={provided.innerRef}
        {...provided.droppableProps}
        style={{overflowY:'auto',height:'83%'}}
        isDraggingOver={snapshot.isDraggingOver}
        draggingOverWith={snapshot.draggingOverWith&&snapshot.draggingOverWith.split('/')[0] == 'risk' ? 'delete':'not'}
        draggingOverWithSameColumn={snapshot.draggingOverWith&&snapshot.draggingOverWith.split('/')[2] == index ? 'same':'different'}
        >
        <div style={{paddingLeft:10}}>
          { loading=='risk' ?
              <LinearProgress style={{marginRight:20}}/>
            :
            (searchRisk.length > 0 || filterSelected.length > 0) && filter().length > 0 ?
            filter().map((item,indexItem)=>{
              return (
                <RiskDrop
                  title={item.name}
                  type={item.type}
                  key={item?.id ?? indexItem}
                  item={item}
                  index={indexItem}
                  indexColumn={index}
                />
              )
            })
            :
            searchRisk.length > 0 ?
              <EmptyField hover='none' style={{marginLeft:0,marginTop:0,padding:'20px 20px',height:80}} onClick={()=>{}}>
                <p style={{textAlign:'center'}}>Nenhum fator de risco encontrado</p>
              </EmptyField>
            :
            null
          }
        </div>
        {provided.placeholder}
      </AddedRiskContainer>
    )}
    </Droppable>
    </>
  );
}
//{id:v4(),name:`Risk ${Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1)}` ,type:types[Math.floor(Math.random())]},

