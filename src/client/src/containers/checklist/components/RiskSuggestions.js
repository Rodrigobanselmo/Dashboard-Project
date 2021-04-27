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
import {NoCard,InputTitle,AddCircle,ErrorMessage,EmptyField,AddedRiskContainer} from '../styles';
import {ModalButtons} from '../../../components/Main/MuiHelpers/ModalButtons'
import { lighten,darken,fade } from "@material-ui/core/styles";
import {BootstrapTooltip} from '../../../components/Main/MuiHelpers/Tooltip'
import { Paper } from '@material-ui/core';
import {InputCard} from './InputCard';
import {Menu} from '../../../components/Main/MuiHelpers/Selected'
import {ContinueButton} from '../../../components/Main/MuiHelpers/Button'
import InputSearch from '../../../components/Dashboard/Components/Standard/Search';
import { Ascendent } from '../../../helpers/Sort';
import { useSelector } from 'react-redux'
import {CardDrop} from './CardDrop';
import { Droppable, Draggable,DragDropContext } from 'react-beautiful-dnd';
import {Label} from './label';

export function RiskSuggestions({
  position,
  data,
  index,
  dataChecklist,
}) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const theme = React.useContext(ThemeContext)
  const riskData = useSelector(state => state.riskData)

  const categoryIndex = dataChecklist.data.findIndex(i=>i.id == position[1].id)
  const questionIndex = dataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==data.questionId)
  const questionActionTypeIndex = dataChecklist.data[categoryIndex].questions[questionIndex].action[data.answerId].data.findIndex(i=>i.risk==data.riskId)
  const questionActionTypeRisk = dataChecklist.data[categoryIndex].questions[questionIndex].action[data.answerId].data[questionActionTypeIndex]


  const positionType =  position[index]?.id

  function suggestion() {
    if (positionType == `rec`) return riskData.rec
    if (positionType == `med`) return riskData.med
    if (positionType == `font`) return riskData.font
  }
  function columnTitle() {
    if (positionType == `rec`) return 'Recomendações'
    if (positionType == `med`) return 'Medidas de Controle'
    if (positionType == `font`) return 'Fontes Geradoras'
  }

//[...suggestion().filter(i=>data.rec.includes(i.id))]
  return (
    <>
      <Label style={{marginBottom:10}} text={`${columnTitle()} Padrão`} infoText={`As ${columnTitle()} irão ir automaticamente com o fator de risco quando selecionado.`}/>
      <Droppable droppableId={`${positionType}/${data.id}/${index}`}>
      {(provided,snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps} style={{overflowY:'auto',maxHeight:'42%'}}>
          <AddedRiskContainer
            isDraggingOver={snapshot.isDraggingOver}
            draggingOverWith={snapshot.draggingOverWith&&snapshot.draggingOverWith.split('/')[0] == positionType ? 'ok':'not'}
            draggingOverWithSameColumn={snapshot.draggingOverWith&&snapshot.draggingOverWith.split('/')[2] == index ? 'same':'different'}
            //draggingOverWithSameRisk={snapshot.draggingOverWith&& data.data.findIndex(i=>i.risk==snapshot.draggingOverWith.split('/')[1]) != -1 ? 'exist':'different'}
            style={{paddingLeft: '10px'}}
          >
            {positionType in questionActionTypeRisk && Array.isArray(questionActionTypeRisk[positionType]) && questionActionTypeRisk[positionType].filter(item=>suggestion().findIndex(i=>i.id==item) != -1).length > 0 ?
              questionActionTypeRisk[positionType].map((item,indexItem)=>{
                const recIndex = suggestion().findIndex(i=>i.id==item)
                const recData = suggestion()[recIndex]
                if (recIndex == -1) return
                return (
                  <CardDrop
                    title={recData?.text}
                    key={recData?.id ?? indexItem}
                    item={recData}
                    index={indexItem}
                    draggableId={`${positionType}/${recData.id}/${index}`}
                    onClick={()=>{}}
                  />
                )
              })
            :
              <EmptyField
                isDraggingOver={snapshot.isDraggingOver}
                draggingOverWith={snapshot.draggingOverWith&&snapshot.draggingOverWith.split('/')[0] == positionType ? 'ok':'not'}
                hover={'move'}
                style={{marginLeft:0,padding:'20px 20px',height:'200px'}}
                onClick={()=>{}}
              >
                <p style={{textAlign:'center'}}>{`Arraste aqui as ${columnTitle()} que deseja adicionar.`}</p>
              </EmptyField>
            }
          </AddedRiskContainer>
          {provided.placeholder}
        </div>
      )}
      </Droppable>
      <Label style={{marginBottom:10,marginTop:20}} text={`${columnTitle()} Opcinal`} infoText={`As ${columnTitle()} irão ser sugeridas de forma opcinal.`}/>
      <Droppable droppableId={`${positionType}Sug/${data.id}/${index}`}>
      {(provided,snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps} style={{overflowY:'auto',minHeight:'220px',maxHeight:positionType in questionActionTypeRisk && Array.isArray(questionActionTypeRisk[positionType]) && questionActionTypeRisk[positionType].filter(item=>suggestion().findIndex(i=>i.id==item) != -1).length < 3?'56%':'42%'}}>
          <AddedRiskContainer
            isDraggingOver={snapshot.isDraggingOver}
            draggingOverWith={snapshot.draggingOverWith&&snapshot.draggingOverWith.split('/')[0] == positionType ? 'ok':'not'}
            draggingOverWithSameColumn={snapshot.draggingOverWith&&snapshot.draggingOverWith.split('/')[2] == index ? 'same':'different'}
            //draggingOverWithSameRisk={snapshot.draggingOverWith&& data.data.findIndex(i=>i.risk==snapshot.draggingOverWith.split('/')[1]) != -1 ? 'exist':'different'}
            style={{paddingLeft: '10px'}}
          >
            {`${positionType}Sug` in questionActionTypeRisk && Array.isArray(questionActionTypeRisk[`${positionType}Sug`]) && questionActionTypeRisk[`${positionType}Sug`].filter(item=>suggestion().findIndex(i=>i.id==item) != -1).length > 0 ?
              questionActionTypeRisk[`${positionType}Sug`].map((item,indexItem)=>{
                const recIndex = suggestion().findIndex(i=>i.id==item)
                const recData = suggestion()[recIndex]
                if (recIndex == -1) return
                return (
                  <CardDrop
                    title={recData?.text}
                    key={recData?.id ?? indexItem}
                    item={recData}
                    index={indexItem}
                    draggableId={`${positionType}/${recData.id}/${index}`}
                    onClick={()=>{}}
                  />
                )
              })
            :
              <EmptyField
                isDraggingOver={snapshot.isDraggingOver}
                draggingOverWith={snapshot.draggingOverWith&&snapshot.draggingOverWith.split('/')[0] == positionType ? 'ok':'not'}
                hover={'move'}
                style={{marginLeft:0,padding:'20px 20px',height:'200px'}}
                onClick={()=>{}}
              >
                <p style={{textAlign:'center'}}>{`Arraste aqui as ${columnTitle()} que deseja adicionar.`}</p>
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



