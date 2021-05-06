import React, {useRef,useCallback,useEffect,useState} from 'react';
import {Icons} from '../../../components/Icons/iconsDashboard';
import {ContainerDiv} from './styles';
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

export function TableTabs({tabId,readExcel,_key,currentUser,notification,setLoaderDash}) {

    const [tabValue, setTabValue] = useState(tabId ? parseInt(tabId) : 0)
    const riskData = useSelector(state => state.riskData)
    const risk = useSelector(state => state.risk)

    const tabsLabel = ['Importação de dados']

    return (
      <NewTabs tabStayle={{fontSize:14}} tabValue={tabValue} setTabValue={setTabValue} tabsLabel={tabsLabel} >
        <TabPanel key={0} value={tabValue} index={0} >
          <div style={{marginTop:30}}>
            <div>
              <p style={{marginBottom:5}}>Fatores de Risco</p>
              <p style={{marginBottom:5}}>Químicos</p>
              <input
                key={_key || ''}
                type="file"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={(e) => {
                  const file = e.target.files[0];
                  readExcel(file,'qui');
                }}
              />
              <p style={{marginBottom:5}}>Periculosos</p>
              <input
                key={_key || ''}
                type="file"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={(e) => {
                  const file = e.target.files[0];
                  readExcel(file,'per');
                }}
              />
            </div>
          </div>
        </TabPanel>
      </NewTabs>
    );
}




