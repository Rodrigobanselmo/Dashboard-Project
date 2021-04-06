import styled from "styled-components";

export const ContainerDiv = styled.div`
  width: 100%;
  background-color: ${({theme})=> theme.palette.background.paper};
  border-radius: 15px;
  -webkit-box-shadow: 5px 6px 16px 1px rgba(81,81,81,0.44);
  box-shadow: 5px 6px 16px 1px rgba(81,81,81,0.44);
`;
