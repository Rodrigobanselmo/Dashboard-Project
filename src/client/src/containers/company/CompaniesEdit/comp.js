import React, {useRef,useCallback,useEffect,useState} from 'react';
import {Icons} from '../../../components/Icons/iconsDashboard';
import {
  ContainerDiv,
  ButtonContainer
} from './styles';
import {onGetCompanie} from './func'
import Tabs from '../../../components/Main/MuiHelpers/Tabs'
import {LoadingContent} from '../../../components/Main/Loader/LoadingContent'
import {Principal} from './Tabs/Principal'
import {Organograma} from './Tabs/Organograma/index'
import {AdditionalInfo} from './Tabs/AdditionalInfo'
import { FixedSizeList as List,areEqual } from "react-window";

export default function Container({children}) {
    return (
      <ContainerDiv >
        {children}
      </ContainerDiv>
    );
}

Container.TableTabs =  function TableTabs({tabsLabel,data,cnpj,tabId,setData,currentUser,notification}) {
    const [loadContent, setLoadContent] = useState(true)

    useEffect(() => {
      onGetCompanie({setData,companyId:currentUser.company.id,cnpj,setLoadContent,notification})
    }, [])

    const Tab =  React.useMemo(() => ({item}) => {
      console.log(item);
      if (!loadContent) {
        switch (item) {
          case 'Principal':
          return <Principal data={data}/>

          case 'Informações Adicionais':
          return <AdditionalInfo data={data}/>

          case 'Organograma':
          return <Organograma data={data} cnpj={cnpj} currentUser={currentUser} notification={notification}/>

          default:
          return <div>134</div>
        }
      }
      return <div/>
    },[data,cnpj,currentUser,loadContent]);

    return (
      <Tabs tabStayle={{}} initialValue={parseInt(tabId)} tabsLabel={tabsLabel} component={Tab} >
        { loadContent ?
            <LoadingContent />
          :
            null
        }
      </Tabs>
    );
}



