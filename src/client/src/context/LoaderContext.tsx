import React, {
  useContext,
  createContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from 'react';
import { LoaderSimple } from '../components/Main/Loader/index.js';

interface IProps {
  load: boolean;
  setLoad: Dispatch<SetStateAction<boolean>>;
}

const LoaderContext = createContext<IProps>({} as IProps);

export const useLoaderScreen: any = () => {
  return useContext(LoaderContext);
};

interface LoaderProviderProps {
  children: ReactNode;
}

const LoaderProvider: React.FC<LoaderProviderProps> = ({ children }) => {
  const [load, setLoad] = useState(true);

  return (
    <LoaderContext.Provider value={{ setLoad, load }}>
      {load && <LoaderSimple load={load} />}
      {children}
    </LoaderContext.Provider>
  );
};
export default LoaderProvider;
