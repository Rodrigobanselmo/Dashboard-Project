import React from 'react';
import styled, { keyframes } from 'styled-components';
import { LoadFullScreen, LoadDashboard } from './Loader.js';
import LottieAnimation from '../../../lib/lottie.tsx';
import { useLoaderDashboard } from '../../../context/LoadDashContext.tsx';

const SlideUp = keyframes`
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(15px);
    }
    100% {
        transform: translateY(0px);
    }
`;

const Image = styled.img`
  width: 90px;
  height: 90px;
  animation: ${SlideUp} 1.5s;
  animation-iteration-count: infinite;
`;


export const LoaderSimple = ({ load = false }) => {
  return (
    <>
      {load && (
        <LoadFullScreen>
          <LottieAnimation
            lotti="loader"
            height={50}
            width={50}
            isClickToPauseDisabled
          />
        </LoadFullScreen>
      )}
    </>
  );
};

export const LoaderDashboard = ({ children, open = true }) => {
  const { loaderDash } = useLoaderDashboard();
  return (
    <>
      {loaderDash && (
        <LoadDashboard open={open}>
          <Image src="/images/logo-only.svg" alt="logo" />
        </LoadDashboard>
      )}
      {children}
    </>
  );
};
