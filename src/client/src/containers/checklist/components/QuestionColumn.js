import React, {useState,useEffect} from 'react';
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
import styled, {css,ThemeContext} from "styled-components";
import {Card} from './Card';
import {NoCard,InputTitle,AddCircle,ErrorMessage,EmptyField,IconCircle,ChooseDivYesNoNA,AddButtonAnswer} from '../styles';
import {ModalButtons} from '../../../components/Main/MuiHelpers/ModalButtons'
import { lighten,darken,fade } from "@material-ui/core/styles";
import {BootstrapTooltip} from '../../../components/Main/MuiHelpers/Tooltip'
import { Paper } from '@material-ui/core';
import {InputCard} from './InputCard';
import {Menu} from '../../../components/Main/MuiHelpers/Selected'
import {ContinueButton} from '../../../components/Main/MuiHelpers/Button'
import { Droppable, Draggable,DragDropContext } from 'react-beautiful-dnd';
import IconButton from '../../../components/Main/MuiHelpers/IconButton';
import {useNotification} from '../../../context/NotificationContext'
import clone from 'clone';
import {InputEnd} from '../../../components/Main/MuiHelpers/Input'
import {AddAnotherForm} from '../../../components/Dashboard/Components/Form/comp'


const selectOptions = [
  {text:'Padrão',tooltip:'Vem como padrão as opções de resposta "SIM", "NÃO", "N.A." (não se aplica).'},
  {text:'Multiplos',tooltip:'Possibilita que se escolha uma ou mais respostas a partir das opções criadas de forma personalizada.'},
  {text:'Personalizado',tooltip:'Você poderá personalizar as opõçes de resposta, sendo que somente uma poderá ser selecionada.'},
]

function Choose({text,active,...props}) {
  return (
    <div style={{flexDirection:'column',display:'flex',alignItems:'center',flex:1,margin:'0px 5px',cursor: 'pointer'}} {...props}>
      <p style={{margin:0,padding:0}}>{text}</p>
      <ChooseDivYesNoNA active={active}/>
    </div>
  );
}

function getOptions(question) {
  if (question.type == 'standard') {
    return ['SIM','NÃO','N.A.']
  } else {
    const questionsType = [];
    for (const key in question.action) {
      if (Object.hasOwnProperty.call(question.action, key)) {
        const element = question.action[key];
        questionsType.push(element.text)
      }
    }
    return questionsType;
  }
}

