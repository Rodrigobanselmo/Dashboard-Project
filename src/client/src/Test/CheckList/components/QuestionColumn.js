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
import {NoCard,InputTitle,AddCircle,ErrorMessage,EmptyField,IconCircle,ChooseDivYesNoNA} from '../styles';
import {ModalButtons} from '../../../components/Main/MuiHelpers/ModalButtons'
import { lighten,darken,fade } from "@material-ui/core/styles";
import {BootstrapTooltip} from '../../../components/Main/MuiHelpers/Tooltip'
import { Paper } from '@material-ui/core';
import {InputCard} from './InputCard';
import {Menu} from '../../../components/Main/MuiHelpers/Selected'
import {ContinueButton} from '../../../components/Main/MuiHelpers/Button'
import { Droppable, Draggable,DragDropContext } from 'react-beautiful-dnd';
import clone from 'clone';

const selectOptions = ['Padrão','Multiplos','Personalizado']

function Choose({text,active,...props}) {
  return (
    <div style={{flexDirection:'column',display:'flex',alignItems:'center',width:'30%',cursor: 'pointer'}} {...props}>
      <p style={{margin:0,padding:0}}>{text}</p>
      <ChooseDivYesNoNA active={active}/>
    </div>
  );
}

function getOptions(question) {
  if (question.type == 'standard') {
    return ['SIM','NÃO','N.A.']
  } else {
    const questionsType = [];
    for (const key in question.action) {
      if (Object.hasOwnProperty.call(question.action, key)) {
        const element = question.action[key];
        questionsType.push(element.text)
      }
    }
    return questionsType;
  }
}

