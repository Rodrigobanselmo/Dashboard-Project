import React from 'react';
import {Icons} from '../../components/Icons/iconsDashboard';
import {
  ContainerDiv,
  ButtonContainer
} from './styles';
import Tabs from '../../components/Main/MuiHelpers/Tabs'
import {FilterComponent,LoadingContent,AddUserButton} from '../../components/Main/Table/comp'
import {COMPANY} from '../../routes/routesNames.ts'
import Table from './table';
import {onGetAllCompanies} from './func'
import {Link} from "react-router-dom";
import {keepOnlyNumbers} from '../../helpers/StringHandle';
import {useHistory} from "react-router-dom";
import {useLoaderDash} from '../../context/LoadDashContext'

export default function Container({children}) {
    return (
      <ContainerDiv >
        {children}
      </ContainerDiv>
    );
}

Container.TableTabs =  function FilterComponentw({setSelected,selected,dataRows,setDataRows,tabsLabel,setOpen,currentUser,notification,setLoad}) {

  const [loadContent, setLoadContent] = React.useState(true)
  const [search, setSearch] = React.useState('')
  const history = useHistory();
  const {setLoadDash} = useLoaderDash();

  React.useEffect(() => {
    onGetAllCompanies(currentUser.company.id,setDataRows,setLoadContent,notification)
  }, [])

  function handleCellClick(e,rowId) {
    history.push(`${COMPANY}/${keepOnlyNumbers(rowId)}/0`);
    setLoadDash(true)
  }

  function TableContainer() {

    return (
      <Table
        selected={selected}
        setSelected={setSelected}
        loadContent={loadContent}
        dataRows={dataRows}
        search={search}
        handleCellClick={handleCellClick}
        >
      </Table>
    )
}

  return (
    <Tabs tabsLabel={tabsLabel} component={TableContainer}>
        <FilterComponent
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
    </Tabs>
  );
}



