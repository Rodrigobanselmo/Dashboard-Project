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
import {NoCard,InputTitle,AddCircle,ErrorMessage,EmptyField,Probabilidade,IconCircle} from '../styles';
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
import {Label} from './label';
import { Droppable, Draggable,DragDropContext } from 'react-beautiful-dnd';
import clone from 'clone';

export function RisksEdit({
  position,
  setPosition,
  data,
  index,
  setDataAll,
  dataAll,
  dataChecklist,
  setDataChecklist,
  setSave
}) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const theme = React.useContext(ThemeContext)
  const risk = useSelector(state => state.risk)
  console.log(data)

  const categoryIndex = dataChecklist.data.findIndex(i=>i.id == position[1].id)
  const questionIndex = dataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==data.questionId)
  const questionActionTypeIndex = dataChecklist.data[categoryIndex].questions[questionIndex].action[data.answerId].data.findIndex(i=>i.risk==data.riskId)
  const questionActionTypeRisk = dataChecklist.data[categoryIndex].questions[questionIndex].action[data.answerId].data[questionActionTypeIndex]

  console.log(questionActionTypeRisk)

  function onMandatory() {
    let copyDataChecklist = {...dataChecklist}
    copyDataChecklist = clone(copyDataChecklist)
    copyDataChecklist.data[categoryIndex].questions[questionIndex].action[data.answerId].data[questionActionTypeIndex] = {...questionActionTypeRisk,man:!questionActionTypeRisk.man}
    setDataChecklist({...copyDataChecklist})
    setSave(true)
    //onEditRisk('mandatory',index,dados)
    //{type: "riskEdit", id: "123", name: "8d39bbf2", riskType: "qui", answerId: "q_1"}
  }

  function onExposition(value) {
    let exp = 'none'
    if (value=='Habitual/Permanente') exp = 'hp'
    if (value=='Ocasional') exp = 'o'
    if (value=='Habitual/Intermitente') exp = 'hi'

    let copyDataChecklist = {...dataChecklist}
    copyDataChecklist = clone(copyDataChecklist)
    copyDataChecklist.data[categoryIndex].questions[questionIndex].action[data.answerId].data[questionActionTypeIndex] = {...questionActionTypeRisk,exp}
    setDataChecklist({...copyDataChecklist})
    setSave(true)
    //onEditRisk('exp',index,dados)
    //{type: "riskEdit", id: "123", name: "8d39bbf2", riskType: "qui", answerId: "q_1"}
  }

  function onProbability(value) {
    let prob = value
    if (prob==questionActionTypeRisk.prob) prob = 'none'
    let copyDataChecklist = {...dataChecklist}
    copyDataChecklist = clone(copyDataChecklist)

    if (prob == 'none') {
      delete questionActionTypeRisk['prob']
      copyDataChecklist.data[categoryIndex].questions[questionIndex].action[data.answerId].data[questionActionTypeIndex] = {...questionActionTypeRisk}
    }
    else copyDataChecklist.data[categoryIndex].questions[questionIndex].action[data.answerId].data[questionActionTypeIndex] = {...questionActionTypeRisk,prob}
    setDataChecklist({...copyDataChecklist})
    setSave(true)

    //onEditRisk('prob',index,dados)
  }

  function onRec() {
    const dados = {answerId:data.answerId,riskId:data.riskId,riskType:data.riskType,questionId:data.questionId}

    setPosition([...position.slice(0,index+1),{id:'rec',title:'Recomendações'},{id:'searchRec',title:'Pesquisar Recomendações'}]);
    //update data of columns
    setDataAll([
      ...dataAll.slice(0,index+1),
      {...dados,type:'riskSuggestion'},
      {...dados,disabled:false,type:'riskSuggestionData'}
    ])

    //onEditRisk('rec',index,dados)
  }

  function onMed() {
    const dados = {answerId:data.answerId,riskId:data.riskId,riskType:data.riskType,questionId:data.questionId}
    setPosition([...position.slice(0,index+1),{id:'med',title:'Medidas de Controle'},{id:'searchMed',title:'Pesquisar Medidas de Controle'}]);
    //update data of columns
    setDataAll([
      ...dataAll.slice(0,index+1),
      {...dados,type:'riskSuggestion'},
      {...dados,disabled:false,type:'riskSuggestionData'}
    ])
  }

  function onFont() {
    const dados = {answerId:data.answerId,riskId:data.riskId,riskType:data.riskType,questionId:data.questionId}
    setPosition([...position.slice(0,index+1),{id:'font',title:'Fontes Geradoras'},{id:'searchFont',title:'Pesquisar Fontes Geradoras'}]);
    //update data of columns
    setDataAll([
      ...dataAll.slice(0,index+1),
      {...dados,type:'riskSuggestion'},
      {...dados,disabled:false,type:'riskSuggestionData'}
    ])
  }

  function getOptions() {
    if (questionActionTypeRisk.exp == 'hp') return 'Habitual/Permanente'
    if (questionActionTypeRisk.exp == 'o') return 'Ocasional'
    if (questionActionTypeRisk.exp == 'hi') return 'Habitual/Intermitente'
    if (questionActionTypeRisk.exp == 'none') return 'Não sugerir'
    return null
  }

  return (
    <>
      <Label style={{marginBottom:10}} text={data.name} infoText={'Todos os dados inbutidos a seguir estarão como sugestão na realização do checklist, podendo ser mudados a qualquer momento pelo operante.'}/>
      <div style={{paddingLeft:'10px',marginBottom:15,flexDirection:'row',display:'flex',alignItems:'center'}}>
        <BootstrapTooltip placement="bottom" enterDelay={400} TransitionProps={{ timeout: {enter:500, exit: 50} }} title={'Caso seja selecionado o risco se torna obrigatório e não mais uma sugestão.'} styletooltip={{transform: 'translateY(0px)'}}>
          <IconCircle onClick={onMandatory} selected={questionActionTypeRisk.man}>
            <Icons type="Mandatory"/>
          </IconCircle >
        </BootstrapTooltip>
        <Menu
          options={['Ocasional','Habitual/Permanente','Habitual/Intermitente','Não sugerir']}
          onSelect={onExposition}
          placeholder={"Tipo de Exposição"}
          defaultValue={getOptions()}
          label={false}
          style={{width:'auto',flex:1,marginRight:10}}
          type={'box'}
        />
      </div>
      <Label style={{marginBottom:10,marginTop:20}} text={'Probabilidade'} infoText={'Informe probabilidade sugerida deste risco, caso não seja necessário deixar em branco.'}/>
      <div style={{padding:'0 10px',marginBottom:20,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        {[1,2,3,4,5].map((item,index)=>{
          return(
            <Probabilidade active={item == questionActionTypeRisk.prob} key={item} onClick={()=>onProbability(item)} >
              <p>{index}</p>
            </Probabilidade>
          )
        })}
      </div>
      <Card
        style={{marginBottom:'15px',marginLeft:10}}
        button
        title={'Recomendações'}
        position={position && position[index+1] && position[index+1]?.id == `rec`}
        onClick={onRec}
      />
      <Card
        style={{marginBottom:'15px',marginLeft:10}}
        button
        title={'Medidas de Controle'}
        position={position && position[index+1] && position[index+1]?.id == `med`}
        onClick={onMed}
      />
      <Card
        style={{marginBottom:'15px',marginLeft:10}}
        button
        title={'Fontes Geradoras'}
        position={position && position[index+1] && position[index+1]?.id == `font`}
        onClick={onFont}
      />
   </>
  );
}



