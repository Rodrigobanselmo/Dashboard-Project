import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/global';
import themeColor from './styles/themeDark';

export const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={themeColor}>
      <ThemeProvider theme={themeColor}>
        <Router>
          <Switch>
            <Route {...home}>
              <Home />
            </Route>
          </Switch>
        </Router>
        <GlobalStyle />
      </ThemeProvider>
    </MuiThemeProvider>
  );
};
