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
import {CardDrop} from './CardDrop';
import {ColumnContainer,AddCircle,InputTitle,ErrorMessage} from '../styles';
import {ModalButtons} from '../../../components/Main/MuiHelpers/ModalButtons'
import { lighten,darken, } from "@material-ui/core/styles";
import { Droppable, Draggable,DragDropContext } from 'react-beautiful-dnd';


export function FirstColumn({openModalEdit,setOpenModalEdit,data=[],setData,position=[],setPosition,onChecklistHandle,onCreateNewChecklist }) {

  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')

  function onCloseModalAdd() {
    setTitle('')
    setOpen(false)
  }

  function onConfirmCreationChecklistModal() {
    onCreateNewChecklist(title)
    onCloseModalAdd()
  }

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    console.log('destination', destination, 'source', source, draggableId);

    if (!destination) {
      return;
    }

    let List = [...data];

    if (source.droppableId === destination.droppableId) {
      let remove = List.splice(source.index, 1)[0];
      List.splice(destination.index, 0, remove);
      setData(List);
    }

    // if (type === 'list') {
    //   const newListIds = data.listIds;
    //   newListIds.splice(source.index, 1);
    //   newListIds.splice(destination.index, 0, draggableId);
    //   return;
    // }

    // const sourceList = data.lists[source.droppableId];
    // const destinationList = data.lists[destination.droppableId];
    // const draggingCard = sourceList.cards.filter(
    //   (card) => card.id === draggableId
    // )[0];

    // if (source.droppableId === destination.droppableId) {
    //   sourceList.cards.splice(source.index, 1);
    //   destinationList.cards.splice(destination.index, 0, draggingCard);
    //   const newSate = {
    //     ...data,
    //     lists: {
    //       ...data.lists,
    //       [sourceList.id]: destinationList,
    //     },
    //   };
    //   setData(newSate);
    // } else {
    //   sourceList.cards.splice(source.index, 1);
    //   destinationList.cards.splice(destination.index, 0, draggingCard);

    //   const newState = {
    //     ...data,
    //     lists: {
    //       ...data.lists,
    //       [sourceList.id]: sourceList,
    //       [destinationList.id]: destinationList,
    //     },
    //   };
    //   setData(newState);
    // }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ColumnContainer >
        <p style={{marginBottom:15,display:'flex',flexGrow:1}}>Checklist</p>
          <Droppable droppableId={'first'}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} style={{overflowY:'auto',height:'94%',paddingLeft:10}}>
                {data.map((item,index)=>{
                  return (
                    <CardDrop
                      fixedHeight title={item?.title}
                      key={item?.id ?? index}
                      position={position && position[0] && position[0].id == item.id}
                      onClick={()=>onChecklistHandle(item?.id,item?.title)}
                      item={item}
                      open={openModalEdit}
                      setOpen={setOpenModalEdit}
                      index={index}
                    />
                  )
                })}
                {provided.placeholder}
              </div>
              )}
          </Droppable>
        <AddCircle onClick={()=>setOpen(true)}>
          <Icons style={{fontSize:22}} type={`Add`}/>
        </AddCircle>
        <ModalButtons open={open} disable={title=='' || (data && data.filter(i=>i.title == title).length > 0)} onClick={onConfirmCreationChecklistModal} onClose={onCloseModalAdd} title={'Adicionar Checklist'} >
            <InputTitle
              value={title}
              onChange={({target})=>setTitle(target.value)}
              placeholder={'Nome do checklist'}
              error={data && data.filter(i=>i.title == title).length > 0}
            />
            {data && data.filter(i=>i.title == title).length > 0 &&
              <ErrorMessage>Nome já existente, por favor cadastre um nome diferente.</ErrorMessage>
            }
        </ModalButtons>
    </ColumnContainer >
   </DragDropContext>
  );
}



