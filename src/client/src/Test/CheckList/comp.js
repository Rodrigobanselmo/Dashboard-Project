import React from 'react';
import {Icons} from '../../components/Icons/iconsDashboard';
import {
  ContainerDiv,
  ButtonContainer
} from './styles';
import NewTabs, {TabPanel} from '../../components/Main/MuiHelpers/NewTabs'
import {FilterComponent,LoadingContent,AddUserButton} from '../../components/Main/Table/comp'
import {COMPANY} from '../../routes/routesNames.ts'
import {onGetAllCompanies} from './func'
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
//////import {useLoaderDash} from '../../context/LoadDashContext'

export default function Container({children}) {
    return (
      <ContainerDiv >
        {children}
      </ContainerDiv>
    );
}

export function MainComponent({setSelected,selected,rowsCells,setRowsCells,tabsLabel,setOpen,currentUser,notification,setLoad}) {

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
        { loadContent ?
          <LoadingContent />
        :
          null
        }
        <TabPanel key={0} value={tabValue} index={0} >

        </TabPanel>
    </NewTabs>
  );
}



