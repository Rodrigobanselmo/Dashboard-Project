import React, {useState} from 'react';
import {Icons} from '../../components/Icons/iconsDashboard';
import {
  ContainerDiv,
  ButtonContainer
} from './styles';
import NewTabs, {TabPanel} from '../../components/Main/MuiHelpers/NewTabs'
import {FilterComponent,LoadingContent,AddUserButton} from '../../components/Main/Table/comp'
import {COMPANY} from '../../routes/routesNames.ts'
import {onGetChecklist,onCreateChecklist,onSaveChecklistData,onGetRisks} from './func'
import store from './store'
import { Header } from './components/Header'
import { FirstColumn } from './components/FirstColumn'
import { Column } from './components/Columns'
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useSelector,useDispatch } from 'react-redux'
import useTimeOut from '../../hooks/useTimeOut';
import clone from 'clone';

//import { useResizeDetector } from 'react-resize-detector';
//////import {useLoaderDash} from '../../context/LoadDashContext'

export default function Container({children}) {
    return (
      <ContainerDiv >
        {children}
      </ContainerDiv>
    );
}

export function MainComponent({currentUser,notification,setLoad,setSelected,selected,rowsCells,setRowsCells,tabsLabel,setOpen,}) {

  const [data, setData] = useState([]); //dado do checklist presente nas telas
  const [allChecklists,setAllChecklists] = useState(store); //somente as informacoes dos nomes e ids dos checklists
  const [dataChecklist, setDataChecklist] = useState({data:[]}); //dado do checklist vindo do backend com tuso possivel
  const [position, setPosition] = useState([]);
  const [openModalEdit,setOpenModalEdit] = React.useState(false) //modal para editar/duplicar/deletar
  const [save, setSave] = useState(false) //para dizer se pode ou nao salvar
  const [searchRisk, setSearchRisk] = useState('')
  const [searchRiskData, setSearchRiskData] = useState('')
  const [loading, setLoading] = useState(false)

  const history = useHistory();
  const risk = useSelector(state => state.risk)
  const riskData = useSelector(state => state.riskData)
  const dispatch = useDispatch()
  const [onTimeOut,onClearTime] = useTimeOut()
  //const { width, ref } = useResizeDetector();
  /////const {setLoadDash} = React.useCallback(()=>useLoaderDash(),[]);


  React.useEffect(() => {
    //onGetAllCompanies(currentUser.company.id,setRowsCells,setLoadContent,notification)
    return onClearTime()
  }, [])

  console.log('dataChecklist',dataChecklist)

  //Card Handler
  function onChecklistHandle(id,title) {
    if (position && position[0] && position[0].id == id) return;
    setPosition([{id,title}]);
    onGetChecklist({currentUser,id,setDataChecklist,setData,setLoad})
  }

  function onChecklistCategoryCardHandle(id,title,index) {
    //if (position && position[1] && position[1].id == id) return;
    setPosition([position[0],{id,title}]);

    let dataQuestionsGroups = []
    dataChecklist.data[index].groups.map(item=>{
      dataQuestionsGroups.push({title:item,id:item})
    })
    let groupIndex = dataChecklist.data.findIndex(i=>i.id==id)
    if (dataChecklist.data[groupIndex]?.questions.findIndex(i=>i?.mother) != -1) {
      let motherQuestion = dataChecklist.data[groupIndex].questions[dataChecklist.data[groupIndex].questions.findIndex(i=>i?.mother)]
      dataQuestionsGroups.push({title:motherQuestion.text,...motherQuestion})
    }
    setData([data[0],dataQuestionsGroups])
  }

  function onChecklistGroupCardHandle(id) {
    //if (position && position[2] && position[2].id == id) return;


    //get checklist data from database
    let copyDataChecklist = {...dataChecklist}
    const categoryIndex = copyDataChecklist.data.findIndex(i=>i.id == position[1].id)
    const questions = dataChecklist.data[categoryIndex].questions.filter(i=>i.group==id)

    setPosition([position[0],position[1],{id,title:id}]);
    setData([data[0],data[1],{data:[...questions],type:'questionData'}])
    //questionData
  }

  function onChecklistquestionMotherCardHandle(id,title,index) {
    //if (position && position[index] && position[index].id == id) return;
    setPosition([...position.slice(0,index+1),{id,title:title!=''?title:'Pergunta...'}]);
    //setData()
    let categoryIndex = dataChecklist.data.findIndex(i=>i.id==position[1].id)
    let questionMotherIndex = dataChecklist.data[categoryIndex].questions.findIndex(i=>i?.mother)
    let mother = dataChecklist.data[categoryIndex].questions[questionMotherIndex]
    setData([...data.slice(0,index+1),{...mother}])
  }

  function onChecklistquestionCardHandle(id,title,index) {
    //if (position && position[index] && position[index].id == id) return;
    setPosition([...position.slice(0,index+1),{id,title:title!=''?title:'Pergunta...'}]);
    //setData()
    let categoryIndex = dataChecklist.data.findIndex(i=>i.id==position[1].id)
    let questionIndex = dataChecklist.data[categoryIndex].questions.findIndex(i=>i.id == id)
    let question = dataChecklist.data[categoryIndex].questions[questionIndex]
    setData([...data.slice(0,index+1),{...question}])
  }

  function onJumpGroupsHandle(index,positionId,dados) {
    let copyData = [...data]
    setPosition([...position.slice(0,index+1),{id:positionId,title:'Pesquisar Perguntas'}]);
    //update data of columns
    setData([...copyData.slice(0,index+1),{type:'jumpQuestion',groupId:positionId,disabled:false,questionId:dados.questionId}])
    return
  }

  //Card Creation Operations
  function onCreateNewChecklist(title) {
    // notification.error({message: ''})
    onCreateChecklist({setAllChecklists,title,currentUser,setLoad,notification})
  }

  function onCreateNewCategory(title) {
    //update data of columns
    let uid = Math.floor((1 + Math.random()) * 0x100000000000).toString(16).substring(1);
    let copyData = [...data]
    copyData[0] = [...copyData[0],{group:title,id:uid}]
    setData([...copyData])

    //update checklist data from database
    let copyDataChecklist = {...dataChecklist}
    copyDataChecklist.data = [...copyDataChecklist.data,{group:title,id:uid,questions:[],groups:[]}]
    setDataChecklist(copyDataChecklist)

    setSave(true)
  }

  function onCreateNewGroup(title) {
    //update data of columns
    let uid = Math.floor((1 + Math.random()) * 0x100000000000).toString(16).substring(1);
    let copyData = [...data]
    copyData[1] = [...copyData[1],{title:title,id:title}]
    setData([...copyData])

    //update checklist data from database
    let copyDataChecklist = {...dataChecklist}
    let groupIndex = copyDataChecklist.data.findIndex(i=>i.id==position[1].id)
    copyDataChecklist.data[groupIndex].groups = [...copyDataChecklist.data[groupIndex].groups,title]
    setDataChecklist(copyDataChecklist)
    setSave(true)
  }

  function onCreateQuestionMother(index) {

    let uid = Math.floor((1 + Math.random()) * 0x100000000000).toString(16).substring(1);

    //setPosition to it
    setPosition([...position.slice(0,index+1),{id:uid,title:'Pergunta...'}]);

    //data
    let addData = {type:'standard',action:{q_1:{id:'q_1',text:'SIM',data:[]},q_2:{id:'q_2',text:'NÃO',data:[]},q_3:{id:'q_3',text:'N.A.',data:[]}},photo:false,text:'',id:uid,mother:true}

    //update data of columns
    let addShortData = {title:'',id:uid,mother:true}
    let copyData = [...data.slice(0,index+1)]
    copyData[index] = [...copyData[index],{...addShortData}]
    setData([...copyData,{...addData}])


    //update checklist data from database
    let copyDataChecklist = {...dataChecklist}
    const categoryIndex = copyDataChecklist.data.findIndex(i=>i.id == position[1].id)
    copyDataChecklist.data[categoryIndex].questions = [{...addData},...copyDataChecklist.data[categoryIndex].questions]
    setDataChecklist(copyDataChecklist)
    setSave(true)
  }

  function onCreateQuestion(index,title) {

    let uid = Math.floor((1 + Math.random()) * 0x100000000000).toString(16).substring(1);

    //setPosition to it
    setPosition([...position.slice(0,index+1),{id:uid,title:'Pergunta...'}]);

    //data
    let addData = {type:'standard',group:position[2].title,action:{q_1:{id:'q_1',text:'SIM',data:[]},q_2:{id:'q_2',text:'NÃO',data:[]},q_3:{id:'q_3',text:'N.A.',data:[]}},photo:false,text:title,id:uid}

    //update data of columns
    let addShortData = {text:title,id:uid}
    let copyData = [...data.slice(0,index+1)]
    copyData[index].data = [...copyData[index].data,{...addShortData}]
    setData([...copyData,{...addData}])


    //update checklist data from database
    var copyDataChecklist = {...dataChecklist}
    const categoryIndex = copyDataChecklist.data.findIndex(i=>i.id == position[1].id)
    copyDataChecklist.data[categoryIndex].questions = [...copyDataChecklist.data[categoryIndex].questions,{...addData}]
    //console.log(copyDataChecklist.data[categoryIndex].questions)
    setDataChecklist({...copyDataChecklist})
    setSave(true)
  }

  //Question Manager
  function onChangeQuestion(action,index,dados) {

    //let uid = Math.floor((1 + Math.random()) * 0x100000000000).toString(16).substring(1);

    //data from Data
    let copyData = [...data]
    const dataQuestion = 'data' in copyData[index-1] ? copyData[index-1].data : copyData[index-1]
    const questionIndex = dataQuestion.findIndex(i=>i.id===dados.id)
    //data from DataChecklist
    let copyDataChecklist = {...dataChecklist}
    const categoryIndex = copyDataChecklist.data.findIndex(i=>i.id == position[1].id)
    const questionIndexDatabase = dataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==dados.id)
    const question = dataChecklist.data[categoryIndex].questions[questionIndexDatabase]

    if (action == 'text') { //update text from question

      //update data of columns
      copyData[index] = {...copyData[index],text:dados.text}
      if ('data' in copyData[index-1]) copyData[index-1].data[questionIndex] = {...copyData[index-1].data[questionIndex],text:dados.text}
      else copyData[index-1][questionIndex] = {...copyData[index-1][questionIndex],text:dados.text,title:dados.text}
      setData([...copyData])

      //update checklist data from database
      copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase] = {...question,text:dados.text}
      setDataChecklist({...copyDataChecklist})
      setSave(true)
      return
    }

    if (action == 'photo') { //update text from question

      //update data of columns
      copyData[index] = {...copyData[index],photo:!copyData[index].photo}
      setData([...copyData])

      //update checklist data from database
      copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase] = {...question,photo:!question.photo}
      setDataChecklist({...copyDataChecklist})
      setSave(true)
      return
    }

    if (action == 'type') { //update text from question

      setPosition([...position.slice(0,index+1)]);

      //update data of columns
      copyData[index] = {...copyData[index],type:dados.type}
      setData([...copyData])

      //update checklist data from database
      copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase] = {...question,type:dados.type}
      setDataChecklist({...copyDataChecklist})
      //setSave(true)
      return
    }

    if (action == 'answer') { //change from sim - nao - na

      let newPosition = [...position]

      //update data of columns

      if (copyData[index+1] && copyData[index+1].type == 'risk') {
        let strings = newPosition[index+1].title.split('-')
        newPosition[index+1] = {id:dados.id,title:`${dados.title} - ${strings[strings.length-1]}`}
        copyData[index+1] = {...copyData[index+1],...dados.action}
      } else if (copyData[index+1] && copyData[index+1].type == 'jump') {
        let strings = newPosition[index+1].title.split('-')
        newPosition[index+1] = {id:`${dados.id}-jump`,title:`${dados.title} - ${strings[strings.length-1]}`}
        copyData[index+1] = {...copyData[index+1],q:dados.q}
      }

      if (copyData[index+2] &&  !['riskData','jumpGroup'].includes(copyData[index+2].type)) {
        copyData = [...copyData.slice(0,index+2)]
        newPosition = [...newPosition.slice(0,index+2)];
      }

      if (copyData[index+2].type == 'jumpGroup') {
        newPosition = [...newPosition.slice(0,index+3)];
        copyData = [...copyData.slice(0,index+3)]
      }

      setPosition([...newPosition]);
      setData([...copyData])
      //setDataChecklist({...copyDataChecklist})
      return
    }

    if (action == 'risk') { //click on add risk button
      setPosition([...position.slice(0,index+1),{id:dados.id,title:dados.title},{id:'search',title:'Pesquisa Fatores de Risco'}]);
      if (risk.length == 0) onGetRisks({currentUser,notification,dispatch})
      //update data of columns
      setData([...copyData.slice(0,index+1),{...dados.action,type:'risk'},{type:'riskData',disabled:false}])
      setDataChecklist(copyDataChecklist)
      return

    }

    if (action == 'jump') { //click on add risk button
      setPosition([...position.slice(0,index+1),{id:dados.id,title:dados.title},{id:'jumpGroup',title:'Pesquisar Grupos'}]);
      //update data of columns
      setData([...copyData.slice(0,index+1),{q:dados.q,id:dados.id,jump:dados.jump,type:'jump'},{type:'jumpGroup',disabled:false,questionId:dados.questionId}])
      return

    }


  }

  function onSearchRisk(action,index,dados) {
    let copyData = [...data]

    if (action == 'search') {
      setLoading('risk')
      setSearchRisk(dados.search)
      onClearTime()
      onTimeOut(()=>{
        setLoading(false)
        if (risk.length == 0) onGetRisks({currentUser,notification,dispatch})
      },600)
      return
    }
    if (action == 'focus') {

      setPosition([...position.slice(0,index+1),{id:'search',title:'Pesquisa Fatores de Risco'}]);

      //update data of columns
      setData([...copyData.slice(0,index+1),{type:'riskData',disabled:false}])
      return
    }
    if (action == 'edit') {

      let copyDataChecklist = {...dataChecklist}
      const categoryIndex = copyDataChecklist.data.findIndex(i=>i.id == position[1].id)
      const questionIndexDatabase = copyDataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==copyData[index-1].id)
      const questionActionTypeIndex = copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[dados.answerId].data.findIndex(i=>i.risk==dados.riskId)
      const questionActionTypeRisk = copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[dados.answerId].data[questionActionTypeIndex]
      setPosition([...position.slice(0,index+1),{id:dados.riskId,title:dados.riskName}]);

      //update data of columns
      setData([...copyData.slice(0,index+1),{type:'riskEdit',id:dados.riskId,name:dados.riskName,riskType:dados.riskType,answerId:dados.answerId,...questionActionTypeRisk}])
      return
    }
  }

  function onEditRisk(action,index,dados) {

    let copyData = [...data]

    //data from DataChecklist
    let copyDataChecklist = {...dataChecklist}
    const categoryIndex = copyDataChecklist.data.findIndex(i=>i.id == position[1].id)
    const questionIndexDatabase = copyDataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==copyData[index-2].id)
    const questionActionTypeIndex = copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[dados.answerId].data.findIndex(i=>i.risk==dados.risk||i.risk==dados.riskId)
    const questionActionTypeRisk = copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[dados.answerId].data[questionActionTypeIndex]

    if (action == 'mandatory') {
      //update data of columns
      copyData[index] = {...copyData[index],man:!copyData[index].man}
      copyData[index-1].data[copyData[index-1].data.findIndex(i=>i.risk==dados.risk)] = {...copyData[index-1].data[copyData[index-1].data.findIndex(i=>i.risk==dados.risk)],man:!copyData[index].man}
      setData([...copyData])

      //update checklist data from database
      //copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[dados.answerId].data = {...questionActionType,man:!questionActionType.man}
      copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[dados.answerId].data[questionActionTypeIndex] = {...questionActionTypeRisk,man:!questionActionTypeRisk.man}
      setDataChecklist({...copyDataChecklist})
      setSave(true)
      return
    }
    if (action == 'exp') {
      //update data of columns
      copyData[index] = {...copyData[index],exp:dados.exp}
      setData([...copyData])

      //update checklist data from database
      //copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[dados.answerId].data = {...questionActionType,man:!questionActionType.man}
      copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[dados.answerId].data[questionActionTypeIndex] = {...questionActionTypeRisk,exp:dados.exp}
      setDataChecklist({...copyDataChecklist})
      setSave(true)
      return
    }
    if (action == 'prob') {
      //update data of columns
      copyData[index] = {...copyData[index],prob:dados.prob}
      setData([...copyData])

      //update checklist data from database
      //copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[dados.answerId].data = {...questionActionType,man:!questionActionType.man}
      if (dados.prob == 'none') {
        delete questionActionTypeRisk['prob']
        copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[dados.answerId].data[questionActionTypeIndex] = {...questionActionTypeRisk}
      }
      else copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[dados.answerId].data[questionActionTypeIndex] = {...questionActionTypeRisk,prob:dados.prob}
      setDataChecklist({...copyDataChecklist})
      setSave(true)
      return
    }

    if (action == 'rec') {
      setPosition([...position.slice(0,index+1),{id:'rec',title:'Recomendações'},{id:'searchRec',title:'Pesquisar Recomendações'}]);
      //update data of columns
      setData([
        ...copyData.slice(0,index+1),
        {...dados,...copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[dados.answerId].data[questionActionTypeIndex],type:'riskSuggestion'},
        {disabled:false,type:'riskSuggestionData',...dados,...copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[dados.answerId].data[questionActionTypeIndex]}
      ])
      return
    }
    if (action == 'med') {
      setPosition([...position.slice(0,index+1),{id:'med',title:'Medidas de Controle'},{id:'searchMed',title:'Pesquisar Medidas de Controle'}]);
      //update data of columns
      setData([
        ...copyData.slice(0,index+1),
        {...dados,...copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[dados.answerId].data[questionActionTypeIndex],type:'riskSuggestion'},
        {disabled:false,type:'riskSuggestionData',...dados,...copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[dados.answerId].data[questionActionTypeIndex]}
      ])
      return
    }
    if (action == 'font') {
      setPosition([...position.slice(0,index+1),{id:'font',title:'Fontes Geradoras'},{id:'searchFont',title:'Pesquisar Fontes Geradoras'}]);
      //update data of columns
      setData([
        ...copyData.slice(0,index+1),
        {...dados,...copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[dados.answerId].data[questionActionTypeIndex],type:'riskSuggestion'},
        {disabled:false,type:'riskSuggestionData',...dados}
      ])
      return
    }
  }

  //Save On Database
  function onSaveChecklist(setLoading) {
    onSaveChecklistData({dataChecklist,setSave,setLoading,currentUser,notification})
  }

  const onDragStart = (result) => {
    const { source, draggableId, type } = result;
    //console.log('source', source, draggableId);
    let copyData = [...data]

    if (['risks','recs','meds','fonts'].includes(source.droppableId)) {//quando comecar a mexer o risco da coluna de fatores de risco, a coluna pare de ser droppable
      copyData[draggableId.split('/')[draggableId.split('/').length-1]] =  {...copyData[draggableId.split('/')[draggableId.split('/').length-1]],disabled:true}
      setData([...copyData])
    }

    if (['jumpGroups'].includes(source.droppableId)) {//quando comecar a mexer o risco da coluna de fatores de risco, a coluna pare de ser droppable
      copyData[draggableId.split('/')[draggableId.split('/').length-1]] =  {...copyData[draggableId.split('/')[draggableId.split('/').length-1]],disabled:true}
      if (copyData[parseInt(draggableId.split('/')[draggableId.split('/').length-1])+1]) copyData[parseInt(draggableId.split('/')[draggableId.split('/').length-1])+1] =  {...copyData[parseInt(draggableId.split('/')[draggableId.split('/').length-1])+1],disabled:true}
      setData([...copyData])
    }
    if (['jumpQuestions'].includes(source.droppableId)) {//quando comecar a mexer o risco da coluna de fatores de risco, a coluna pare de ser droppable
      copyData[draggableId.split('/')[draggableId.split('/').length-1]] =  {...copyData[draggableId.split('/')[draggableId.split('/').length-1]],disabled:true}
      copyData[parseInt(draggableId.split('/')[draggableId.split('/').length-1])-1] =  {...copyData[parseInt(draggableId.split('/')[draggableId.split('/').length-1])-1],disabled:true}
      setData([...copyData])
    }


  }

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    console.log('destination', destination, 'source', source, draggableId);

    var copyData = [...data]
    var copyDataChecklist = {...dataChecklist}
    copyData = clone(copyData)
    copyDataChecklist = clone(copyDataChecklist)

    if (['risks','recs','meds','fonts'].includes(source.droppableId)) { //quando soltar o risco da coluna de fatores de risco, a coluna volte a ser droppable
      copyData[draggableId.split('/')[draggableId.split('/').length-1]] =  {...copyData[draggableId.split('/')[draggableId.split('/').length-1]],disabled:false}
      setData([...copyData])
    }

    if (['jumpGroups'].includes(source.droppableId)) {//quando comecar a mexer o risco da coluna de fatores de risco, a coluna pare de ser droppable
      copyData[draggableId.split('/')[draggableId.split('/').length-1]] =  {...copyData[draggableId.split('/')[draggableId.split('/').length-1]],disabled:false}
      if (copyData[parseInt(draggableId.split('/')[draggableId.split('/').length-1])+1]) copyData[parseInt(draggableId.split('/')[draggableId.split('/').length-1])+1] =  {...copyData[parseInt(draggableId.split('/')[draggableId.split('/').length-1])+1],disabled:false}
      setData([...copyData])
    }

    if (['jumpQuestions'].includes(source.droppableId)) {//quando comecar a mexer o risco da coluna de fatores de risco, a coluna pare de ser droppable
      copyData[draggableId.split('/')[draggableId.split('/').length-1]] =  {...copyData[draggableId.split('/')[draggableId.split('/').length-1]],disabled:false}
      copyData[parseInt(draggableId.split('/')[draggableId.split('/').length-1])-1] =  {...copyData[parseInt(draggableId.split('/')[draggableId.split('/').length-1])-1],disabled:false}
      setData([...copyData])
    }

    if (!destination) {
      return;
    }

    //mexendo na mesma category
    if (source.droppableId == destination.droppableId && 'category' == destination.droppableId.split('/')[0]) { //

      const destArray = destination.droppableId.split('/')
      const draggableArray = draggableId.split('/')
      const index = destArray[2]


      const destinationList = [...copyData[index]];
      const draggingCard = destinationList.filter((card) => card.id === draggableArray[1])[0];

      destinationList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, draggingCard);

      copyData[index]= [...destinationList]
      setData([...copyData])

      //update checklist data from database
      const destinationChecklist = [...copyDataChecklist.data];
      const draggingChecklistCard = destinationChecklist.filter((card) => card.id === draggableArray[1])[0];

      destinationChecklist.splice(source.index, 1);
      destinationChecklist.splice(destination.index, 0, draggingChecklistCard);

      copyDataChecklist.data = [...destinationChecklist]
      setDataChecklist({...copyDataChecklist})
      setSave(true)
    }

    //mexendo na mesma group
    if (source.droppableId == destination.droppableId && 'group' == destination.droppableId.split('/')[0]) { //

      const destArray = destination.droppableId.split('/')
      const draggableArray = draggableId.split('/')
      const index = destArray[2]


      const destinationList = [...copyData[index]];
      const draggingCard = destinationList.filter((card) => card.id === draggableArray[1])[0];

      destinationList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, draggingCard);

      copyData[index]= [...destinationList]
      setData([...copyData])

      //update checklist data from database
      const categoryIndex = copyDataChecklist.data.findIndex(i=>i.id == position[1].id)
      const destinationChecklist = [...copyDataChecklist.data[categoryIndex].groups];
      const draggingChecklistCard = destinationChecklist.filter((card) => card === draggableArray[1])[0];

      destinationChecklist.splice(source.index, 1);
      destinationChecklist.splice(destination.index, 0, draggingChecklistCard);

      copyDataChecklist.data[categoryIndex].groups = [...destinationChecklist]
      setDataChecklist({...copyDataChecklist})
      setSave(true)
    }

    //mexendo na mesma questions
    if (source.droppableId == destination.droppableId && 'question' == destination.droppableId.split('/')[0]) { //

      const destArray = destination.droppableId.split('/')
      const draggableArray = draggableId.split('/')
      //const group = draggableArray[2]
      const index = destArray[2]
      const destinationId = copyData[index].data[destination.index].id


      const destinationList = [...copyData[index].data];
      const draggingCard = destinationList.filter((card) => card.id === draggableArray[1])[0];

      destinationList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, draggingCard);

      copyData[index].data= [...destinationList]
      setData([...copyData])

      //update checklist data from database
      const categoryIndex = copyDataChecklist.data.findIndex(i=>i.id == position[1].id)
      const destinationChecklist = [...copyDataChecklist.data[categoryIndex].questions];
      const questionIndexSource = destinationChecklist.findIndex((i) => i.id == draggableArray[1]);
      const questionIndexDestination = destinationChecklist.findIndex((i) => i.id == destinationId);
      const draggingChecklistCard = destinationChecklist.filter((i) => i.id == draggableArray[1])[0];


      destinationChecklist.splice(questionIndexSource, 1);
      destinationChecklist.splice(questionIndexDestination, 0, draggingChecklistCard);

      copyDataChecklist.data[categoryIndex].questions = [...destinationChecklist]
      setDataChecklist({...copyDataChecklist})
      setSave(true)
    }

    //se estiver mexendo na mesma coluna e for risk
    if (source.droppableId == destination.droppableId && destination.droppableId.split('/')[0] == 'risk') { //
      const destArray = destination.droppableId.split('/')
      const draggableArray = draggableId.split('/')
      const index = destArray[2]

      const destinationList = [...copyData[index].data];
      const draggingCard = destinationList.filter((card) => card.risk === draggableArray[1])[0];

      destinationList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, draggingCard);

      //update data of columns
      //if (copyData[destArray[2]].data.findIndex(i=>i.risk == draggableArray[1]) != -1) return;
      copyData[index].data = [...destinationList]
      setData([...copyData])

      //update checklist data from database
      const categoryIndex = copyDataChecklist.data.findIndex(i=>i.id == position[1].id)
      const questionId = position[index-1].id
      const questionIndexDatabase = copyDataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==questionId)
      const questionActionData = copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[destArray[1]].data

      const destinationChecklist = [...questionActionData];
      const draggingChecklistCard = questionActionData.filter((card) => card.risk === draggableArray[1])[0];

      destinationChecklist.splice(source.index, 1);
      destinationChecklist.splice(destination.index, 0, draggingChecklistCard);

      copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[destArray[1]].data = [...destinationChecklist]
      setDataChecklist({...copyDataChecklist})
      setSave(true)
    }

    //mexendo na mesma coluna
    if (source.droppableId == destination.droppableId && ['rec','recSug','med','medSug','font','fontSug'].includes(destination.droppableId.split('/')[0])) { //
      const column = destination.droppableId.split('/')[0]

      const destArray = destination.droppableId.split('/')
      const draggableArray = draggableId.split('/')
      const index = destArray[2]

      const destinationList = [...copyData[index][column]];
      const draggingCard = destinationList.filter((card) => card === draggableArray[1])[0];


      destinationList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, draggingCard);

      copyData[index][column] = [...destinationList]
      setData([...copyData])
    }

    //movendo entre colunas rec -recSug
    if ((`${source.droppableId.split('/')[0]}Sug` == destination.droppableId.split('/')[0] ||`${destination.droppableId.split('/')[0]}Sug` == source.droppableId.split('/')[0] ) && ['rec','recSug','med','medSug','font','fontSug'].includes(destination.droppableId.split('/')[0])) { //
      const columnSource = source.droppableId.split('/')[0]
      const columnDestination = destination.droppableId.split('/')[0]

      const destArray = destination.droppableId.split('/')
      //const sourceArray = source.droppableId.split('/')
      const draggableArray = draggableId.split('/')
      const index = destArray[2]

      const sourceList = copyData[index][columnSource]?[...copyData[index][columnSource]]:[];
      const destinationList = copyData[index][columnDestination]?[...copyData[index][columnDestination]]:[];
      const draggingCard = sourceList.filter((card) => card === draggableArray[1])[0];

      if (columnDestination in copyData[index] && copyData[index][columnDestination].findIndex(i=>i == draggableArray[1]) != -1) return;

      sourceList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, draggingCard);

      copyData[index][columnSource] = [...sourceList]
      copyData[index][columnDestination] = [...destinationList]
      //setData([...copyData])

    }

    //adicionando um risco da coluna de (Fatores de Risco) para a coluna (SIM - FATAORES ...)
    if (source.droppableId == 'risks' && destination.droppableId && destination.droppableId.split('/')[0] == 'risk') { //
      const destArray = destination.droppableId.split('/')
      const draggableArray = draggableId.split('/')
      const index = destArray[2]
      //update data of columns
      const destinationList = copyData[index]?.data ? [...copyData[index].data] : []
      destinationList.splice(destination.index, 0, {risk:draggableArray[1]});

      if (copyData[index]?.data && copyData[index].data.findIndex(i=>i.risk == draggableArray[1]) != -1) return;
      else copyData[index].data = [...destinationList]
      setData([...copyData])

      //update checklist data from database
      const categoryIndex = copyDataChecklist.data.findIndex(i=>i.id == position[1].id)
      const questionId = position[index-1].id
      const questionIndexDatabase = copyDataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==questionId)
      const questionActionData = copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[destArray[1]]?.data ? copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[destArray[1]].data : []

      const destinationChecklist = [...questionActionData]
      destinationChecklist.splice(destination.index, 0, {risk:draggableArray[1]});
      'data' in copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[destArray[1]] ? copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[destArray[1]].data=[...destinationChecklist] : []
      setDataChecklist({...copyDataChecklist})
      setSave(true)
    }

    //removendo um risco da coluna de (SIM - FATAORES ...) para a coluna (Fatores de Risco)
    if (destination.droppableId == 'risks' && source.droppableId && source.droppableId.split('/')[0] == 'risk') { //
      const sourceArray = source.droppableId.split('/')
      const draggableArray = draggableId.split('/')
      const index = sourceArray[2]
      //update data of columns
      copyData[index].data = [...copyData[index].data.filter(i=>i.risk!=draggableArray[1])]
      setData([...copyData])

      //update checklist data from database
      const categoryIndex = copyDataChecklist.data.findIndex(i=>i.id == position[1].id)
      const questionId = position[index-1].id
      const questionIndexDatabase = copyDataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==questionId)
      const questionActionData = copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[sourceArray[1]].data
      copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[sourceArray[1]].data = [...questionActionData.filter(i=>i.risk!=draggableArray[1])]
      setDataChecklist({...copyDataChecklist})
      setSave(true)
    }

    //adicionando da coluna de dados para rec-recSug
    if (['recs','meds','fonts'].includes(source.droppableId) && destination.droppableId && ['rec','recSug','med','medSug','font','fontSug'].includes(destination.droppableId.split('/')[0])) { //
      const column = destination.droppableId.split('/')[0]

      const destArray = destination.droppableId.split('/')
      const draggableArray = draggableId.split('/')
      const index = destArray[2] //index do data -- copyData

      const destinationList = column in copyData[index] ? [...copyData[index][column]] : [];
      destinationList.splice(destination.index, 0, draggableArray[1]);

      if (column in copyData[index] && copyData[index][column].findIndex(i=>i == draggableArray[1]) != -1) return;

      // //update data of columns
      copyData[index][column] = [...destinationList]
      //copyData[parseInt(index)+1][column] = [...destinationList] //para por na coluna seguinte tb
      setData([...copyData])

      // //update checklist data from database
      const categoryIndex = copyDataChecklist.data.findIndex(i=>i.id == position[1].id)
      const questionId = copyData[index-3].id
      const questionIndexDatabase = copyDataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==questionId)
      const riskId = copyData[index-1].id
      const answerId = copyData[index-1].answerId
      const questionActionTypeIndex = copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[answerId].data.findIndex(i=>i.risk==riskId)
      const questionActionData = copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[answerId].data[questionActionTypeIndex][column]

      const destinationChecklist = questionActionData ? [...questionActionData] : [];
      destinationChecklist.splice(destination.index, 0, draggableArray[1]);

      copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[answerId].data[questionActionTypeIndex][column] = [...destinationChecklist]
      setDataChecklist({...copyDataChecklist})
      setSave(true)
    }

    //removendo
    if (['recs','meds','fonts'].includes(destination.droppableId) && source.droppableId && ['rec','recSug','med','medSug','font','fontSug'].includes(source.droppableId.split('/')[0])) { //
      const column = source.droppableId.split('/')[0]

      const sourceArray = source.droppableId.split('/')
      const draggableArray = draggableId.split('/')
      const index = sourceArray[2] //index do data -- copyData

      // //update data of columns
      const dataFiltered = [...copyData[index][column].filter(i=>i!=draggableArray[1])]
      copyData[index][column] = [...dataFiltered]
      copyData[parseInt(index)+1][column] = [...dataFiltered]
      setData([...copyData])

      // //update checklist data from database
      const categoryIndex = copyDataChecklist.data.findIndex(i=>i.id == position[1].id)
      const questionId = copyData[index-3].id
      const questionIndexDatabase = copyDataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==questionId)
      const riskId = copyData[index-1].id
      const answerId = copyData[index-1].answerId
      const questionActionTypeIndex = copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[answerId].data.findIndex(i=>i.risk==riskId)
      const questionActionData = copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[answerId].data[questionActionTypeIndex][column]

      copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[answerId].data[questionActionTypeIndex][column] = [...questionActionData.filter(i=>i!=draggableArray[1])]
      setDataChecklist({...copyDataChecklist})
      setSave(true)
    }

    //adicionando um jump da coluna de (grupos) para a coluna (jump)
    if (source.droppableId == 'jumpGroups' && destination.droppableId && destination.droppableId.split('/')[0] == 'jump') { //
      const destArray = destination.droppableId.split('/')
      const draggableArray = draggableId.split('/')
      const index = destArray[2]

      //update data of columns
      const destinationList = copyData[index]?.jump && copyData[index].jump?.g ? [...copyData[index].jump.g] : []
      destinationList.splice(destination.index, 0, draggableArray[1]);

      if ( copyData[index]?.jump && copyData[index].jump?.g  && copyData[index].jump.g.findIndex(i=>i == draggableArray[1]) != -1) {return;}
      else if (copyData[index]?.jump && copyData[index].jump?.g) copyData[index] = {...copyData[index],jump:{...copyData[index].jump,g:[...destinationList]}}
      else if (copyData[index]?.jump) copyData[index].jump.g = copyData[index] = {...copyData[index],jump:{...copyData[index].jump,g:[...destinationList]}}
      else copyData[index] = {...copyData[index],jump:{g:[...destinationList]}}

      setData([...copyData])

      //update checklist data from database
      const categoryIndex = copyDataChecklist.data.findIndex(i=>i.id == position[1].id)
      const questionId = position[index-1].id
      const questionIndexDatabase = copyDataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==questionId)
      //const questionData = {...copyDataChecklist.data[categoryIndex]}
      //const questionQuestion = {...copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase]}
      const questionAction = {...copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[destArray[1]]}
      if (questionAction?.jump && questionAction.jump?.g) {
        console.log('23456',questionAction.jump.g)
        const destinationChecklist = [...questionAction.jump.g]
        destinationChecklist.splice(destination.index, 0, draggableArray[1]);
        copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[destArray[1]].jump.g = [...destinationChecklist]
      } else if (questionAction?.jump) {
        copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[destArray[1]].jump = {g:[draggableArray[1]],...copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[destArray[1]].jump}
      } else {
        copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[destArray[1]].jump = {g:[draggableArray[1]]}
      }
      console.log(copyDataChecklist)
      setDataChecklist({...copyDataChecklist})
      setSave(true)
    }

    if (source.droppableId == 'jumpQuestions' && destination.droppableId && destination.droppableId.split('/')[0] == 'jump') { //
      const destArray = destination.droppableId.split('/')
      const draggableArray = draggableId.split('/')
      const index = destArray[2]

      //update data of columns
      const destinationList = copyData[index]?.jump && copyData[index].jump?.q ? [...copyData[index].jump.q] : []
      destinationList.splice(destination.index, 0, draggableArray[1]);

      if ( copyData[index]?.jump && copyData[index].jump?.q  && copyData[index].jump.q.findIndex(i=>i == draggableArray[1]) != -1) return;
      else if (copyData[index]?.jump && copyData[index].jump?.q) copyData[index].jump.q = [...destinationList]
      else if (copyData[index]?.jump) copyData[index].jump.q = [...destinationList,...copyData[index].jump]
      else copyData[index]= {...copyData[index],jump:{g:[...destinationList]}}
      setData([...copyData])

      //update checklist data from database
      const categoryIndex = copyDataChecklist.data.findIndex(i=>i.id == position[1].id)
      const questionId = position[index-1].id
      const questionIndexDatabase = copyDataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==questionId)
      const questionAction = {...copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[destArray[1]]}
      if (questionAction?.jump && questionAction.jump?.q) {
        const destinationChecklist = [...questionAction.jump.q]
        destinationChecklist.splice(destination.index, 0, draggableArray[1]);
        copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[destArray[1]].jump.q = [...destinationChecklist]
      } else if (questionAction?.jump) {
        copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[destArray[1]].jump = {...copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[destArray[1]].jump,q:[draggableArray[1]]}
      } else {
        copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[destArray[1]].jump = {q:[draggableArray[1]]}
      }
      console.log(copyDataChecklist)
      //setDataChecklist({...copyDataChecklist})
      setSave(true)
    }

  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div style={{height: 600,display:'flex',flexDirection:'column',width:'100%',minWidth:800}}>
        <Header position={position} save={save} setSave={setSave} onSaveChecklist={onSaveChecklist}/>
        <div style={{display:'flex',height: 550,flexDirection:'row',width:'100%',transition:'transform 0.4s ease',transform:`translateX(-${position.length !=2 ? 25*(position.length-3):0}%)`}}>
          <FirstColumn
            position={position}
            setPosition={setPosition}
            data={allChecklists}
            setData={setAllChecklists}
            onChecklistHandle={onChecklistHandle}
            openModalEdit={openModalEdit}
            setOpenModalEdit={setOpenModalEdit}
            onCreateNewChecklist={onCreateNewChecklist}
            />
          {data && data.map((item,index)=>{
            return (
              <Column
                key={item?.id??index}
                index={index}
                data={item}
                openModalEdit={openModalEdit}
                setOpenModalEdit={setOpenModalEdit}
                position={position}
                setPosition={setPosition}
                onChecklistCategoryCardHandle={onChecklistCategoryCardHandle}
                onCreateNewCategory={onCreateNewCategory}
                onChecklistGroupCardHandle={onChecklistGroupCardHandle}
                onCreateNewGroup={onCreateNewGroup}
                onCreateQuestionMother={onCreateQuestionMother}
                onChecklistquestionMotherCardHandle={onChecklistquestionMotherCardHandle}
                onChecklistquestionCardHandle={onChecklistquestionCardHandle}
                onChangeQuestion={onChangeQuestion}
                onCreateQuestion={onCreateQuestion}
                onJumpGroupsHandle={onJumpGroupsHandle}
                type={item?.action ? 'question' : {...item}}
                searchRisk={searchRisk}
                searchRiskData={searchRiskData}
                onSearchRisk={onSearchRisk}
                loading={loading}
                onEditRisk={onEditRisk}
                dataChecklistGroup={position[1] && dataChecklist?.data ? dataChecklist.data[dataChecklist.data.findIndex(i=>i.id == position[1].id)] : null}
                dataAll={data}
                setDataAll={setData}
                dataChecklist={dataChecklist}
                setDataChecklist={setDataChecklist}
                setSave={setSave}
              />
            )
          })}
          {data && data.length ==0 &&
            <Column/>
          }
          {data && data.length <=1 &&
            <Column/>
          }
          {data && data.length <=2 &&
            <Column/>
          }
        </div>
      </div>
    </DragDropContext>
  );
}



