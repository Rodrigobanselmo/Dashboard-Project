import React from 'react';
import styled, {css} from "styled-components";
import {Icons} from '../../../components/Icons/iconsDashboard'

export const EmailSpan = styled.span`
    font-size: 12px;
    color:${({theme})=>theme.palette.text.third};
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

export const StatusComponent = styled.div`
    background-color: ${({theme})=> (theme.palette.status.success) };
    border-radius: 10px;
    width:10px;
    height:10px;
    ${props => (props.status === 'none' || props.status === 'Não' || props.status === 'Desligado') && css`
      background-color: ${({theme})=> (theme.palette.status.fail) };
    `}
    ${props => (props.status === 'Aguardando Autenticação'|| props.status === 'Afastado') && css`
      background-color: ${({theme})=> (theme.palette.status.orange ) };
    `}
`;
