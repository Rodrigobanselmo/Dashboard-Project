import styled, {css, keyframes} from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { BsCheckCircle,BsExclamationTriangle,BsXOctagon } from 'react-icons/bs';


export const HeroBg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index:-1;
  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(rgba(0, 0, 0, 0.2)),
        to(rgba(0, 0, 0, 0.2))
      ),
      -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.2)), to(transparent));
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0.6) 100%
      ),
      linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, transparent 100%);
    z-index: 2;
  }
`;


export const IconCheck = styled(BsCheckCircle)`
  color: green;
  margin-right: 5px;
`;
export const IconWarn = styled(BsExclamationTriangle)`
  color: #B09F10;
  margin-right: 5px;
`;
export const IconError = styled(BsXOctagon)`
  color: #e91c1c;
  margin-right: 5px;
`;

export const DivIcon = styled.div`
  position: absolute;
  opacity:${({ show }) => (show ? 1 : 0)};
  top: ${({ confirm }) => (confirm ? '82px' : '12px')};
  right: 7px;
  display:flex;
  justify-content:center;
  align-items:center;
  transition: opacity 0.5s ease;
  user-select: none;
  overflow: hidden;
  z-index:11;
`;

export const VideoBg = styled.video`
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
`;
export const Background = styled.div`
  display: flex;
  position:fixed;
  justify-content:center;
  top:0;
  right:0;
  left:0;
  bottom: 0;
  flex-direction: column;

`;

export const SocialLogo = styled(Link)`
  color: #fff;
  justify-self: start;
  cursor: pointer;
  text-decoration: none;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-weight: bold;

  &:hover {
    color: #fff;
    transform: scale(1.02);
    transition: 0.15s ease-out;
    text-decoration: none;
  }

span {
  color:#d9560b;
}

`;

export const Container = styled.div`
  display: flex;
  margin: 0 86px;
  height: 80px;
  margin-bottom:-80px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 24px;
  align-self: center;
  max-width: 1100px;

`;

const slideIn = keyframes`
  from {
    transform: scale(0.4);
  }

  to {
    transform: scale(0.9);
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.71);
  border-radius: 30px;
  width: 100%;
  margin: auto;
  max-width: 480px;
  padding: 30px 68px 30px;
  align-self:center;
  -webkit-box-shadow: 0px 0px 16px 6px rgba(51,51,51,0.81); 
  box-shadow: 0px 0px 16px 6px rgba(51,51,51,0.81);
  animation: ${slideIn} 1.2s ease-in;
  
/*   ${props => props.animation && css`
  `} */



`;

export const Error = styled.div`
  background: #880000;
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  margin: 0 0 16px;
  padding: 10px 20px;
`;

export const Base = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  width: 100%;
`;

export const Title = styled.h1`
  color: #eee;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 33px;
  opacity: ${({fade})=>(fade===true ? 1 : 0)};
  transition: opacity 0.40s ease-out;

`;

export const Text = styled.p`
  color: #737373;
  font-size: 16px;
  font-weight: 500;
  opacity: ${({fade})=>(fade===true ? 1 : 0)};
  transition: opacity 0.40s ease-out;

`;

export const TextForgotten = styled.p`
  color: #737373;
  font-size: 12.5px;
  font-weight: 500;
  margin-top:${({login})=>(!(login==='login') ? '-30px' : 0)};
  margin-bottom:${({login})=>(!(login==='login')? '30px' : 10)};
  opacity:${({login})=>(!(login==='login') ? 0 : 1)};
  transition: all 0.85s ease-out;
  z-index:0;

`;

export const TextSmall = styled.p`
  margin-top: 10px;
  font-size: 13px;
  text-align: justify;
  line-height: normal;
  color: #8c8c8c;
  
`;

export const LinkButton = styled(Link)`
  color: #fff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color:#d9560b;
    transition: 0.15s ease-out;
  }
`;

export const TextButton = styled.span`
  color: #fff;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color:#d9560b;
    transition: 0.15s ease-out;
  }
`;

export const Input = styled.input`
  background-color: #ddd;
  border-radius: 4px;
  border: 0;
  color: #000;
  height: 50px;
  line-height: 50px;
  padding: 5px 20px;
  margin-bottom: 20px;
  width:100%;
  padding-right:33px;
  z-index:9;

  &:focus {
  border-color:#262626;
  border-style:solid;
  border-width:1px;
}

`;

export const InputPassword = styled(Input)`
    position:absolute;
    opacity:${({login})=>(login ? 1 : 0)};
    top:${({login})=>(login ? '0px' : '-70px')};
    transition: all 1s ease-out;
    z-index:8;

`;

export const InputConfirm = styled(Input)`
    position:absolute;
    opacity:${({login})=>(login === 'register' ? 1 : 0)};
    top:${({login})=>(login === 'register'  ? '70px' : '-70px')};
    transition: all 1s ease-out;
    z-index:7;
    overflow:hidden;
`;


export const Submit = styled.button`
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  margin: 20px 0 5px;
  margin-top: ${({login})=>(!login ? '5px' : login === 'login' ? '70px' : '140px')};
  padding: 10px;
  border: 0;
  background: #d9560b;
  color: white;
  cursor: pointer;
  z-index:1;
  transition:${({login})=>(login ? 'margin-top 0.85s ease-out' : login == 'login' ? 'margin-top 0.85s ease-out' : 'margin-top 1.7s ease-out')};

  &:disabled {
    color: #fff;
    background: #d9560b;
  }

  &:hover {
    background: #c6460b
  }


`;
export const Google = styled.button`
  background: '#fff';
  display:flex;
  position:relative;
  align-items:center;
  justify-content:center;
  border-radius: 4px;
  font-size: 16px;
  margin: 20px 0 20px;
  padding: 16px;
  font-weight: bold;
  border: 0;
  color: '#000';
  cursor: pointer;

  img {
  width:25px;
  height:25px;
  margin-right:10px;
  }
`;
