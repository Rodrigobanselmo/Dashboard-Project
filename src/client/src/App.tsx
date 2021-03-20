import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { GlobalStyle } from './styles/global';
import themeColor from './styles/themeDark';

export const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={themeColor}>
      <ThemeProvider theme={themeColor}>
        <div>Hello</div>
        <GlobalStyle />
      </ThemeProvider>
    </MuiThemeProvider>
  );
};
