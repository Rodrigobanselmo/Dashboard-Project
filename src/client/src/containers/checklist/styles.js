import styled,{css} from "styled-components";
import { lighten,darken,fade } from "@material-ui/core/styles";
import {Icons} from '../../components/Icons/iconsDashboard';


export const ContainerDiv = styled.div`
  width: 100%;
  background-color: ${({theme})=> theme.palette.background.paper};
  border: 1px solid ${({theme})=>theme.palette.background.line};
  border-radius: 15px;
  overflow: hidden;
`;

export const ColumnContainer = styled.div`
  min-width: 25%;
  padding:15px 5px;
  position:relative;
  //background-color: blue;
  border-right: 1px solid ${({theme})=>theme.palette.background.line};
  border-left: 1px solid ${({theme})=>theme.palette.background.line};
  p {
    margin-left:10px;
    font-size:.92rem;
    color:${({theme})=>theme.palette.text.third};
  }

`;

export const CardChecklistContainer = styled.div`
  cursor: pointer;
  flex: 1;
  padding:7px 25px 7px 7px;
  background-color: ${({theme})=>theme.palette.type!=="dark"?darken(theme.palette.background.paper,0.02):lighten(theme.palette.background.paper,0.03)};
  border: 1px solid ${({theme})=>theme.palette.background.line};
  border-radius:5px;
  margin-bottom:10px;
  margin-right:10px;
  -webkit-box-shadow: 2px 2px 3px 1px ${({theme})=>theme.palette.type!=="dark"?'rgba(0,0,0,0.10)':'rgba(0,0,0,0.33)'};
  box-shadow: 2px 2px 3px 1px ${({theme})=>theme.palette.type!=="dark"?'rgba(0,0,0,0.10)':'rgba(0,0,0,0.33)'};
  display:flex;
  flex-direction:row;
  &:hover {
    background-color: ${({theme})=>theme.palette.type!=="dark"?darken(theme.palette.background.paper,0.035):darken(theme.palette.background.paper,0.005)};
  }
  &:active {
    opacity:0.7;
  }

  p {
    display: flex;
    flex-grow:1;
    margin-left:0;
    text-overflow: ellipsis;
    -webkit-line-clamp:2;
    display: -webkit-box;
    -webkit-box-orient:vertical;
    overflow:hidden;
    font-size:1rem;
    color:${({theme})=>theme.palette.type!=="dark"? darken(theme.palette.text.third,0.2):theme.palette.text.secondary};
  }

  ${props => props.position && css`
    border: 2px solid ${({theme})=>theme.palette.type!=="dark"?lighten(theme.palette.primary.main,0.3):theme.palette.primary.main};
    padding:7px 7px 7px 7px;
    p {
      color:${({theme})=>theme.palette.type!=="dark"? lighten(theme.palette.primary.main,0.2):theme.palette.primary.main};
    }
  `}
  ${props => props.fixedHeight && css`
    height:60px;
    align-items: center;
  `}

  ${props => props.button && css`
    text-align:center;
    align-items: center;
    min-height:45px;
    background-color: ${({theme})=>theme.palette.type!=="dark"?darken(theme.palette.background.paper,0.0):lighten(theme.palette.background.paper,0.03)};
    padding:7px 7px 7px 7px;
    box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.22);
  `}

  ${props => props.isDragging && css`
    opacity:0.7;
  `}
`;

export const CardContainerRisk = styled(CardChecklistContainer)`
  padding-top:16px;
  height:auto;
  position:relative;
  cursor:grab;
  opacity:1;
  :before {
    top:6px;
    //right:5px;

    width: 30px;
    height:3px;
    /* width: 9px;
    height: 9px; */
    border-radius:20px;
    background:  ${({theme})=>theme.palette.primary.main};
    position:absolute;
    content:"";
  }

  ${props => props.mandatory && !props.position && css`
    border: 1px solid ${({theme})=>theme.palette.type!=="dark"?lighten(theme.palette.primary.main,0.4):theme.palette.primary.main};
  `}

  ${props => props.type == 'qui' && css`
    :before {
      background:  ${({theme})=>theme.palette.type!=="dark"?darken(theme.palette.risk.qui,0.07):darken(theme.palette.risk.qui,0.2)};
    }
  `}
  ${props => props.type == 'fis' && css`
    :before {
      background:  ${({theme})=>theme.palette.type!=="dark"?lighten(theme.palette.risk.fis,0.07):darken(theme.palette.risk.fis,0.2)};
    }
  `}
  ${props => props.type == 'bio' && css`
    :before {
      background:  ${({theme})=>theme.palette.type!=="dark"?lighten(theme.palette.risk.bio,0.2):darken(theme.palette.risk.bio,0.1)};
    }
  `}
  ${props => props.type == 'aci' && css`
    :before {
      background:  ${({theme})=>theme.palette.type!=="dark"?lighten(theme.palette.risk.aci,0.3):darken(theme.palette.risk.aci,0.1)};
    }
  `}
  ${props => props.type == 'erg' && css`
    :before {
      background:  ${({theme})=>theme.palette.type!=="dark"?lighten(theme.palette.risk.erg,0.5):darken(theme.palette.risk.erg,0.1)};
    }
  `}

  ${props => props.isDragging && css`
    opacity:0.7;
  `}
`;

