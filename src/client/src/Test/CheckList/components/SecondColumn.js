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
import {NoCard,InputTitle,AddCircle,ErrorMessage} from '../styles';
import {ModalButtons} from '../../../components/Main/MuiHelpers/ModalButtons'
import { lighten,darken, } from "@material-ui/core/styles";
import { Droppable, Draggable,DragDropContext } from 'react-beautiful-dnd';

//group:'Limpeza',id:'1',questions:
export function SecondColumn({
  position,
  setPosition,
  data,
  openModalEdit,
  setOpenModalEdit,
  setDataAll,
  dataAll,
  dataChecklist,
  setDataChecklist,
  setSave
}) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')

  function onCloseModalAdd() {
    setTitle('')
    setOpen(false)
  }

  function onCreateNewCategory() {
    //update data of columns
    let uid = Math.floor((1 + Math.random()) * 0x100000000000).toString(16).substring(1);
    let copyData = [...dataAll]
    copyData[0] = [...copyData[0],{group:title,id:uid}] //title é o titulo colocado no modal para o card
    setDataAll([...copyData])

    //update checklist data from database
    let copyDataChecklist = {...dataChecklist}
    copyDataChecklist.data = [...copyDataChecklist.data,{group:title,id:uid,questions:[],groups:[]}]
    setDataChecklist({...copyDataChecklist})

    setSave(true)
    onCloseModalAdd()
  }

  function onChecklistCategoryCardHandle(id,title) {
    setPosition([position[0],{id,title}]);

    // let dataQuestionsGroups = []
    // dataChecklist.data[index].groups.map(item=>{
    //   dataQuestionsGroups.push({title:item,id:item})
    // })
    // let groupIndex = dataChecklist.data.findIndex(i=>i.id==id)
    // if (dataChecklist.data[groupIndex]?.questions.findIndex(i=>i?.mother) != -1) {
    //   let motherQuestion = dataChecklist.data[groupIndex].questions[dataChecklist.data[groupIndex].questions.findIndex(i=>i?.mother)]
    //   dataQuestionsGroups.push({title:motherQuestion.text,...motherQuestion})
    // }
    setDataAll([dataAll[0],{groupId:id}])
    //console.log(dataQuestionsGroups)
  }



  return (
    <>
      <p style={{marginBottom:15}}>Categoria</p>
      <Droppable droppableId={`category/${data.id}/${0}`}>
        {(provided,snapshot) => (
          <div style={{overflowY:'auto',height:'94%',paddingLeft:10}} ref={provided.innerRef} {...provided.droppableProps}>
            {dataChecklist.data.length > 0 ? dataChecklist.data.map((item,index)=>{
              return (
                <CardDrop
                  fixedHeight
                  title={item?.group}
                  key={item?.id ?? index}
                  position={position && position[1] && position[1]?.id == item.id}
                  onClick={()=>onChecklistCategoryCardHandle(item?.id,item?.group,index)}
                  item={item}
                  open={openModalEdit}
                  setOpen={setOpenModalEdit}
                  draggableId={`category/${item.id}/${index}`}
                  index={index}
                />
                )
            })
            :
            <NoCard >
              <p>Nenhuma categoria adicionada</p>
            </NoCard>
            }
            {provided.placeholder}
          </div>
      )}
      </Droppable>
      <AddCircle onClick={()=>setOpen(true)}>
        <Icons style={{fontSize:22}} type={`Add`}/>
      </AddCircle>
      <ModalButtons open={open} disable={title=='' || (dataChecklist.data && dataChecklist.data.filter(i=>i.group == title).length > 0)} onClick={onCreateNewCategory} onClose={onCloseModalAdd} title={'Adicionar Categoria'} >
          <InputTitle
            value={title}
            onChange={({target})=>setTitle(target.value)}
            placeholder={'Nome da categoria'}
            error={dataChecklist.data && dataChecklist.data.filter(i=>i.group == title).length > 0}
          />
          {dataChecklist.data && dataChecklist.data.filter(i=>i.group == title).length > 0 &&
            <ErrorMessage>Nome já existente, por favor cadastre um nome diferente.</ErrorMessage>
          }
      </ModalButtons>
   </>
  );
}



