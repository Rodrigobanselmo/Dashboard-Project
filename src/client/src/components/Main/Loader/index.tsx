import React from 'react';
import { LoadFullScreen, LoadDashboard } from './Loader';
import LottieAnimation from '../../../lib/lottie';

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
          <LottieAnimation
            lotti="loader"
            height={50}
            width={50}
            isClickToPauseDisabled
          />
        </LoadDashboard>
      )}
    </>
  );
};
