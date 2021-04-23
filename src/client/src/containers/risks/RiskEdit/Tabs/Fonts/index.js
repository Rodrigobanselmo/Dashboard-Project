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

export function Fonts({data}) {

  const [loadContent, setLoadContent] = useState(false)
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState([]);
  const riskData = useSelector(state => state.riskData)
  const dispatch = useDispatch()
  const history = useHistory();

  function handleCellClick(e,rowId) {
    //history.push(`${COMPANY}/${keepOnlyNumbers(rowId)}/0`);
    //setLoaderDash(true)
  }

  console.log('riskData',riskData.font)

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
          rowsCells={riskData.font.filter(i=>(i?.risk&&i.risk.includes(data.id)) || (i?.category&&i.category.includes(data.type)))}
          selected={selected}
          setSelected={setSelected}
          loadContent={loadContent}
          search={search}
          handleCellClick={handleCellClick}
          />
        }
        <Modal data={data} type={'font'} open={open} setOpen={setOpen} data={data}/>
      </div>
  );
}



