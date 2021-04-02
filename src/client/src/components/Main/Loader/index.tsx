import React from 'react';
import styled, { keyframes } from 'styled-components';
import { LoadFullScreen, LoadDashboard } from './Loader';
import LottieAnimation from '../../../lib/lottie';

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

interface LoadProps {
  load: boolean;
}

export const LoaderSimple: React.FC<LoadProps> = ({ load = false }) => {
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

interface LoaderDashboardProps {
  load: boolean;
  open: boolean;
}

export const LoaderDashboard: React.FC<LoaderDashboardProps> = ({
  load = false,
  open = true,
}) => {
  return (
    <>
      {load && (
        <LoadDashboard open={open}>
          {/*           <LottieAnimation
            lotti="loader"
            height={50}
            width={50}
            isClickToPauseDisabled
          /> */}
          <Image src="/images/logo-only.svg" alt="logo" />
        </LoadDashboard>
      )}
    </>
  );
};