export const IconsArrow = styled(Icons)`
  color: ${({theme})=>theme.palette.text.secondary};
`;

export const IconsBack = styled(Icons)`
  color: ${({theme})=>theme.palette.text.secondary};
  transform:rotate(180deg) translateX(-5px);
  margin-right:-5px;
`;

export const IconsArrowCard = styled(Icons)`
  color: ${({theme})=>theme.palette.primary.main};
`;

export const ContainerHeader = styled.div`
  display: flex;
  align-items: center;
  border-left: 1px solid ${({theme})=>theme.palette.background.line};
  border-right: 1px solid ${({theme})=>theme.palette.background.line};
  border-bottom: 2px solid ${({theme})=>theme.palette.background.line};
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  width: 100%;
  height: 50px;
  padding: 0 12px;
 //background-color: red;
`;

export const AddCircle = styled.div`
  background-color: ${({theme})=>theme.palette.type!=="dark"?theme.palette.background.paper:theme.palette.background.contrast};
  color: ${({theme})=>theme.palette.type!=="dark"?darken(theme.palette.text.third,0.2):theme.palette.text.secondary};
  height: 40px;
  width: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 30px;
  right: 30px;
  -webkit-box-shadow: 1px 1px 8px 3px ${({theme})=>theme.palette.type!=="dark"?'rgba(0,0,0,0.10)':'rgba(0,0,0,0.33)'};
  box-shadow: 1px 1px 8px 3px ${({theme})=>theme.palette.type!=="dark"?'rgba(0,0,0,0.10)':'rgba(0,0,0,0.33)'};
  cursor: pointer;

  &:hover {
    background-color: ${({theme})=>theme.palette.type!=="dark"?darken(theme.palette.background.paper,0.045):lighten(theme.palette.background.contrast,0.1)};
  }
  &:active {
    background-color: ${({theme})=>theme.palette.type!=="dark"?darken(theme.palette.background.paper,0.085):lighten(theme.palette.background.contrast,0.2)};
  }
`;

export const NoCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  border: 2px dashed ${({theme})=> theme.palette.background.line };
  border-radius:6px;
  margin-right:10px;
  p {
    margin:0;
    padding:0;
  }
`;

export const EmptyField = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  border: 2px dashed ${({theme})=> theme.palette.background.line };
  border-radius:6px;
  margin:0px 10px 10px 10px;
  position:relative;
  cursor: pointer;
  &:hover {
    background-color: ${({theme})=>theme.palette.type!=="dark"?darken(theme.palette.background.paper,0.020):lighten(theme.palette.background.paper,0.01)};
    border: 2px dashed ${({theme})=>theme.palette.type!=="dark"?darken(theme.palette.background.line,0.185):lighten(theme.palette.background.line,0.5)};
  }

  p {
    margin:0;
    padding:0;
  }

  ${props => props.hover =='none' && css`
    cursor: default;
    &:hover {
      background-color: transparent;
      border: 2px dashed ${({theme})=> theme.palette.background.line };
    }
  `}

  ${props => props.hover == 'add' && css`
    cursor: copy;
  `}
  ${props => props.hover == 'move' && css`
    cursor: move;
  `}

  ${props => props.draggingOverWith=='ok' && props.isDraggingOver && css`
    cursor: copy;
    &:hover {
      background-color: ${({theme})=>theme.palette.type!=="dark"?darken(theme.palette.background.paper,0.020):lighten(theme.palette.background.paper,0.02)};
      border: 2px dashed ${({theme})=>theme.palette.type!=="dark"?darken(theme.palette.background.line,0.185):lighten(theme.palette.background.line,0.7)};
    }
  `}
  ${props => props.draggingOverWith =='not' && props.isDraggingOver && css`
    cursor: no-drop;
    &:hover {
      background-color: ${({theme})=>theme.palette.type!=="dark"?darken(theme.palette.background.paper,0.020):lighten(theme.palette.background.paper,0.02)};
      border: 2px dashed ${({theme})=>theme.palette.type!=="dark"?darken(theme.palette.background.line,0.185):lighten(theme.palette.background.line,0.7)};
    }
  `}

`;


