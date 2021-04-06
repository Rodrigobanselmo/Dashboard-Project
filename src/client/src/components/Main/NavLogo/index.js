import React from 'react';
import { NavLogoSC } from './Logo';
import styled from "styled-components";

const Images = styled.img`
  height:30px;
  resize:cover;
`;

export const NavLogo = (props) => {

  return (
            <NavLogoSC {...props}>
              <Images src="/images/logoRealiza.png" alt="logo" />
              {/* Simple<span>SST</span> */}
            </NavLogoSC>
  );
}
