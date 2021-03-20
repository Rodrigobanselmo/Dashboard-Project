import styled from 'styled-components';
import { Link } from 'react-scroll';
import { MdKeyboardArrowRight, MdArrowForward } from 'react-icons/md';

export const ArrowForward = styled(MdArrowForward)`
  margin-left: 8px;
  color:'#fff';
  font-size: 20px;
`;

export const ArrowRight = styled(MdKeyboardArrowRight)`
  margin-left: 8px;
  color:'#fff';
  font-size: 20px;
`;

export const Button = styled(Link)`
  border-radius: 50px;
  background: ${({ primary }) => (primary ? '#d9560b' : '#010606')};
  white-space: nowrap;
  padding: ${({ big }) => (big ? '14px 48px' : '12px 30px')};
  color: ${({ dark }) => (dark ? '#010606' : '#ffffff')};
  font-weight:bold;
  font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ primary }) => (primary ? '#ffffff' : '#d9560b')};
    text-decoration:none;
    color: #000;
  }
`;

export const ButtonDisable = styled.button`
  position:relative;
  border-radius: 10px;
  background-color: #d9560b;
  white-space: nowrap;
  padding: 12px 30px;
  color: #ffffff;
  font-weight:bold;
  font-size: 16px;
  cursor: pointer;
  width:100%;
  transition: all 0.5s ease-in-out;
  border:none;
  margin-top:20px;
  
  &:disabled {
    transition: all 0.5s ease-in-out;
    background: #444;
    text-decoration:none;
    color: #ffffff;
  }

  span {
    position:absolute;
    top:10px;
    right:10px;
  }
`;