export function QuestionColumn({
  position,
  setPosition,
  data,
  index,
  onChangeQuestion:onGetRisks,
  setDataAll,
  dataAll,
  dataChecklist,
  setDataChecklist,
  setSave
}) {
  const categoryIndex = dataChecklist.data.findIndex(i=>i.id==position[1].id)
  const questionIndex = dataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==data.questionId)
  const question = dataChecklist.data[categoryIndex].questions[questionIndex]

  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState(getOptions(question))
  const [active, setActive] = useState(0)
  const [title, setTitle] = useState(question?.text);
  const theme = React.useContext(ThemeContext)
  const notification = useNotification();

  useEffect(() => {
    setTitle(question.text)
  }, [data])

  function onBlurTextEditSave(title,setTitle,oldValue, setOldValue) {
    if (title == '') {
      setTitle(oldValue)
      return
    }

    setOldValue(title)
    let copyDataChecklist = {...dataChecklist}
    copyDataChecklist = clone(copyDataChecklist)
    copyDataChecklist.data[categoryIndex].questions[questionIndex] = {...question,text:title}
    setDataChecklist({...copyDataChecklist})
    setSave(true)
  }

  function onSuggestPhoto() {
    let copyDataChecklist = {...dataChecklist}
    copyDataChecklist.data[categoryIndex].questions[questionIndex] = {...question,photo:!question.photo}
    setDataChecklist({...copyDataChecklist})
    setSave(true)
    return
  }

  function onChangeQuestionType(value) {
    const type = value == 'Padrão' ? 'standard':value == 'Multiplos' ? 'mult':value == 'Personalizado' ? 'pers' : value
    setPosition([...position.slice(0,index+1)]);
    let copyDataChecklist = {...dataChecklist}
    copyDataChecklist = clone(copyDataChecklist)

    if (type == 'standard') {
      const newActions = {}
      const actions = {...copyDataChecklist.data[categoryIndex].questions[questionIndex].action}
      for (const key in actions) {
        if (Object.hasOwnProperty.call(actions, key)) {
          if (['q_1','q_2','q_3'].includes(key)) {
            function getText() {
              if (key == 'q_1') return 'SIM'
              if (key == 'q_2') return 'NÃO'
              if (key == 'q_3') return 'N.A.'
            }
            const element = actions[key];
            newActions[key] = {...element,text:getText()}
          }
        }
      }
      copyDataChecklist.data[categoryIndex].questions[questionIndex].action = {...newActions}
    }

    copyDataChecklist.data[categoryIndex].questions[questionIndex] = {...copyDataChecklist.data[categoryIndex].questions[questionIndex],type}
    setOptions([...getOptions(copyDataChecklist.data[categoryIndex].questions[questionIndex])])
    setDataChecklist({...copyDataChecklist})
  }

  function onChangeAnswerYesNoNA(indexes) {

    setActive(indexes)

    const dados = {
      id:`${question.id}-q_${indexes+1}`,
      q:options[indexes],
      action:`q_${indexes+1}`,
      title:`${options[indexes]}`
    }

    let newPosition = [...position]
    let copyData = [...dataAll]

    if (dataAll[index+1] && newPosition[index+1] && dataAll[index+1].type == 'risk') {
      let strings = newPosition[index+1].title.split('-')
      newPosition[index+1] = {id:dados.id,title:`${dados.title} - ${strings[strings.length-1]}`}
      copyData[index+1] = {...copyData[index+1],action:dados.action}
    } else if (dataAll[index+1] && dataAll[index+1].type == 'jump') {
      let strings = newPosition[index+1].title.split('-')
      newPosition[index+1] = {id:`${dados.id}-jump`,title:`${dados.title} - ${strings[strings.length-1]}`}
      copyData[index+1] = {...copyData[index+1],action:dados.action}
    }

    if (dataAll[index+2] &&  !['riskData','jumpGroup'].includes(dataAll[index+2].type)) {
      copyData = [...copyData.slice(0,index+2)]
      newPosition = [...newPosition.slice(0,index+2)];
    }

    if (dataAll[index+2] && dataAll[index+2].type == 'jumpGroup') {
      newPosition = [...newPosition.slice(0,index+3)];
      copyData = [...copyData.slice(0,index+3)]
    }

    if (dataAll[index+1] && newPosition[index+1] && dataAll[index+1].type == 'question') {
      newPosition = [...newPosition.slice(0,index+1)];
      copyData = [...copyData.slice(0,index+1)]
    }

    setPosition([...newPosition]);
    setDataAll([...copyData])
    return
  }

  function onAddRiskFactor() {
    const dados = {
      id:`${question.id}-q_${active+1}`,
      action:`q_${active+1}`,
      title:`${options[active]} - Fatores de risco`,
    }

    setPosition([...position.slice(0,index+1),{id:dados.id,title:dados.title},{id:'search',title:'Pesquisa Fatores de Risco'}]);
    //onGetRisks() //if (risk.length == 0) onGetRisks({currentUser,notification,dispatch})
    setDataAll([...dataAll.slice(0,index+1),{id:dados.id,action:dados.action,questionId:question.id,type:'risk'},{type:'riskData',disabled:false}])
    return
  }

  function onAddJump() {
    const dados = {
      id:`${question.id}-q_${active+1}-jump`,
      action:`q_${active+1}`,
      title:`${options[active]} - Pular Perguntas`,
      questionId:question.id
    }

    setPosition([...position.slice(0,index+1),{id:dados.id,title:dados.title},{id:'jumpGroup',title:'Pesquisar Grupos'}]);
    //update data of columns
    setDataAll([...dataAll.slice(0,index+1),{id:dados.id,action:dados.action,questionId:dados.questionId,type:'jump'},{type:'jumpGroup',disabled:false,questionId:dados.questionId}])
    return
  }

  function onCreateSubQuestion() {

    var dados = {hide:true,parent:data.questionId};
    if (question?.parent) {
      dados.subParent = [question.parent]
    }
    if (question?.subParent) {
      dados.subParent = [...dados.subParent,...question.subParent]
    }
    if (question?.mother || question?.subMother) {
      dados.subMother = true
    } else {
      dados.group = position[2].title
    }

    const uid = Math.floor((1 + Math.random()) * 0x100000000000).toString(16).substring(1);
    const addData = {type:'standard',action:{q_1:{id:'q_1',text:'SIM',data:[]},q_2:{id:'q_2',text:'NÃO',data:[]},q_3:{id:'q_3',text:'N.A.',data:[]}},photo:false,text:'...',id:uid,...dados}


    let copyDataChecklist = {...dataChecklist}
    copyDataChecklist = clone(copyDataChecklist)
    copyDataChecklist.data[categoryIndex].questions[questionIndex].action[`q_${active+1}`] = {...copyDataChecklist.data[categoryIndex].questions[questionIndex].action[`q_${active+1}`],child:uid}
    copyDataChecklist.data[categoryIndex].questions = [...copyDataChecklist.data[categoryIndex].questions,{...addData}]

    setPosition([...position.slice(0,index+1),{id:uid,title:'Pergunta...'}]);
    setDataAll([...dataAll.slice(0,index+1),{id:uid,questionId:uid,type:'question'}])
    setDataChecklist({...copyDataChecklist})
    setSave(true)
  }

  function onHandleSubQuestion(questionSub) {
    setPosition([...position.slice(0,index+1),{id:questionSub.id,title:questionSub.text}]);
    setDataAll([...dataAll.slice(0,index+1),{id:questionSub.id,questionId:questionSub.id,type:'question'}])
  }

  function onDelete() {
    let copyDataChecklist = {...dataChecklist}
    copyDataChecklist = clone(copyDataChecklist)

    if (question?.parent) {
      const parentIndex = copyDataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==question.parent)
      var parent = {...copyDataChecklist.data[categoryIndex].questions[parentIndex]}
      parent =  clone(parent)
      for (const key in parent.action) {
          if (Object.hasOwnProperty.call(parent.action, key)) {
          const element = parent.action[key];
          if (element.child == question.id) delete parent.action[key]['child']
        }
      }
      copyDataChecklist.data[categoryIndex].questions[parentIndex] = {...parent}
    }

    const newQuestions = copyDataChecklist.data[categoryIndex].questions.filter(i => (i.id != question.id)&&(!i?.parent||i.parent != question.id)&&(!i?.subParent || (i?.subParent && !i.subParent.includes(question.id))))

    copyDataChecklist.data[categoryIndex].questions = [...newQuestions]

    setDataAll(dataAll=>[...dataAll.slice(0,index)])
    setPosition(position=>[...position.slice(0,index)]);
    setDataChecklist({...copyDataChecklist})
    setSave(true)
  }

  function handleDelete() {
    notification.modal({title: 'Deletar Pergunta',text:'Você tem certeza que deseka excluir essa pergunta? Essa ação é irreversível',open:true,onClick:()=>onDelete()})
  }

  function saveOptions() {
    setPosition([...position.slice(0,index+1)]);

    let copyDataChecklist = {...dataChecklist}
    copyDataChecklist = clone(copyDataChecklist)

    const newActions = {}
    options.map((item,index)=>{
      if (copyDataChecklist.data[categoryIndex].questions[questionIndex].action[`q_${index+1}`]) newActions[`q_${index+1}`] = {...copyDataChecklist.data[categoryIndex].questions[questionIndex].action[`q_${index+1}`],text:item}
      else newActions[`q_${index+1}`] = {id:`q_${index+1}`,text:item,data:[]}
    })

    copyDataChecklist.data[categoryIndex].questions[questionIndex].action = {...newActions}
    setDataChecklist({...copyDataChecklist})
    setOptions([...getOptions(copyDataChecklist.data[categoryIndex].questions[questionIndex])])
    setOpen(false)
  }

  function cancelOptions() {
    setOptions([...getOptions(question).filter(i=>i!='')])
    setOpen(false)
  }

  function changeOptions(index,text) {
    var newOptions = [...options]
    newOptions[index] =  text
    setOptions([...newOptions])
  }

  function addOption() {
    setOptions([...options,''])
  }

  function deleteOption(index) {
    const newOptions = [...options]
    newOptions.splice(index,1)
    setOptions([...newOptions])
  }

  return (
        <>
          <div style={{paddingRight:'10px',marginBottom:15,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <p className={'noBreakText'} style={{paddingRight:30}}>{question?.text ? question.text : 'Pergunta'}</p>
            <BootstrapTooltip placement="bottom" TransitionProps={{ timeout: {enter:500, exit: 50} }} title={'Deletar'} styletooltip={{transform: 'translateX(4px)'}}>
                <div>
                  {/* <Icons type="DeleteIcon" height={15} width={15}/> */}
                  <IconButton style={{height:33,width:33,marginRight:-8,opacity:0.7}} iconProps={{style:{fontSize:17}}} onClick={handleDelete} aria-label="DeleteIcon" icon={'DeleteIcon'}/>
                </div>
            </BootstrapTooltip>
          </div>
          <div style={{overflowY:'auto',height:'94%',paddingLeft:0}}>
            <InputCard title={title} setTitle={setTitle} onBlurTextEditSave={onBlurTextEditSave}/>
            <div style={{paddingLeft:10,marginBottom:17,marginTop:15,}}>
              <div style={{flexDirection:'row',display:'flex',alignItems:'center'}}>
                <BootstrapTooltip placement="bottom" enterDelay={400} TransitionProps={{ timeout: {enter:500, exit: 50} }} title={'Indicar para quem estiver realizando o checklist para tirar uma foto da situação apresentada.'} styletooltip={{transform: 'translateY(0px)'}}>
                  <IconCircle onClick={()=>onSuggestPhoto()} selected={question?.photo}>
                    <Icons type="Camera"/>
                  </IconCircle >
                </BootstrapTooltip>
                <Menu
                  options={selectOptions}
                  onSelect={onChangeQuestionType}
                  placeholder={"Selecione"}
                  defaultValue={question.type == 'standard' ? 'Padrão':question.type == 'mult' ? 'Multiplos' : 'Personalizado'}
                  label={false}
                  style={{width:'auto',flex:1,marginRight:10}}
                  type={'box'}
                />
              </div>
              <div style={{marginBottom:question.type == 'standard'?'15px':'7px',display:'flex',flexWrap:'wrap',flexDirection:'row',justifyContent:'space-between',width:'100%',paddingRight:0,marginLeft:-5,overflowX:'auto',marginTop:'15px'}}>
                {options.map((item,index)=>{
                  if (question.type == 'standard')
                  return (
                    <Choose key={`${item}/${index}`} onClick={()=>onChangeAnswerYesNoNA(index)} text={item} active={active==index}/>
                  )
                  if (question.type == 'mult'|| question.type == 'pers')
                  return (
                    <Choose key={index} onClick={()=>onChangeAnswerYesNoNA(index)} text={index} active={active==index}/>
                  )
                })}
              </div>
              {(question.type == 'mult' || question.type == 'pers') &&
                <div style={{marginBottom:'15px',display:'flex',flex:1,alignItems:'center',justifyContent:'flex-end',marginRight:10}}>
                  <BootstrapTooltip placement="bottom" enterDelay={700} TransitionProps={{ timeout: {enter:500, exit: 50} }} title={'Editar a quantidade e conteúdo das opções de respostas.'} styletooltip={{transform: 'translateY(0px)'}}>
                    <AddButtonAnswer onClick={()=>setOpen(true)}>
                        <Icons type="Edit" style={{fontSize:15}} />
                    </AddButtonAnswer>
                  </BootstrapTooltip>
                </div>
              }
              <Card
                style={{marginBottom:'12px'}}
                button
                title={'Adicionar Fator de Risco'}
                position={position && position[index+1] && position[index+1]?.id == `${question.id}-q_${active+1}`}
                onClick={onAddRiskFactor}
              />
              <Card
                style={{marginBottom:'18px'}}
                button
                title={'Pular Perguntas e Grupos'}
                position={position && position[index+1] && position[index+1]?.id == `${question.id}-q_${active+1}-jump`}
                onClick={onAddJump}
              />

              <p className={'noBreakText'} style={{marginTop:15,marginBottom:15,maxWidth:150}}>{'Sub-Pergunta'}</p>
              {question && question.action[`q_${active+1}`] && question.action[`q_${active+1}`]?.child && dataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==question.action[`q_${active+1}`].child) != -1 ?
                  <div style={{marginBottom:17}}>
                  <Card
                    fixedHeight
                    title={dataChecklist.data[categoryIndex].questions[dataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==question.action[`q_${active+1}`].child)].text}
                    key={dataChecklist.data[categoryIndex].questions[dataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==question.action[`q_${active+1}`].child)].id}
                    position={position && position[index+1] && position[index+1]?.id == dataChecklist.data[categoryIndex].questions[dataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==question.action[`q_${active+1}`].child)].id}
                    onClick={()=>onHandleSubQuestion(dataChecklist.data[categoryIndex].questions[dataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==question.action[`q_${active+1}`].child)])}
                    item={dataChecklist.data[categoryIndex].questions[dataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==question.action[`q_${active+1}`].child)]}
                    index={index}
                    //questionChild=>dataChecklist.data[categoryIndex].questions[dataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==question.action[`q_${active+1}`].child)]
                    />
                </div >
              :
                <EmptyField style={{marginLeft:0}} onClick={onCreateSubQuestion}>
                  <p>Adicionar Sub Pergunta</p>
                  <BootstrapTooltip placement="bottom" TransitionProps={{ timeout: {enter:500, exit: 50} }} title={'Pergunta posterior caso responda conforme o item selecionado a cima.'} styletooltip={{transform: 'translateY(10px)'}}>
                    <div style={{top:10,position:'absolute',right:10,}}>
                      <Icons type="InfoShade"/>
                    </div >
                  </BootstrapTooltip>
                </EmptyField>
              }
            </div >
          </div>
          <ModalButtons
            open={Boolean(open)}
            disable={options.length == 0 || options.filter(i=>i.trim() == '').length > 0}
            onClick={saveOptions}
            onClose={()=>setOpen(false)}
            onCancel={cancelOptions}
            title={'Pesonalizar Opções de Respostas'}
          >
            <div style={{display:'flex',flexDirection:'column',flex:1,width:550}}>
              {options.map((item,index)=>{
                return (
                  <InputEnd
                    width={'100%'}
                    value={item}
                    onChange={({target})=>changeOptions(index,target.value)}
                    labelWidth={85}
                    label={`Resposta ${index+1}`}
                    status={'Normal'}
                    variant="outlined"
                    inputProps={{style: {textTransform: 'capitalize'}}}
                    iconProps={{
                      onClick:()=>deleteOption(index),
                      style:{opacity:0.5,transform:'scale(0.8)'}
                    }}
                    key={index}
                    status={'Normal'}
                    icon={'DeleteIcon'}
                    validation={true}
                  />
                )
              })}
            </div>
            <AddAnotherForm style={{marginTop:'10px',marginBottom:'10px'}} onClick={addOption}>
              Adicionar Outra
            </AddAnotherForm>
          </ModalButtons>
        </>
  );
}
