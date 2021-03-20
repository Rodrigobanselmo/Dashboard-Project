import React, {useState,useRef} from 'react';
import {Icons} from '../../../Icons/iconsDashboard';
import RichTooltip from './RichTooltip'
import styled from "styled-components";

const Circle = styled.div`
  background-color: ${({theme,type})=> type==='true' ? theme.palette.primary.main : 'transparent'};
  height: 7px;
  width: 7px;
  border-radius: 4px;
`;


const Attention = styled.span`
        color:${({theme})=>theme.palette.background.attention};
`;


const Item = styled.div`
    &:hover {
        background-color:${({theme})=>theme.palette.background.hoverPaper};
    }

    &:hover {
        & div {
            background-color: ${({theme})=> theme.palette.primary.main};
        }
    }
`;


// <RichSelect dataToSelect={arrayData(data.userTypes)} selected={row.type}/>

const Container = styled.div`
    display:flex;
    /* background-color:red; */
    flex-direction:row;
    align-items:center;
    max-width:140px;
    color:${({theme,open})=>open?theme.palette.primary.main:'inherit'};
    &:hover {
        color:${({theme})=>theme.palette.primary.main};
    }
`;

const Text = styled.p`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    transition: color 0.4s;

`;


export default function Select({dataToSelect,selected,setSelected,width=250,textWidth=150,icon='KeyboardArrowDownIcon',children,uniq=false,attention=false}) {
    const [openType, setOpenType] = useState(false);
    const anchorRef = useRef(null);
    
    function RichTooltipContent() {
        
        function onSelect(type) {
            setSelected(type) 
            setOpenType(false)
        }
        
        return (
            <div style={{padding:'5px 0px 5px 3px',maxHeight:'240px',overflowY:'scroll'}} >
            {dataToSelect.map((type,index)=>
                <Item onClick={()=>onSelect(type)} key={index} style={{padding:'9px 20px',marginBottom: index+1 !== dataToSelect.length ? '0px': 0}} className={'rowCenter'}>
                    <h3 className={'noBreakText'} style={{fontSize:'14px',marginRight:'10px',flexGrow:1}}>{type}</h3>
                    <Circle type={`${selected===type}`} />
                </Item>
            )}
            </div>
        )
    }
  
    return (
        <>
            <Container onClick={()=>{setOpenType(openType=>!openType)}} open={openType} >
                <Text style={{maxWidth:textWidth}} >
                    {attention && !dataToSelect.find(i=>i===selected)  ? 
                        <Attention>*</Attention>
                    :null}
                    {selected}
                </Text>
                <div style={{display:'flex'}} ref={anchorRef}>
                    <Icons style={{fontSize:20,transition:'all 0.4s',transform:openType ? 'rotate(-180deg)' :'rotate(0deg)'}} type={`${icon}`}/>
                </div>
            </Container>
            <RichTooltip width={width} anchorRef={anchorRef}  open={openType} setOpen={setOpenType}>
                {uniq ?
                children
                :
                <RichTooltipContent/>
                }

            </RichTooltip>
        </>
    )
  }