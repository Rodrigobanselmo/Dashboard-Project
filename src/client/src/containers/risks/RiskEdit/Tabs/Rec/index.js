import React, {useContext,useState,useEffect} from 'react';
import {Icons} from '../../../../../components/Icons/iconsDashboard';
import NewTabs, {TabPanel} from '../../../../../components/Main/MuiHelpers/NewTabs'
import {FilterComponent,LoadingContent,AddUserButton} from '../../../../../components/Main/Table/comp'
import {COMPANY} from '../../../../../routes/routesNames.ts'
import {Link} from "react-router-dom";
import {keepOnlyNumbers} from '../../../../../helpers/StringHandle';
import {useHistory} from "react-router-dom";
import TableComponent from './table';
import { useSelector,useDispatch } from 'react-redux'
import Modal from '../../Modal'

export function Rec({data}) {

  const [loadContent, setLoadContent] = useState(false)
  const [search, setSearch] = useState('')
  const [initialData, setInitialData] = useState(null)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState([]);
  const riskData = useSelector(state => state.riskData)
  const risk = useSelector(state => state.risk)
  const dispatch = useDispatch()
  const history = useHistory();

  function handleCellClick(e,rowId,row) {

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

    if (riskData.rec) {
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
  }

  console.log('riskData',riskData.rec)

  return (
      <div style={{paddingRight:27,paddingLeft:27}}>
        <FilterComponent
          // style={{marginLeft:-12}}
          setLoadContent={setLoadContent}
          setSearch={setSearch}
          search={search}
          onCleanSearch={()=>setSearch('')}
        >
          <AddUserButton onClick={()=>setOpen(true)}/>
          <div style={{flex:1}}/>
          {selected && selected.length == 1 &&
            <AddUserButton text={'Editar'} icon={'Edit'} width={100} />
          }
        </FilterComponent>
        { loadContent ?
          <LoadingContent margin='10px 0 10px 0'/>
        :
          <TableComponent
          rowsCells={riskData.rec.filter(i=>(i?.risk&&i.risk.includes(data.id)) || (i?.category&&i.category.includes(data.type)))}
          selected={selected}
          setSelected={setSelected}
          loadContent={loadContent}
          search={search}
          handleCellClick={handleCellClick}
          />
        }
        <Modal type={'rec'} open={open} setOpen={setOpen} data={data} initialData={initialData} setInitialData={setInitialData}/>
      </div>
  );
}



