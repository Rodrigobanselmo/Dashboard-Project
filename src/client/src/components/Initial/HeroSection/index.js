import React, { useState } from 'react';
import { Button } from '../../Initial/ButtonElements';
import {
  HeroContainer,
  HeroBg,
  VideoBg,
  HeroContent,
  HeroH1,
  HeroP,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight
} from './HeroElements';

function HeroSection() {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    console.log('object');
    setHover(!hover);
  };
  return (
    <HeroContainer id='home'>
      <HeroBg>
        <VideoBg playsInline autoPlay loop muted src={'/videos/video.mp4'} type='video/mp4' />
      </HeroBg>
      <HeroContent>
        <HeroH1>Segurança e Saúde do Trabalho</HeroH1>
        <HeroP>
          Quer saber como facilitar a gestão de segurança e medicina do trabalho de sua empresa?
{/*           <br/>
          É simple.  */}
        </HeroP>
        <HeroBtnWrapper>
          <Button
            to='signup'
            smooth={true}
            duration={500}
            spy={true}
            exact='true'
            offset={-80}
            primary='true'
            dark='true'
            onMouseEnter={()=>onHover()}
            onMouseLeave={onHover}
          >
            <div style={{padding:'0px 15px',marginLeft:-15}}>

            É Simple
            {!hover ? <ArrowForward /> : <ArrowRight />}
            </div>
          </Button>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
}

export default HeroSection;
