import { makeStyles,withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import {
  lighten,
  darken,
  emphasize,
  fade,
  getLuminance,
  getContrastRatio,
} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor:theme.palette.background.nav,
    height:70,
    paddingTop:3,
  },
  menuButton: {
    marginRight: 36,
    color: theme.palette.background.iconsPaper,
  },
  iconColor: {
    color: theme.palette.background.iconsPaper,
  },
  grow: {
    flexGrow: 1,
  },
  profileContainer: {
    padding:2,
    backgroundColor:'#D7D7D9cc',
    marginLeft:12,
    height:50,
    width:50,
    borderRadius:30,
    flexShrink:0,
    boxSizing:'border-box',
    cursor:'pointer',
    transform:'scale(0.9)'
  },
  profile: {
    border: `2.5px solid ${theme.palette.background.nav}`,
    backgroundColor:theme.palette.primary.main,
    height:46,
    width:46,
    borderRadius:25,
    justifyContent:'center',
    boxSizing:'border-box',alignItems:'center',display:'flex',
    flexShrink:0
  },
  profileName: {
    fontWeight:'600',
    color:theme.palette.text.primaryNav
  },
  profileCircleName: {
    fontWeight:'600',
    color:theme.palette.text.primaryNav
  },
  divName: {
    marginTop:8,
    marginLeft:20,
    cursor:'pointer'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.type =='dark' ? theme.palette.background.contrast : theme.palette.text.strong,
    borderStyle: 'solid',
    borderWidth:1,
    backgroundColor:  theme.palette.type =='dark' ? theme.palette.background.default : theme.palette.background.paper,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    //-webkit-box-shadow: inset 0px 0px 33px -6px rgba(0,0,0,0.48);
    boxShadow: 'inset 0px 0px 33px -6px rgba(0,0,0,0.28)',
    transition: theme.transitions.create(['background-color','color'], {
      duration: 660,
    }),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:theme.palette.text.primary,
  },
  searchIconColor: {
    color:theme.palette.text.primary,
    transition: theme.transitions.create('color', {
      duration: 660,
    }),
  },
  inputRoot: {
    color: theme.palette.text.primary,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '10ch',
      '&:focus': {
        width: '18ch',
      },
      '&:hover': {
        width: '18ch',
      },
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems:'center',
      justifyContent: 'center',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  boxItem: {
    cursor:'pointer',
    display:'flex',
    alignItems:'center',
    padding:'12px 20px',
    '&:hover': {
        backgroundColor: theme.palette.background.hoverPaper
      },
  },
  icons: {
    color:theme.palette.primary.main,
    fontSize:'25px',
    marginRight:20
  },
}));

export const DarkModeSwitch = withStyles((theme) => ({
  switchBase: {
    color: theme.palette.primary.main,
    '&$checked': {
      color: theme.palette.primary.main,
    },
    '&$checked + $track': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  checked: {},
  track: {
    backgroundColor:lighten(theme.palette.primary.main,0.3)
  },
}))((props) => <Switch {...props} />);
