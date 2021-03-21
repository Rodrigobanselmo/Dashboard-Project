/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, {
  useContext,
  createContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from 'react';
import { LoaderSimple } from '../components/Main/Loader';

interface IProps {
  load: boolean;
  setLoad: Dispatch<SetStateAction<boolean>>;
}

const LoaderContext = createContext<IProps>({} as IProps);

export function useLoaderScreen() {
  return useContext(LoaderContext);
}

interface LoaderProviderProps {
  children: ReactNode;
}

export default function LoaderProvider({ children }: LoaderProviderProps) {
  const [load, setLoad] = useState(true);

  return (
    <LoaderContext.Provider value={{ setLoad, load }}>
      {load && <LoaderSimple load={load} />}
      {children}
    </LoaderContext.Provider>
  );
}
