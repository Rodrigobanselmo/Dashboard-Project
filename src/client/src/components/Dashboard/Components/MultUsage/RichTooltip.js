import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  scrollContainer: {
    height: 400,
    overflow: 'auto',
    marginBottom: theme.spacing(3),
  },
  scroll: {
    position: 'relative',
    width: '230%',
    backgroundColor: theme.palette.background.paperModal,
    height: '230%',
  },
  legend: {
    marginTop: theme.spacing(2),
    maxWidth: 300,
  },
  paper: {
    padding:0,
    marginTop:10,
    marginBottom:10,
    maxWidth: 400,
    backgroundColor:'#1b1c21',
  },
  select: {
    width: 200,
  },
  popper: {
    zIndex: 1500,
    '&[x-placement*="bottom"] $arrow': {
      top:10,
      right: 0,
      marginTop: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${theme.palette.background.paperModal} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 10,
      left: 0,
      marginBottom: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${theme.palette.background.paperModal} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${theme.palette.background.paperModal} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${theme.palette.background.paperModal}`,
      },
    },
  },
  arrow: {
    zIndex: 1500,
    position: 'absolute',
    fontSize: 8,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
  popoverRoot: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 1000,
  },
  content: {
    overflow: 'auto',
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
}));

  const RichTooltip = ({open,setOpen,anchorRef,children, arrow=true,placement='bottom-end',width=250,translateY=0}) => {
    const classes = useStyles();
    const [arrowRef, setArrowRef] = React.useState(null);
    const onClose = () => {
        setOpen((prevOpen) => !prevOpen);
      };

    const id = open ? 'scroll-playground' : null;


    return (
        <Popper
        id={id}
        open={open}
        className={classes.popper}
        anchorEl={anchorRef.current}
        placement={placement}
        disablePortal={false}
        modifiers={{
        flip: {
            enabled: true,
        },
        preventOverflow: {
            enabled: true,
            boundariesElement: 'window',
        },
        arrow: {
            enabled: arrow,
            element: arrowRef,
        },
        }}
      >
            <Paper style={{transform: `translateY(${translateY}px)`,}} elevation={15} className={classes.paper}>
                <ClickAwayListener onClickAway={onClose}>
                    <div>
                  {arrow ? (
                    <span style={{transform: `translateY(${-10}px)`,}} className={classes.arrow} ref={setArrowRef} />
                  ) : null}
                    <Box  style={{width}} className={classes.content}>
                        {children}
                    </Box>
                  </div>
                </ClickAwayListener>
            </Paper>
          </Popper>
    );
  };

  export default RichTooltip;
