import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 230;
const paddingLeft = 58;
const paddingLeftPlus = 5;
const paddingSubItemPlus = 20;

export const useStyles = makeStyles((theme) => ({
  drawer: {
    backgroundColor:theme.palette.background.drawer,
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create(['width','background-color'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen+200,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create(['width','background-color'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen+200,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(8) + 1,
    },
  },
  toolbar: {
    backgroundColor:theme.palette.primary.dark,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    backgroundColor:'#171717',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height:'auto',
    backgroundColor:'#171717',
    minHeight:'100vh',
  },
  arrow: {
    color: theme.palette.drawer.icon,
    fontSize:18,
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: 200,
    }),
  },
  arrowOpen: {
    transform: 'rotate(90deg)',
    color: theme.palette.drawer.arrowOpen,
  },
  addOpen: {
    color: theme.palette.drawer.arrowOpen,
    transform: 'rotate(45deg)',
  },
  arrowActive: {
    color: theme.palette.primary.main,
  },
  list: {
    display:'flex',
    flexDirection:'row',
    padding: '10px 10px',
    paddingLeft:paddingLeft+paddingLeftPlus,
    width:'100%',
    cursor:'pointer',
    justifyContent:'center',
    alignItems:`center`,
    position:'relative',
    marginRight:15,
    marginLeft:0,
    backgroundColor:'transparent',
    '&:hover': {
      backgroundColor: theme.palette.background.hoverPaper,
    },
    transition: theme.transitions.create('background-color', {
      duration: 660,
    }),
  },
  listTitle: {
    color: theme.palette.drawer.listTitle,
    fontSize:13,
    transform: `translateX(-40px)`,
    opacity:0,
    fontWeight:'bold',
    margin: '25px 0px 7px 15px',
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.sharp,
      duration: 800,
    }),
  },
  listTitleOpen: {
    opacity:1,
    transform: `translateX(0px)`,
  },
  listOpen: {
    backgroundColor:theme.palette.drawer.backgroundListOpen,
    '&:hover': {
      backgroundColor: theme.palette.drawer.hoverSubListOpen,
    },
  },
  listActive: {
    backgroundColor: theme.palette.background.paperHighlight,
  },
  listText: {
    whiteSpace: 'nowrap',
    overflowWrap: 'break-word',
    color: theme.palette.drawer.textListInactive,
    opacity: 1,
    fontSize:14,
    fontWeight:'bold',
    marginLeft:5,
    margin: 'auto',
    transition: theme.transitions.create(['opacity','color'], {
      easing: theme.transitions.easing.sharp,
      duration: 400,
      delay:200
    }),
  },
  listTextOpen: {
    color: theme.palette.drawer.textListSelected,
  },
  listTextOpenActive: {
    color: theme.palette.primary.main,

  },
  listTextClose: {
    opacity: 0,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.sharp,
      duration: 0,
    }),
  },
  icon: {
    color: theme.palette.drawer.icon,
    fontSize:22,
    position:'absolute',
    left:18,
    paddingTop:7,
    transform: `translateX(${paddingLeftPlus}px)`,
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.sharp,
      duration: 600,
      delay:200
    }),
  },
  iconColored: {
    color: theme.palette.drawer.textListSelected,
  },
  iconClose: {
    transform: `translateX(0)`,
  },
  iconActive: {
    color: theme.palette.primary.main,
  },
  bar: {

  },
  barActive: {
    backgroundColor:theme.palette.primary.main,
    width:3,
    height:'100%',
    position:'absolute',
    left:0,
  },
  subBarActive: {
    backgroundColor:theme.palette.primary.main,
    width:1,
    height:'100%',
    position:'absolute',
    left:0,
  },
  circle: {
    backgroundColor:theme.palette.drawer.textListInactive,
    margin:'10px 10px',
    width:5,
    height:5,
    borderRadius:5,
    position:'absolute',
    left:16.5,
    transform: `translateX(0px)`,
    transition: theme.transitions.create('all', {
      easing: 'ease',
      duration: 600,
    }),
/*     position:'absolute',
    left:-4, */
  },
  circleBig: {
    backgroundColor:theme.palette.drawer.circleSelected,
    margin:'10px 10px',
    transform:'scale(1.6)',
    borderRadius:5,
  },
  circleOpen: {
    transform: `translateX(${paddingLeftPlus}px)`,
  },
  circleOpenBig: {
    transform: `translateX(${paddingLeftPlus}px) scale(1.6)`,
  },
  circleActive: {
    backgroundColor:theme.palette.primary.main,
  },
  subListOpenContainer: {
    borderRadius:5,
    boxShadow: '0px 0px 33px -6px rgba(0,0,0,0.48)',
  },
  subListOpenContainerActive: {
    borderRadius:0,
    boxShadow: 'none',
  },
  subList: {
    backgroundColor: theme.palette.drawer.backgroundListOpen,
    '&:hover': {
      backgroundColor: theme.palette.drawer.hoverSubListOpen,
    },
  },
  subListOpen: {
    color: theme.palette.drawer.textSubListInactive,
  },
  subListText: {
    fontSize:12.5,
    maxWidth:130,
    minWidth:130,
  },
  subListTextOpen: {
    color: theme.palette.drawer.textSubListSelected,
  },
  subListTextOpenActive: {
    color: theme.palette.drawer.textSubListActive,
  },
  subListTextClose: {
    opacity: 0,
    transition: theme.transitions.create(['color','opacity'], {
      easing: theme.transitions.easing.sharp,
      duration: 0,
    }),
  },
  subListOpenMore: {
    backgroundColor:theme.palette.drawer.backgroundSubSubListOpen,
    '&:hover': {
      backgroundColor: theme.palette.drawer.hoverSubSubListOpen,
    },
  },
  subSubList: {
    backgroundColor:theme.palette.drawer.backgroundSubSubListOpen,
    paddingLeft:50+paddingSubItemPlus,
    '&:hover': {
      backgroundColor: theme.palette.drawer.hoverSubSubListOpen,
    },
  },
  subSubListOpen: {
    color: theme.palette.type !=='dark' ? theme.palette.drawer.textSubListActive :theme.palette.background.inactive,
    backgroundColor: theme.palette.drawer.subSubListActive,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  subSubListText: {
    fontSize:12.5,
    maxWidth:130,
    minWidth:130,
  },
  subSubListTextActive: {
    color: theme.palette.type !=='dark'?theme.palette.drawer.textSubListActive:theme.palette.drawer.textSubListSelected,

  },
  subCircle: {
    width:3,
    height:3,
    left:15.5+paddingSubItemPlus+paddingLeftPlus,
  },
  subCircleOpen: {
    backgroundColor:theme.palette.primary.main,
    left:15.5 + paddingSubItemPlus+paddingLeftPlus,
  },
  subCircleClose: {
    transform: `translateX(${-(15.0 + paddingSubItemPlus+paddingLeftPlus)+17}px)`,
  },
  subCircleOpenBig: {
    transform: `translateX(${-(15.0 + paddingSubItemPlus+paddingLeftPlus)+17}px) scale(1.6)`,
  },
  light: {
    backgroundColor: '#5555',
    marginTop:10,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.background.contrast,
    borderStyle: 'solid',
    boxShadow: 'inset 0px 0px 33px -6px rgba(0,0,0,0.10)',
    borderWidth:1,
    backgroundColor: theme.palette.type =='dark' ?theme.palette.background.default :theme.palette.background.drawer,
    margin:'10px 10px',
    marginTop:85,
    marginBottom:-7,
    transition: theme.transitions.create('background-color', {
      duration: 600,
    }),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    zIndex:0,
    alignItems: 'center',
    justifyContent: 'center',
    color:theme.palette.text.primary,
  },
  closeIcon: {
    pointerEvents: 'auto',
    cursor:'pointer',
    zIndex:10,
  },
  SearchColored: {
    transform: `translateX(0px)`,
    color: theme.palette.text.primary,
    transition: theme.transitions.create('all', {
      easing: 'ease',
      duration: 700,
    }),
  },
  searchIconOpen: {
    transform: `translateX(-5px)`,
  },
  inputRoot: {
    color: theme.palette.text.primary,
  },
  inputInput: {
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    color: theme.palette.text.primary,
  },
}));
