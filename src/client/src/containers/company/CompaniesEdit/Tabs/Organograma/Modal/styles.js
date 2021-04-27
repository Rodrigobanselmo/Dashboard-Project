import styled, {css} from "styled-components";
import { lighten,darken,fade } from "@material-ui/core/styles";

export const SubText = styled.p`
  color: ${({theme})=>theme.palette.text.secondary};
  margin:0 0 10px 0;
`;


export const DescText = styled.p`
  margin:0 0 20px 0;
  color: ${({theme})=>theme.palette.text.third};
  //color: ${({theme})=>theme.palette.type !=='dark'? theme.palette.text.third:theme.palette.text.third};
`;



export const TextArea = styled.textarea`
  width:93%;
  height:${props=>props.type == 'font' ? '220px' :'100%'};
  resize:none;
  padding:12px 8px 24px 8px;
  background-color: ${({theme})=>theme.palette.type !=='dark' ?darken(theme.palette.background.paper,0.01):lighten(theme.palette.background.paper,0.01)};
  color: ${({theme})=>theme.palette.type!=="dark"?theme.palette.background.secondary:theme.palette.text.primary};
  box-sizing: border-box;
  font-size:15px;
  border: 1px solid ${({theme})=> theme.palette.background.line };
  /* -webkit-box-shadow: 1px 1px 6px 1px rgba(0,0,0,0.23);
  box-shadow: 1px 1px 6px 1px rgba(0,0,0,0.23); */
  margin:0 0 20px 0;
  border-radius:6px;

  /* ${props => props.error && css`
    border: 1px solid ${({theme})=> theme.palette.background.attention };
  `} */
`;
