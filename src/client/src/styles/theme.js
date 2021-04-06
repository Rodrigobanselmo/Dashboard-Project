import { useEffect } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useThemeContext } from '../context/ThemeContext.js';
import '@material-ui/core/styles/createPalette';
import './styled.d.ts';
import dark from './themeDark.ts';
import light from './themeLight.ts';
import darkRealiza from './themeDarkRealiza.ts';
import lightRealiza from './themeLighRealiza.ts';

const Theme = (theme) => {
  const company = useSelector((state) => state.theme);
  if (company.company === 'REALIZA') {
    const ThemeColor = createMuiTheme(
      theme === 'dark' ? darkRealiza : lightRealiza,
    );
    return ThemeColor;
  }
  const ThemeColor = createMuiTheme(theme === 'dark' ? dark : light);
  return ThemeColor;
};

export default Theme;
