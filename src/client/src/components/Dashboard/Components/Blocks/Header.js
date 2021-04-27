import React from 'react'
import styled from "styled-components";
import {Icons} from '../../../Icons/iconsDashboard'
import {ModalFullScreen} from '../../../Main/MuiHelpers/Modal'

const GroupIcon = styled(Icons)`
  font-size:50px;
  //color:${({theme})=>theme.palette.primary.main};
  color:${({theme})=>theme.palette.text.primary};
`;

const GroupIconVideo = styled(Icons)`
  font-size:50px;
  color:${({theme})=>theme.palette.text.primary};
  font-size:26px;
  margin-bottom:-3px;
  cursor: pointer;
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

const HeaderComponent = React.memo(({icons, title,path, video=false,subTitle}) => {
    console.log('header')
    const [open, setOpen] = React.useState(false) //dados dos email inseridos nos inputs

    return (
        <Header >
            <TitleTag >
            <GroupIcon style={{fontSize:40}} type={icons}/>
            </TitleTag>
            <div >
              <div style={{marginRight:10, flexDirection:'row'}}>
                <Title >{title}</Title>
                {video &&
                <div onClick={()=>setOpen(true)} style={{display:'inline',}}>
                  <GroupIconVideo type={'Video'}/>
                </div>
                }
              </div>
            <p>Dashboard
              {subTitle && Array.isArray(subTitle) ?
                subTitle.map((item,index)=>(
                  <span key={index} style={{color:'grey'}}>&nbsp;/&nbsp;{item}</span>
                ))
              :
              <span style={{color:'grey'}}>&nbsp;/bsp;{path ?? title}</span>
              }
            </p>
            </div>
            <ModalFullScreen transparent open={open} onClose={()=>setOpen(false)} >
              <iframe type="text/html"
                width={`${window.innerWidth*0.8}`}
                height={`${window.innerWidth*0.8*360/640}`}
                src="http://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
                frameborder="0"
              />
            </ModalFullScreen>
        </Header>

    )
});

export default HeaderComponent
