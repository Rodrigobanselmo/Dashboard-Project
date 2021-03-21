import React from 'react'
import Lottie from 'react-lottie';
import loader from '../animations/loader2.json'
import loaderApp from '../animations/loader.json'

export default function LottieAnimation({ lotti, width, height,isClickToPauseDisabled }) {

  let animation = ''

  switch (lotti) {
    case 'loader':
       animation = loader
    break
    case 'loaderApp':
       animation = loaderApp
    break

    default:
       animation = lotti
    break
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie  options={defaultOptions} isClickToPauseDisabled={isClickToPauseDisabled} height={height} width={width} speed={lotti==='loaderApp' ? 0.9:1} />
    </div>
  );
};