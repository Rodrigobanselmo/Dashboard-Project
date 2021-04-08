import React, {useContext} from 'react';
import {Icons} from '../../../components/Icons/iconsDashboard';
import {
  ContainerDiv,
  ButtonContainer
} from './styles';
import NewTabs, {TabPanel} from '../../../components/Main/MuiHelpers/NewTabs'
import {FilterComponent,LoadingContent,AddUserButton,FilterButton} from '../../../components/Main/Table/comp'
import {COMPANY} from '../../../routes/routesNames.ts'
import {onGetAllCompanies} from './func'
import {Link} from "react-router-dom";
import {keepOnlyNumbers} from '../../../helpers/StringHandle';
import {useHistory} from "react-router-dom";
import TableComponent from './table';

export function Container({children}) {
    return (
      <ContainerDiv >
        {children}
      </ContainerDiv>
    );
}


export function TableContainer({tabValue,setTabValue,setSelected,selected,dataRows,setDataRows,tabsLabel,setOpen,currentUser,notification,setLoad,setLoaderDash}) {

  const [loadContent, setLoadContent] = React.useState(true)
  const [search, setSearch] = React.useState('')
  const history = useHistory();

  React.useEffect(() => {
    onGetAllCompanies(currentUser.company.id,setDataRows,setLoadContent,notification,setLoaderDash)
  }, [])

  function handleCellClick(e,rowId) {
    //history.push(`${COMPANY}/${keepOnlyNumbers(rowId)}/0`);
    //setLoaderDash(true)
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
          <FilterButton text='Anexo 1' info={'(Exposivos)'} widthTotal={165} onClick={()=>setOpen(true)}/>
          <FilterButton text='Anexo 2' info={'(Inflamáveis)'} widthTotal={175} onClick={()=>setOpen(true)}/>
          <FilterButton text='Anexo 3' info={'(Vigilante)'} widthTotal={160} onClick={()=>setOpen(true)}/>
          <FilterButton text='Anexo 4' info={'(Eletricidade)'} widthTotal={180} onClick={()=>setOpen(true)}/>
          <FilterButton text='Anexo 5' info={'(Motoboy)'} widthTotal={162} onClick={()=>setOpen(true)}/>
          <FilterButton text='Portaria n. 51/2003' info={'(Rad. Ionizantes)'} width={160} widthTotal={290} onClick={()=>setOpen(true)}/>
          {selected.length == 1 &&
          <Link style={{textDecoration: 'none', }} to={`${COMPANY}/${keepOnlyNumbers(selected[0])}/0`}>
            <AddUserButton text={'Editar'} icon={'Edit'} width={100} />
          </Link>
          }
          {/* <Container.AddUserButton text={'Desativar'} icon={'Archive'} width={140} onClick={()=>setOpen(true)}/> */}
          {/* <Container.AddUserButton text={'Ativar'} icon={'Unarchive'} width={120} onClick={()=>setOpen(true)}/> */}
        </FilterComponent>
        <div style={{margin:0,display:'flex',flexDirection:'row',marginTop:-5,marginBottom:15}}>

        </div>
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



