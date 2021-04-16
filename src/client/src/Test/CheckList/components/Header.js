import React, {useState} from 'react';
import {Icons} from '../../../components/Icons/iconsDashboard';
import {
  IconsArrow,
  ContainerHeader
} from '../styles';
import NewTabs, {TabPanel} from '../../../components/Main/MuiHelpers/NewTabs'
import {FilterComponent,LoadingContent,AddUserButton} from '../../../components/Main/Table/comp'
import {COMPANY} from '../../../routes/routesNames.ts'
import {onGetAllCompanies} from '../func'
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import IconButton from '../../../components/Main/MuiHelpers/IconButton';
import {ThemeContext} from "styled-components";
import {ContinueButton} from '../../../components/Main/MuiHelpers/Button'
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from "styled-components";

const HeaderDivText = styled.div`
  padding: 5px 0px;
  cursor: pointer;
  &:hover {
      opacity: 0.7;
  }
  &:active {
      opacity: 0.5;
  }
`;

export function Header({position=[],setPosition,onSaveChecklist,save,setData, setSave}) {

  const [loading, setLoading] = useState(false)
  const theme = React.useContext(ThemeContext)

  function onSave() {
    setLoading(true)
    onSaveChecklist(setLoading)
  }

  function onNav(index) {
    setPosition([...position.slice(0,index+1)])
    setData(data=>[...data.slice(0,index+1)])
  }

  function onClear(index) {
    setPosition([])
    setData([])
  }


  return (
    <ContainerHeader >
      <IconButton style={{height:40,width:40,marginRight:-4}} iconProps={{style:{fontSize:25,color:theme.palette.text.secondary}}} onClick={onClear} aria-label="Checklist" icon={'Checklist'}/>
      <div style={{display:'flex',flex:1,overflowX:'auto',marginRight:20}}>
      {position.map((item,index)=>{
        return (
          <div style={{display:'flex',flexDirection:'row',alignItems:'center'}} key={index}>
            <IconsArrow style={{fontSize:22}} type={`KeyboardArrowRightIcon`}/>
            <HeaderDivText onClick={()=>onNav(index)}>
              <p className={'noBreakText'} style={{maxWidth:100}}>{item?.title}</p>
            </HeaderDivText>
          </div>
        )
      })}
      </div>
      <div style={{position: 'relative',marginRight:10,transform:'scale(0.9)'}}>
        <ContinueButton disable={`${loading || !save}`} style={{width:100,padding:2.5,opacity:loading?0.6:1}} onClick={onSave} primary={!save?'outlined':'true'} size={'medium'}>
          Salvar
        </ContinueButton>
        {loading && <CircularProgress size={24} style={{color: theme.palette.primary.main,position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}} />}
      </div>
   </ContainerHeader>
  );
}



