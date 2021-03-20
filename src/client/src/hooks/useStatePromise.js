import React from 'react';

export default function useStatePromise(initialState) {
    const [state, setState] = React.useState('');
    
    React.useEffect(() => {
      
    }, [state]);

    function onUpdateState(callAction) {
        setState(Math.random())
    }

  
    return [onUpdateState];
  };