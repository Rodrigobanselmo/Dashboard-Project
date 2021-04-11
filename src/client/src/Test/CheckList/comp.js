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
  const [searchRisk, setSearchRisk] = useState('') //para dizer se pode ou nao salvar

  const history = useHistory();
  const risk = useSelector(state => state.risk)
  const dispatch = useDispatch()
  //const { width, ref } = useResizeDetector();
  /////const {setLoadDash} = React.useCallback(()=>useLoaderDash(),[]);

  React.useEffect(() => {
    //onGetAllCompanies(currentUser.company.id,setRowsCells,setLoadContent,notification)
  }, [])

  //Card Handler
  function onChecklistHandle(id,title) {
    if (position && position[0] && position[0].id == id) return;
    setPosition([{id,title}]);
    onGetChecklist({currentUser,id,setDataChecklist,setData,setLoad})
    console.log('dataChecklist',dataChecklist)
  }

  function onChecklistCategoryCardHandle(id,title,index) {
    //if (position && position[1] && position[1].id == id) return;
    setPosition([position[0],{id,title}]);

    console.log('dataChecklist',dataChecklist.data[index])
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
    setPosition([position[0],position[1],{id,title:id}]);
    setData([data[0],data[1]])
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
    copyDataChecklist.data = [...copyDataChecklist.data,{group:title,id:uid,questions:[]}]
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
    let addData = {type:'standard',action:{q_1:{text:'SIM',data:[]},q_2:{text:'NÃO',data:[]},q_3:{text:'N.A.',data:[]}},photo:false,text:'',id:uid,mother:true}

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

  //Question Manager
  function onChangeQuestion(action,index,dados) {

    //let uid = Math.floor((1 + Math.random()) * 0x100000000000).toString(16).substring(1);

    //data from Data
    let copyData = [...data]
    const questionIndex = copyData[index-1].findIndex(i=>i.id===dados.id)

    //data from DataChecklist
    let copyDataChecklist = {...dataChecklist}
    const categoryIndex = copyDataChecklist.data.findIndex(i=>i.id == position[1].id)
    const questionIndexDatabase = dataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==dados.id)
    const question = dataChecklist.data[categoryIndex].questions[questionIndexDatabase]

    if (action == 'text') { //update text from question

      //update data of columns
      copyData[index] = {...copyData[index],text:dados.text,title:dados.text}
      copyData[index-1][questionIndex] = {...copyData[index-1][questionIndex],title:dados.text}
      setData([...copyData])

      //update checklist data from database
      copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase] = {...question,text:dados.text}
      setDataChecklist(copyDataChecklist)
      setSave(true)
      return
    }

    if (action == 'photo') { //update text from question

      //update data of columns
      copyData[index] = {...copyData[index],photo:!copyData[index].photo}
      setData([...copyData])

      //update checklist data from database
      copyDataChecklist.data[categoryIndex].questions[questionIndexDatabase] = {...question,photo:!question.photo}
      setDataChecklist(copyDataChecklist)
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
      setDataChecklist(copyDataChecklist)
      setSave(true)
      console.log(copyDataChecklist)
      return
    }

    if (action == 'risk') { //update text from question

      setPosition([...position.slice(0,index+1),{id:dados.id,title:dados.title}]);
      if (risk.length == 0) onGetRisks({currentUser,notification,dispatch})
      //update data of columns
      setData([...copyData.slice(0,index+1),{...dados.question,type:'risk'}])
      return

    }

    if (action == 'searchRisk') { //update text from question

      //setPosition([...position.slice(0,index+1),{id:dados.id,title:dados.title}]);
      setSearchRisk(dados.search)

      //update data of columns
      //setData([...copyData.slice(0,index+1),{...dados.question,type:'risk'}])
      return

    }


  }

  //Save On Database
  function onSearchRisk(action,index,dados) {
    if (action == 'search') { //update text from question

      //setPosition([...position.slice(0,index+1),{id:dados.id,title:dados.title}]);
      setSearchRisk(dados.search)

      //update data of columns
      //setData([...copyData.slice(0,index+1),{...dados.question,type:'risk'}])
      return
    }
  }

  function onSaveChecklist(setLoading) {
    onSaveChecklistData({dataChecklist,setSave,setLoading,currentUser,notification})
  }

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    console.log('destination', destination, 'source', source, draggableId);

    if (!destination) {
      return;
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
    // <DragDropContext onDragEnd={onDragEnd}>
      <div style={{height: 600,display:'flex',flexDirection:'column',width:'100%',minWidth:800}}>
        <Header position={position} save={save} setSave={setSave} onSaveChecklist={onSaveChecklist}/>
        <div style={{display:'flex',height: 550,flexDirection:'row',width:'100%',transition:'transform 0.4s ease',transform:`translateX(-${25*(position.length-3)}%)`}}>
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
                onChangeQuestion={onChangeQuestion}
                type={item?.action ? 'question' : {...item}}
                searchRisk={searchRisk}
                onSearchRisk={onSearchRisk}s
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
    // </DragDropContext>
  );
}



