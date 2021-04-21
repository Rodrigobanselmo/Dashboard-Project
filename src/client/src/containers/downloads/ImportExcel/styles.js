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

