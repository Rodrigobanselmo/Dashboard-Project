import React, {useContext} from 'react';
import {Icons} from '../../../components/Icons/iconsDashboard';
import {
  ContainerDiv,
  ButtonContainer
} from './styles';
import NewTabs, {TabPanel} from '../../../components/Main/MuiHelpers/NewTabs'
import {FilterComponent,LoadingContent,AddUserButton,FilterButton,FilterListButton} from '../../../components/Main/Table/comp'
import {COMPANY} from '../../../routes/routesNames.ts'
import {onGetAllRisksAndGroups} from './func'
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


export function TableContainer({risk,tabValue,setTabValue,setSelected,selected,dataRows,setDataRows,tabsLabel,setOpen,currentUser,notification,setLoad,setLoaderDash,routeInfo}) {

  const [loadContent, setLoadContent] = React.useState(true)
  const [search, setSearch] = React.useState('')
  const [filterButton, setFilterButton] = React.useState({column:'',filter:''})
  const history = useHistory();

  React.useEffect(() => {
    onGetAllRisksAndGroups(currentUser.company.id,setDataRows,setLoadContent,notification,setLoaderDash)
  }, [])

  React.useEffect(() => {
    setFilterButton({column:'',filter:''})
    setSearch('')
  }, [risk])

  function handleCellClick(e,rowId) {
    //history.push(`${COMPANY}/${keepOnlyNumbers(rowId)}/0`);
    //setLoaderDash(true)
  }

  function handleFilterButton(anexo) {
    if (filterButton.filter !==  anexo) setFilterButton({column:'ins',filter:anexo})
    else setFilterButton({column:'',filter:''})
  }

  function handleFilterPlusGroup(group) {
    if (filterButton.filter !==  group) setFilterButton({column:'group',filter:group})
    else setFilterButton({column:'',filter:''})
  }

  const onGetGroups = () => {
    const groups = []
    if (routeInfo.filterId === 'aci') {
      dataRows.filter(i=>i?.type && i.type == 'aci' ).map((item)=>{
        if (item?.group && !groups.includes(item.group) ) groups.push(item.group)
      })
    } else if (routeInfo.filterId === 'erg') {
      dataRows.filter(i=>i?.type && i.type == 'erg' ).map((item)=>{
        if (item?.group && !groups.includes(item.group) ) groups.push(item.group)
      })
    }
    return groups
  }

  const memoizedGroups = React.useMemo(() => onGetGroups(), [dataRows])

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
          {(routeInfo.filterId === 'qui' || (routeInfo.filterId === 'ins' && tabValue==2))  &&
            <>
              <FilterButton selected={Boolean(filterButton.filter==='Anexo 11')} text='Anexo 11' info={'(Químicos com Límite de Tolerância)'} width={85} widthTotal={350} onClick={()=>handleFilterButton('Anexo 11')}/>
              <FilterButton selected={Boolean(filterButton.filter==='Anexo 12')} text='Anexo 12' info={'(Poeiras Minerais)'} width={85} widthTotal={220} onClick={()=>handleFilterButton('Anexo 12')}/>
              <FilterButton selected={Boolean(filterButton.filter==='Anexo 13')} text='Anexo 13' info={'(Riscos Químicos - Critério Qualitativo)'} width={85} widthTotal={360} onClick={()=>handleFilterButton('Anexo 13')}/>
            </>
          }
          {selected.length == 1 &&
          <Link style={{textDecoration: 'none', }} to={`${COMPANY}/${keepOnlyNumbers(selected[0])}/0`}>
            <AddUserButton text={'Editar'} icon={'Edit'} width={100} />
          </Link>
          }
          {/* <Container.AddUserButton text={'Desativar'} icon={'Archive'} width={140} onClick={()=>setOpen(true)}/> */}
          {/* <Container.AddUserButton text={'Ativar'} icon={'Unarchive'} width={120} onClick={()=>setOpen(true)}/> */}
          {(routeInfo.filterId === 'aci' || routeInfo.filterId === 'erg') &&
            <FilterListButton setFilterButton={setFilterButton} filterButton={filterButton} onClick={handleFilterPlusGroup} dataArray={memoizedGroups} title='Grupos'/>
          }
        </FilterComponent>
      { loadContent ?
          <LoadingContent />
        :
          null
      }
      <TabPanel key={0} value={tabValue} index={0} >
        <TableComponent
          routeInfo={routeInfo}
          rowsCells={dataRows}
          selected={selected}
          setSelected={setSelected}
          loadContent={loadContent}
          search={search}
          handleCellClick={handleCellClick}
          filterTabs={tabsLabel&&tabsLabel[tabValue]?tabsLabel[tabValue]:'all'}
          filterButton={filterButton}
        />
      </TabPanel>
      {tabsLabel&&tabsLabel[1] &&
      <TabPanel key={1} value={tabValue} index={1} >
        <TableComponent
          routeInfo={routeInfo}
          rowsCells={dataRows}
          selected={selected}
          setSelected={setSelected}
          loadContent={loadContent}
          search={search}
          handleCellClick={handleCellClick}
          filterTabs={tabsLabel[tabValue]}
          filterButton={filterButton}
        />
      </TabPanel>
      }
      {tabsLabel&&tabsLabel[2] &&
      <TabPanel key={2} value={tabValue} index={2} >
        <TableComponent
          routeInfo={routeInfo}
          rowsCells={dataRows}
          selected={selected}
          setSelected={setSelected}
          loadContent={loadContent}
          search={search}
          handleCellClick={handleCellClick}
          filterTabs={tabsLabel[tabValue]}
          filterButton={filterButton}
        />
      </TabPanel>
      }
      {tabsLabel&&tabsLabel[3] &&
        <TabPanel key={3} value={tabValue} index={3} >
        <TableComponent
          routeInfo={routeInfo}
          rowsCells={dataRows}
          selected={selected}
          setSelected={setSelected}
          loadContent={loadContent}
          search={search}
          handleCellClick={handleCellClick}
          filterTabs={tabsLabel[tabValue]}
          filterButton={filterButton}
          />
      </TabPanel>
      }
      </div>
    </NewTabs>
  );
}



