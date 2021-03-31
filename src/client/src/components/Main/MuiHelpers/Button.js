import Button from '@material-ui/core/Button';
import styled, {css} from "styled-components";

//<CancelButton onClick={onClose} style={{  marginRight:'15px'}} variant="outlined" >
//<ContinueButton onClick={onAction} >

export const CancelButton = styled(Button)`
  && {
    padding: 8px 10px;
    border-radius: 8px;
    min-width: 90px;
    text-transform: none;
    border: 1px ${({theme})=>theme.palette.background.line} solid;
    color:${({theme})=>theme.palette.text.primary};
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
    color:${({theme})=>theme.palette.text.primary};
    font-weight:bold;
    text-transform: none;
    border: none;
    background-color: ${(props)=> props.primary ? props.theme.palette.primary.main : props.theme.palette.background.attention};
    transition: all 1s ease;
    opacity:1;
/*     width:fit-content; */

    &:hover {
      background-color: ${(props)=> props.primary ? props.theme.palette.primary.dark : props.theme.palette.background.attentionHover};
      transition: all 0.5s ease;
    }

    ${props => props.disable === 'true' && css`
      border: 1px ${({theme})=>theme.palette.background.line} solid;
      background:${({theme})=> theme.palette.background.inactive };
      opacity:1;
      color:${({theme})=>theme.palette.text.primary};
      pointer-events: none;
      &:hover {
        background-color: ${({theme})=>theme.palette.background.inactive};
      }
    `};
    ${props => props.size === 'medium' && css`
      padding: 8px 12px;
      font-size:16px;
    `};

    > .MuiTouchRipple-root span {
      background-color: #00000044;
    }
  }

`;
