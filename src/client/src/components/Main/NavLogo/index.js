import React from 'react';
import { NavLogoSC,NavLogoSCDiv } from './Logo';
import styled from "styled-components";
import { useSelector,useDispatch } from 'react-redux'

const Images = styled.img`
  height:30px;
  resize:cover;
`;

export const NavLogo = React.memo((props) => {

  const theme = useSelector(state => state.theme)
  const dispatch = useDispatch()
  return (
            <NavLogoSCDiv {...props} onClick={()=>dispatch({type: 'THEME_COMPANY'})} >
              {theme.company === 'REALIZA' ?
                <Images src="/images/logoRealiza.png" alt="logo" />
              :
                <>
                  Simple<span>SST</span>
                </>
              }
            </NavLogoSCDiv>
  );
})
