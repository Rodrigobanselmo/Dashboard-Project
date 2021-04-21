import React, {useRef,useCallback,useEffect,useState} from 'react';
import {Icons} from '../../../components/Icons/iconsDashboard';
import {
  ContainerDiv,
  Mult
} from './styles';
import {onGetRisk,onGetRisksData} from './func'
import {Fonts} from './Tabs/Fonts'
import {Rec} from './Tabs/Rec'
import {Med} from './Tabs/Med'
import {EspecialSelector} from '../../../components/Main/MuiHelpers/EspecialSelector'
import NewTabs, {TabPanel} from '../../../components/Main/MuiHelpers/NewTabs'
import {LoadingContent} from '../../../components/Main/Loader/LoadingContent'
import { useSelector,useDispatch } from 'react-redux'
import {filterObject} from '../../../helpers/ObjectArray'

export function Container({children}) {
    return (
      <ContainerDiv >
        {children}
      </ContainerDiv>
    );
}

export function TableTabs({tabsLabel,data,itemId,tabId,setData,currentUser,notification,setLoaderDash}) {

    const [loadContent, setLoadContent] = useState(true)
    const [tabValue, setTabValue] = useState(tabId ? parseInt(tabId) : 0)
    const riskData = useSelector(state => state.riskData)
    const risk = useSelector(state => state.risk)
    const dispatch = useDispatch()

    const [search, setSearch] = useState('')
    const [selected, setSelected] = useState('')


    useEffect(() => {
      onGetRisk({setData,companyId:currentUser.company.id,itemId,setLoadContent,notification,setLoaderDash})
    }, [])

    useEffect(() => {
      if((riskData?.rec && riskData.rec.length == 0) || (risk&&risk.length == 0)) onGetRisksData({currentUser,notification,dispatch})
    }, [])

    return (
      <NewTabs tabStayle={{fontSize:14}} tabValue={tabValue} setTabValue={setTabValue} tabsLabel={tabsLabel} >
        { loadContent ?
            <LoadingContent />
          :
          <>
            <TabPanel key={0} value={tabValue} index={0} >

            </TabPanel>
            <TabPanel key={1} value={tabValue} index={1} >
              <Fonts
                data={data}
              />
            </TabPanel>
            <TabPanel key={2} value={tabValue} index={2} >
              <Med
                data={data}
              />
            </TabPanel>
            <TabPanel key={3} value={tabValue} index={3} >
              <Rec
                data={data}
              />
            </TabPanel>
          </>
        }
      </NewTabs>
    );
}