export const AddedRiskContainer = styled.div`

  ${props => props.draggingOverWith=='ok' && props.isDraggingOver && css`
    cursor: copy;
  `}
  ${props => props.draggingOverWith =='not' && props.isDraggingOver && css`
    cursor: no-drop;
  `}
  ${props => props.draggingOverWithSameColumn =='same' && props.isDraggingOver && css`
    cursor: move;
  `}
  ${props => props.draggingOverWithSameRisk =='exist'&& props.draggingOverWithSameColumn !='same' && props.isDraggingOver && css`
    cursor: no-drop;
  `}
`;

export const InputTitle = styled.input`
  width:500px;
  padding:12px 8px 24px 8px;
  background-color: ${({theme})=>theme.palette.type !=='dark' ?darken(theme.palette.background.paper,0.01):lighten(theme.palette.background.paper,0.01)};
  color: ${({theme})=>theme.palette.type!=="dark"?theme.palette.background.secondary:theme.palette.text.primary};
  box-sizing: border-box;
  font-size:16px;
  border: 1px solid ${({theme})=> theme.palette.background.line };
  /* -webkit-box-shadow: 1px 1px 6px 1px rgba(0,0,0,0.23);
  box-shadow: 1px 1px 6px 1px rgba(0,0,0,0.23); */
  border-radius:6px;

  ${props => props.error && css`
    border: 1px solid ${({theme})=> theme.palette.background.attention };
  `}
`;
export const InputArea = styled.textarea`
  width:500px;
  min-height:130px;
  padding:12px 8px 24px 8px;
  background-color: ${({theme})=>theme.palette.type !=='dark' ?darken(theme.palette.background.paper,0.01):lighten(theme.palette.background.paper,0.01)};
  color: ${({theme})=>theme.palette.type!=="dark"?theme.palette.background.secondary:theme.palette.text.primary};
  box-sizing: border-box;
  font-size:16px;
  border: 1px solid ${({theme})=> theme.palette.background.line };
  /* -webkit-box-shadow: 1px 1px 6px 1px rgba(0,0,0,0.23);
  box-shadow: 1px 1px 6px 1px rgba(0,0,0,0.23); */
  border-radius:6px;

  ${props => props.error && css`
    border: 1px solid ${({theme})=> theme.palette.background.attention };
  `}
`;

export const ErrorMessage = styled.p`
  font-size:0.8rem;
  color: ${({theme})=>theme.palette.type!=="dark"?theme.palette.background.attention:lighten(theme.palette.background.attention,0.1)};
`;

export const Probabilidade = styled.div`
  cursor:pointer;
  height: 40px;
  width: 40px;
  border-radius: 5px;
  margin: 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 3px 1px ${({theme})=>theme.palette.type!=="dark"?'rgba(0,0,0,0.10)':'rgba(0,0,0,0.33)'};
  border: 1px solid ${({theme})=>theme.palette.type!=="dark"?theme.palette.background.line:lighten(theme.palette.background.contrast,0.12)};;
  background-color:${({theme})=>theme.palette.type !== 'dark' ? fade(theme.palette.background.default,0.3) : theme.palette.background.contrast};
  box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.22);

  &:hover {
    background-color: ${({theme})=>theme.palette.type!=="dark"?darken(theme.palette.background.paper,0.025):lighten(theme.palette.background.paper,0.03)};
  }
  &:active {
    opacity:0.7;
  }

  p {
    margin:0;
    font-size:1.05rem;
  }

  ${props => props.active && css`
      background-color:  ${({theme})=>theme.palette.type!=="dark"?lighten(theme.palette.primary.main,0.3):theme.palette.primary.main};
      &:hover {
        background-color: ${({theme})=>theme.palette.type!=="dark"?lighten(theme.palette.primary.main,0.2):lighten(theme.palette.primary.main,0.05)};
      }
      p {
        color: ${({theme})=>theme.palette.primary.contrastText}
      }
  `}

  ${props => props.disable && css`
      background-color:  transparent;
      border: 1px solid ${({theme})=>theme.palette.type!=="dark"?theme.palette.background.line:lighten(theme.palette.background.contrast,0.12)};;
  `}
`;

