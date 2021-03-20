import { makeStyles } from '@material-ui/core/styles';
import { Transform } from 'nodemailer/lib/xoauth2';

export const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor:theme.palette.background.paper,
    height:70,
    paddingTop:3,
  },
  menuButton: {
    marginRight: 36,
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
    border: `2.5px solid ${'#1a1a1e'}`,
    backgroundColor:'#c9560b',
    height:46,
    width:46,
    borderRadius:25,
    justifyContent:'center',
    boxSizing:'border-box',alignItems:'center',display:'flex',
    flexShrink:0
  },
  profileName: {
    fontWeight:'600',
    color:'#D7D7D9'
  },
  profileCircleName: {
    fontWeight:'600',
    color:'#D7D7D9'
  },
  divName: {
    marginTop:8,
    marginLeft:20,
    cursor:'pointer'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.background.contrast,
    borderStyle: 'solid',
    borderWidth:1,
    backgroundColor: theme.palette.background.default,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
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
  inputRoot: {
    color: 'inherit',
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