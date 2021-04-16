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

const Divider = styled.div`
  height: 1px;
  display: flex;
  flex: 1;
  background-color:  ${({theme})=>theme.palette.type!=="dark"?lighten(theme.palette.background.line,0):darken(theme.palette.background.line,0)};
  margin: 15px 10px 15px 0;
`;


export function JumpQuestions({
  position,
  data,
  index,
  dataChecklist,
}) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const theme = React.useContext(ThemeContext)

  const categoryIndex = dataChecklist.data.findIndex(i=>i.id==position[1].id)
  const category = dataChecklist.data[categoryIndex]
  const questionIndex = category.questions.findIndex(i=>i.id==data.questionId)
  const _data = dataChecklist.data[categoryIndex].questions[questionIndex].action[data.action]

  const jumpQuestion =  _data?.jump && _data.jump?.q ? _data.jump.q : []
  const jumpGroup =  _data?.jump && _data.jump?.g ? _data.jump.g : []

//[...suggestion().filter(i=>data.rec.includes(i.id))]
  return (
    <>
      <Label style={{marginBottom:10}} text={`${_data?.text ? _data.text : ''} - Pular Grupos e Perguntas`} infoText={`Todas as perguntas relacionadas ao grupo selecionado serão automaticamente dadas como finalizadas, não precisando ser respondidas pelo condutor do checklist`}/>
      <Droppable isDropDisabled={data?.disable} droppableId={`jump/${data.action}/${index}`}>
      {(provided,snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps} style={{overflowY:'auto',minHeight:'94%'}}>
          <AddedRiskContainer
            isDraggingOver={snapshot.isDraggingOver}
            draggingOverWith={['jumpGroup','jumpQuestion'].includes(snapshot.draggingOverWith&&snapshot.draggingOverWith.split('/')[0]) ? 'ok':'not'}
            draggingOverWithSameColumn={snapshot.draggingOverWith&&snapshot.draggingOverWith.split('/')[2] == index ? 'same':'different'}
            //draggingOverWithSameRisk={snapshot.draggingOverWith&& data.data.findIndex(i=>i.risk==snapshot.draggingOverWith.split('/')[1]) != -1 ? 'exist':'different'}
            style={{paddingLeft: '10px'}}
          >
            {Array.isArray(jumpQuestion) && jumpQuestion.length > 0 ||Array.isArray(jumpGroup) && jumpGroup.length > 0 ?
              <>
                <>
                  {Array.isArray(jumpGroup) && jumpGroup.length >0 && jumpGroup.map((item,indexItem)=>{
                    const groupsIndex = category.groups.findIndex(i=>i==item)
                    const groups = category.groups[groupsIndex]
                    return (
                        <CardDrop
                          title={groups}
                          key={`${groups}/${indexItem}`}
                          item={groups}
                          index={indexItem}
                          draggableId={`jumpGroup/${groups}/${index}`}
                          onClick={()=>{}}
                          fixedHeight
                        />
                    )
                  })}
                </>
                {!snapshot.isDraggingOver && Array.isArray(jumpQuestion) && jumpQuestion.length > 0 && Array.isArray(jumpGroup) && jumpGroup.length > 0 &&
                  <Divider />
                }
                <>
                  {Array.isArray(jumpQuestion) && jumpQuestion.length >0 && jumpQuestion.map((item,indexItem)=>{
                    const questionIndex = category.questions.findIndex(i=>i.id==item)
                    const question = category.questions[questionIndex]
                    return (
                        <CardDrop
                          title={question.text}
                          key={question?.id ?? indexItem}
                          item={question}
                          index={indexItem}
                          draggableId={`jumpQuestion/${question.id}/${index}`}
                          onClick={()=>{}}
                        />
                    )
                  })}
                </>
              </>
            :
              <EmptyField
                isDraggingOver={snapshot.isDraggingOver}
                draggingOverWith={['jumpGroup','jumpQuestion'].includes(snapshot.draggingOverWith&&snapshot.draggingOverWith.split('/')[0]) ? 'ok':'not'}
                hover={'move'}
                style={{marginLeft:0,padding:'20px 20px',height:'400px'}}
                onClick={()=>{}}
              >
                <p style={{textAlign:'center'}}>{`Arraste aqui os grupos e/ou perguntas que deseja pular.`}</p>
              </EmptyField>
            }
          </AddedRiskContainer>
          {provided.placeholder}
        </div>
      )}
      </Droppable>
     {/*  <Label style={{marginBottom:10,marginTop:20}} text={`Pular Perguntas Específicas`} infoText={`As perguntas selecionadas serão automaticamente dadas como finalizadas, não precisando ser respondidas pelo condutor do checklist`}/>
      <Droppable droppableId={`${positionType}Sug/${data.id}/${index}`}>
      {(provided,snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps} style={{overflowY:'auto',minHeight:'220px',maxHeight:positionType in data && Array.isArray(data[positionType]) && data[positionType].length < 3?'56%':'42%'}}>
          <AddedRiskContainer
            isDraggingOver={snapshot.isDraggingOver}
            draggingOverWith={snapshot.draggingOverWith&&snapshot.draggingOverWith.split('/')[0] == positionType ? 'ok':'not'}
            draggingOverWithSameColumn={snapshot.draggingOverWith&&snapshot.draggingOverWith.split('/')[2] == index ? 'same':'different'}
            //draggingOverWithSameRisk={snapshot.draggingOverWith&& data.data.findIndex(i=>i.risk==snapshot.draggingOverWith.split('/')[1]) != -1 ? 'exist':'different'}
            style={{paddingLeft: '10px'}}
          >
            {`${positionType}Sug` in data && Array.isArray(data[positionType]) && data[`${positionType}Sug`].length > 0 ?
              data[`${positionType}Sug`].map((item,indexItem)=>{
                const recIndex = suggestion().findIndex(i=>i.id==item)
                const question = suggestion()[recIndex]
                return (
                  <CardDrop
                    title={question.text}
                    key={question?.id ?? indexItem}
                    item={question}
                    index={indexItem}
                    draggableId={`${positionType}/${question.id}/${index}`}
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
                <p style={{textAlign:'center'}}>{`Arraste aqui as perguntas que deseja pular.`}</p>
              </EmptyField>
            }
          </AddedRiskContainer>
          {provided.placeholder}
        </div>
      )}
      </Droppable> */}
   </>
  );
}



