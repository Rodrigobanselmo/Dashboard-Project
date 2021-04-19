import React, {useState,useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';
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
import {ColumnContainer,AddCircle,InputTitle,ErrorMessage,SubText} from '../styles';
import {ModalButtons} from '../../../components/Main/MuiHelpers/ModalButtons'
import { lighten,darken, } from "@material-ui/core/styles";
import { Droppable, Draggable,DragDropContext } from 'react-beautiful-dnd';

export function FirstColumn({
  openModalEdit,
  setOpenModalEdit,
  data=[],
  setData,
  position=[],
  setPosition,
  onChecklistHandle,
  onCreateNewChecklist,
  onEditDataChecklist,
  onDeleteDataChecklist,
  onDuplicateNewChecklist
}) {

  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [actionsData, setActionsData] = useState({})

  function onCloseModalAdd() {
    setTitle('')
    setOpen(false)
  }

  function onConfirmCreationChecklistModal() {
    onCreateNewChecklist(title)
    onCloseModalAdd()
  }

  function handleAddButton() {
    setOpen(true)
    setTitle('')
  }

  function onDuplicate() {
    onCloseModalAdd()
    onDuplicateNewChecklist(title)
  }

  function onEdit() {
    onCloseModalAdd()
    onEditDataChecklist(actionsData.checklistId,title)
  }

  function onDelete() {
    onCloseModalAdd()
    onDeleteDataChecklist(actionsData.checklistId)
  }

  function onRightClick(text,item) {
    if (text == 'Duplicar') {
      setOpen('dup')
      setActionsData({checklistId:item.id})
      var name = `${item.title} - cópia`
      var cont = 1
      while (data && data.filter(i=>i.title == name.trim()).length > 0) {
        name = `${item.title} - cópia ${cont}`
        cont++
      }
      setTitle(name)
    } else if (text == 'Editar') {
      setOpen('edit')
      setActionsData({checklistId:item.id})
      setTitle(item.title)
    } else if (text == 'Deletar') {
      setOpen('del')
      setActionsData({checklistId:item.id})
      setTitle(item.title)
    }
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

  };

  function onDisable(hasTitle) {
    if (open == 'del') return false
    if (hasTitle && title=='') return true
    if (open == 'edit' && actionsData?.checklistId && data && data.filter(i=>i.title == title.trim()).length == 1 && data.filter(i=>i.title == title.trim())[0].id == actionsData.checklistId) return false
    if (data && data.filter(i=>i.title == title.trim()).length > 0) return true
   }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ColumnContainer >
        <p style={{marginBottom:15,display:'flex',flexGrow:1}}>Checklist</p>
          <Droppable droppableId={'first'}>
            {(provided,snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps} style={{overflowY:'auto',height:'94%',paddingLeft:10}}>
                {data.map((item,index)=>{
                  return (
                    <CardDrop
                      isDragDisabled={`${item.id}` == '1'}
                      fixedHeight title={item?.title}
                      key={item?.id ?? index}
                      position={position && position[0] && position[0].id == item.id}
                      onClick={()=>onChecklistHandle(item?.id,item?.title)}
                      draggableId={`${item.id}/${index}`}
                      item={item}
                      open={openModalEdit}
                      setOpen={setOpenModalEdit}
                      index={index}
                      onClickEdit={onRightClick}
                  />
                  )
                })}
                {provided.placeholder}
              </div>
              )}
          </Droppable>
      <AddCircle onClick={handleAddButton}>
        <Icons style={{fontSize:22}} type={`Add`}/>
      </AddCircle>
      <ModalButtons
        open={Boolean(open)}
        disable={onDisable(true)}
        onClick={open=='dup'?onDuplicate:open=='edit'?onEdit:open=='del'?onDelete:onConfirmCreationChecklistModal}
        onClose={onCloseModalAdd}
        title={open=='del'?'Deletar Checklist' : open=='edit' ? 'Editar Checklist' : open=='dup' ? 'Duplicar Checklist':'Adicionar Checklist'}
      >
          {open=='del' && <SubText >Você tem certeza que deseja deletar este checkist? Após concluido não é possivel desfazer.</SubText>}
          <InputTitle
            value={title}
            onChange={({target})=>setTitle(target.value)}
            placeholder={'Nome do Checklist'}
            error={onDisable()}
            autoFocus={true}
            readOnly={open=='del' ?true:false}
          />
          {onDisable() &&
            <ErrorMessage>Nome já existente, por favor cadastre um nome diferente.</ErrorMessage>
          }
      </ModalButtons>
    </ColumnContainer >
   </DragDropContext>
  );
}



