import Button from '@material-ui/core/Button';
import styled, {css} from "styled-components";
import { lighten,darken } from "@material-ui/core/styles";

//<CancelButton onClick={onClose} style={{  marginRight:'15px'}} variant="outlined" >
//<ContinueButton onClick={onAction} >

export const CancelButton = styled(Button)`
  && {
    padding: 8px 10px;
    border-radius: 8px;
    min-width: 90px;
    text-transform: none;
    border: 1px ${({theme})=>theme.palette.background.line} solid;
    color:${({theme})=>theme.palette.type !== 'dark'?theme.palette.text.secondary:theme.palette.text.primary};
    font-weight:bold;

    &:hover {
      background-color: transparent;
    }

    > .MuiTouchRipple-root span {
      background-color: #00000044;
    }
  }
`;

export const ContinueButton = styled(Button)`

  && {
    padding: 8px 10px;
    border-radius: 7px;
    min-width: ${(props)=> props.minwidth ? props.minwidth : '90px'};
    color:${({theme})=>theme.palette.type !== 'dark'?theme.palette.primary.contrastText :theme.palette.text.primary};
    font-weight:bold;
    text-transform: none;
    border: none;
    background-color: ${(props)=> props.primary ? (props.theme.palette.type !== 'dark'? lighten(props.theme.palette.primary.main,0.2) : props.theme.palette.primary.main) : props.theme.palette.background.attention};
    transition: all 0.5s ease;
    opacity:1;
/*     width:fit-content; */

    &:hover {
      background-color: ${(props)=> props.primary ? (props.theme.palette.type !== 'dark'? lighten(props.theme.palette.primary.main,0.1) : darken(props.theme.palette.primary.main,0.1)) : props.theme.palette.background.attentionHover};
      transition: all 0.2s ease;
    }

    ${props => props.disable === 'true' && css`
      border: 1px ${({theme})=>theme.palette.background.line} solid;
      background: ${({theme})=>theme.palette.type !== 'dark'?theme.palette.background.inactive :theme.palette.background.inactive};
      opacity:1;
      color:${({theme})=>theme.palette.type !== 'dark'?theme.palette.primary.contrastText :theme.palette.text.primary};
      pointer-events: none;
      &:hover {
        background-color: ${({theme})=>theme.palette.background.inactive};
      }
    `};

    ${props => props.size === 'medium' && css`
      padding: 8px 12px;
      font-size:16px;
    `};

    ${props => props.primary === 'outlined' && css`
      border: 1px ${({theme})=>theme.palette.background.line} solid;
      background-color: transparent;
      ${props => props.disable === 'true' && css`
        color:${({theme})=>theme.palette.type !== 'dark'?theme.palette.text.third :theme.palette.text.secondary};
        font-weight:${({theme})=>theme.palette.type !== 'dark'?'normal' :'bold'};
      }
    `};

/*     ${props => props.primary === 'normal' && css`
      background-color: ${(props)=> props.primary ? (props.theme.palette.type !== 'dark'? lighten(props.theme.palette.primary.main,0.2) : props.theme.palette.primary.main) : props.theme.palette.background.attention};
    `}; */

    `};

    > .MuiTouchRipple-root span {
      background-color: ${({theme})=>theme.palette.type !== 'dark'?'#ffffff44' :'#00000044'};
    }
  }

`;
