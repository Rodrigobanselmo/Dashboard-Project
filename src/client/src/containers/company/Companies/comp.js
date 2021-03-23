import React from 'react';
import {Icons} from './../../../components/Icons/iconsDashboard.tsx';
import {
  ContainerDiv,
  ButtonContainer
} from './styles';
import Tabs from '../../../components/Main/MuiHelpers/Tabs'


export default function Container({children}) {
    return (
      <ContainerDiv >
        {children}
      </ContainerDiv>
    );
}

Container.TableTabs =  function FilterComponent({children,tabsLabel,...restProps}) {

  return (
    <Tabs tabsLabel={tabsLabel} {...restProps}>
      {children}
    </Tabs>
  );
}


Container.AddUserButton =   function AddUserButton({onClick}) {

  return (
    <ButtonContainer onClick={onClick} className={'rowCenter'} >
      <Icons style={{fontSize:24,marginRight:5}} type={'Add'}/>
      <p className={'noBreakText'}>Nova Empresa</p>
    </ButtonContainer>
  )
}
/*
Container.Table = function TableContainer({setLoadContent,setLoadContent,setLoadContent,setLoadContent,setLoadContent}) {

      return (
        <Table
          setLoadContent={setLoadContent}
          loadContent={loadContent}
          dataRows={dataRows}
          headCells={headCells}
          serachParams={serachParams}
          orderCells={orderCells}
          >
          <Container.AddUserButton onClick={()=>setOpen(true)}/>
        </Table>
      )
}
 */
