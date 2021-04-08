import styled from 'styled-components';

export const LoadFullScreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 10, 10, 0.8);
  z-index: 5001;
  position: fixed;
  width: 100vw;
  height: 100vh;
`;
/* interface LoadProps {
  open: boolean;
} */
export const LoadDashboard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.background.default};
  z-index: 1001;
  position: fixed;
  width: 100%;
  height: 100%;
  margin-left: ${(props/* : LoadProps */) => (props.open ? '120px' : '40px')};
  transition: margin-left 0.2s linear;
`;
