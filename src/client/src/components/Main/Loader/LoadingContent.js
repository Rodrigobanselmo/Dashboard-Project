import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

export function LoadingContent() {


  return (
    <div style={{margin:10,height:350}}>
      <LinearProgress />
    </div>
  );
}
