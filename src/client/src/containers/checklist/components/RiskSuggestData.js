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
import styled, {css,ThemeContext} from "styled-components";
import {Card} from './Card';
import {NoCard,InputTitle,AddCircle,ErrorMessage,EmptyField,RiskFilter,AddedRiskContainer} from '../styles';
import {ModalButtons} from '../../../components/Main/MuiHelpers/ModalButtons'
import { lighten,darken,fade } from "@material-ui/core/styles";
import {BootstrapTooltip} from '../../../components/Main/MuiHelpers/Tooltip'
import { Paper } from '@material-ui/core';
import {InputCard} from './InputCard';
import {Menu} from '../../../components/Main/MuiHelpers/Selected'
import {ContinueButton} from '../../../components/Main/MuiHelpers/Button'
import InputSearch from '../../../components/Dashboard/Components/Standard/Search';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useSelector } from 'react-redux'
import {CardDrop} from './CardDrop';
import { Droppable, Draggable,DragDropContext } from 'react-beautiful-dnd';
import useTimeOut from '../../../hooks/useTimeOut';
import { AscendentText } from '../../../helpers/Sort';
import Modal from '../../risks/RiskEdit/Modal'

export function RiskSuggestData({
  position,
  data,
  index,
  setDataAll,
  dataAll,
  dataChecklist,
}) {
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [initialData, setInitialData] = useState(null)
  const [filterSelected, setFilterSelected] = useState([])
  const theme = React.useContext(ThemeContext)
  const risk = useSelector(state => state.risk)
  const riskData = useSelector(state => state.riskData)
  const [onTimeOut,onClearTime] = useTimeOut()

  const categoryIndex = dataChecklist.data.findIndex(i=>i.id == position[1].id)
  const questionIndex = dataChecklist.data[categoryIndex].questions.findIndex(i=>i.id==data.questionId)
  const questionActionTypeIndex = dataChecklist.data[categoryIndex].questions[questionIndex].action[data.answerId].data.findIndex(i=>i.risk==data.riskId)
  const questionActionTypeRisk = dataChecklist.data[categoryIndex].questions[questionIndex].action[data.answerId].data[questionActionTypeIndex]


  const positionType =  position[index]?.id

  function TITLE() {
    if (positionType == 'searchRec') return `Pesquisar Recomendações`
    if (positionType == 'searchMed') return `Pesquisar Medidas de Controle`
    if (positionType == 'searchFont') return `Pesquisar Fontes Geradoras`
  }

  function suggestion() {
    if (positionType == `searchRec`) return riskData.rec
    if (positionType == `searchMed`) return riskData.med
    if (positionType == `searchFont`) return riskData.font
  }

  function dataKey() {
    if (positionType == `searchRec`) return 'rec'
    if (positionType == `searchMed`) return 'med'
    if (positionType == `searchFont`) return 'font'
  }

  function filter() {
    let normalized = search.toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "")
    let filtered = [];

    if (search.length > 0) {
      filtered = [...suggestion()].filter(i=>i.text.toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "").includes(normalized)).slice(0,20)
    } else {
      filtered = [...suggestion().filter(i=>i?.risk&&i.risk.includes(data.riskId)),...suggestion().filter(i=>i?.category&&i.category.includes(data.riskType))]
    }
    return filtered.sort(AscendentText).filter(i=>!(dataKey() in questionActionTypeRisk && questionActionTypeRisk[dataKey()].includes(i.id))).filter(i=>!(`${dataKey()}Sug` in questionActionTypeRisk && questionActionTypeRisk[`${dataKey()}Sug`].includes(i.id)))
  }

  function onInputSearch(e) {
    setLoading('risk')
    setSearch(e.target.value)
    onClearTime()
    onTimeOut(()=>{
      setLoading(false)
    },600)
  }

  function handleAddButton() {
    setOpen(true)
  }

  //////para caso queria futuramente editar diretamente aqui
  function handleClickCard(row) {

    var initial = {data1:'',data2:'',fis:[],qui:[],bio:[],aci:[],erg:[],...row}

    if (row?.risk) {
      row.risk.map(item=>{
        const index = risk.findIndex(i=>i.id==item)
        if (risk[index]) initial[risk[index].type] = [...initial[risk[index].type],item]
      })
    }

    if (row?.category) {
      row.category.map(item=>{
        initial[item] = ['all']
      })
    }

    if (dataKey() == 'rec' && riskData.rec) {
      const index = riskData.rec.findIndex(i=>i.id==row.id)
      if (riskData.rec[index]) initial.data1 = riskData.rec[index].text
      if (riskData.rec[index] && riskData.rec[index]?.med) {
        const indexOther = riskData.med.findIndex(i=>i.id==riskData.rec[index].med)
        if (riskData.med[indexOther]) initial.data2 = riskData.med[indexOther].text
      }
      console.log(initial)
      setInitialData(initial)
      setOpen(true)
      return
    }

    if (dataKey() == 'med' && riskData.med) {
      const index = riskData.med.findIndex(i=>i.id==row.id)
      if (riskData.med[index]) initial.data1 = riskData.med[index].text
      if (riskData.med[index] && riskData.med[index]?.rec) {
        const indexOther = riskData.rec.findIndex(i=>i.id==riskData.med[index].rec)
        if (riskData.rec[indexOther]) initial.data2 = riskData.rec[indexOther].text
        }
      console.log(initial)
      setInitialData(initial)
      setOpen(true)
      return
    }

    if (dataKey() == 'font' && riskData.font) {
      const index = riskData.font.findIndex(i=>i.id==row.id)
      if (riskData.rec[index]) initial.data1 = riskData.font[index].text
      console.log(initial)
      setOpen(true)
      setInitialData(initial)
      return
    }
  }

  return (
    <>
      <p className={'noBreakText'} style={{marginBottom:15,maxWidth:210}}>{TITLE()}</p>
      <InputSearch style={{margin:'0 10px 15px 10px'}} icons={Icons} onInputSearch={onInputSearch} search={search} onCleanSearch={(e)=>setSearch('')}/>
      <Droppable droppableId={`${dataKey()}s`} isDropDisabled={data.disabled}>
      {(provided,snapshot) => (
        <AddedRiskContainer
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{overflowY:'auto',height:'83%'}}
          isDraggingOver={snapshot.isDraggingOver}
          draggingOverWith={snapshot.draggingOverWith&&snapshot.draggingOverWith.split('/')[0] == dataKey() ? 'delete':'not'}
          draggingOverWithSameColumn={snapshot.draggingOverWith&&snapshot.draggingOverWith.split('/')[2] == index ? 'same':'different'}
          >
          <div style={{paddingLeft:10}}>
            { loading ?
                <LinearProgress style={{marginRight:20}}/>
              :
              filter().length > 0 ?
                filter().map((item,indexItem)=>{
                  return (
                    <CardDrop
                      title={item.text}
                      key={item?.id ?? indexItem}
                      item={item}
                      index={indexItem}
                      draggableId={`${dataKey()}/${item.id}/${index}`}
                      onClick={()=>handleClickCard(riskData[dataKey()][riskData[dataKey()].findIndex(i=>i.id == item.id)])}
                    />
                  )
                })
              :
              search.length > 0 ?
                <EmptyField hover='none' style={{marginLeft:0,marginTop:0,padding:'20px 20px',height:80}} onClick={()=>{}}>
                  <p style={{textAlign:'center'}}>Nenhum dado encontrado</p>
                </EmptyField>
              :
              null
            }
          </div>
          {provided.placeholder}
        </AddedRiskContainer>
      )}
      </Droppable>
      <AddCircle onClick={handleAddButton}>
        <Icons style={{fontSize:22}} type={`Add`}/>
      </AddCircle>
      <Modal type={dataKey()} open={open} setOpen={setOpen} data={risk?{}:risk[risk.findIndex(i=>i.id==data.riskId)]} initialData={initialData} setInitialData={setInitialData}/>
    </>
  );
}
//{id:v4(),name:`Risk ${Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1)}` ,type:types[Math.floor(Math.random())]},

