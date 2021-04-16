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

export function QuestionsData({
  openModalEdit,
  setOpenModalEdit,
  data,
  position,
  setPosition,
  index,
  setDataAll,
  dataAll,
  dataChecklist,
  setDataChecklist,
  setSave
}) {

  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')

  //let copyDataChecklist = {...dataChecklist}
  const categoryIndex = dataChecklist.data.findIndex(i=>i.id == position[1].id)
  const questions = dataChecklist.data[categoryIndex].questions.filter(i=>i.group==data.groupName)

  function onCloseModalAdd() {
    setTitle('')
    setOpen(false)
  }

  console.log(title)

  function onCreateNewQuestion() {
    const uid = Math.floor((1 + Math.random()) * 0x100000000000).toString(16).substring(1);
    const addData = {type:'standard',group:position[2].title,action:{q_1:{id:'q_1',text:'SIM',data:[]},q_2:{id:'q_2',text:'NÃO',data:[]},q_3:{id:'q_3',text:'N.A.',data:[]}},photo:false,text:title,id:uid}
    setPosition([...position.slice(0,index+1),{id:uid,title:'Pergunta...'}]);

    var copyDataChecklist = {...dataChecklist}
    copyDataChecklist.data[categoryIndex].questions = [...copyDataChecklist.data[categoryIndex].questions,{...addData}]
    setDataAll([...dataAll,{questionId:uid}])

    setDataChecklist({...copyDataChecklist})
    setSave(true)
    onCloseModalAdd()
  }

  function onHandleQuestion(id,title) {
    setPosition([...position.slice(0,index+1),{id,title:title!=''?title:'Pergunta...'}]);
    setDataAll([...dataAll.slice(0,index+1),{id,questionId:id,type:'question'}])
  }

  console.log(data)
  //data[]={action:{yes:{risk:[]},no:0,na:0},text:'adequado?',id:'1.3s',group:'Limpeza'},
  return (
    <>
      <p style={{marginBottom:15}}>Perguntas</p>
      <Droppable droppableId={`question/${data.groupName}/${index}`}>
        {(provided,snapshot) => (
          <div style={{overflowY:'auto',height:'94%',paddingLeft:10}} ref={provided.innerRef} {...provided.droppableProps}>
            {questions && questions.length > 0 ? questions.map((item,indexItem)=>{
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
      <ModalButtons open={open} disable={title=='' || (questions && questions.filter(i=>i?.text == title).length > 0)} onClick={onCreateNewQuestion} onClose={onCloseModalAdd} title={'Adicionar Pergunta'} >
          {/* <InputCard style={{}} onBlurTextEditSave={()=>{}} initialValue={data?.text}/> */}
          <InputArea
            value={title}
            onChange={({target})=>setTitle(target.value)}
            placeholder={'Descrição da pergunta'}
            error={questions && questions.filter(i=>i.text == title && i.text != '').length > 0}
          />
          {questions && questions.filter(i=>i.text == title && i.text != '').length > 0 &&
            <ErrorMessage>Nome já existente, por favor cadastre um nome diferente.</ErrorMessage>
          }
      </ModalButtons>
   </>
  );
}



