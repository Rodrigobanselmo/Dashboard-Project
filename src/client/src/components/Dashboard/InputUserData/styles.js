import styled, {css} from "styled-components";
import FormControlLabel from '@material-ui/core/FormControlLabel';

export const FormLabel = styled(FormControlLabel)`
  color: ${({theme})=>theme.palette.text.primary};
  align-self: flex-start;
  margin-bottom: 20px;
  margin-left: 20px;
`;


export const PoliticsContainer = styled.div`
  height: 50vh;
  width: 100%;
  color: ${({theme})=>theme.palette.text.primary};
  overflow: hidden scroll;
  margin-bottom: 5px;
  border: 1px ${({theme})=>theme.palette.background.line} solid;
  padding: 20px;
  border-radius:10px;
  font-size:14px;
  line-height:1.6;
`;