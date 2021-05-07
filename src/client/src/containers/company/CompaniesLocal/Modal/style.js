import styled, {css} from "styled-components";

export const Selection = styled.div`
font-size: 20px;
text-align: center;
margin-bottom: 20px;
margin-right:10px;
margin-left:10px;
height: 150px;
width: 150px;
border-radius: 50px;
background-color: ${({theme,selected})=>('transparent')};
border: 5px ${({theme,selected})=>(selected ? theme.palette.primary.main : theme.palette.background.line)} solid;

&:hover {
  border: 5px ${({theme})=>(theme.palette.primary.main)} solid;
}
`;