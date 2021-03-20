import React, { useState } from 'react';
//import Navbar from '../components/Initial/Navbar';
import Sidebar from '../components/Initial/Sidebar';
//import Footer from '../components/Initial/Footer';
//import HeroSection from '../components/Initial/HeroSection';
//import InfoSection from '../components/Initial/InfoSection';
/* import {
  homeObjOne,
  homeObjTwo,
  homeObjThree
} from '../components/Initial/InfoSection/Data'; */
//import Services from '../components/Initial/Services';

function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
    </>
  );
}

export default Home;
