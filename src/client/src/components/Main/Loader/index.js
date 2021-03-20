import React from 'react';
import { LoadFullScreen,LoadDashboard } from './Loader';
import LottieAnimation from '../../../lib/lottie'

export const LoaderSimple = ({load=false}) => {

  return (
    <>
      {load && 
        <LoadFullScreen>
          <LottieAnimation  lotti='loader' height={50} width={50} isClickToPauseDisabled={true} />
        </LoadFullScreen>
      }
    </>
  );
}

export const LoaderDashboard = ({load=false, open=true}) => {

  return (
    <>
      {load && 
        <LoadDashboard open={open}>
          <LottieAnimation lotti='loader' height={50} width={50} isClickToPauseDisabled={true} />
        </LoadDashboard>
      }
    </>
  );
}