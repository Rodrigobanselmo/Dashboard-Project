import { PaletteOptions as Palette } from '@material-ui/core/styles/createPalette';
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    palette?: Palette;
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface StatusPaletteColorOptions {
    success?: string;
    warn?: string;
    fail?: string;
    info?: string;
    successD?: string;
    failD?: string;
    warnD?: string;
    infoD?: string;
    orange?: string;
  }
  interface DrawerPaletteColorOptions {
    arrowOpen?: string;
    listTitle?: string;
    textListSelected?: string;
    textListInactive?: string;
    circleSelected?: string;
    textSubListInactive?: string;
    textSubListSelected?: string;
    textSubListActive?: string;
    hoverSubListOpen?: string;
    backgroundListOpen?: string;
    backgroundSubSubListOpen?: string;
    hoverSubSubListOpen?: string;
    subSubListActive?: string;
  }

  interface TypePrimary {
    main?: string;
    contrastText?: string;
    lighter?: string;
  }
  interface TypeSecondary {
    main?: string;
    contrastText?: string;
    lighter?: string;
  }

  interface TypeText {
    primary?: string;
    secondary?: string;
    disabled?: string;
    hint?: string;
    primary?: string;
    secondary?: string;
    secondaryLighter?: string;
    third?: string;
    contrastWhite?: string;
    strong?: string;
    hover?: string;
    disabled?: string;
    hint?: string;
    placeholder?: string;
    divider?: string;
  }

  interface TypeBackground {
    default: string;
    paper: string;
    paperModal: string;
    contrast: string;
    iconsPaper: string;
    inactive: string;
    line: string;
    hoverPaper: string;
    hoverPaperLighter: string;
    paperHighlight: string;
    attention: string;
    attentionHover: string;
  }

  interface PaletteOptions {
    status?: StatusPaletteColorOptions;
    drawer?: DrawerPaletteColorOptions;
    backgorund?: TypeBackground;
    primary?: TypePrimary;
    text?: TypeText;
    secondary?: TypeSecondary;
  }
}
/* import 'styled-components';

interface TypeText {
  primary?: string;
  secondary?: string;
  disabled?: string;
  hint?: string;
  primary?: string;
  secondary?: string;
  secondaryLighter?: string;
  third?: string;
  contrastWhite?: string;
  strong?: string;
  hover?: string;
  disabled?: string;
  hint?: string;
  placeholder?: string;
  divider?: string;
}

interface DrawerPaletteColorOptions {
  arrowOpen?: string;
  listTitle?: string;
  textListSelected?: string;
  textListInactive?: string;
  circleSelected?: string;
  textSubListInactive?: string;
  textSubListSelected?: string;
  textSubListActive?: string;
  hoverSubListOpen?: string;
  backgroundListOpen?: string;
  backgroundSubSubListOpen?: string;
  hoverSubSubListOpen?: string;
  subSubListActive?: string;
}
interface StatusPaletteColorOptions {
  success?: string;
  warn?: string;
  fail?: string;
  info?: string;
  successD?: string;
  failD?: string;
  warnD?: string;
  infoD?: string;
  orange?: string;
}

interface TypeBackground {
  default: string;
  paper: string;
  paperModal: string;
  contrast: string;
  iconsPaper: string;
  inactive: string;
  line: string;
  hoverPaper: string;
  hoverPaperLighter: string;
  paperHighlight: string;
  attention: string;
  attentionHover: string;
}

declare module 'styled-components' {
  interface DefaultTheme {
    borderRadius: string;
    palette: {
      status?: StatusPaletteColorOptions;
      drawer?: DrawerPaletteColorOptions;
      background?: TypeBackground;
      text?: TypeText;
      primary?: TypeText;
      secondary?: TypeText;
    };
  }
}

interface PaletteOptions {
  status?: StatusPaletteColorOptions;
  text?: TypeText;
  drawer?: DrawerPaletteColorOptions;
}
 */
