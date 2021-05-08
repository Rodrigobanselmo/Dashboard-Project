import React, {useRef,useCallback,useEffect,useState} from 'react';
import {Icons} from '../../../components/Icons/iconsDashboard';
import {
  ContainerDiv,
} from './styles';
import {onGetCompany} from './func'
import NewTabs, {TabPanel} from '../../../components/Main/MuiHelpers/NewTabs'
import {LoadingContent} from '../../../components/Main/Loader/LoadingContent'
import {COMPANY} from '../../../routes/routesNames.ts'
import {keepOnlyNumbers} from '../../../helpers/StringHandle';
import {Principal} from './Tabs/Principal'
import TableComponent from './table';
import { useHistory } from "react-router-dom"
import {AdditionalInfo} from './Tabs/AdditionalInfo'
import {FilterComponent,AddUserButton} from '../../../components/Main/Table/comp'
import { useDispatch } from 'react-redux'

export default function Container({children}) {
    return (
      <ContainerDiv >
        {children}
      </ContainerDiv>
    );
}

Container.TableTabs =  function TableTabs({tabsLabel,setOpen,cnpj,tabId,currentUser,notification,setLoaderDash}) {
    const [loadContent, setLoadContent] = useState(true)
    const [tabValue, setTabValue] = useState(tabId ? parseInt(tabId) : 0)
    const [data, setData] = useState(false)
    const [search, setSearch] = useState('')
    const [dataRows, setDataRows] = useState([])
    const history = useHistory()
    //const dispatch = useDispatch()

    useEffect(() => {
      onGetCompany({setData,setDataRows,companyId:currentUser.company.id,cnpj,setLoadContent,notification,setLoaderDash})
    }, [])

    function handleCellClick(e,rowId,row,index) {
      history.push(`${COMPANY}/estabelecimento/${rowId}/${keepOnlyNumbers(cnpj)}/0`);
      //dispatch({ type: 'ADD_COMPANY', payload: data })
    }

    console.log(tabValue)

    return (
      <NewTabs tabValue={tabValue} setTabValue={setTabValue} tabsLabel={tabsLabel} >
        { tabValue==0&&
          <FilterComponent
            setLoadContent={setLoadContent}
            setSearch={setSearch}
            search={search}
            onCleanSearch={()=>setSearch('')}
          >
            <AddUserButton onClick={()=>setOpen(true)}/>
          </FilterComponent>
        }
        { loadContent ?
            <LoadingContent />
          :
          <>
            <TabPanel key={0} value={tabValue} index={0} >

              <TableComponent
                rowsCells={dataRows}
                loadContent={loadContent}
                search={search}
                handleCellClick={handleCellClick}
              />
            </TabPanel>
            <TabPanel key={1} value={tabValue} index={1} >
              <Principal setData={setData} data={data}/>
            </TabPanel>
          </>
        }
      </NewTabs>
    );
}



