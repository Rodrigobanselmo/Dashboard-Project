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
import {NoCard,InputTitle,AddCircle,ErrorMessage,SubText} from '../styles';
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
  const [actionsData, setActionsData] = useState({})
  const [title, setTitle] = useState('')

  function onCloseModalAdd() {
    setTitle('')
    setOpen(false)
  }

  function onCreateNewCategory() {
    //update data of columns
    let uid = Math.floor((1 + Math.random()) * 0x100000000000).toString(16).substring(1);

    //update checklist data from database
    let copyDataChecklist = {...dataChecklist}
    copyDataChecklist.data = [...copyDataChecklist.data,{group:title,id:uid,questions:[],groups:[]}]
    setDataChecklist({...copyDataChecklist})

    setSave(true)
    onCloseModalAdd()
  }

  function onChecklistCategoryCardHandle(id,title) {
    setPosition([position[0],{id,title}]);
    setDataAll([dataAll[0],{groupId:id}])
  }

  function onDuplicate() {
    let uid = Math.floor((1 + Math.random()) * 0x100000000000).toString(16).substring(1);

    let copyDataChecklist = {...dataChecklist}
    const categoryIndex = dataChecklist.data.findIndex(i=>i.id == actionsData.groupId)
    const category = dataChecklist.data[categoryIndex]
    console.log({...category,id:uid,group:title})
    copyDataChecklist.data = [...copyDataChecklist.data,{...category,id:uid,group:title}]

    setDataChecklist({...copyDataChecklist})
    setSave(true)
    onCloseModalAdd()
  }

  function onEdit() {
    let copyDataChecklist = {...dataChecklist}
    const categoryIndex = dataChecklist.data.findIndex(i=>i.id == actionsData.groupId)
    const category = dataChecklist.data[categoryIndex]
    copyDataChecklist.data[categoryIndex] = {...category,group:title}

    setDataChecklist({...copyDataChecklist})
    setSave(true)
    onCloseModalAdd()
  }

  function onDelete() {
    let copyDataChecklist = {...dataChecklist}
    copyDataChecklist.data = [...dataChecklist.data.filter(i=>i.id != actionsData.groupId)]

    setDataAll(dataAll=>[...dataAll.slice(0,1)])
    setPosition(position=>[...position.slice(0,1)]);
    setDataChecklist({...copyDataChecklist})
    setSave(true)
    onCloseModalAdd()
  }

  function onRightClick(text,item) {
    if (text == 'Duplicar') {
      setOpen('dup')
      setActionsData({groupId:item.id})
      var name = `${item.group} - cópia`
      var cont = 1
      while (dataChecklist.data && dataChecklist.data.filter(i=>i.group == name.trim()).length > 0) {
        name = `${item.group} - cópia ${cont}`
        cont++
      }
      setTitle(name)
    } else if (text == 'Editar') {
      setOpen('edit')
      setActionsData({groupId:item.id})
      setTitle(item.group)
    } else if (text == 'Deletar') {
      setOpen('del')
      setActionsData({groupId:item.id})
      setTitle(item.group)
    }
  }

  function handleAddButton() {
    setOpen(true)
    setTitle('')
  }

  function onDisable(hasTitle) {
   if (open == 'del') return false
   if (hasTitle && title=='') return true
   if (open == 'edit' && actionsData?.groupId && dataChecklist.data && dataChecklist.data.filter(i=>i.group == title.trim()).length == 1 && dataChecklist.data.filter(i=>i.group == title.trim())[0].id == actionsData.groupId) return false
   if (dataChecklist.data && dataChecklist.data.filter(i=>i.group == title.trim()).length > 0) return true
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
                  onClickEdit={onRightClick}
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
      <AddCircle onClick={handleAddButton}>
        <Icons style={{fontSize:22}} type={`Add`}/>
      </AddCircle>
      <ModalButtons
        open={Boolean(open)}
        disable={onDisable(true)}
        onClick={open=='dup'?onDuplicate:open=='edit'?onEdit:open=='del'?onDelete:onCreateNewCategory}
        onClose={onCloseModalAdd}
        title={open=='del'?'Deletar Categoria' : open=='edit' ? 'Editar Categoria' : open=='dup' ? 'Duplicar Categoria':'Adicionar Categoria'}
      >
          {open=='del' && <SubText >Você tem certeza que deseja deletar está categoria? Após concluido não é possivel desfazer.</SubText>}
          <InputTitle
            value={title}
            onChange={({target})=>setTitle(target.value)}
            placeholder={'Nome da categoria'}
            error={onDisable()}
            autoFocus={true}
            readOnly={open=='del' ?true:false}
          />
          {onDisable() &&
            <ErrorMessage>Nome já existente, por favor cadastre um nome diferente.</ErrorMessage>
          }
      </ModalButtons>
   </>
  );
}



