/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/global';
import { GlobalStyleLight } from './styles/globalLight';
import themeColor from './styles/theme.js';
import { Home } from './pages';
import { RouteComponent, home, auth } from './routes';
import { AuthProvider } from './context/AuthContext.js';
import { useThemeContext } from './context/ThemeContext.js';
import NotificationProvider from './context/NotificationContext.js';
import LoaderProvider from './context/LoaderContext';
import { LoaderContext } from './context/LoadDashContext';

export const App: React.FC = () => {
  const { theme } = useThemeContext();
  return (
    <MuiThemeProvider theme={themeColor(theme)}>
      <ThemeProvider theme={themeColor(theme)}>
        <Router>
          <Switch>
            <Route {...home}>
              <Home />
            </Route>
            <LoaderContext>
              <NotificationProvider>
                <LoaderProvider>
                  <AuthProvider>
                    <Switch>
                      {auth.map((route: any) => (
                        <RouteComponent key={route.path} {...route} />
                      ))}
                    </Switch>
                  </AuthProvider>
                </LoaderProvider>
              </NotificationProvider>
            </LoaderContext>
          </Switch>
        </Router>
        {theme === 'dark' ? <GlobalStyle /> : <GlobalStyleLight />}
      </ThemeProvider>
    </MuiThemeProvider>
  );
};
