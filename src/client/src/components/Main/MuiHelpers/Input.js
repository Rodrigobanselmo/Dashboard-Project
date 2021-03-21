import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styled, {css} from "styled-components";
import {Icons} from '../../../components/Icons/iconsDashboard'
import TextField from '@material-ui/core/TextField';
import {BootstrapTooltip} from '../../../components/Main/MuiHelpers/Tooltip'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// <Input key={index} status={emails[index]?.status && emails[index].status} icon={emails[index]?.status && emails[index].status} validation={(emails && emails[index] && emails[index]?.status && (emails[index].status === 'Check' || emails[index].status === 'Warn' || emails[index].status === 'Load'))} onBlur={({target})=>checkEmail(index,target.value)} onChange={addEmail(index)} size={'small'} label="Email" variant="outlined"  />


export const Icon = styled(Icons)`
    position:absolute;
    top:18%;
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
        padding:"14px 0px 9px 17px",
        transform:'translateY(-2px)'
    },
    marginDense: {
        margin:0,
    },
}))((props) => <OutlinedInput {...props} />);

const SelectEnd = withStyles((theme) => ({
    root: {
        color: theme.palette.text.contrastWhite,
        padding:"13px 0px 10px 17px",
    },
}))((props) => <Select {...props} />);

const InputLabelEnd = withStyles((theme) => ({
    root: {
        fontSize:16,
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

export function InputEnd({validation=false,option=false,marginTop=10,marginBottom=10,labelWidth,label,status,icon,width='100%',title='OK',...props}) {

    return (
        <FormControl style={{width:width,marginTop,marginBottom}} variant="outlined">
          <InputLabelEnd margin={'dense'} htmlFor="outlined-adornment-password" >{label}{option && <span style={{fontSize:10,verticalAlign:'middle',marginLeft:8}}>{option===true?'(OPCIONAL)':`(${option})`}</span>}</InputLabelEnd>
          <OutlinedInputEnd
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
              </InputAdornment>
            }
            labelWidth={labelWidth+(option===true?60:0)}
            {...props}
          />
        </FormControl>
    );
}

export function SelectedEnd({selected,setData,sliceItems=false,label,data=[],marginTop=10,marginBottom=10,status,icon,width='100%',title='OK',...props}) {

    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
      setData(data[event.target.value - 1])
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleOpen = () => {
      setOpen(true);
    };

    return (
        <FormControl variant="outlined" style={{width:width,marginTop,marginBottom}} >
            <InputLabelEnd margin={'dense'} htmlFor="outlined-age-native-simple">{label}</InputLabelEnd>
            <SelectEnd
            inputProps={{
                name: 'tipo',
            }}
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={selected === 0 ? 1 : selected}
            onChange={handleChange}
            {...props}
            >
            {sliceItems ?
                data.slice(1,sliceItems).map((item,index)=>
                    <MenuItem key={index} value={(index+1)}>{item}</MenuItem>
                )
            :
                data.map((item,index)=>
                    <MenuItem key={index} value={(index+1)}>{item}</MenuItem>
                )
            }
            </SelectEnd>
        </FormControl>
    );
}
