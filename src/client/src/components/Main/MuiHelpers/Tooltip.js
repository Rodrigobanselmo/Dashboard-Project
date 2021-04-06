import {Tooltip} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';


export function BootstrapTooltip(props) {

  const useStylesSign = makeStyles((theme) => ({
      arrow: {
      zIndex:1000000,
      color: "#fff",
        "&::before": {
          backgroundColor: "#fff",
          border: "1px solid #565656",
                  ...props.styleTooltip
        }
      },
      tooltip: {
      zIndex:1000000,
      color:'#000',
        borderRadius:5,
        fontSize:13,
        fontWeight:'normal',
        backgroundColor: '#fff',
        color: 'rgba(0, 0, 0, 0.87)',
        padding:'10px 12px',
        border: "1px solid #565656",
        ...props.styleTooltip
      },
    }));

  const useStylesDashboard = makeStyles((theme) => ({
    arrow: {
      zIndex:1000000,
      color: "#fff",
      "&::before": {
        backgroundColor: theme.palette.background.paper,
        border: "1px solid #56565655",
        ...props.styleArrow
      }
    },
    tooltip: {
      zIndex:1000000,
      color:'#000',
      borderRadius:5,
      fontSize:13,
      fontWeight:'normal',
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      padding:'10px 12px',
      border: "1px solid #56565655",
      WebkitBoxShadow: '2px 2px 15px 3px rgba(0,0,0,0.28)',
      boxShadow: '2px 2px 15px 3px rgba(0,0,0,0.28)',
      ...props.styletooltip
    },
  }));

    const classesSign = useStylesSign();
    const classes = useStylesDashboard();

    var classesType = props.sign ? classesSign : classes

    return <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: {enter:500, exit: 50} }} arrow classes={{tooltip: classesType.tooltip,arrow: classesType.arrow}} {...props} />;
  }