export function QuestionColumn({
  position,
  setPosition,
  data,
  index,
  onChangeQuestion:onGetRisks,
  setDataAll,
  dataAll,
  dataChecklist,
  setDataChecklist,
  setSave
}) {
  const categoryIndex = dataChecklist.data.findIndex(i=>i.id==position[1].id)
  const questionIndex = dataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==data.questionId)
  const question = dataChecklist.data[categoryIndex].questions[questionIndex]

  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState(getOptions(question))
  const [active, setActive] = useState(0)
  const theme = React.useContext(ThemeContext)

  function onBlurTextEditSave(title,setTitle,oldValue, setOldValue) {
    if (title == '') {
      setTitle(oldValue)
      return
    }

    setOldValue(title)
    let copyDataChecklist = {...dataChecklist}
    //copyDataChecklist = clone(copyDataChecklist)
    copyDataChecklist.data[categoryIndex].questions[questionIndex] = {...question,text:title}
    setDataChecklist({...copyDataChecklist})
    setSave(true)
    //onChangeQuestion('text',index,dados)
  }

  function onSuggestPhoto() {
    let copyDataChecklist = {...dataChecklist}
    copyDataChecklist.data[categoryIndex].questions[questionIndex] = {...question,photo:!question.photo}
    setDataChecklist({...copyDataChecklist})
    setSave(true)
    return
  }

  function onChangeQuestionType(value) {
    const type = value == 'Padrão' ? 'standard':value == 'Multiplos' ? 'mult' : 'pers'
    setPosition([...position.slice(0,index+1)]);

    let copyDataChecklist = {...dataChecklist}
    copyDataChecklist.data[categoryIndex].questions[questionIndex] = {...question,type}
    setDataChecklist({...copyDataChecklist})
  }

  function onChangeAnswerYesNoNA(indexes) {

    setActive(indexes)

    const dados = {
      id:`${question.id}-q_${indexes+1}`,
      q:options[indexes],
      action:`q_${indexes+1}`,
      title:`${options[indexes]}`
    }

    let newPosition = [...position]
    let copyData = [...dataAll]

    if (dataAll[index+1] && dataAll[index+1].type == 'risk') {
      let strings = newPosition[index+1].title.split('-')
      newPosition[index+1] = {id:dados.id,title:`${dados.title} - ${strings[strings.length-1]}`}
      copyData[index+1] = {...copyData[index+1],action:dados.action}
    } else if (dataAll[index+1] && dataAll[index+1].type == 'jump') {
      let strings = newPosition[index+1].title.split('-')
      newPosition[index+1] = {id:`${dados.id}-jump`,title:`${dados.title} - ${strings[strings.length-1]}`}
      copyData[index+1] = {...copyData[index+1],action:dados.action}
    }

    if (dataAll[index+2] &&  !['riskData','jumpGroup'].includes(dataAll[index+2].type)) {
      copyData = [...copyData.slice(0,index+2)]
      newPosition = [...newPosition.slice(0,index+2)];
    }

    if (dataAll[index+2] && dataAll[index+2].type == 'jumpGroup') {
      newPosition = [...newPosition.slice(0,index+3)];
      copyData = [...copyData.slice(0,index+3)]
    }

    setPosition([...newPosition]);
    setDataAll([...copyData])
    return
  }

  function onAddRiskFactor() {
    const dados = {
      id:`${question.id}-q_${active+1}`,
      action:`q_${active+1}`,
      title:`${options[active]} - Fatores de risco`,
    }

    setPosition([...position.slice(0,index+1),{id:dados.id,title:dados.title},{id:'search',title:'Pesquisa Fatores de Risco'}]);
    //onGetRisks() //if (risk.length == 0) onGetRisks({currentUser,notification,dispatch})
    setDataAll([...dataAll.slice(0,index+1),{id:dados.id,action:dados.action,questionId:question.id,type:'risk'},{type:'riskData',disabled:false}])
    return
  }

  function onAddJump() {
    const dados = {
      id:`${question.id}-q_${active+1}-jump`,
      action:`q_${active+1}`,
      title:`${options[active]} - Pular Perguntas`,
      questionId:question.id
    }

    setPosition([...position.slice(0,index+1),{id:dados.id,title:dados.title},{id:'jumpGroup',title:'Pesquisar Grupos'}]);
    //update data of columns
    setDataAll([...dataAll.slice(0,index+1),{id:dados.id,action:dados.action,questionId:dados.questionId,type:'jump'},{type:'jumpGroup',disabled:false,questionId:dados.questionId}])
    return
  }


  return (
        <>
          <p className={'noBreakText'} style={{marginBottom:15,maxWidth:150}}>{question?.text ? question.text : 'Pergunta'}</p>
          <div style={{overflowY:'auto',height:'94%',paddingLeft:0}}>
            <InputCard onBlurTextEditSave={onBlurTextEditSave} initialValue={question?.text}/>
            <div style={{paddingLeft:10,marginBottom:17,marginTop:15,}}>
              <div style={{flexDirection:'row',display:'flex',alignItems:'center'}}>
                <BootstrapTooltip placement="bottom" enterDelay={400} TransitionProps={{ timeout: {enter:500, exit: 50} }} title={'Indicar para quem estiver realizando o checklist para tirar uma foto da situação apresentada.'} styletooltip={{transform: 'translateY(0px)'}}>
                  <IconCircle onClick={()=>onSuggestPhoto()} selected={question?.photo}>
                    <Icons type="Camera"/>
                  </IconCircle >
                </BootstrapTooltip>
                <Menu
                  options={selectOptions}
                  onSelect={onChangeQuestionType}
                  placeholder={"Selecione"}
                  defaultValue={question.type == 'standard' ? 'Padrão':question.type == 'mult' ? 'Multiplos' : 'Personalizado'}
                  label={false}
                  style={{width:'auto',flex:1,marginRight:10}}
                  type={'box'}
                />
              </div>
              <div style={{marginBottom:'15px',display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%',paddingRight:10,overflowX:'auto',marginTop:'15px'}}>
                {options.map((item,index)=>{
                  if (question.type == 'standard')
                  return (
                    <Choose key={item} onClick={()=>onChangeAnswerYesNoNA(index)} text={item} active={active==index}/>
                  )
                  if (question.type == 'mult')
                  return (
                    <Choose key={index} onClick={()=>onChangeAnswerYesNoNA(index)} text={index} active={active==index}/>
                  )
                })}
              </div>

              <Card
                style={{marginBottom:'12px'}}
                button
                title={'Adicionar Fator de Risco'}
                position={position && position[index+1] && position[index+1]?.id == `${question.id}-q_${active+1}`}
                onClick={onAddRiskFactor}
              />
              <Card
                style={{marginBottom:'18px'}}
                button
                title={'Pular Perguntas e Grupos'}
                position={position && position[index+1] && position[index+1]?.id == `${question.id}-q_${active+1}-jump`}
                onClick={onAddJump}
              />

              <p className={'noBreakText'} style={{marginTop:15,marginBottom:15,maxWidth:150}}>{'Sub-Pergunta'}</p>
              {false ?
                <div style={{marginBottom:17}}>
                  <Card
                    fixedHeight
                    title={''}
                    //position={position && position[2] && position[2]?.id == data[data.findIndex(i=>i.question)].id}
                    //onClick={()=>onChecklistquestionquestionCardHandle(data[data.findIndex(i=>i.question)].id,data[data.findIndex(i=>i.question)].title,index)}
                    //item={data[data.findIndex(i=>i.question)]}
                  />
                </div >
              :
                <EmptyField style={{marginLeft:0}} onClick={()=>{}}>
                  <p>Adicionar Sub Pergunta</p>
                  <BootstrapTooltip placement="bottom" TransitionProps={{ timeout: {enter:500, exit: 50} }} title={'Pergunta posterior caso responda conforme o item selecionado a cima.'} styletooltip={{transform: 'translateY(10px)'}}>
                    <div style={{top:10,position:'absolute',right:10,}}>
                      <Icons type="InfoShade"/>
                    </div >
                  </BootstrapTooltip>
                </EmptyField>
              }
            </div >
          </div>

        </>
  );
}
