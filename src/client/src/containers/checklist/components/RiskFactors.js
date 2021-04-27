import React, {useState,useRef} from 'react';
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
import {NoCard,InputTitle,AddCircle,ErrorMessage,EmptyField,AddedRiskContainer} from '../styles';
import {ModalButtons} from '../../../components/Main/MuiHelpers/ModalButtons'
import { lighten,darken,fade } from "@material-ui/core/styles";
import {BootstrapTooltip} from '../../../components/Main/MuiHelpers/Tooltip'
import { Paper } from '@material-ui/core';
import {InputCard} from './InputCard';
import {Menu} from '../../../components/Main/MuiHelpers/Selected'
import {ContinueButton} from '../../../components/Main/MuiHelpers/Button'
import InputSearch from '../../../components/Dashboard/Components/Standard/Search';
import { useSelector } from 'react-redux'
import {RiskDrop} from './RiskDrop';
import { Droppable, Draggable,DragDropContext } from 'react-beautiful-dnd';


export function RiskFactors({
  position,
  data,
  index,
  searchRisk,
  onSearchRisk,
  dataChecklist,
}) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const theme = React.useContext(ThemeContext)
  const risk = useSelector(state => state.risk)
  const inputRef = useRef(null)

  const categoryIndex = dataChecklist.data.findIndex(i=>i.id==position[1].id)
  const questionIndex = dataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==data.questionId)
  const _data = dataChecklist.data[categoryIndex].questions[questionIndex].action[data.action]

  function onInputSearch(e) {
    const dados = {search:e.target.value}
    onSearchRisk('search',index,dados)
  }

  function onCleanSearch() {
    const dados = {search:''}
    onSearchRisk('search',index,dados)
  }

  function onFocus() {
    const dados = {}
    onSearchRisk('focus',index,dados)
  }

  function onClickRisk(riskData) {
    const dados = {riskId:riskData.id,riskName:riskData.name,riskType:riskData.type,questionId:data.questionId,answerId:data.action}
    inputRef.current.blur()
    onSearchRisk('edit',index,dados)
  }

  //console.log('_data.data',_data)

  return (
    <>
      <p className={'noBreakText'} style={{marginBottom:15,maxWidth:150}}>{`${_data?.text ? _data.text : ''} - Fatores de Risco`}</p>
      <InputSearch inputRef={inputRef} onFocus={onFocus} style={{margin:'0 10px',marginBottom: '20px'}} icons={Icons} onInputSearch={onInputSearch} search={searchRisk} onCleanSearch={onCleanSearch}/>
      <Droppable droppableId={`${data.type}/${_data.id}/${index}`}>
      {(provided,snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps} style={{overflowY:'auto',height:'87%'}}>
          <AddedRiskContainer
            isDraggingOver={snapshot.isDraggingOver}
            draggingOverWith={snapshot.draggingOverWith&&snapshot.draggingOverWith.split('/')[0] == 'risk' ? 'ok':'not'}
            draggingOverWithSameColumn={snapshot.draggingOverWith&&snapshot.draggingOverWith.split('/')[2] == index ? 'same':'different'}
            draggingOverWithSameRisk={snapshot.draggingOverWith&& _data?.data && _data.data.findIndex(i=>i.risk==snapshot.draggingOverWith.split('/')[1]) != -1 ? 'exist':'different'}
            style={{paddingLeft: '10px',minHeight:'350px'}}
          >
            {_data?.data && _data.data.length > 0 ?
                _data.data.map((item,indexItem)=>{
                const riskIndex = risk.findIndex(i=>i.id==item.risk)
                if (riskIndex != -1) {
                  const riskData = risk[riskIndex]
                  return (
                    <RiskDrop
                      title={riskData.name}
                      type={riskData.type}
                      key={riskData?.id ?? indexItem}
                      item={riskData}
                      index={indexItem}
                      indexColumn={index}
                      position={position && position[index+1] && position[index+1].id == riskData.id}
                      mandatory={item?.man}
                      onClick={()=>onClickRisk(riskData)}
                    />
                  )
                }
                return null
              })
            :
              <EmptyField
                isDraggingOver={snapshot.isDraggingOver}
                draggingOverWith={snapshot.draggingOverWith&&snapshot.draggingOverWith.split('/')[0] == 'risk' ? 'ok':'not'}
                hover={'move'}
                style={{marginLeft:0,padding:'20px 20px',height:'370px'}}
                onClick={()=>{}}
              >
                <p style={{textAlign:'center'}}>Arraste aqui os fatores de risco que deseja adicionar</p>
              </EmptyField>
            }
          </AddedRiskContainer>
          {provided.placeholder}
        </div>
      )}
      </Droppable>
   </>
  );
}



