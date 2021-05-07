import React, {useEffect,useState} from 'react';
import {Icons} from '../../../components/Icons/iconsDashboard';
import {
  ContainerDiv,
  ButtonContainer
} from './styles';
import NewTabs, {TabPanel} from '../../../components/Main/MuiHelpers/NewTabs'
import {FilterComponent,LoadingContent,AddUserButton} from '../../../components/Main/Table/comp'
import {COMPANY} from '../../../routes/routesNames.ts'
import {onGetAllCompanies} from './func'
import {Link} from "react-router-dom";
import {keepOnlyNumbers} from '../../../helpers/StringHandle';
import {useHistory} from "react-router-dom";
import TableComponent from './table';

export default function Container({children}) {
    return (
      <ContainerDiv >
        {children}
      </ContainerDiv>
    );
}


Container.TableTabs =  function TableContainer({dataRows,setDataRows,tabsLabel,setOpen,currentUser,notification,setLoad,setLoaderDash}) {

  const [loadContent, setLoadContent] = useState(true)
  const [search, setSearch] = useState('')
  const [tabValue, setTabValue] = useState(0);
  const history = useHistory();
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    onGetAllCompanies(currentUser.company.id,setDataRows,setLoadContent,notification,setLoaderDash)
  }, [])

  function handleCellClick(e,rowId) {
    history.push(`${COMPANY}/${keepOnlyNumbers(rowId)}/0`);
    setLoaderDash(true)
  }

  return (
    <NewTabs tabValue={tabValue} setTabValue={setTabValue} tabsLabel={tabsLabel} >
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
          {selected.length == 1 &&
          <Link style={{textDecoration: 'none', }} to={`${COMPANY}/${keepOnlyNumbers(selected[0])}/0`}>
            <AddUserButton text={'Editar'} icon={'Edit'} width={100} />
          </Link>
          }
          {/* <Container.AddUserButton text={'Desativar'} icon={'Archive'} width={140} onClick={()=>setOpen(true)}/> */}
          {/* <Container.AddUserButton text={'Ativar'} icon={'Unarchive'} width={120} onClick={()=>setOpen(true)}/> */}
        </FilterComponent>
      { loadContent ?
          <LoadingContent />
        :
          null
      }
      <TabPanel key={0} value={tabValue} index={0} >
        <TableComponent
          rowsCells={dataRows}
          selected={selected}
          setSelected={setSelected}
          loadContent={loadContent}
          search={search}
          handleCellClick={handleCellClick}
        />
      </TabPanel>
      </div>
    </NewTabs>
  );
}



