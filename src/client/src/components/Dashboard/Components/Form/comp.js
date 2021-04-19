import styled, {css} from "styled-components";
import {ContinueButton} from '../../../Main/MuiHelpers/Button'
import {Icons} from '../../../Icons/iconsDashboard'
import { Form } from "@unform/web";

export const FormContainer = styled(Form)`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const HeaderForm = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-bottom:10px;
`;

export const TitleForm = styled.h1`
    text-align:start;
    width:100%;
    font-size:25px;
    color: ${({theme})=> theme.palette.text.primary };
    margin-bottom:10px;
`;

export const SubTitleForm = styled.p`
    text-align:start;
    font-size:16px;
    color: ${({theme})=> theme.palette.text.primary };
`;

export const DividerForm = styled.h3`
  width: 100%;
  margin-top:30px;
  margin-bottom:10px;
  color: ${({theme})=>theme.palette.text.third};
`;


export const AddAnotherForm = styled.div`
    max-width:fit-content;
    padding:7px 10px;
    margin-left:auto;
    border-radius: 5px;
    margin-top:10px;
    margin-bottom:-30px;
    font-size:13px;
    color: ${({theme})=> theme.palette.text.secondary };
    border-color: ${({theme})=> theme.palette.text.third };
    border-width: 1px;
    border-style: solid;
    cursor:pointer;

    &:hover {
        border-color: ${({theme})=> theme.palette.primary.main };
    }
    &:active {
      opacity:0.6;
    }
`;

const ButtonF = styled(ContinueButton)`
`;

export function ButtonForm({children,justify='flex-end',...props}) {
  return(
    <div style={{display:'flex',width:'100%',justifyContent:justify,marginTop:10}} >
        <ButtonF style={{width:200}} {...props} >{children}</ButtonF>
    </div>
  )
}
