import React from 'react';
import {Icons} from '../../components/Icons/iconsDashboard';
import {
  ContainerDiv,
  ButtonContainer
} from './styles';
import NewTabs, {TabPanel} from '../../components/Main/MuiHelpers/NewTabs'
import {FilterComponent,LoadingContent,AddUserButton} from '../../components/Main/Table/comp'
import {COMPANY} from '../../routes/routesNames.ts'
import Table from './table';
import {onGetAllCompanies} from './func'
import {Link} from "react-router-dom";
import {keepOnlyNumbers} from '../../helpers/StringHandle';
import {useHistory} from "react-router-dom";
//////import {useLoaderDash} from '../../context/LoadDashContext'
import TableComponent from './table';

export default function Container({children}) {
    return (
      <ContainerDiv >
        {children}
      </ContainerDiv>
    );
}

Container.TableTabs =  function FilterComponentw({setSelected,selected,rowsCells,setRowsCells,tabsLabel,setOpen,currentUser,notification,setLoad}) {

  const [loadContent, setLoadContent] = React.useState(true)
  const [search, setSearch] = React.useState('')
  const history = useHistory();
  /////const {setLoadDash} = React.useCallback(()=>useLoaderDash(),[]);
  const [tabValue, setTabValue] = React.useState(0);

  React.useEffect(() => {
    onGetAllCompanies(currentUser.company.id,setRowsCells,setLoadContent,notification)
  }, [])

  function handleCellClick(e,rowId) {
    //history.push(`${COMPANY}/${keepOnlyNumbers(rowId)}/0`);
    //setLoadDash(true)
  }

  return (
    <NewTabs tabValue={tabValue} setTabValue={setTabValue} tabsLabel={tabsLabel} >
        <FilterComponent
          style={{marginLeft:10}}
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
        </FilterComponent>
        { loadContent ?
          <LoadingContent />
        :
          null
        }
        <TabPanel key={0} value={tabValue} index={0} >
          <TableComponent
            rowsCells={rowsCells}
            selected={selected}
            setSelected={setSelected}
            loadContent={loadContent}
            search={search}
            handleCellClick={handleCellClick}
          />
        </TabPanel>
    </NewTabs>
  );
}



