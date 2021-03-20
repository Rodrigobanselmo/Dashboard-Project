import React,{useRef,useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import styled, {css} from "styled-components";
import {Icons} from '../../Icons/iconsDashboard'
import TextField from '@material-ui/core/TextField';
import {BootstrapTooltip} from './Tooltip'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import RichTooltip from '../../Dashboard/Components/MultUsage/RichTooltip'

// <Input key={index} status={emails[index]?.status && emails[index].status} icon={emails[index]?.status && emails[index].status} validation={(emails && emails[index] && emails[index]?.status && (emails[index].status === 'Check' || emails[index].status === 'Warn' || emails[index].status === 'Load'))} onBlur={({target})=>checkEmail(index,target.value)} onChange={addEmail(index)} size={'small'} label="Email" variant="outlined"  />

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

export const Icon = styled(Icons)`
    position:absolute;
    top:25%;
    right:17px;
    cursor:pointer;
    color: ${({theme})=> theme.palette.status.success };


    ${props => props.status === 'Warn' && css`
        color: ${({theme})=> theme.palette.status.fail };
    `}
    ${props => props.status === 'Load' && css`
        top:11%;
        right:17px;
    `}
    ${props => props.status === 'Normal' && css`
        color: ${({theme})=> theme.palette.text.primary };
    `}
`;
export const IconEnd = styled(Icons)`
    cursor:pointer;
    color: ${({theme})=> theme.palette.status.success };


    ${props => props.status === 'Warn' && css`
        color: ${({theme})=> theme.palette.status.fail };
    `}
    ${props => props.status === 'Load' && css`

    `}
    ${props => props.status === 'Normal' && css`
        color: ${({theme})=> theme.palette.text.primary };
    `}
`;

const InputEmail = withStyles((theme) => ({
    root: {
        border: `1px ${theme.palette.background.line} solid`,
        color: theme.palette.text.contrastWhite,
        marginBottom:10,
    },
}))((props) => <TextField {...props} />);

const OutlinedInputEnd = withStyles((theme) => ({
    root: {
        color: theme.palette.text.contrastWhite,
    },
    input: {
        padding:"13px 0px 10px 17px",
        transform:'translateY(-2px)'
    },
    marginDense: {
        margin:0,
        marginRight:20,
    },
}))((props) => <OutlinedInput {...props} />);

const InputLabelEnd = withStyles((theme) => ({
    root: {
        fontSize:17
    },
}))((props) => <InputLabel {...props} />);

export default function Input({validation=false,status,icon,width='100%',title='OK',...props}) {

    return (
            <div style={{position:'relative',width:width,display:'flex',flexDirection:'column'}}>
                <InputEmail {...props}  />
                {validation &&
                <BootstrapTooltip placement="right" TransitionProps={{ timeout: {enter:500, exit: 50} }} title={title} styletooltip={{transform: 'translateY(-30px)'}}>
                    <div>
                        <Icon status={status} type={icon}/> 
                    </div>
                </BootstrapTooltip>
                }
            </div>
    );
}

export function InputEnd({selected,validation=false,marginTop=10,marginBottom=10,labelWidth,label,status,icon,width='100%',title='OK',...props}) {

    const [openType, setOpenType] = useState(false);
    const anchorRef = useRef(null);
    
    function RichTooltipContent() {
        
        function onSelect(type) {
            setOpenType(false)
        }
        
        return (
            <div style={{padding:'5px 0px 5px 3px',maxHeight:'240px',overflowY:'scroll'}} >
            {['1','2'].map((type,index)=>
                <Item onClick={()=>onSelect(type)} key={index} style={{padding:'9px 20px',marginBottom: index+1 !== ['1','2'].length ? '0px': 0}} className={'rowCenter'}>
                    <h3 className={'noBreakText'} style={{fontSize:'14px',marginRight:'10px',flexGrow:1}}>{type}</h3>
                    <Circle type={`${1===type}`} />
                </Item>
            )}
            </div>
        )
    }

    return (
        <FormControl style={{width:width,marginTop,marginBottom}} variant="outlined">
          <InputLabelEnd margin={'dense'} htmlFor="outlined-adornment-password" >{label}</InputLabelEnd>
          <OutlinedInputEnd
            {...props}
            margin={'dense'}
            endAdornment={
              <InputAdornment position="end">
                {validation &&
                <BootstrapTooltip placement="bottom" TransitionProps={{ timeout: {enter:500, exit: 50} }} title={title} styletooltip={{transform: 'translateY(0px)'}}>
                    <div>
                        <IconEnd status={status} type={icon}/> 
                    </div>
                </BootstrapTooltip>
                }
                {selected &&
                <div>
                    <div onClick={()=>{setOpenType(openType=>!openType)}} style={{display:'flex'}} ref={anchorRef}>
                        <Icons style={{fontSize:20,transition:'all 0.4s',transform:openType ? 'rotate(-180deg)' :'rotate(0deg)'}} type={`${icon}`}/>
                    </div>
                    <RichTooltip width={250} anchorRef={anchorRef}  open={openType} setOpen={setOpenType}>
                        <RichTooltipContent/>
                    </RichTooltip>
                </div>
                }
              </InputAdornment>
            }
            labelWidth={labelWidth}
          />
        </FormControl>
    );
}

//style={{paddingRight:20}} 