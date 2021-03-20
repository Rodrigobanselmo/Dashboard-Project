import { AiOutlineClose } from 'react-icons/ai';
import { BsCheckCircle,BsExclamationTriangle,BsXOctagon,BsInfoCircle } from 'react-icons/bs';
import styled, {css, keyframes} from 'styled-components/macro';

export const IconCLose = styled(AiOutlineClose)`

    position: absolute;
    top: 7px;
    right: 8px;
    font-size: 24px;
    cursor:pointer;


    ${props => props.small && css`
        position: absolute;
        top: 7px;
        right: 8px;
        font-size: 14px;
    `}
    &:hover {
        opacity:0.5;
    }

`;

export const IconCheck = styled(BsCheckCircle)`
    margin:13px;
    font-size:23px;
    color:#5cb85c;
    align-self:center;
`;
export const IconWarn = styled(BsExclamationTriangle)`
    margin:13px;
    font-size:23px;
    color:#c5aa10;
    align-self:center;
`;
export const IconError = styled(BsXOctagon)`
    /* color: #ae423f; */
    margin:13px;
    font-size:23px;
    color:#bd2f2a;
    align-self:center;
`;
export const IconInfo= styled(BsInfoCircle)`
    /*   color: #4e91d4; */
    margin:13px;
    font-size:23px;
    color:#5bc0de;
    align-self:center;
`;
