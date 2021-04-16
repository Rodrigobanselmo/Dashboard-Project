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

export function RisksEdit({
  position,
  setPosition,
  data,
  index,
  onEditRisk,
}) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const theme = React.useContext(ThemeContext)
  const risk = useSelector(state => state.risk)


  function onMandatory() {
    const dados = {...data}
    onEditRisk('mandatory',index,dados)
    //{type: "riskEdit", id: "123", name: "8d39bbf2", riskType: "qui", answerId: "q_1"}
  }

  function onExposition(value) {
    let exp = 'none'
    if (value=='Habitual/Permanente') exp = 'hp'
    if (value=='Ocasional') exp = 'o'
    if (value=='Habitual/Intermitente') exp = 'hi'

    const dados = {...data,exp}
    onEditRisk('exp',index,dados)
    //{type: "riskEdit", id: "123", name: "8d39bbf2", riskType: "qui", answerId: "q_1"}
  }

  function onProbability(value) {
    let prob = value
    if (prob==data.prob) prob = 'none'

    const dados = {...data,prob}
    onEditRisk('prob',index,dados)
  }

  function onRec() {
    const dados = {answerId:data.answerId,riskId:data.id,riskType:data.riskType}
    onEditRisk('rec',index,dados)
  }
  function onMed() {
    const dados = {answerId:data.answerId,riskId:data.id,riskType:data.riskType}
    onEditRisk('med',index,dados)
  }
  function onFont() {
    const dados = {answerId:data.answerId,riskId:data.id,riskType:data.riskType}
    onEditRisk('font',index,dados)
  }

  function getOptions() {
    if (data.exp == 'hp') return 'Habitual/Permanente'
    if (data.exp == 'o') return 'Ocasional'
    if (data.exp == 'hi') return 'Habitual/Intermitente'
    if (data.exp == 'none') return 'Não sugerir'
    return null
  }

  return (
    <>
      <Label style={{marginBottom:10}} text={data.name} infoText={'Todos os dados inbutidos a seguir estarão como sugestão na realização do checklist, podendo ser mudados a qualquer momento pelo operante.'}/>
      <div style={{paddingLeft:'10px',marginBottom:15,flexDirection:'row',display:'flex',alignItems:'center'}}>
        <BootstrapTooltip placement="bottom" enterDelay={400} TransitionProps={{ timeout: {enter:500, exit: 50} }} title={'Caso seja selecionado o risco se torna obrigatório e não mais uma sugestão.'} styletooltip={{transform: 'translateY(0px)'}}>
          <IconCircle onClick={onMandatory} selected={data.man}>
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
            <Probabilidade active={item == data.prob} key={item} onClick={()=>onProbability(item)} >
              <p>{index}</p>
            </Probabilidade>
          )
        })}
      </div>
      {/* <p className={'noBreakText'} style={{marginBottom:10,marginTop:5,maxWidth:150}}>Adicionar</p> */}
      <Card
        style={{marginBottom:'15px',marginLeft:10}}
        button
        title={'Recomendações'}
        position={position && position[index+1] && position[index+1]?.id == `rec`}
        onClick={onRec}
        //item={data[data.findIndex(i=>i.mother)]}
      />
      <Card
        style={{marginBottom:'15px',marginLeft:10}}
        button
        title={'Medidas de Controle'}
        position={position && position[index+1] && position[index+1]?.id == `med`}
        onClick={onMed}
        //item={data[data.findIndex(i=>i.mother)]}
      />
      <Card
        style={{marginBottom:'15px',marginLeft:10}}
        button
        title={'Fontes Geradoras'}
        position={position && position[index+1] && position[index+1]?.id == `font`}
        onClick={onFont}
        //item={data[data.findIndex(i=>i.mother)]}
      />
   </>
  );
}



