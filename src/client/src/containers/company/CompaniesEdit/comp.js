import React, {useRef,useCallback,useEffect,useState} from 'react';
import {Icons} from '../../../components/Icons/iconsDashboard';
import {
  ContainerDiv,
} from './styles';
import {onGetCompanyWorkplace} from './func'
import NewTabs, {TabPanel} from '../../../components/Main/MuiHelpers/NewTabs'
import {LoadingContent} from '../../../components/Main/Loader/LoadingContent'
import {Principal} from './Tabs/Principal'
import {Organograma} from './Tabs/Organograma/index'
import {AdditionalInfo} from './Tabs/AdditionalInfo'

export default function Container({children}) {
    return (
      <ContainerDiv >
        {children}
      </ContainerDiv>
    );
}

Container.TableTabs =  function TableTabs({tabsLabel,workplaceId,cnpj,tabId,currentUser,notification,setLoaderDash}) {
    const [loadContent, setLoadContent] = useState(true)
    const [tabValue, setTabValue] = useState(tabId ? parseInt(tabId) : 0)
    const [data, setData] = useState(false)

    useEffect(() => {
      onGetCompanyWorkplace({setData,workplaceId,companyId:currentUser.company.id,cnpj,setLoadContent,notification,setLoaderDash})
    }, [])

    return (
      <NewTabs tabValue={tabValue} setTabValue={setTabValue} tabsLabel={tabsLabel} >
        { loadContent ?
            <LoadingContent />
          :
          <>
            <TabPanel key={0} value={tabValue} index={0} >
              {/* <Principal setData={setData} data={data}/> */}
            </TabPanel>
            <TabPanel key={1} value={tabValue} index={1} >
              {data && <Organograma setData={setData} data={data} workplaceId={workplaceId} cnpj={cnpj} currentUser={currentUser} notification={notification}/>}
            </TabPanel>
            <TabPanel key={2} value={tabValue} index={2} >
            </TabPanel>
            <TabPanel key={3} value={tabValue} index={3} >
              <AdditionalInfo setData={setData}  data={data}/>
            </TabPanel>
          </>
        }
      </NewTabs>
    );
}



