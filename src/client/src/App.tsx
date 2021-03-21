/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/global';
import themeColor from './styles/themeDark';
import { Home } from './pages';
import { RouteComponent, home, auth } from './routes';
/* import { AuthProvider } from './context/AuthContext.js';
 */
import NotificationProvider from './context/NotificationContext.js';
import LoaderProvider from './context/LoaderContext';

export const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={themeColor}>
      <ThemeProvider theme={themeColor}>
        <Router>
          <Switch>
            <Route {...home}>
              <Home />
            </Route>
            <NotificationProvider>
              {/* <AuthProvider> */}
              <LoaderProvider>
                <Switch>
                  {auth.map((route) => (
                    <RouteComponent key={route.path} {...route} />
                  ))}
                </Switch>
                {/*   </AuthProvider> */}
              </LoaderProvider>
            </NotificationProvider>
          </Switch>
        </Router>
        <GlobalStyle />
      </ThemeProvider>
    </MuiThemeProvider>
  );
};
