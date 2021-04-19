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
import {NoCard,InputTitle,AddCircle,ErrorMessage,InputArea,SubText} from '../styles';
import {ModalButtons} from '../../../components/Main/MuiHelpers/ModalButtons'
import {InputCard} from './InputCard';
import { lighten,darken, } from "@material-ui/core/styles";
import { Droppable, Draggable,DragDropContext } from 'react-beautiful-dnd';
import clone from 'clone';

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
  const [actionsData, setActionsData] = useState({})

  //let copyDataChecklist = {...dataChecklist}
  const categoryIndex = dataChecklist.data.findIndex(i=>i.id == position[1].id)
  const questions = dataChecklist.data[categoryIndex].questions.filter(i=>i.group==data.groupName)

  function onCloseModalAdd() {
    setTitle('')
    setOpen(false)
  }

  function onCreateNewQuestion() {
    const uid = Math.floor((1 + Math.random()) * 0x100000000000).toString(16).substring(1);
    const addData = {type:'standard',group:position[2].title,action:{q_1:{id:'q_1',text:'SIM',data:[]},q_2:{id:'q_2',text:'NÃO',data:[]},q_3:{id:'q_3',text:'N.A.',data:[]}},photo:false,text:title,id:uid}
    setPosition([...position.slice(0,index+1),{id:uid,title:'Pergunta...'}]);

    var copyDataChecklist = {...dataChecklist}
    copyDataChecklist.data[categoryIndex].questions = [...copyDataChecklist.data[categoryIndex].questions,{...addData}]
    setDataAll([...dataAll.slice(0,index+1),{id:uid,questionId:uid,type:'question'}])

    setDataChecklist({...copyDataChecklist})
    setSave(true)
    onCloseModalAdd()
  }

  function onHandleQuestion(id,title) {
    console.log(dataAll.slice(0,index+1))
    setPosition([...position.slice(0,index+1),{id,title:title!=''?title:'Pergunta...'}]);
    setDataAll([...dataAll.slice(0,index+1),{id,questionId:id,type:'question'}])
  }

  function handleAddButton() {
    setOpen(true)
    setTitle('')
  }

  function onDuplicate() {
    const uid = Math.floor((1 + Math.random()) * 0x100000000000).toString(16).substring(1);

    let copyDataChecklist = {...dataChecklist}
    copyDataChecklist = clone(copyDataChecklist)
    const questionIndex = questions.findIndex(i=>i.id == actionsData.id)
    const question = {...questions[questionIndex]}
    copyDataChecklist.data[categoryIndex].questions = [...copyDataChecklist.data[categoryIndex].questions,{...question,id:uid,text:title}]

    setDataChecklist({...copyDataChecklist})
    setSave(true)
    onCloseModalAdd()
  }

  function onEdit() {

    let copyDataChecklist = {...dataChecklist}
    copyDataChecklist = clone(copyDataChecklist)
    const questionIndex = questions.findIndex(i=>i.id == actionsData.id)
    const question = {...questions[questionIndex]}

    copyDataChecklist.data[categoryIndex].questions = [...copyDataChecklist.data[categoryIndex].questions.filter(i=>i.id != actionsData.id),{...question,text:title}]

    setDataAll(dataAll=>[...dataAll.slice(0,index+1)])
    setPosition(position=>[...position.slice(0,index+1)]);
    setDataChecklist({...copyDataChecklist})
    setSave(true)
    onCloseModalAdd()
  }

  function onDelete() {
    //copyDataChecklist.data = [...dataChecklist.data.filter(i=>i.id != actionsData.groupId)]

    let copyDataChecklist = {...dataChecklist}
    copyDataChecklist = clone(copyDataChecklist)
    copyDataChecklist.data[categoryIndex].questions = [...copyDataChecklist.data[categoryIndex].questions.filter(i => (i.id != actionsData.id)&&(!i?.parent||i.parent != actionsData.id)&&(!i?.subParent || (i?.subParent && !i.subParent.includes(actionsData.id))))]

    setDataAll(dataAll=>[...dataAll.slice(0,index+1)])
    setPosition(position=>[...position.slice(0,index+1)]);
    setDataChecklist({...copyDataChecklist})
    setSave(true)
    onCloseModalAdd()
  }

  function onRightClick(text,item) {
    if (text == 'Duplicar') {
      setOpen('dup')
      setActionsData({id:item.id})
      var name = `${item.text} - cópia`
      var cont = 1
      while (questions && questions.filter(i=>i.text == name.trim()).length > 0) {
        name = `${item.text} - cópia ${cont}`
        cont++
      }
      setTitle(name)
    } else if (text == 'Editar') {
      setOpen('edit')
      setActionsData({id:item.id})
      setTitle(item.text)
    } else if (text == 'Deletar') {
      setOpen('del')
      setActionsData({id:item.id})
      setTitle(item.text)
    }
    console.log('text',text)
    console.log('item',item)
  }

  function onDisable(hasTitle) {
    if (open == 'del') return false
    if (hasTitle && title=='') return true
    if (open == 'edit' && actionsData?.id && questions && questions.filter(i=>i.text == title.trim()).length == 1 && questions.filter(i=>i.text == title.trim() && i.text != '')[0].id == actionsData.id) return false
    if (questions && questions.filter(i=>i.text == title.trim() && i.text != '').length > 0) return true
   }

  return (
    <>
      <p style={{marginBottom:15}}>Perguntas</p>
      <Droppable droppableId={`question/${data.groupName}/${index}`}>
        {(provided,snapshot) => (
          <div style={{overflowY:'auto',height:'94%',paddingLeft:10}} ref={provided.innerRef} {...provided.droppableProps}>
            {questions && questions.length > 0 ? questions.filter(i=>!i?.hide).map((item,indexItem)=>{
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
                  onClickEdit={onRightClick}
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
      <AddCircle onClick={handleAddButton}>
        <Icons style={{fontSize:22}} type={`Add`}/>
      </AddCircle>
      <ModalButtons
        open={Boolean(open)}
        disable={onDisable(true)}
        onClick={open=='dup'?onDuplicate:open=='edit'?onEdit:open=='del'?onDelete:onCreateNewQuestion}
        onClose={onCloseModalAdd}
        title={'Adicionar Pergunta'}
        title={open=='del'?'Deletar Pergunta' : open=='edit' ? 'Editar Pergunta' : open=='dup' ? 'Duplicar Pergunta':'Adicionar Pergunta'}
      >
          {open=='del' && <SubText >Você tem certeza que deseja deletar este card? Após concluido não é possivel desfazer.</SubText>}
          <InputArea
            value={title}
            onChange={({target})=>setTitle(target.value)}
            placeholder={'Descrição da pergunta'}
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



