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
    //update data of columns
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

    //update data of columns


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

  console.log(1000)

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
      <ModalButtons open={open} disable={title=='' || (groupData.groups && groupData.groups.filter(i=>i == title).length > 0)} onClick={onCreateNewGroup} onClose={onCloseModalAdd} title={'Adicionar Categoria'} >
          <InputTitle
            value={title}
            onChange={({target})=>setTitle(target.value)}
            placeholder={'Nome do grupo'}
            error={groupData.groups && groupData.groups.filter(i=>i.title == title).length > 0}
          />
          {groupData.groups && groupData.groups.filter(i=>i.title == title).length > 0 &&
            <ErrorMessage>Nome já existente, por favor cadastre um nome diferente.</ErrorMessage>
          }
      </ModalButtons>
   </>
  );
},areEqual);



