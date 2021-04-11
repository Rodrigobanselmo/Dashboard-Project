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
import {NoCard,InputTitle,AddCircle,ErrorMessage,EmptyField} from '../styles';
import {ModalButtons} from '../../../components/Main/MuiHelpers/ModalButtons'
import { lighten,darken,fade } from "@material-ui/core/styles";
import {BootstrapTooltip} from '../../../components/Main/MuiHelpers/Tooltip'
import { Paper } from '@material-ui/core';
import {InputCard} from './InputCard';
import {Menu} from '../../../components/Main/MuiHelpers/Selected'
import {ContinueButton} from '../../../components/Main/MuiHelpers/Button'

const IconCircle = styled.div`
  height: 40px;
  width: 40px;
  border-radius:20px;
  display:flex;
  justify-content:center;
  align-items: center;
  color:${({theme})=>theme.palette.type !== 'dark' ? fade(theme.palette.text.secondary,0.4) : theme.palette.text.secondary};
  background-color:${({theme})=>theme.palette.type !== 'dark' ? fade(theme.palette.background.default,0.3) : lighten(theme.palette.background.contrast,0.03)};
  -webkit-box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.22);
  box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.22);
  margin-right:10px;
  cursor: pointer;

  &:hover {
    background-color: ${({theme})=>theme.palette.type!=="dark"?darken(theme.palette.background.paper,0.075):darken(theme.palette.background.contrast,0.1)};
  }
  &:active {
    opacity:0.7;
  }

  ${props => props.selected && css`
    color:${({theme})=>theme.palette.type !== 'dark' ? theme.palette.primary.contrastText : theme.palette.primary.contrastText};
    background-color:${({theme})=>theme.palette.type !== 'dark' ? lighten(theme.palette.primary.main,0.3) : theme.palette.primary.main};
    &:hover {
      background-color:${({theme})=>theme.palette.type !== 'dark' ? theme.palette.primary.main : darken(theme.palette.primary.main,0.1)};
    }
  `}

`;

const ChooseDivYesNoNA = styled.div`
  width: 100%;
  height: 5px;
  background-color:${({theme})=>theme.palette.type !== 'dark' ? fade(theme.palette.background.inactive,0.4) : theme.palette.background.inactive};
  border-radius: 10px;

  ${props => props.active && css`
    background-color:${({theme})=>theme.palette.type !== 'dark' ? lighten(theme.palette.primary.main,0.2) : theme.palette.primary.main};
  `}
`;

function Choose({text,active,...props}) {
  return (
    <div style={{flexDirection:'column',display:'flex',alignItems:'center',width:'30%',cursor: 'pointer'}} {...props}>
      <p style={{margin:0,padding:0}}>{text}</p>
      <ChooseDivYesNoNA active={active}/>
    </div>
  );
}


export function QuestionColumn({
  position,
  setPosition,
  data,
  index,
  onChangeQuestion,
}) {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState(getOptions())
  const [active, setActive] = useState(0)
  const theme = React.useContext(ThemeContext)

  const selectOptions = ['Padrão','Multiplos','Personalizado']
  //const selectOptions = ['Padrão','Escolhas Multiplas','Padrão Personalizado']

  function getOptions() {
    if (data.type == 'standard') {
      return ['SIM','NÃO','N.A.']
    } else {
      const questionsType = [];
      for (const key in data.action) {
        if (Object.hasOwnProperty.call(data.action, key)) {
          const element = data.action[key];
          questionsType.push(element.text)
        }
      }
      return questionsType;
    }
  }

  function onCloseModalAdd() {
    //setTitle('')
    //setOpen(false)
  }

  function onBlurTextEditSave(text) {
    const dados = {text,id:data.id}
    onChangeQuestion('text',index,dados)
  }

  function onSuggestPhoto() {
    const dados = {id:data.id}
    onChangeQuestion('photo',index,dados)
  }

  function onChangeQuestionType(value) {
    const type = value == 'Padrão' ? 'standard':value == 'Multiplos' ? 'mult' : 'pers'
    const dados = {id:data.id,type}
    onChangeQuestion('type',index,dados)
  }

  function onChangeQuestionAnswer() {
    const dados = {id:data.id}
    onChangeQuestion('photo',index,dados)
  }

  function onAddRiskFactor() {
    const dados = {id:`${data.id}-q_${active+1}`,question:data.action[`q_${active+1}`],title:`${options[active]} - Fatores de risco`}
   onChangeQuestion('risk',index,dados)
  }


  return (
    <>
      <p className={'noBreakText'} style={{marginBottom:15,maxWidth:150}}>{data?.text ? data.text : 'Pergunta'}</p>
      <div style={{overflowY:'auto',height:'94%',paddingLeft:10}}>
        <InputCard onBlurTextEditSave={onBlurTextEditSave} initialValue={data?.text}/>
        <div style={{paddingLeft:10,marginBottom:17,marginTop:15,}}>
          <div style={{flexDirection:'row',display:'flex',alignItems:'center'}}>
            <BootstrapTooltip placement="bottom" enterDelay={400} TransitionProps={{ timeout: {enter:500, exit: 50} }} title={'Indicar para quem estiver realizando o checklist para tirar uma foto da situação apresentada.'} styletooltip={{transform: 'translateY(0px)'}}>
              <IconCircle onClick={()=>onSuggestPhoto()} selected={data?.photo}>
                <Icons type="Camera"/>
              </IconCircle >
            </BootstrapTooltip>
            <Menu
              options={selectOptions}
              onSelect={onChangeQuestionType}
              placeholder={"Selecione"}
              defaultValue={data.type == 'standard' ? 'Padrão':data.type == 'mult' ? 'Multiplos' : 'Personalizado'}
              label={false}
              style={{width:'auto',flex:1,marginRight:10}}
              type={'box'}
            />
          </div>
          <div style={{marginBottom:'15px',display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%',paddingRight:10,overflowX:'auto',marginTop:'15px'}}>
            {options.map((item,index)=>{
              if (data.type == 'standard')
              return (
                <Choose key={item} onClick={()=>setActive(index)} text={item} active={active==index}/>
              )
              if (data.type == 'mult')
              return (
                <Choose key={index} onClick={()=>setActive(index)} text={index} active={active==index}/>
              )
            })}
          </div>

          <Card
            style={{marginBottom:'12px'}}
            button
            title={'Adicionar Fator de Risco'}
            position={position && position[index+1] && position[index+1]?.id == `${data.id}-q_${active+1}`}
            onClick={onAddRiskFactor}
            //item={data[data.findIndex(i=>i.mother)]}
          />
          <Card
            style={{marginBottom:'18px'}}
            button
            title={'Pular Perguntas e Grupos'}
            //position={position && position[2] && position[2]?.id == data[data.findIndex(i=>i.mother)].id}
            //onClick={()=>onChecklistquestionMotherCardHandle(data[data.findIndex(i=>i.mother)].id,data[data.findIndex(i=>i.mother)].title,index)}
            //item={data[data.findIndex(i=>i.mother)]}
          />

          <p className={'noBreakText'} style={{marginTop:15,marginBottom:15,maxWidth:150}}>{'Sub-Pergunta'}</p>
          {false ?
            <div style={{marginBottom:17}}>
              <Card
                fixedHeight
                title={''}
                //position={position && position[2] && position[2]?.id == data[data.findIndex(i=>i.mother)].id}
                //onClick={()=>onChecklistquestionMotherCardHandle(data[data.findIndex(i=>i.mother)].id,data[data.findIndex(i=>i.mother)].title,index)}
                //item={data[data.findIndex(i=>i.mother)]}
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



