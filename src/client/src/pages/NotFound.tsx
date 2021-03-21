import React from 'react';
import { useLoaderScreen } from '../context/LoaderContext';

const NotFound: React.FC = () => {
  const { setLoad } = useLoaderScreen();

  React.useEffect(() => {
    setLoad(true);
  }, [setLoad]);

  return (
    <div>
      <h1>PAGINA DE ROTAS &ldquo;NÃO ENCONTRADAS&rdquo; EM CONSTRUÇÃO</h1>
    </div>
  );
};

export default NotFound;
