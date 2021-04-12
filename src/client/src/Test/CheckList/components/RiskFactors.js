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
import InputSearch from '../../../components/Dashboard/Components/Standard/Search';


export function RiskFactors({
  position,
  setPosition,
  data,
  index,
  onChangeQuestion,
  searchRisk,
  onSearchRisk,
}) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const theme = React.useContext(ThemeContext)




  function onCloseModalAdd() {
    //setTitle('')
    //setOpen(false)
  }

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
    console.log(2)
  }

  function onBlur() {
    const dados = {search:''}
    //onSearchRisk('search',index,dados)
    console.log(1)
  }

  return (
    <>
      <p className={'noBreakText'} style={{marginBottom:15,maxWidth:150}}>{`${data?.text ? data.text : ''} - Fatores de Risco`}</p>
      <InputSearch onBlur={onBlur} onFocus={onFocus} style={{margin:'0 10px'}} icons={Icons} onInputSearch={onInputSearch} search={searchRisk} onCleanSearch={onCleanSearch}/>
      <div style={{overflowY:'auto',height:'87%',paddingLeft:10}}>
        <EmptyField hover={'move'} style={{marginLeft:0,marginTop:20,padding:'20px 20px',height:'92%'}} onClick={()=>{}}>
          <p style={{textAlign:'center'}}>Arraste aqui os fatores de risco que deseja adicionar</p>
        </EmptyField>
      </div>
   </>
  );
}



