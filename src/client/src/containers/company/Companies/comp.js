import React from 'react';
import {Icons} from './../../../components/Icons/iconsDashboard.tsx';
import {
  ContainerDiv,
  ButtonContainer
} from './styles';
import Tabs from '../../../components/Main/MuiHelpers/Tabs'
import {FilterComponent,LoadingContent,AddUserButton} from '../../../components/Main/Table/comp'
import Table from './table';
import {onGetAllCompanies} from './func'

export default function Container({children}) {
    return (
      <ContainerDiv >
        {children}
      </ContainerDiv>
    );
}

Container.TableTabs =  function FilterComponentw({setSelected,selected,dataRows,setDataRows,tabsLabel,setOpen,currentUser,notification}) {

  const [loadContent, setLoadContent] = React.useState(true)
  const [search, setSearch] = React.useState('')

  React.useEffect(() => {
    onGetAllCompanies(currentUser.company.id,setDataRows,setLoadContent,notification)
  }, [])

  function TableContainer() {

    return (
      <Table
        selected={selected}
        setSelected={setSelected}
        loadContent={loadContent}
        dataRows={dataRows}
        search={search}
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
          <AddUserButton text={'Editar'} icon={'Edit'} width={100} onClick={()=>setOpen(true)}/>
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



