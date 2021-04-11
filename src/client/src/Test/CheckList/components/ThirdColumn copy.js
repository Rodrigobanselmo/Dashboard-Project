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
import styled from "styled-components";
import {Card} from './Card';
import {NoCard,InputTitle,AddCircle,ErrorMessage,EmptyField} from '../styles';
import {ModalButtons} from '../../../components/Main/MuiHelpers/ModalButtons'
import { lighten,darken, } from "@material-ui/core/styles";
import {BootstrapTooltip} from '../../../components/Main/MuiHelpers/Tooltip'


//group:'Limpeza',id:'1',questions:
export function ThirdColumn({openModalEdit,setOpenModalEdit,data=[],position,setPosition,onChecklistCategoryGroupHandle,onCreateNewCategory}) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')

  function onCloseModalAdd() {
    setTitle('')
    setOpen(false)
  }

  function onConfirmCreationCategoryModal() {
    //onCreateNewGroup(title)
    onCloseModalAdd()
  }

  return (
    <>
      <p style={{marginBottom:15}}>Pergunta</p>
        <EmptyField >
          <p>Adicionar Pergunta Pai</p>
          <BootstrapTooltip placement="bottom" TransitionProps={{ timeout: {enter:500, exit: 50} }} title={'Pergunta a ser feita antes de entrar na categoria para saber se: categoria é aplicavel para a situação a ser analisada; categoria esta atrelada a um risco específico'} styletooltip={{transform: 'translateY(10px)'}}>
            <div style={{top:10,position:'absolute',right:10,}}>
              <Icons type="InfoShade"/>
            </div >
          </BootstrapTooltip>
        </EmptyField>
      <p style={{marginBottom:15}}>Grupos</p>
      <div style={{overflowY:'auto',height:'75%',paddingLeft:10}}>
        {data.length > 0 ? data.map((group,index)=>{
          return (
            <Card
              fixedHeight
              title={group}
              key={group ?? index}
              position={position && position[2] && position[2]?.id == group}
              onClick={()=>onChecklistCategoryGroupHandle(group)}
              item={group}
              open={openModalEdit}
              setOpen={setOpenModalEdit}
            />
            )
        })
        :
        <NoCard >
          <p>Nenhum grupo cadastrado</p>
        </NoCard>
        }
      </div>
      <AddCircle onClick={()=>setOpen(true)}>
        <Icons style={{fontSize:22}} type={`Add`}/>
      </AddCircle>
      <ModalButtons open={open} disable={title=='' || (data && data.filter(i=>i == title).length > 0)} onClick={onConfirmCreationCategoryModal} onClose={onCloseModalAdd} title={'Adicionar Categoria'} >
          <InputTitle
            value={title}
            onChange={({target})=>setTitle(target.value)}
            placeholder={'Nome do grupo'}
            error={data && data.filter(i=>i == title).length > 0}
          />
          {data && data.filter(i=>i == title).length > 0 &&
            <ErrorMessage>Nome já existente, por favor cadastre um nome diferente.</ErrorMessage>
          }
      </ModalButtons>
   </>
  );
}



