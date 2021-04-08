import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Sidebar from '../Sidebar'
import NavSystem from '../NavSystem'
import {LoaderDashboard} from '../../../components/Main/Loader/index'
import {useAuth} from '../../../context/AuthContext'
import useTimeOut from '../../../hooks/useTimeOut'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    backgroundColor:theme.palette.background.default,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    transition: theme.transitions.create('background-color', {
      duration: 660,
    }),
  },
  content: {
    position:'relative',
    flexGrow: 1,
    padding: theme.spacing(7,8),
    height:'auto',
    overflowY: 'scroll',
    backgroundColor:theme.palette.background.default,
    height:'100vh',
    transition: theme.transitions.create('background-color', {
      duration: 660,
    }),
  },
}));

export default function MiniDrawer({children}) {

  const [open, setOpen] = React.useState(false);
  const [lock, setLock] = React.useState(false);

  const classes = useStyles();
  const {currentUser} = useAuth();
  const [onTimeOut,onClearTimeOut] = useTimeOut(); //para auxiliar openNavDrawer function


  function openNavDrawer(state) { //essa funcao serve para poder controlar a abartura e fechamendo do drawer podendo manejas se ele foi aberto pelo navBar ou pelo mouseEnter
    setOpen(state)
    setLock(state)
    onClearTimeOut()
  }

  return (
      <LoaderDashboard open={open}>
      <div className={`classes ${classes.root}`}>
        <CssBaseline />
        <NavSystem  open={open} setOpen={openNavDrawer}/>
        {currentUser && currentUser?.status && currentUser.status === 'Ativo' ?
          <Sidebar open={open} setOpen={setOpen} lock={lock} onTimeOut={onTimeOut} onClearTimeOut={onClearTimeOut} setLock={setLock}/>
         : null }
        <main id = "someRandomID" className={classes.content}>
            <div className={classes.toolbar} />
              {children}
        </main>
    </div>
    </LoaderDashboard>
  );
}
