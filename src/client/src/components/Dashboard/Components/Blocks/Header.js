import React from 'react'
import styled from "styled-components";
import {Icons} from '../../../Icons/iconsDashboard'

const GroupIcon = styled(Icons)`
  font-size:50px;
  color:${({theme})=>theme.palette.text.primary};
`;


const TitleTag = styled.div`
  height: 70px; 
  background-color: #26262A;
  width: 70px;
  margin-right: 18px;
  border-radius: 8px;
  display:flex;
  align-items:center;
  justify-content:center;
`;

const Title = styled.h1`
  margin: 0;
  font-size:30px;
  /* text-shadow: 1px 1px 1px #CE5937; */
`;


const Header = styled.div`
  color: ${({theme})=>theme.palette.text.primary};
  margin: 0px 0px 40px 0px;
  display:flex;
  flex-direction:row;
  align-items:center;
`;

function HeaderComponent({icons, title, video=false}) {

    return (
        <Header >
            <TitleTag >
            <GroupIcon style={{fontSize:40}} type={icons}/>
            </TitleTag>
            <div style={{marginRight:10}}>
            <Title >{title}</Title>
            <p>Dashboard / <span style={{color:'grey'}}>{title}</span> </p>
            </div>
            {video && <GroupIcon style={{fontSize:26,marginBottom:16} } type={'Video'}/>}
        </Header>

    )
}

export default HeaderComponent
