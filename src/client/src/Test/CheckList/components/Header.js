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

//////import {useLoaderDash} from '../../../context/LoadDashContext'ˇ

export function Header({position=[],onSaveChecklist,save, setSave}) {

  const [loading, setLoading] = useState(false)
  const theme = React.useContext(ThemeContext)

  function onSave() {
    setLoading(true)
    onSaveChecklist(setLoading)
  }


  return (
    <ContainerHeader >
      <IconButton style={{height:40,width:40,marginRight:-4}} iconProps={{style:{fontSize:25,color:theme.palette.text.secondary}}} onClick={()=>{}} aria-label="Checklist" icon={'Checklist'}/>
      {position.map((item,index)=>{
        return (
          <div style={{display:'flex',flexDirection:'row',alignItems:'center'}} key={index}>
            <IconsArrow style={{fontSize:22}} type={`KeyboardArrowRightIcon`}/>
            <div style={{padding:'5px 0px',cursor:'pointer'}}>
              <p className={'noBreakText'} style={{maxWidth:100}}>{item?.title}</p>
            </div>
          </div>
        )
      })}
      <div style={{display:'flex',flex:1}}/>
      <div style={{position: 'relative',marginRight:10,transform:'scale(0.9)'}}>
        <ContinueButton disable={`${loading || !save}`} style={{width:100,padding:2.5,opacity:loading?0.6:1}} onClick={onSave} primary={!save?'outlined':'true'} size={'medium'}>
          Salvar
        </ContinueButton>
        {loading && <CircularProgress size={24} style={{color: theme.palette.primary.main,position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}} />}
      </div>
   </ContainerHeader>
  );
}



