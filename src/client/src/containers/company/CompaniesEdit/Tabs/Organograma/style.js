import styled, {css} from "styled-components";
import { lighten } from '@material-ui/core/styles';

export const ContainerButtons = styled.div`
  width: 100px;
  height: 90px;
  background: ${({theme})=>lighten(theme.palette.background.paper,0.058)};
  border-radius: 8px;
  position: fixed;
  -webkit-box-shadow: 3px 3px 11px 1px rgba(0,0,0,0.43);
  box-shadow: 3px 3px 11px 1px rgba(0,0,0,0.43);
  border: 1px solid ${({theme})=>theme.palette.background.line};
  transition: all 0.1s ease;
  &:before {
    content: ' ';
    height: 0;
    position: absolute;
    width: 0;
    right: 12.5px;
    top: -18px;
    border: 9px solid transparent;
    border-bottom-color: ${({theme})=>theme.palette.background.line};
  }
  &:after {
    content: ' ';
    height: 0;
    position: absolute;
    width: 0;
    right: 13px;
    top: -16px;
    border: 8px solid transparent;
    border-bottom-color: ${({theme})=>lighten(theme.palette.background.paper,0.058)};
  }
`;

export const ButtonRightClick = styled.button`
  width:100%;
  height: 33%;
  position: relative;
  border-radius:5px;
  color: ${({theme})=>lighten(theme.palette.text.primary,0.031)};
  border: none;
  background: ${({theme})=>lighten(theme.palette.background.paper,0.058)};
  &:hover {
    background: ${({theme})=>lighten(theme.palette.background.paper,0.0)};
  }
  span {
        opacity:1
  }
  ${props => props.position == 4 && props.text=='Adicionar' && css`
      span {
        opacity:0.5
      }
  `}

  ${props => props.nodeKey == 'initial' && props.text=='Deletar'  && css`
      span {
        opacity:0.5
      }
  `}

  ${props => props.nodeKey == 'initial' &&  props.text=='Editar' && css`
      span {
        opacity:0.5
      }
  `}



  ${props => props.nodeKey == 'initial' && props.text=='Deletar' && props.dataState?.childrenHide && css`
      span {
        opacity:0.5
      }
  `}
  ${props => props.position == 1 && props.text=='Deletar' && props.dataState?.children[props.indexes[0]]?.childrenHide && css`
      span {
        opacity:0.5
      }
  `}
  ${props => props.position == 2 && props.text=='Deletar' && props.dataState?.children[props.indexes[0]]?.children[props.indexes[1]]?.childrenHide && css`
      span {
        opacity:0.5
      }
  `}

  ${props => props.position == 3 && props.text=='Adicionar' && props.dataState?.children[props.indexes[0]]?.children[props.indexes[1]]?.children[props.indexes[2]]?.childrenHide && css`
  span {
    opacity:0.5
  }
  `}
`;

export const ContainerInputs = styled.div`
  width: 300px;
  height: fit-content;
  padding:0 10px;
  background: ${({theme})=>lighten(theme.palette.background.paper,0.058)};
  border-radius: 8px;
  position: fixed;
  -webkit-box-shadow: 3px 3px 11px 1px rgba(0,0,0,0.43);
  box-shadow: 3px 3px 11px 1px rgba(0,0,0,0.43);
  border: 1px solid ${({theme})=>theme.palette.background.line};
  transition: all 0.1s ease;
`;
