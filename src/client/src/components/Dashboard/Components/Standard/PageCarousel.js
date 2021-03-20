import styled, {css} from "styled-components";
import {Icons} from '../../../../components/Icons/iconsDashboard'

// {HeaderPage,Page,Container,InputsContainer,Title,SubTitle,IconCloseButton,IconCloseFull,Icon,IconGoBackFull}

export const HeaderPage = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-bottom:30px;
`;

export const Page = styled.div`
    position:relative;
    background-color: ${({theme})=>theme.palette.background.paper};
    width:100%;
    height:100%;
    overflow-y:scroll;
`;

export const Container = styled.div`
    display:flex;
    z-index:1;
    flex-direction:column;
    overflow-x:hidden;
    justify-content:center;
    align-items:center;
    padding:80px 10vw 80px 10vw;
    min-height: 100vh;
`;
export const InputsContainer = styled.div`
    display:flex;
    flex-direction:column;
/*     max-width:550px; */
    width:100%;
    margin-bottom:20px;
`;

export const Title = styled.h1`
    font-size:25px;
    color: ${({theme})=> theme.palette.text.primary };
    margin-bottom:0px;
`;
export const MainTitle = styled.h1`
    color: ${({theme})=> theme.palette.text.primary };
    margin-bottom:0px;
`;

export const SubTitle = styled.p`
    text-align:center;
    margin-top:10px;
    font-size:16px;
    color: ${({theme})=> theme.palette.text.primary };
`;

export const IconCloseButton = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 25px;
  padding:7px;
  border-radius:4px;
  max-width:100px;
`;

export const IconCloseFull = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  font-size: 30px;
  padding:7px;
  border-radius:4px;

`;

export const Icon = styled(Icons)`
  font-size: 30px;
  border-radius:4px;
  color: ${({theme})=>theme.palette.text.primary};
  cursor: pointer;

  &:hover {
    color:${({theme})=>theme.palette.text.secondary};
  }

  &:active {
    color:${({theme})=>theme.palette.text.third};;
  }
`;

export const IconGoBackFull = styled(IconCloseButton)`
  top: 30px;
  left: 30px;
  font-size: 30px;
  max-width:100px;
`;