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
  data=[],
  index,
  onChangeQuestion,
}) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [selected, setSelected] = useState(false)
  const [options, setOptions] = useState(['SIM','NÃO',"N.A."])
  const [active, setActive] = useState(0)
  const theme = React.useContext(ThemeContext)

  function onCloseModalAdd() {
    //setTitle('')
    //setOpen(false)
  }

  function onBlurTextEditSave(text) {

    const dados = {text,id:data.id}
    onChangeQuestion('text',index,dados)
    //onCloseModalAdd()
  }

  return (
    <>
      <p className={'noBreakText'} style={{marginBottom:15,maxWidth:150}}>{data?.text ? data.text : 'Pergunta'}</p>
      <InputCard onBlurTextEditSave={onBlurTextEditSave} initialValue={data?.text}/>
      <div style={{paddingLeft:10,marginBottom:17,marginTop:15,}}>
        <div style={{flexDirection:'row',display:'flex',alignItems:'center'}}>
          <BootstrapTooltip placement="bottom" enterDelay={400} TransitionProps={{ timeout: {enter:500, exit: 50} }} title={'Indicar para quem estiver realizando o checklist para tirar uma foto da situação apresentada.'} styletooltip={{transform: 'translateY(0px)'}}>
            <IconCircle onClick={()=>setSelected(!selected)} selected={selected}>
              <Icons type="Camera"/>
            </IconCircle >
          </BootstrapTooltip>
          <Menu
            options={['Padrão','Multiplos','Personalizado']}
            onSelect={()=>{}}
            placeholder={"Selecione"}
            defaultValue={data.type == 'standard' ? 'Padrão':''}
            label={false}
            style={{width:'auto',flex:1,marginRight:10}}
            type={'box'}
          />
        </div>
        <div style={{marginBottom:'15px',display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%',paddingRight:10,overflowX:'auto',marginTop:'15px'}}>
          {options.map((item,index)=>{
            return (
              <Choose onClick={()=>setActive(index)} text={item} active={active==index}/>
            )
          })}
        </div>

        <Card
          button
          title={'Adicionar Fator de Risco'}
          //position={position && position[2] && position[2]?.id == data[data.findIndex(i=>i.mother)].id}
          //onClick={()=>onChecklistquestionMotherCardHandle(data[data.findIndex(i=>i.mother)].id,data[data.findIndex(i=>i.mother)].title,index)}
          //item={data[data.findIndex(i=>i.mother)]}
          index={index}
        />
      </div >
   </>
  );
}



