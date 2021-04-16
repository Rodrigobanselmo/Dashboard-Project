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
import {CardDrop} from './CardDrop';
import {Card} from './Card';
import {NoCard,InputTitle,AddCircle,ErrorMessage,EmptyField} from '../styles';
import {ModalButtons} from '../../../components/Main/MuiHelpers/ModalButtons'
import { lighten,darken, } from "@material-ui/core/styles";
import {BootstrapTooltip} from '../../../components/Main/MuiHelpers/Tooltip'
import { Droppable, Draggable,DragDropContext } from 'react-beautiful-dnd';

//group:'Limpeza',id:'1',questions:
export function ThirdColumn({
  openModalEdit,
  setOpenModalEdit,
  index,
  data=[],
  position,
  setPosition,
  onChecklistGroupCardHandle,
  onCreateNewGroup,
  onCreateQuestionMother,
  onChecklistquestionMotherCardHandle
}) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')

  function onCloseModalAdd() {
    setTitle('')
    setOpen(false)
  }

  function onConfirmCreationCategoryModal() {
    onCreateNewGroup(title,index)
    onCloseModalAdd()
  }

  return (
    <>
      <p style={{marginBottom:15}}>Pergunta Geral</p>
      {data.findIndex(i=>i?.mother) != -1 ?
        <div style={{paddingLeft:10,marginBottom:17}}>
          <Card
            fixedHeight
            title={data[data.findIndex(i=>i.mother)].title}
            key={data[data.findIndex(i=>i.mother)]?.id ?? index}
            position={position && position[2] && position[2]?.id == data[data.findIndex(i=>i.mother)].id}
            onClick={()=>onChecklistquestionMotherCardHandle(data[data.findIndex(i=>i.mother)].id,data[data.findIndex(i=>i.mother)].title,index)}
            item={data[data.findIndex(i=>i.mother)]}
            open={openModalEdit}
            index={index}
            setOpen={setOpenModalEdit}
          />
        </div >
      :
        <EmptyField onClick={()=>onCreateQuestionMother(index)}>
          <p>Adicionar Pergunta Mãe</p>
          <BootstrapTooltip placement="bottom" TransitionProps={{ timeout: {enter:500, exit: 50} }} title={'Pergunta a ser feita antes de entrar na categoria para saber se: categoria é aplicavel para a situação a ser analisada; categoria esta atrelada a um risco específico'} styletooltip={{transform: 'translateY(10px)'}}>
            <div style={{top:10,position:'absolute',right:10,}}>
              <Icons type="InfoShade"/>
            </div >
          </BootstrapTooltip>
        </EmptyField>
      }
      <p style={{marginBottom:15}}>Grupos</p>
      <Droppable droppableId={`group/${data.id}/${1}`}>
        {(provided,snapshot) => (
          <div style={{overflowY:'auto',height:'74%',paddingLeft:10}} ref={provided.innerRef} {...provided.droppableProps}>
            {data.length > 0 ? data.map((item,index)=>{
              if (item?.mother) return null
              return (
                <CardDrop
                  fixedHeight
                  title={item.title}
                  key={item?.id ?? index}
                  position={position && position[2] && position[2]?.id == item.id}
                  onClick={()=>onChecklistGroupCardHandle(item.id)}
                  item={item}
                  draggableId={`group/${item.id}/${index}`}
                  open={openModalEdit}
                  setOpen={setOpenModalEdit}
                  index={index}
                />
                )
            })
            :
            <NoCard >
              <p>Nenhum grupo cadastrado</p>
            </NoCard>
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <AddCircle onClick={()=>setOpen(true)}>
        <Icons style={{fontSize:22}} type={`Add`}/>
      </AddCircle>
      <ModalButtons open={open} disable={title=='' || (data && data.filter(i=>i.title == title).length > 0)} onClick={onConfirmCreationCategoryModal} onClose={onCloseModalAdd} title={'Adicionar Categoria'} >
          <InputTitle
            value={title}
            onChange={({target})=>setTitle(target.value)}
            placeholder={'Nome do grupo'}
            error={data && data.filter(i=>i.title == title).length > 0}
          />
          {data && data.filter(i=>i.title == title).length > 0 &&
            <ErrorMessage>Nome já existente, por favor cadastre um nome diferente.</ErrorMessage>
          }
      </ModalButtons>
   </>
  );
}



