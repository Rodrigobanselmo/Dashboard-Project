/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { createContext, useState, useContext } from 'react';

interface StateProps {
  loaderDash: boolean;
  setLoaderDash: React.Dispatch<React.SetStateAction<boolean>>;
}

const ControllerLoaderContext = createContext<StateProps>({} as StateProps);

export const LoaderContext: React.FC = ({ children }) => {
  const [loaderDash, setLoaderDash] = useState(false);

  return (
    <ControllerLoaderContext.Provider value={{ loaderDash, setLoaderDash }}>
      {children}
    </ControllerLoaderContext.Provider>
  );
};

export function useLoaderDashboard() {
  const context = useContext(ControllerLoaderContext);

  return context;
}
