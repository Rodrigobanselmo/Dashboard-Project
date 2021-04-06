import React from 'react'
import styled from "styled-components";
import {Icons} from '../../../Icons/iconsDashboard'

const GroupIcon = styled(Icons)`
  font-size:50px;
  color:${({theme})=>theme.palette.text.primary};
`;


const TitleTag = styled.div`
  height: 70px;
  background-color: ${({theme})=>theme.palette.type !=='dark' ? theme.palette.background.paper :theme.palette.background.contrast};
  width: 70px;
  margin-right: 18px;
  border-radius: 8px;
  display:flex;
  align-items:center;
  justify-content:center;
  -webkit-box-shadow: 3px 3px 11px 1px rgba(0,0,0,0.23);
  box-shadow: 3px 3px 11px 1px rgba(0,0,0,0.23);
`;

const Title = styled.h1`
  margin: 0;
  font-size:30px;
  display: inline-block;
  margin-right: 18px;
  /* text-shadow: 1px 1px 1px #CE5937; */
`;


const Header = styled.div`
  color: ${({theme})=>theme.palette.text.primary};
  margin: 0px 0px 40px 0px;
  display:flex;
  flex-direction:row;
  align-items:center;
`;

const HeaderComponent = React.memo(({icons, title,path, video=false}) => {
    console.log('header')
    return (
        <Header >
            <TitleTag >
            <GroupIcon style={{fontSize:40}} type={icons}/>
            </TitleTag>
            <div >
              <div style={{marginRight:10, flexDirection:'row'}}>
                <Title >{title}</Title>
                {video && <GroupIcon style={{fontSize:26,marginBottom:-3} } type={'Video'}/>}
              </div>
            <p>Dashboard / <span style={{color:'grey'}}>{path ?? title}</span> </p>
            </div>
        </Header>

    )
});

export default HeaderComponent
