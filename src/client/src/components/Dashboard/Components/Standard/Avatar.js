
import styled from "styled-components";
import {Icons} from '../../../Icons/iconsDashboard'

export const UserAvatar = styled.div`
    height: 46px;
    width: 46px;
    background-color: ${props=>props.background ? props.theme.palette.background.default : 'transparent'};
    border-radius: 25px;
    justify-content: center;
    box-sizing: border-box;
    align-items: center;
    display: flex;
    margin: 5px 10px;
    flex-shrink: 0;
`;

export const GroupIcon = styled(Icons)`
    font-size:50px;
    color:${({theme})=>theme.palette.text.primary};
`;

export const TextNameEmail = styled.p`
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width:250px;
    line-height:1.3;
`;

export const UserContainer = styled.div`
    display: flex;
    flex-direction: row;
/*     max-width: 250px; */
    align-items: center;
`;

{/* 
<UserContainer >
<UserAvatar >
    <GroupIcon style={{fontSize:28}} type={'Person'}/>
</UserAvatar> 
<TextNameEmail >{row.user} <br/>
<EmailSpan >{row.email}</EmailSpan> </TextNameEmail>
</UserContainer> 
*/}