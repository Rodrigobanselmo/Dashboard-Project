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
import {NoCard,InputTitle,AddCircle,ErrorMessage,InputArea} from '../styles';
import {ModalButtons} from '../../../components/Main/MuiHelpers/ModalButtons'
import {InputCard} from './InputCard';
import { lighten,darken, } from "@material-ui/core/styles";
import { Droppable, Draggable,DragDropContext } from 'react-beautiful-dnd';

export function QuestionsData({openModalEdit,setOpenModalEdit,data=[],position,setPosition,onCreateQuestion,index,onChecklistquestionCardHandle}) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')

  function onCloseModalAdd() {
    setTitle('')
    setOpen(false)
  }

  console.log(title)

  function onCreateNewQuestion() {
    onCloseModalAdd()
    onCreateQuestion(index,title)
  }

  function onHandleQuestion(id,text) {
    onChecklistquestionCardHandle(id,text,index)
  }

  console.log(data)
  //data[]={action:{yes:{risk:[]},no:0,na:0},text:'adequado?',id:'1.3s',group:'Limpeza'},
  return (
    <>
      <p style={{marginBottom:15}}>Perguntas</p>
      <Droppable droppableId={`question/${data.id}/${index}`}>
        {(provided,snapshot) => (
          <div style={{overflowY:'auto',height:'94%',paddingLeft:10}} ref={provided.innerRef} {...provided.droppableProps}>
            {data.data && data.data.length > 0 ? data.data.map((item,indexItem)=>{
              return (
                <CardDrop
                  fixedHeight
                  title={item?.text?item.text:''}
                  key={item.id}
                  position={position && position[index+1] && position[index+1]?.id == item.id}
                  onClick={()=>onHandleQuestion(item.id,item?.text?item.text:'')}
                  item={item}
                  open={openModalEdit}
                  setOpen={setOpenModalEdit}
                  draggableId={`question/${item.id}/${item.group}`}
                  index={indexItem}
                />
                )
            })
            :
            <NoCard >
              <p>Nenhuma Pergunta adicionada</p>
            </NoCard>
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <AddCircle onClick={()=>setOpen(true)}>
        <Icons style={{fontSize:22}} type={`Add`}/>
      </AddCircle>
      <ModalButtons open={open} disable={title=='' || (data.data && data.data.filter(i=>i?.text == title).length > 0)} onClick={onCreateNewQuestion} onClose={onCloseModalAdd} title={'Adicionar Pergunta'} >
          {/* <InputCard style={{}} onBlurTextEditSave={()=>{}} initialValue={data?.text}/> */}
          <InputArea
            value={title}
            onChange={({target})=>setTitle(target.value)}
            placeholder={'Descrição da pergunta'}
            error={data.data && data.data.filter(i=>i.text == title && i.text != '').length > 0}
          />
          {data.data && data.data.filter(i=>i.text == title && i.text != '').length > 0 &&
            <ErrorMessage>Nome já existente, por favor cadastre um nome diferente.</ErrorMessage>
          }
      </ModalButtons>
   </>
  );
}



