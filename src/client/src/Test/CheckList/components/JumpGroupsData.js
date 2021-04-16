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
import {NoCard,InputTitle,AddCircle,ErrorMessage,EmptyField,IconsBack,AddedRiskContainer} from '../styles';
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
import {CardDrop} from './CardDrop';
import { Droppable, Draggable,DragDropContext } from 'react-beautiful-dnd';
import useTimeOut from '../../../hooks/useTimeOut';
import { Ascendent,AscendentText } from '../../../helpers/Sort';
import {Label} from './label';

export function JumpGroupsData({
  position,
  setPosition,
  data,
  index,
  dataChecklistGroup,
  onJumpGroupsHandle,
  dataAll
}) {

  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [onTimeOut,onClearTime] = useTimeOut()

  React.useEffect(() => {
    return onClearTime()
  }, [])

  function onInputSearch(e) {
    setLoading(true)
    setSearch(e.target.value)
    onClearTime()
    onTimeOut(()=>{
      setLoading(false)
    },600)
  }

  function onQuestions(positionId) {
    onJumpGroupsHandle(index,positionId,{...data})
  }

  function filter() {
    let normalized = search.toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "")
    let filtered = [];

    if (search.length > 0) {
      filtered = [...dataChecklistGroup.questions].filter(i=>!i.mother && i.id !== data.questionId && i.text.toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "").includes(normalized)).slice(0,20)
      if (dataAll[index-1]?.jump && dataAll[index-1].jump?.q) filtered = filtered.filter(i=>!dataAll[index-1].jump.q.includes(i.id))
      //if (dataAll[index-1]?.jump && dataAll[index-1].jump?.g) filtered = filtered.filter(!dataAll[index-1].jump.g.includes(i.id))
    }
    return filtered.sort(AscendentText)
  }

  function filterGroup() {
    let filtered = [...dataChecklistGroup.groups]
    if (dataAll[index-1]?.jump && dataAll[index-1].jump?.g) filtered = filtered.filter(i=>!dataAll[index-1].jump.g.includes(i))
    return filtered
    // return filtered.sort(Ascendent)
  }

  return (
    <>
      <Label style={{marginBottom:10}} text={'Grupos'} infoText={'Arraste o card do grupo que deseja pular ou selecione ele para ver suas perguntas.'}/>
      <InputSearch style={{margin:'0 10px 15px 10px'}} icons={Icons} onInputSearch={onInputSearch} search={search} onCleanSearch={(e)=>setSearch('')}/>
      <Droppable droppableId={`jumpGroups`} isDropDisabled={data.disabled}>
      {(provided,snapshot) => (
        <AddedRiskContainer
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{overflowY:'auto',height:'94%'}}
          isDraggingOver={snapshot.isDraggingOver}
          draggingOverWith={snapshot.draggingOverWith&&snapshot.draggingOverWith.split('/')[0] == 'jump' ? 'delete':'not'}
          draggingOverWithSameColumn={snapshot.draggingOverWith&&snapshot.draggingOverWith.split('/')[2] == index ? 'same':'different'}
          >
          <div style={{paddingLeft:10}}>
            {search.length == 0 ?
              filterGroup().map((item,indexItem)=>{
                return (
                  <CardDrop
                    title={item}
                    key={item ?? indexItem}
                    item={item}
                    fixedHeight
                    index={indexItem}
                    draggableId={`jumpGroup/${item}/${index}`}
                    onClick={()=>onQuestions(item)}
                    position={position && position[index+1] && position[index+1]?.id && position[index+1].id == item}
                    //open={openModalEdit}
                    //setOpen={setOpenModalEdit}
                    //onClick={()=>onChecklistHandle(item?.id,item?.title)}
                  />
                )
              })
              :
                loading ?
                  <LinearProgress style={{marginRight:20}}/>
                :
                filter().length > 0 ?
                  filter().map((item,indexItem)=>{
                    return (
                      <CardDrop
                        title={item.text}
                        key={item?.id ?? indexItem}
                        item={item}
                        index={indexItem}
                        draggableId={`jumpQuestion/${item.id}/${index}`}
                        onClick={()=>{}}
                        //position={position && position[0] && position[0].id == item.id}
                        //open={openModalEdit}
                        //setOpen={setOpenModalEdit}
                        //onClick={()=>onChecklistHandle(item?.id,item?.title)}
                      />
                    )
                  })
                :
                search.length > 0 ?
                  <EmptyField hover='none' style={{marginLeft:0,marginTop:0,padding:'20px 20px',height:80}} onClick={()=>{}}>
                    <p style={{textAlign:'center'}}>Nenhum dado encontrado</p>
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

