import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import styled, {css} from "styled-components";
import {Icons} from '../../../../components/Icons/iconsDashboard'
import TextField from '@material-ui/core/TextField';

export const HeaderPage = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-bottom:30px;

`;

export const Container = styled.div`
    display:flex;
    flex-direction:column;
    overflow-x:hidden;
    justify-content:center;
    align-items:center;
    padding:120px 10vw 120px 10vw;
    min-height: 100vh;
`;
export const EmailContainer = styled.div`
    display:flex;
    flex-direction:column;
/*     max-width:550px; */
    width:100%;
    margin-bottom:20px;
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

`;

export const Title = styled.h1`
    font-size:25px;
    color: ${({theme})=> theme.palette.text.primary };
    margin-bottom:10px;
`;

export const SubTitle = styled.p`
    text-align:justify;
    font-size:16px;
    color: ${({theme})=> theme.palette.text.primary };
`;

export const AddAnother = styled.div`
    max-width:fit-content;
    padding:7px 10px;
    border-radius: 5px;
    font-size:13px;
    color: ${({theme})=> theme.palette.text.secondary };
    border-color: ${({theme})=> theme.palette.background.inactive };
    border-width: 1px;
    border-style: solid;
    cursor:pointer;

    &:hover {
        border-color: ${({theme})=> theme.palette.primary.main };
    }
`;

export const ContinueButton = styled.div`
    padding:8px 20px;
    border-radius: 8px;
    font-size:18px;
    font-weight:bold;
    color: ${({theme})=> theme.palette.text.primary };
    background-color: ${({theme})=> theme.palette.background.inactive };
    cursor:pointer;


    ${props => props.active === 'true' && css`
    background-color: ${({theme})=> theme.palette.primary.main };
        &:hover {
            transform: scale(1.02);
            opacity: 0.7;
        }
    `}
`;

export const GroupIcon = styled(Icons)`
    font-size:50px;
    color:${({theme})=>theme.palette.text.primary};
`;

export const TypeContainer = styled.div`
  width: 100%;
  justify-content:space-between;
  border-bottom: 1px ${({theme})=>theme.palette.background.line} solid;
  margin-bottom:10px;
  padding-bottom:10px;
`;

export const TableRowComponent = withStyles((theme) => ({
    root: {
        '&:hover' : {backgroundColor:theme.palette.background.hoverPaperLighter}
    },
}))((props) => <TableRow {...props} />);


export const InputEmail = withStyles((theme) => ({
    root: {
        border: `1px ${theme.palette.background.line} solid`,
        color: theme.palette.text.contrastWhite,
        marginBottom:10,        
    },
}))((props) => <TextField {...props} />);

