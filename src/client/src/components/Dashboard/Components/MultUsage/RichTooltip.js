import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import { lighten,darken, } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding:0,
    marginTop:10,
    marginBottom:10,
    backgroundColor:theme.palette.background.paper,
  },
  paperDark: {
    backgroundColor:theme.palette.background.paperModal,
  },
  paperGrey: {
    backgroundColor:theme.palette.background.contrast,
  },
  paperGreyLight: {
    backgroundColor:darken(theme.palette.background.paper,0.080),
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
        borderColor: `transparent transparent ${theme.palette.background.paper} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: -10,
      left: 0,
      marginBottom: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${theme.palette.background.paper} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${theme.palette.background.paper} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${theme.palette.background.paper}`,
      },
    },
  },
  popperDark: {
    '&[x-placement*="bottom"] $arrow': {
      '&::before': {
        borderColor: `transparent transparent ${theme.palette.background.paperModal} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      '&::before': {
        borderColor: `${theme.palette.background.paperModal} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      '&::before': {
        borderColor: `transparent ${theme.palette.background.paperModal} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      '&::before': {
        borderColor: `transparent transparent transparent ${theme.palette.background.paperModal}`,
      },
    },
  },
  popperGrey: {
    '&[x-placement*="bottom"] $arrow': {
      '&::before': {
        borderColor: `transparent transparent ${theme.palette.background.contrast} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      '&::before': {
        borderColor: `${theme.palette.background.contrast} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      '&::before': {
        borderColor: `transparent ${theme.palette.background.contrast} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      '&::before': {
        borderColor: `transparent transparent transparent ${theme.palette.background.contrast}`,
      },
    },
  },
  popperGreyLight: {
    '&[x-placement*="bottom"] $arrow': {
      '&::before': {
        borderColor: `transparent transparent ${darken(theme.palette.background.paper,0.080)} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      '&::before': {
        borderColor: `${darken(theme.palette.background.paper,0.080)} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      '&::before': {
        borderColor: `transparent ${darken(theme.palette.background.paper,0.080)} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      '&::before': {
        borderColor: `transparent transparent transparent ${darken(theme.palette.background.paper,0.080)}`,
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

  const RichTooltip = ({open,elevation=15,setOpen,anchorRef,children, arrow=true,placement='bottom-end',width=250,translateY=0,background='dark'}) => {
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
        className={clsx(classes.popper,{
          [classes.popperDark]: background=='dark',
          [classes.popperGrey]: background=='grey',
          [classes.popperGreyLight]: background=='greyLight',
        })}
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
            <Paper style={{transform: `translateY(${translateY}px)`,}} elevation={elevation} className={clsx(classes.paper,{
              [classes.paperDark]: background=='dark',
              [classes.paperGrey]: background=='grey',
              [classes.paperGreyLight]: background=='greyLight',
            })}>
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
