import React from 'react';
import TABLE from './tableVirtualized';
import {useLoaderDashboard} from '../context/LoadDashContext'


const App = () => {

  const { loaderDash,setLoaderDash } = useLoaderDashboard();
  React.useEffect(() => {
    setLoaderDash(false)
  }, [])

  return (
    <div style={{}}>
      <TABLE/>
    </div>
  );
};

export default App;
