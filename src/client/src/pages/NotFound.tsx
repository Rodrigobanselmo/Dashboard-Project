import React from 'react';
import { useLoaderScreen } from '../context/LoaderContext';
import { useNotification } from '../context/NotificationContext.js';

const NotFound: React.FC = () => {
  const { setLoad } = useLoaderScreen();
  const notification = useNotification();

  React.useEffect(() => {
    setLoad(true);
    notification.simple({ message: 'Seja bem-vindo!' });
  }, [setLoad, notification]);

  return (
    <div>
      <h1>PAGINA DE ROTAS &ldquo;NÃO ENCONTRADAS&rdquo; EM CONSTRUÇÃO</h1>
    </div>
  );
};

export default NotFound;
