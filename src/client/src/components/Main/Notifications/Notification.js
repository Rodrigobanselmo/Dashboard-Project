import styled, {css, keyframes} from 'styled-components/macro';
import {Icons} from '../../Icons/iconsDashboard'


const SlideLeft = keyframes`
    0% {
        margin-left: 120%;
    }

    100% {
        margin-left: 0;
    }
`;
const SlideTop = keyframes`
    0% {
        margin-top: -70px;
    }

    100% {
        margin-top: 0;
    }
`;
const SlideBottom = keyframes`
    0% {
        margin-top: 0;
    }

    100% {
        margin-top: -70px;
    }
`;

const SlideRight = keyframes`
    0% {
        margin-left: 0;
        margin-bottom: 0;
    }
 
    20% {
        margin-left: -10%;
    }

    100% {
        margin-left: 120%;
        margin-bottom: -50px;
    }
`;

export const Icon = styled(Icons)`
    margin:5px 10px;
    font-size:20px;
    color:#fff;
    align-self:center;
`;

export const DivBar = styled.div`
  height: 5px;

  ${props => props.type =='success' && css`
      background-image: linear-gradient(130deg, #5cb85c, #1fb913);
  `}
  ${props => props.type =='error' && css`
      background-image: linear-gradient(130deg, #bb2011, #880000);
  `}
  ${props => props.type =='warn' && css`
      background-image: linear-gradient(130deg, #cfd220, #b59c0e);
  `}
  ${props => props.type =='info' && css`
      background-image: linear-gradient(130deg, #5bc0de, #4e91d4);
  `}
  ${props => props.type =='simple' && css`
      background-image: linear-gradient(130deg, #f7600d, #b03f0b);
  `}

`;

export const DivItem = styled.div`

    position: relative;
    -webkit-box-shadow: 1px 1px 9px 1px #5E5E5E; 
    box-shadow: 1px 1px 9px 1px #5E5E5E;
    border-radius: 10px;
    background-color: #000;
    overflow: hidden;
    margin-bottom: 20px;
    animation: ${SlideLeft} 0.4s;
    animation-fill-mode: forwards;
    width: 300px;
    transition: all 0.6s ease;
    color:#fff;

    
    & p {
      font-size: 13px;
      padding: 15px 0px;
      padding-right:8px;
      margin: 0;
      width: 230px;
    }


    ${props => props.notificationExit && css`
        animation: ${SlideRight} 0.4s;
        animation-fill-mode: forwards;
    `}

`;

export const DivItemModal = styled.div`

    position: relative;
    overflow: hidden;
    margin-bottom: 20px;
    animation-fill-mode: forwards;
    transition: all 0.6s ease;
    color:#fff;
    -webkit-box-shadow: 1px 1px 9px 1px #000; 
    border-radius: 30px;
    box-shadow: 1px 1px 9px 1px #000;
    animation: ${SlideTop} 0.4s;
    width:auto;
    max-width: 700px;
    color:#fff;
    ${props => props.type =='success' && css`
        background: #5cb85c;
    `}
    ${props => props.type =='error' && css`
        background: #bb2011;
    `}
    ${props => props.type =='warn' && css`
        background: #b59c0e;
    `}
    ${props => props.type =='info' && css`
        background: #4e91d4;
    `}
    ${props => props.type =='simple' && css`
        background: #f7600d;
    `}

    
    & p {
      font-size: 14px;
      padding: 8px 0px;
      padding-right:8px;
      margin-right: 5px;
      max-width: 650px;
    }


    ${props => props.notificationExit && css`
        animation: ${SlideBottom} 0.4s;
        animation-fill-mode: forwards;
    `}

`;
