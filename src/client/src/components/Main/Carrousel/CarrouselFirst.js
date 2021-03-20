import React from 'react';
import styled from "styled-components";

const GridCarrousel = styled.div`
  display: grid;
  grid-gap: 0px;
  z-index:1;
  overflow-x:visible;
  overflow-y:visible;
  grid-template-columns: ${props => props.sections === 2 ? '100vw 100vw' : props.sections === 3 ? '100vw 100vw 100vw'  : '100vw 100vw 100vw 100vw'};
  transform: ${props => `translateX(${props.position})`};
  transition: transform 1s ease;
`;

export default function Carrousel({sections=2,position=1,children}) {

    let posX = 0 ;
    
    if (sections % 2 === 0) {
        posX=`${((sections-1)-(position-1)*2)/(sections*2)*100}%`
    } else {
        posX=`${(-1/sections)*(position-(sections+1)/2)*100}%`
    }

/*     if (sections===2 && position===1) posX = '25%'
    else if (sections===2 && position===2) posX = '-25%'
    else if (sections===3 && position===1) posX = '33.3333333333333333333%'
    else if (sections===3 && position===2) posX = '0'
    else if (sections===3 && position===3) posX = '-33.33333333333333333%'
    else if (sections===4 && position===1) posX = '37.5%'
    else if (sections===4 && position===2) posX = '12.5%'
    else if (sections===4 && position===3) posX = '-12.5%'
    else if (sections===4 && position===4) posX = '-37.5%' */


    if (position === 0) return <>{children}</>

    return (
        <GridCarrousel sections={sections} position={posX}>
            {children}
        </GridCarrousel>
    );
}