export const RiskFilter = styled.div`
  cursor:pointer;
  height: 40px;
  width: 40px;
  border-radius: 5px;
  margin: 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-box-shadow: 2px 2px 3px 1px ${({theme})=>theme.palette.type!=="dark"?'rgba(0,0,0,0.10)':'rgba(0,0,0,0.33)'};
  box-shadow: 2px 2px 3px 1px ${({theme})=>theme.palette.type!=="dark"?'rgba(0,0,0,0.10)':'rgba(0,0,0,0.33)'};

  ${props => props.type == 'qui' && css`
      background-color:  ${({theme})=>theme.palette.type!=="dark"?darken(theme.palette.risk.qui,0.07):darken(theme.palette.risk.qui,0.3)};
  `}
  ${props => props.type == 'fis' && css`
      background-color:  ${({theme})=>theme.palette.type!=="dark"?lighten(theme.palette.risk.fis,0.07):darken(theme.palette.risk.fis,0.1)};
  `}
  ${props => props.type == 'bio' && css`
      background-color:  ${({theme})=>theme.palette.type!=="dark"?lighten(theme.palette.risk.bio,0.2):darken(theme.palette.risk.bio,0.1)};
  `}
  ${props => props.type == 'aci' && css`
      background-color:  ${({theme})=>theme.palette.type!=="dark"?lighten(theme.palette.risk.aci,0.2):darken(theme.palette.risk.aci,0.1)};
  `}
  ${props => props.type == 'erg' && css`
      background-color:  ${({theme})=>theme.palette.type!=="dark"?lighten(theme.palette.risk.erg,0.35):darken(theme.palette.risk.erg,0.1)};
  `}
  ${props => props.disable && css`
      background-color:  transparent;
      border: 1px solid ${({theme})=>theme.palette.type!=="dark"?theme.palette.background.line:lighten(theme.palette.background.contrast,0.12)};;
  `}
`;

export const IconCircle = styled.div`
  height: 40px;
  width: 40px;
  border-radius:20px;
  display:flex;
  justify-content:center;
  align-items: center;
  color:${({theme})=>theme.palette.type !== 'dark' ? fade(theme.palette.text.secondary,0.4) : theme.palette.text.secondary};
  background-color:${({theme})=>theme.palette.type !== 'dark' ? fade(theme.palette.background.default,0.3) : lighten(theme.palette.background.contrast,0.03)};
  -webkit-box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.22);
  box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.22);
  margin-right:10px;
  cursor: pointer;

  &:hover {
    background-color: ${({theme})=>theme.palette.type!=="dark"?darken(theme.palette.background.paper,0.075):darken(theme.palette.background.contrast,0.1)};
  }
  &:active {
    opacity:0.7;
  }

  ${props => props.selected && css`
    color:${({theme})=>theme.palette.type !== 'dark' ? theme.palette.primary.contrastText : theme.palette.primary.contrastText};
    background-color:${({theme})=>theme.palette.type !== 'dark' ? lighten(theme.palette.primary.main,0.3) : theme.palette.primary.main};
    &:hover {
      background-color:${({theme})=>theme.palette.type !== 'dark' ? lighten(theme.palette.primary.main,0.15) : darken(theme.palette.primary.main,0.1)};
    }
  `}

`;

export const ChooseDivYesNoNA = styled.div`
  min-width: 30px;
  width: 100%;
  height: 5px;
  background-color:${({theme})=>theme.palette.type !== 'dark' ? fade(theme.palette.background.inactive,0.4) : theme.palette.background.inactive};
  border-radius: 10px;

  ${props => props.active && css`
    background-color:${({theme})=>theme.palette.type !== 'dark' ? lighten(theme.palette.primary.main,0.2) : theme.palette.primary.main};
  `}
`;

export const SubText = styled.p`
font-size:18px;
display: flex;
max-width:500px;
margin: -15px 0 20px 0;
`;

export const AddButtonAnswer = styled.div`
  cursor: pointer;
  width: 30px;
  border-radius: 10px;
  padding: 0px 10px;
  border: 1px solid ${({theme})=>theme.palette.text.third};
  justify-content: center;
  display: flex;
  color: ${({theme})=>theme.palette.text.third};
  font-size:10px;
  &:hover {
    opacity:0.9;
    border: 1px solid ${({theme})=>theme.palette.type !== 'dark' ? lighten(theme.palette.primary.main,0.2) : theme.palette.primary.main};
    color: ${({theme})=>theme.palette.type !== 'dark' ? lighten(theme.palette.primary.main,0.2) : theme.palette.primary.main};
  }
  &:active {
    opacity:0.5;
  }
`;
