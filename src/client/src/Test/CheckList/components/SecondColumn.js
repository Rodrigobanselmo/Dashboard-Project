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
import {NoCard,InputTitle,AddCircle,ErrorMessage} from '../styles';
import {ModalButtons} from '../../../components/Main/MuiHelpers/ModalButtons'
import { lighten,darken, } from "@material-ui/core/styles";

//group:'Limpeza',id:'1',questions:
export function SecondColumn({openModalEdit,setOpenModalEdit,data=[],position,setPosition,onChecklistCategoryCardHandle,onCreateNewCategory}) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')

  function onCloseModalAdd() {
    setTitle('')
    setOpen(false)
  }

  function onConfirmCreationCategoryModal() {
    onCreateNewCategory(title)
    onCloseModalAdd()
  }

  return (
    <>
      <p style={{marginBottom:15}}>Categoria</p>
      <div style={{overflowY:'auto',height:'94%',paddingLeft:10}}>
        {data.length > 0 ? data.map((item,index)=>{
          return (
            <Card
              fixedHeight
              title={item?.group}
              key={item?.id ?? index}
              position={position && position[1] && position[1]?.id == item.id}
              onClick={()=>onChecklistCategoryCardHandle(item?.id,item?.group,index)}
              item={item}
              open={openModalEdit}
              setOpen={setOpenModalEdit}
              index={index}
            />
            )
        })
        :
        <NoCard >
          <p>Nenhuma categoria adicionada</p>
        </NoCard>
        }
      </div>
      <AddCircle onClick={()=>setOpen(true)}>
        <Icons style={{fontSize:22}} type={`Add`}/>
      </AddCircle>
      <ModalButtons open={open} disable={title=='' || (data && data.filter(i=>i.group == title).length > 0)} onClick={onConfirmCreationCategoryModal} onClose={onCloseModalAdd} title={'Adicionar Categoria'} >
          <InputTitle
            value={title}
            onChange={({target})=>setTitle(target.value)}
            placeholder={'Nome da categoria'}
            error={data && data.filter(i=>i.group == title).length > 0}
          />
          {data && data.filter(i=>i.group == title).length > 0 &&
            <ErrorMessage>Nome já existente, por favor cadastre um nome diferente.</ErrorMessage>
          }
      </ModalButtons>
   </>
  );
}



