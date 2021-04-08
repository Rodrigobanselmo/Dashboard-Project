import React from 'react';
import TABLE from './tableVirtualized';
import {useLoaderDashboard} from '../context/LoadDashContext'
import CheckList from './CheckList';

const App = () => {

  const { loaderDash,setLoaderDash } = useLoaderDashboard();
  React.useEffect(() => {
    setLoaderDash(false)
  }, [])

  return (
    <div style={{}}>
      <CheckList/>
    </div>
  );
};

export default App;
