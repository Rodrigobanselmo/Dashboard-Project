import { useEffect } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { useThemeContext } from '../context/ThemeContext.js';
import '@material-ui/core/styles/createPalette';
import './styled.d';
import dark from './themeDark';
import light from './themeLight';
import usePersistedState from '../hooks/usePersistedState.js';

const Theme: any = (theme: any) => {
  const ThemeColor = createMuiTheme(theme === 'dark' ? dark : light);
  return ThemeColor;
};

export default Theme;
