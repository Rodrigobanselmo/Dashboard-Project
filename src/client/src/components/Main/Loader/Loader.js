import styled from 'styled-components';

export const LoadFullScreen = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  background-color:rgba(0, 10, 10, 0.8);
  z-index:5001;
  position:fixed;
  width:100vw;
  height:100vh;
`;

export const LoadDashboard = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  background-color:#0C0C0D88;
  z-index:1001;
  position:fixed;
  width:100%;
  height:100%;
  margin-left: ${(props)=>(props.open ? '120px' : '40px')};
  transition: margin-left 0.2s linear
`;
