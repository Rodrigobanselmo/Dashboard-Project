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
import {NoCard,InputTitle,AddCircle,ErrorMessage,EmptyField,RiskFilter,AddedRiskContainer} from '../styles';
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

export function Label({text,iconProps,infoText='',style,...props}) {
  return (
      <div style={{paddingRight:'10px',marginBottom:15,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',...style}} {...props}>
        <p className={'noBreakText'} style={{paddingRight:30}}>{text}</p>
        <BootstrapTooltip placement="bottom" TransitionProps={{ timeout: {enter:500, exit: 50} }} title={infoText} styletooltip={{transform: 'translateY(0px)'}}>
            <div>
              <Icons type="InfoShade" height={15} width={15} {...iconProps}/>
            </div>
        </BootstrapTooltip>
      </div>
  );
}



