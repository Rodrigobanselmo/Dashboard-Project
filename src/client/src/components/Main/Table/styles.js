import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import styled, {keyframes} from "styled-components";
import {Icons} from '../../Icons/iconsDashboard'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const ButtonContainer = styled.div`
height:30px;
padding:17px 10px;
border-radius: 8px;
font-size:15px;
color: ${({theme})=> theme.palette.primary.main };
border-color: ${({theme})=> theme.palette.background.line };
border-width: 1px;
border-style: solid;
width:45px;
transition: width 0.5s ease;
margin-left:10px;
animation: ${fadeIn} 0.3s ease-in;
&:active {opacity: 0.8;}

cursor:pointer;

    & p {
      transition: none;
        color: transparent;
        transition: all 0.5s ease;
      text-align:center;
      flex:1;

    }

&:hover {
    & p {
        color: ${({theme})=> theme.palette.text.primary };
    }
    border-color: ${({theme})=> theme.palette.primary.main  };
    width:${props=>`${props.width}px`};
  }

`;

export const FilterComponents = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    padding:20px 33px 20px 15px;
    margin-top:10px;
`;

export const TableTitle = styled.h2`
    font-size:26px;
`;

export const TypeContainer = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    max-width:130px;
    &:hover {
        color:${({theme})=>theme.palette.primary.main}
    }
`;


export const EmailSpan = styled.span`
    font-size: 12px;
    color:#D7D7D944;
`;


export const HeadCellLabel = styled.p`
    padding-left: ${ props => props.headCell === 'CNPJ' ? '15px':'0px'};
    color: ${ props => props.theme.palette.text.secondary};
`;


export const StatusComponent = styled.div`
    background-color: ${({status,theme})=> (status === 'Ativo' ? theme.palette.status.success : status==='Aguardando Autenticação' ? theme.palette.status.orange : theme.palette.status.fail) };
    border-radius: 10px;
    width:10px;
    height:10px;
    margin:auto;
    transform:translateX(-13px);
`;


export const UserContainer = styled.div`
    display: flex;
    flex-direction: row;
/*     max-width: 250px; */
    align-items: center;
`;

export const GroupIcon = styled(Icons)`
    font-size:50px;
    color:${({theme})=>theme.palette.text.primary};
`;

export const UserAvatar = styled.div`
    height: 46px;
    width: 46px;
    border-radius: 25px;
    justify-content: center;
    box-sizing: border-box;
    align-items: center;
    display: flex;
    margin: 5px 10px;
    flex-shrink: 0;
`;


export const TextNameEmail = styled.p`
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height:1.3;
`;


export const TextCell = styled.p`
    white-space: nowrap;
    text-overflow: ellipsis;
/*     width: 100px; */
    overflow: hidden;
`;

export const TableRowComponent = withStyles((theme) => ({
    root: {
        cursor: 'pointer',
        '&:hover' : {backgroundColor:theme.palette.background.hoverPaperLighter},
    },
}))((props) => <TableRow {...props} />);

export const TableCellComponent = withStyles((theme) => ({
    root: {
        borderBottom: `1px ${theme.palette.background.line} solid`,
        padding:'0px 0px',
        color: theme.palette.text.contrastWhite,
    },
}))((props) => <TableCell {...props} />);

