import { createMuiTheme } from '@material-ui/core/styles';
import '@material-ui/core/styles/createPalette';
import './styled.d';

const ThemeColor = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#d9560b',
      light: '#F27329',
      contrastText: '#fff',
    },
    secondary: {
      main: '#990000',
    },
    background: {
      paper: '#1a1a1e',
      paperModal: '#1b1c21',
      default: '#0C0C0D',
      contrast: '#26262A',
      iconsPaper: '#A8A8B3',
      inactive: '#A8A8B388',
      line: '#A8A8B319',
      hoverPaper: 'rgba(0, 0, 0, 0.3)',
      hoverPaperLighter: 'rgba(0, 0, 0, 0.1)',
      paperHighlight: '#d9560b12',
      attention: '#bb2011',
      attentionHover: '#aa2000',
    },
    text: {
      contrastWhite: '#fff',
      strong: '#f4f5f9',
      primary: '#D7D7D9',
      secondary: '#A8A8A3',
      secondaryLighter: '#ddd',
      third: '#D7D7D944',
      hover: '#fff',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
      placeholder: '#626262',
      divider: '#ff0000',
    },
    drawer: {
      arrowOpen: '#d9560b',
      listTitle: '#D7D7D9',
      textListSelected: '#D7D7D9',
      textListInactive: '#A8A8B388',
      circleSelected: '#d9560b77',
      textSubListInactive: '#A8A8B388',
      textSubListSelected: '#D7D7D9',
      textSubListActive: '#D7D7D9',
      hoverSubListOpen: '#1f100278',
      backgroundListOpen: '#0C0C0D',
      backgroundSubSubListOpen: '#1a0e02',
      hoverSubSubListOpen: '#1a0e0277',
      subSubListActive: '#000',
    },
    status: {
      success: '#5cb85c',
      fail: '#bb2011',
      warn: '#cfd220',
      info: '#5bc0de',
      successD: '#1fb913',
      failD: '#880000',
      warnD: '#b59c0e',
      infoD: '#4e91d4',
      orange: '#F37735',
    },
  },
});

export default ThemeColor;
