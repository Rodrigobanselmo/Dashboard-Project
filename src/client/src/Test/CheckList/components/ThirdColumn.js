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
import {NoCard,InputTitle,AddCircle,ErrorMessage,EmptyField,SubText} from '../styles';
import {ModalButtons} from '../../../components/Main/MuiHelpers/ModalButtons'
import { lighten,darken, } from "@material-ui/core/styles";
import {BootstrapTooltip} from '../../../components/Main/MuiHelpers/Tooltip'
import { Droppable, Draggable,DragDropContext } from 'react-beautiful-dnd';
import clone from 'clone';
import { areEqual } from "react-window";

//group:'Limpeza',id:'1',questions:
export const ThirdColumn = React.memo((
    {
      openModalEdit,
      setOpenModalEdit,
      index,
      data,
      position,
      setPosition,
      setDataAll,
      dataAll,
      dataChecklist,
      setDataChecklist,
      setSave
    }
) => {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [actionsData, setActionsData] = useState({})

  const categoryIndex = dataChecklist.data.findIndex(i=>i.id==position[1].id)
  const groupData = dataChecklist.data[categoryIndex]
  const motherIndex = groupData.questions.findIndex(i=>i?.mother)

  function onCloseModalAdd() {
    setTitle('')
    setOpen(false)
  }

  function onGroupCardHandle(id) {
    setPosition([position[0],position[1],{id,title:id}]);
    setDataAll([dataAll[0],dataAll[1],{id:id,groupName:id,type:'questionData'}])
  }

  function onCreateNewGroup() {
    //update checklist data from database
    let copyDataChecklist = {...dataChecklist}
    copyDataChecklist = clone(copyDataChecklist)
    const groupIndex = copyDataChecklist.data.findIndex(i=>i.id==position[1].id)
    copyDataChecklist.data[groupIndex].groups = [...copyDataChecklist.data[groupIndex].groups,title]
    setDataChecklist({...copyDataChecklist})
    setSave(true)
    onCloseModalAdd()
  }

  function onCreateQuestionMother() {

    const uid = Math.floor((1 + Math.random()) * 0x100000000000).toString(16).substring(1);

    //setPosition to it
    setPosition([...position.slice(0,index+1),{id:uid,title:'Pergunta...'}]);

    //data
    let addData = {type:'standard',action:{q_1:{id:'q_1',text:'SIM',data:[]},q_2:{id:'q_2',text:'NÃO',data:[]},q_3:{id:'q_3',text:'N.A.',data:[]}},photo:false,text:'...',id:uid,mother:true}

    //update checklist data from database
    let copyDataChecklist = {...dataChecklist}
    const categoryIndex = copyDataChecklist.data.findIndex(i=>i.id == position[1].id)
    copyDataChecklist.data[categoryIndex].questions = [{...addData},...copyDataChecklist.data[categoryIndex].questions]
    setDataChecklist(copyDataChecklist)
    setDataAll([...dataAll.slice(0,index+1),{id:uid,questionId:uid,type:'question'}])
    setSave(true)
  }

  function onMotherCardHandle(id,title) {
    setPosition([...position.slice(0,index+1),{id,title:title!=''?title:'Pergunta...'}]);

    const questionMotherIndex = groupData.questions.findIndex(i=>i?.mother)
    const mother = groupData.questions[questionMotherIndex]
    setDataAll([...dataAll.slice(0,index+1),{id,questionId:mother.id,type:'question'}])
  }

  function onDuplicate() {

    let copyDataChecklist = {...dataChecklist}
    copyDataChecklist = clone(copyDataChecklist)
    const categoryIndex = copyDataChecklist.data.findIndex(i=>i.id==position[1].id)
    const questions = [...copyDataChecklist.data[categoryIndex].questions.filter(i=>i.group == actionsData.groupName)]

    const newQuestions = []
    questions.map((item)=>{
      const uid = Math.floor((1 + Math.random()) * 0x100000000000).toString(16).substring(1);
      newQuestions.push({...item,id:uid,group:title})
    })

    copyDataChecklist.data[categoryIndex].groups = [...copyDataChecklist.data[categoryIndex].groups,title]
    copyDataChecklist.data[categoryIndex].questions = [...copyDataChecklist.data[categoryIndex].questions,...newQuestions]

    setDataChecklist({...copyDataChecklist})
    setSave(true)
    onCloseModalAdd()
  }

  function onEdit() {

    let copyDataChecklist = {...dataChecklist}
    copyDataChecklist = clone(copyDataChecklist)
    const categoryIndex = copyDataChecklist.data.findIndex(i=>i.id==position[1].id)
    const groupIndex = copyDataChecklist.data[categoryIndex].groups.findIndex(i=>i==actionsData.groupName)
    const questions = [...copyDataChecklist.data[categoryIndex].questions.filter(i=>i.group == actionsData.groupName)]

    const newQuestions = []
    questions.map((item)=>{
      newQuestions.push({...item,group:title})
    })

    copyDataChecklist.data[categoryIndex].questions = [...copyDataChecklist.data[categoryIndex].questions.filter(i=>i.group != actionsData.groupName),...newQuestions]
    copyDataChecklist.data[categoryIndex].groups[groupIndex] = title


    setDataAll(dataAll=>[...dataAll.slice(0,2)])
    setPosition(position=>[...position.slice(0,2)]);
    setDataChecklist({...copyDataChecklist})
    setSave(true)
    onCloseModalAdd()
  }

  function onDelete() {
    //copyDataChecklist.data = [...dataChecklist.data.filter(i=>i.id != actionsData.groupId)]

    let copyDataChecklist = {...dataChecklist}
    copyDataChecklist = clone(copyDataChecklist)
    const categoryIndex = copyDataChecklist.data.findIndex(i=>i.id==position[1].id)
    const questions = [...copyDataChecklist.data[categoryIndex].questions.filter(i=>i.group !== actionsData.groupName)]

    copyDataChecklist.data[categoryIndex].questions = [...questions]
    copyDataChecklist.data[categoryIndex].groups = [...copyDataChecklist.data[categoryIndex].groups.filter(i=>i != actionsData.groupName)]

    setDataAll(dataAll=>[...dataAll.slice(0,2)])
    setPosition(position=>[...position.slice(0,2)]);
    setDataChecklist({...copyDataChecklist})
    setSave(true)
    onCloseModalAdd()
  }

  function onDeleteMother() {
    //copyDataChecklist.data = [...dataChecklist.data.filter(i=>i.id != actionsData.groupId)]

    let copyDataChecklist = {...dataChecklist}
    copyDataChecklist = clone(copyDataChecklist)
    const categoryIndex = copyDataChecklist.data.findIndex(i=>i.id==position[1].id)
    const questions = [...copyDataChecklist.data[categoryIndex].questions.filter(i=>!i?.mother)]

    copyDataChecklist.data[categoryIndex].questions = [...questions]

    setDataAll(dataAll=>[...dataAll.slice(0,2)])
    setPosition(position=>[...position.slice(0,2)]);
    setDataChecklist({...copyDataChecklist})
    setSave(true)
    onCloseModalAdd()
  }

  function onRightClick(text,item) {
    const categoryIndex = dataChecklist.data.findIndex(i=>i.id==position[1].id)
    if (text == 'Duplicar') {
      setOpen('dup')
      setActionsData({groupName:item.id})
      var name = `${item.id} - cópia`
      var cont = 1
      while (dataChecklist.data && dataChecklist.data[categoryIndex].groups.filter(i=>i == name.trim()).length > 0) {
        name = `${item.id} - cópia ${cont}`
        cont++
      }
      setTitle(name)
    } else if (text == 'Editar') {
      setOpen('edit')
      setActionsData({groupName:item.id})
      setTitle(item.id)
    } else if (text == 'Deletar') {
      setOpen('del')
      setActionsData({groupName:item.id})
      setTitle(item.id)
    }
    console.log('text',text)
    console.log('item',item)
  }

  function onRightMotherClick(text,item) {
    if (text == 'Deletar') {
      setOpen('del-mother')
      setTitle(item.text)
    }
    console.log('text',text)
    console.log('item',item)
  }

  function handleAddButton() {
    setOpen(true)
    setTitle('')
  }

  function onDisable(hasTitle) {
    if (open == 'del') return false
    if (hasTitle && title=='') return true
    if (open == 'edit' && actionsData?.groupName && groupData.groups && groupData.groups.filter(i=>i == title.trim()).length == 1 && groupData.groups.filter(i=>i == title.trim())[0] == actionsData.groupName) return false
    if (groupData.groups && groupData.groups.filter(i=>i == title.trim()).length > 0) return true
   }

  return (
    <>
      <p style={{marginBottom:15}}>Pergunta Geral</p>
      {groupData.questions.findIndex(i=>i?.mother) != -1 ?
        <div style={{paddingLeft:10,marginBottom:17}}>
          <Card
            fixedHeight
            title={groupData.questions[motherIndex].text}
            key={groupData.questions[motherIndex]?.id ?? index}
            position={position && position[2] && position[2]?.id == groupData.questions[motherIndex].id}
            onClick={()=>onMotherCardHandle(groupData.questions[motherIndex].id,groupData.questions[motherIndex].text)}
            item={groupData.questions[motherIndex]}
            open={openModalEdit}
            index={index}
            setOpen={setOpenModalEdit}
            onClickEdit={onRightMotherClick}
            disableDup={true}
            disableEdit={true}
          />
        </div >
      :
        <EmptyField onClick={onCreateQuestionMother}>
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
            {groupData.groups.length > 0 ? groupData.groups.map((item,index)=>{
              return (
                <CardDrop
                  fixedHeight
                  title={item}
                  key={`${item}/${index}`}
                  position={position && position[2] && position[2]?.id == item}
                  onClick={()=>onGroupCardHandle(item)}
                  item={{id:item}}
                  draggableId={`group/${item}/${index}`}
                  open={openModalEdit}
                  setOpen={setOpenModalEdit}
                  index={index}
                  onClickEdit={onRightClick}
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
      <AddCircle onClick={handleAddButton}>
        <Icons style={{fontSize:22}} type={`Add`}/>
      </AddCircle>
      <ModalButtons
        open={Boolean(open)}
        disable={onDisable(true)}
        onClick={open=='dup'?onDuplicate:open=='edit'?onEdit:open=='del'?onDelete:open=='del-mother'?onDeleteMother:onCreateNewGroup}
        onClose={onCloseModalAdd}
        title={open=='del'?'Deletar Grupo' : open=='edit' ? 'Editar Grupo' : open=='dup' ? 'Duplicar Grupo' : open=='del-mother' ? 'Deletar Pergunta Geral':'Adicionar Grupo'}
      >
          {open=='del' && <SubText >Você tem certeza que deseja deletar este card? Após concluido não é possivel desfazer.</SubText>}
          <InputTitle
            value={title}
            onChange={({target})=>setTitle(target.value)}
            placeholder={'Nome da grupo'}
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
},areEqual);



