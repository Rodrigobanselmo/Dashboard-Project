import styled from "styled-components";
import MultiSelect from "react-multi-select-component";
import { lighten,darken,fade } from "@material-ui/core/styles";

export const ContainerDiv = styled.div`
  width: 100%;
  background-color: ${({theme})=> theme.palette.background.paper};
  border-radius: 15px;
  padding:0 20px 20px 20px;
  -webkit-box-shadow: 3px 4px 16px 1px rgba(0,0,0,0.33);
  box-shadow:  3px 4px  16px 1px rgba(0,0,0,0.3);
`;

export const Mult = styled(MultiSelect)`
  &&.rmsc {
    --rmsc-main: ${({theme})=>theme.palette.primary.main};
    --rmsc-hover: ${({theme})=>theme.palette.background.hoverPaper};
    --rmsc-selected: ${({theme})=>theme.palette.type!== 'dark'? darken(theme.palette.background.paper,0.1):darken(theme.palette.background.contrast,0.2)};
    --rmsc-border: ${({theme})=>theme.palette.background.line};
    --rmsc-gray: ${({theme})=>theme.palette.text.secondary};
    --rmsc-bg: ${({theme})=>theme.palette.type!== 'dark'? darken(theme.palette.background.paper,0.02):lighten(theme.palette.background.paper,0.03)};
  }
  &&.rmsc .search input{
    color: ${({theme})=>theme.palette.text.primary};
    background-color: ${({theme})=>theme.palette.type!== 'dark'? darken(theme.palette.background.paper,0.05):lighten(theme.palette.background.paper,0.05)};
  };

  &&& input[type='checkbox'] {

  }
`;

