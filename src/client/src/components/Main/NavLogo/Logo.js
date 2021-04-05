import { Link } from 'react-router-dom';
import styled, {css} from 'styled-components';

export const NavLogoSC = styled(Link)`
  color: ${({theme})=> theme.palette.text.contrastWhite};
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 0px;
  font-weight: bold;
  text-decoration: none;
  span {
    color:${({theme})=> theme.palette.primary.main};
  }
  &:hover {
    color: ${({theme})=> theme.palette.text.contrastWhite};
    transform: scale(1.02);
    transition: 0.15s ease-out;
    text-decoration: none;
  }

  ${props => props.home === 'true' && css`
    @media screen and (max-width: 768px) {
        margin-top:20px;
    }
  `}
  ${props => props.small === 'true' && css`
    font-size: 1.3rem;
  `}

`;
