import styled from "styled-components";

export const ContainerDiv = styled.div`
  width: 100%;
  background-color: ${({theme})=> theme.palette.background.paper};
  border-radius: 15px;
`;

export const ButtonContainer = styled.div`
height:30px;
padding:17px 10px;
border-radius: 8px;
font-size:15px;
color: ${({theme})=> theme.palette.primary.main };
border-color: ${({theme})=> theme.palette.background.line };
border-width: 1px;
border-style: solid;
width:45px;
transition: width 0.5s ease;
margin-left:10px;
cursor:pointer;

& p {
transition: none;
        color: transparent;
        transition: all 0.5s ease;
    }

&:hover {
    & p {
        color: ${({theme})=> theme.palette.text.primary };
    }
    border-color: ${({theme})=> theme.palette.primary.main  };
    width:175px;
}

`;
