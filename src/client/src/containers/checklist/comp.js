import React, {useState} from 'react';
import {Icons} from '../../components/Icons/iconsDashboard';
import {
  ContainerDiv,
  ButtonContainer
} from './styles';
import {COMPANY} from '../../routes/routesNames.ts'
import {onGetChecklist,onCreateChecklist,onSaveChecklistData,onGetRisks,onDeleteChecklist,onEditChecklist,onDuplicateChecklist} from './func'
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

export function MainComponent({currentUser,notification,setLoad,setLoaderDash}) {

  const [data, setData] = useState([]); //dado do checklist presente nas telas
  const [allChecklists,setAllChecklists] = useState(store); //somente as informacoes dos nomes e ids dos checklists
  const [dataChecklist, setDataChecklist] = useState({data:[]}); //dado do checklist vindo do backend com tuso possivel
  const [position, setPosition] = useState([]);
  const [openModalEdit,setOpenModalEdit] = React.useState(false) //modal para editar/duplicar/deletar
  const [save, setSave] = useState(false) //para dizer se pode ou nao salvar
  const [searchRisk, setSearchRisk] = useState('')
  const [loading, setLoading] = useState(false)

  const history = useHistory();
  const risk = useSelector(state => state.risk)
  const dispatch = useDispatch()
  const [onTimeOut,onClearTime] = useTimeOut()
  //const { width, ref } = useResizeDetector();
  /////const {setLoadDash} = React.useCallback(()=>useLoaderDash(),[]);

  React.useEffect(() => {
    //onGetAllCompanies(currentUser.company.id,setRowsCells,setLoadContent,notification)
    return onClearTime()
  }, [])

  //Card Handler
  function onChecklistHandle(id,title) {
    if (position && position[0] && position[0].id == id) return;
    setPosition([{id,title}]);
    onGetChecklist({currentUser,id,setDataChecklist,setData,setLoad})
    onGetRisks({currentUser,notification,dispatch})
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
    const uid = Math.floor((1 + Math.random()) * 0x1000000000000000000).toString(16).substring(1);
    setPosition([{id:uid,title}]);

    function onSuccess(checklist) {
      setData([{title,id:uid}])
      setDataChecklist({...checklist})
    }

    onCreateChecklist({id:uid,setAllChecklists,onSuccess,title,currentUser,setLoad,notification})
  }

  function onDuplicateNewChecklist(title) {
    const uid = Math.floor((1 + Math.random()) * 0x1000000000000000000).toString(16).substring(1);

    setPosition([{id:uid,title}]);
    const checklistData = {...dataChecklist,id:uid,title}

    function onSuccess(checklist) {
      setData([{title,id:uid}])
      setDataChecklist({...checklist})
      setAllChecklists(data=>[...data,{id:uid,title}])
    }

    onDuplicateChecklist({id:uid,checklistData,setAllChecklists,onSuccess,title,currentUser,setLoad,notification})
  }

  function onDeleteDataChecklist(id) {

    function onSuccess(id) {
      setPosition([])
      setData([])
      //setDataChecklist({})
    }

    onDeleteChecklist({id,setAllChecklists,onSuccess,currentUser,setLoad,notification})
  }

  function onEditDataChecklist(id,title) {

    function onSuccess() {
      let copyDataChecklist = {...dataChecklist}
      copyDataChecklist.title = title
      let newData = [...allChecklists]
      const dataIndex = allChecklists.findIndex(i=>i.id == id)
      if (newData[dataIndex]) newData[dataIndex].title = title
      setAllChecklists([...newData])
      setPosition([{id,title}]);
      setData([{title,id}])
      setDataChecklist({...copyDataChecklist})
    }

    onEditChecklist({id,onSuccess,currentUser,setLoad,notification})
  }

  //Question Manager
  function onChangeQuestion(action,index,dados) {

  }

  function onSearchRisk(action,index,dados) {
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
      setData([...data.slice(0,index+1),{type:'riskData',disabled:false}])
      return
    }
    if (action == 'edit') {
      setPosition([...position.slice(0,index+1),{id:dados.riskId,title:dados.riskName}]);
      setData([...data.slice(0,index+1),{type:'riskEdit',id:`${dados.riskId}/${dados.answerId}`,riskId:dados.riskId,name:dados.riskName,riskType:dados.riskType,answerId:dados.answerId,questionId:dados.questionId}])
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

      const draggableArray = draggableId.split('/')
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

      const draggableArray = draggableId.split('/')
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

      const categoryIndex = copyDataChecklist.data.findIndex(i=>i.id == position[1].id)
      const destinationChecklist = [...copyDataChecklist.data[categoryIndex].questions];

      const questions = destinationChecklist.filter(i=>i.group==destArray[1])
      const destinationId = questions[destination.index].id

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
      // const column = destination.droppableId.split('/')[0]

      // const destArray = destination.droppableId.split('/')
      // const draggableArray = draggableId.split('/')
      // const index = destArray[2]

      // const destinationList = [...copyData[index][column]];
      // const draggingCard = destinationList.filter((card) => card === draggableArray[1])[0];


      // destinationList.splice(source.index, 1);
      // destinationList.splice(destination.index, 0, draggingCard);

      // copyData[index][column] = [...destinationList]
      // setData([...copyData])
    }

    //movendo entre colunas rec -recSug
    if ((`${source.droppableId.split('/')[0]}Sug` == destination.droppableId.split('/')[0] ||`${destination.droppableId.split('/')[0]}Sug` == source.droppableId.split('/')[0] ) && ['rec','recSug','med','medSug','font','fontSug'].includes(destination.droppableId.split('/')[0])) { //
      const columnSource = source.droppableId.split('/')[0]
      const columnDestination = destination.droppableId.split('/')[0]

      const destArray = destination.droppableId.split('/')
      //const sourceArray = source.droppableId.split('/')
      const draggableArray = draggableId.split('/')
      const index = destArray[2]

      const categoryIndex = copyDataChecklist.data.findIndex(i=>i.id == position[1].id)
      const questionId = data[index].questionId
      const questionIndexDatabase = copyDataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==questionId)
      const riskId = data[index].riskId
      const answerId = data[index].answerId
      const questionActionTypeIndex = copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[answerId].data.findIndex(i=>i.risk==riskId)

      var sourceList = copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[answerId].data[questionActionTypeIndex][columnSource]
      var destinationList = copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[answerId].data[questionActionTypeIndex][columnDestination]

      if (!destinationList) destinationList = []
      if (!sourceList) sourceList = []

      const draggingCard = sourceList.filter((card) => card === draggableArray[1])[0];

      // if (columnDestination in copyData[index] && copyData[index][columnDestination].findIndex(i=>i == draggableArray[1]) != -1) return;

      sourceList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, draggingCard);

      copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[answerId].data[questionActionTypeIndex][columnSource] = [...sourceList]
      copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[answerId].data[questionActionTypeIndex][columnDestination] = [...destinationList]
      setDataChecklist({...copyDataChecklist})
      setSave(true)
    }

    //adicionando um risco da coluna de (Fatores de Risco) para a coluna (SIM - FATAORES ...)
    if (source.droppableId == 'risks' && destination.droppableId && destination.droppableId.split('/')[0] == 'risk') { //
      const destArray = destination.droppableId.split('/')
      const draggableArray = draggableId.split('/')
      const index = destArray[2]

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

      //update checklist data from database
      const categoryIndex = copyDataChecklist.data.findIndex(i=>i.id == position[1].id)
      const questionId = data[index].questionId
      const questionIndexDatabase = copyDataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==questionId)
      const riskId = data[index].riskId
      const answerId = data[index].answerId
      const questionActionTypeIndex = copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[answerId].data.findIndex(i=>i.risk==riskId)
      const questionActionData = copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[answerId].data[questionActionTypeIndex][column]

      const destinationChecklist = questionActionData ? [...questionActionData] : [];
      destinationChecklist.splice(destination.index, 0, draggableArray[1]);

      copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[answerId].data[questionActionTypeIndex][column] = [...destinationChecklist]
      setDataChecklist({...copyDataChecklist})
      setSave(true)
    }

    //removendo risks
    if (['recs','meds','fonts'].includes(destination.droppableId) && source.droppableId && ['rec','recSug','med','medSug','font','fontSug'].includes(source.droppableId.split('/')[0])) { //
      const column = source.droppableId.split('/')[0]

      const sourceArray = source.droppableId.split('/')
      const draggableArray = draggableId.split('/')
      const index = sourceArray[2] //index do data -- copyData

      //update checklist data from database
      const categoryIndex = copyDataChecklist.data.findIndex(i=>i.id == position[1].id)
      const questionId = data[index].questionId
      const questionIndexDatabase = copyDataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==questionId)
      const riskId = data[index].riskId
      const answerId = data[index].answerId
      const questionActionTypeIndex = copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[answerId].data.findIndex(i=>i.risk==riskId)
      const questionActionData = copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[answerId].data[questionActionTypeIndex][column]

      copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase].action[answerId].data[questionActionTypeIndex][column] = [...questionActionData.filter(i=>i!=draggableArray[1])]
      setDataChecklist({...copyDataChecklist})
      setSave(true)
    }

    //adicionando um jump da coluna de (groups/questions) para a coluna (jump)
    if ((source.droppableId == 'jumpGroups' || source.droppableId == 'jumpQuestions') && destination.droppableId && destination.droppableId.split('/')[0] == 'jump') { //
      const destArray = destination.droppableId.split('/')
      const draggableArray = draggableId.split('/')
      const index = destArray[2]

      const categoryIndex = copyDataChecklist.data.findIndex(i=>i.id == position[1].id)
      const questionId = position[index-1].id
      const questionIndex = copyDataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==questionId)
      const questionAction= copyDataChecklist.data[categoryIndex].questions[questionIndex].action[destArray[1]]

      if (source.droppableId == 'jumpGroups' && draggableArray[0] == 'jumpGroup') {
        if (questionAction?.jump && questionAction.jump?.g) {
          const destinationChecklist = [...questionAction.jump.g]
          destinationChecklist.splice(destination.index, 0, draggableArray[1]);
          copyDataChecklist.data[categoryIndex].questions[questionIndex].action[destArray[1]].jump.g = [...destinationChecklist]
        } else if (questionAction?.jump) {
          copyDataChecklist.data[categoryIndex].questions[questionIndex].action[destArray[1]].jump = {g:[draggableArray[1]],...questionAction.jump}
        } else {
          copyDataChecklist.data[categoryIndex].questions[questionIndex].action[destArray[1]].jump = {g:[draggableArray[1]]}
        }

        if (questionAction?.jump && questionAction.jump?.q) {
          questionAction.jump.q.map(item=>{
            if (copyDataChecklist.data[categoryIndex].questions.filter(i=>i.id==item && i.group == draggableArray[1]).length > 0) {
              copyDataChecklist.data[categoryIndex].questions[questionIndex].action[destArray[1]].jump.q = copyDataChecklist.data[categoryIndex].questions[questionIndex].action[destArray[1]].jump.q.filter(i=>i!=item)
            }
          })
        }

      } else {
        if (questionAction?.jump && questionAction.jump?.q) {
          const destinationChecklist = [...questionAction.jump.q]
          destinationChecklist.splice(destination.index, 0, draggableArray[1]);
          copyDataChecklist.data[categoryIndex].questions[questionIndex].action[destArray[1]].jump.q = [...destinationChecklist]
        } else if (questionAction?.jump) {
          copyDataChecklist.data[categoryIndex].questions[questionIndex].action[destArray[1]].jump = {q:[draggableArray[1]],...questionAction.jump}
        } else {
          copyDataChecklist.data[categoryIndex].questions[questionIndex].action[destArray[1]].jump = {q:[draggableArray[1]]}
        }
      }

      setDataChecklist({...copyDataChecklist})
      setSave(true)
    }

    //removendo jumps
    if (['jumpQuestions','jumpGroups'].includes(destination.droppableId) && source.droppableId && ['jump'].includes(source.droppableId.split('/')[0])) { //
      const sourceArray = source.droppableId.split('/')
      const draggableArray = draggableId.split('/')
      const index = sourceArray[2]

      const categoryIndex = copyDataChecklist.data.findIndex(i=>i.id == position[1].id)
      const questionId = position[index-1].id
      const questionIndex = copyDataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==questionId)
      const questionAction= copyDataChecklist.data[categoryIndex].questions[questionIndex].action[sourceArray[1]]

      if (draggableArray[0] == 'jumpGroup') {
        const destinationChecklist = [...questionAction.jump.g.filter(i=>i!=draggableArray[1])]
        copyDataChecklist.data[categoryIndex].questions[questionIndex].action[sourceArray[1]].jump.g = [...destinationChecklist]
      } else {
        const destinationChecklist = [...questionAction.jump.q.filter(i=>i!=draggableArray[1])]
        copyDataChecklist.data[categoryIndex].questions[questionIndex].action[sourceArray[1]].jump.q = [...destinationChecklist]
      }
      setDataChecklist({...copyDataChecklist})
      setSave(true)
    }

  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div style={{height: 600,display:'flex',flexDirection:'column',width:'100%',minWidth:800}}>
        <Header setData={setData} setPosition={setPosition} position={position} save={save} setSave={setSave} onSaveChecklist={onSaveChecklist}/>
        <div style={{display:'flex',height: 550,flexDirection:'row',width:'100%',transition:'transform 0.4s ease',transform:`translateX(-${![0,1,2,3].includes(position.length) ? 25*(position.length-3):0}%)`}}>
          <FirstColumn
            position={position}
            setPosition={setPosition}
            data={allChecklists}
            setData={setAllChecklists}
            onChecklistHandle={onChecklistHandle}
            openModalEdit={openModalEdit}
            setOpenModalEdit={setOpenModalEdit}
            onCreateNewChecklist={onCreateNewChecklist}
            onEditDataChecklist={onEditDataChecklist}
            onDeleteDataChecklist={onDeleteDataChecklist}
            onDuplicateNewChecklist={onDuplicateNewChecklist}
            />
          {data && data.map((item,index)=>{
            return (
              <Column
                key={index}
                index={index}
                data={item}
                openModalEdit={openModalEdit}
                setOpenModalEdit={setOpenModalEdit}
                position={position}
                setPosition={setPosition}
                onChangeQuestion={onChangeQuestion}
                onJumpGroupsHandle={onJumpGroupsHandle}
                type={item}
                searchRisk={searchRisk}
                onSearchRisk={onSearchRisk}
                loading={loading}
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



