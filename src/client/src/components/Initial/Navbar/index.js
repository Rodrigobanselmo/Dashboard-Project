import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { animateScroll as scroll } from 'react-scroll';
import {
  MobileIcon,
  Nav,
  NavbarContainer,
  NavItem,
  NavLinks,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';
import {SIGN,APP_HOME,ABOUT_HOME,SERVICES_HOME,FAQ_HOME} from '../../../routes/routesNames'
import {NavLogo} from '../../Main/NavLogo'

const Navbar = ({ toggle }) => {
  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
    console.log(window.scrollY)
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNav);

    return function cleanupListener() {
      window.removeEventListener('scroll', changeNav)
    }
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav scrollNav={scrollNav}>
          <NavbarContainer>
            <NavLogo onClick={toggleHome} to='/' home={'true'} />
            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>
            <NavMenu>
              <NavItem>
                <NavLinks
                  to={ABOUT_HOME}
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact='true'
                  offset={-80}
                >
                  Sobre
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks
                  to={APP_HOME}
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact='true'
                  offset={-80}
                >
                  App
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks
                  to={SERVICES_HOME}
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact='true'
                  offset={-80}
                >
                  Serviços
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks
                  to={FAQ_HOME}
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact='true'
                  offset={-80}
                >
                  FAQ
                </NavLinks>
              </NavItem>
            </NavMenu>
            <NavBtn>
              <NavBtnLink to={SIGN}>Entrar</NavBtnLink>
            </NavBtn>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
