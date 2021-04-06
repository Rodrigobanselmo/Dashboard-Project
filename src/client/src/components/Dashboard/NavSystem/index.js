import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import {NavLogo} from '../../Main/NavLogo'
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpen from '@material-ui/icons/MenuOpen';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Badge from '@material-ui/core/Badge';
import RichTooltip from '../Components/MultUsage/RichTooltip'
import {BootstrapTooltip} from '../../Main/MuiHelpers/Tooltip'
import { Link } from 'react-router-dom';
import {itemsProfile} from '../../../constants/itemsProfile'
import {useLoaderScreen} from '../../../context/LoaderContext'
//import {useLoaderDash} from '../../../context/LoadDashContext'
import {useNotification} from '../../../context/NotificationContext'
import {useAuth} from '../../../context/AuthContext'
import {navList} from '../../../constants/itemsNav'

import FormControlLabel from '@material-ui/core/FormControlLabel';

import {LogOut} from '../../../services/firebaseAuth'
import {useStyles,DarkModeSwitch as DarkModeSwitchMui} from './styles'
import {onLogout} from './func'
import {Icons} from '../../Icons/iconsDashboard'

import {DASHBOARD} from '../../../routes/routesNames'
import {AbreviarNome,InitialsName} from '../../../helpers/StringHandle'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import usePersistedState from '../../../hooks/usePersistedState.js';
import { useThemeContext } from '../../../context/ThemeContext.js';
import {ThemeContext} from "styled-components";

export default function NavBar({open,setOpen}) {

  const [openProfile, setOpenProfile] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(true);
  const anchorRef = React.useRef(null);

  const {load,setLoad} = useLoaderScreen();
  //const {setLoadDash,loadDash}= useLoaderDash();
  const notification = useNotification();
  const {currentUser} = useAuth();
  const { theme,setTheme } = useThemeContext();
  const themes = React.useContext(ThemeContext)

  function ReactLink(props) {
    return(
      <>
      {props.to ?
        <Link {...props}>
          {props.children}
        </Link>
      :
        <div {...props}>
          {props.children}
        </div>
      }
      </>
    )
  }


  const classes = useStyles();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function onProfileClick(action) {
    action ==='logout' && onLogout({setLoad,notification})
  };

  const handleDarkModeChange = () => {
    setTheme(theme =='dark' ? 'light' : 'dark')
  };

  return (
      <AppBar
        elevation={18}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose:handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton)}
          >
            {open ?
            <MenuOpen />
            :
            <MenuIcon />
            }
          </IconButton>
          <NavLogo to={DASHBOARD} small='true' />
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon style={{fontSize:18}} className={classes.searchIconColor}/>
            </div>
            <InputBase
              placeholder="Pesquisar..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onBlur={()=>{}} //setSearch to null
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.sectionDesktop}>
          <BootstrapTooltip placement="bottom" TransitionProps={{ timeout: {enter:500, exit: 50} }} title={theme =='dark' ? 'Modo Escuro':'Modo Claro'} styletooltip={{transform: 'translateY(10px)'}}>
            <IconButton style={{marginRight:-10,marginLeft:5}} aria-label={'Dark Mode'}>
              <DarkModeSwitch
                style={{ marginTop: -3}}
                sunColor={themes.palette.background.iconsPaper}
                checked={theme =='dark'}
                onChange={handleDarkModeChange}
                size={25}
              />
            </IconButton>
          </BootstrapTooltip>
          <DarkModeSwitchMui checked={theme =='dark'} onChange={handleDarkModeChange} />
            {navList.map((item, index) => (
              <div key={index}>
              { item.visible === 'all' || (currentUser?.access && item.visible.includes(currentUser.access)) ?
                <ReactLink onClick={item?.onClick ?()=>notification.modal({title: 'Notifição',text:'Notifição padrão do sistema',open:true,onClick:()=>console.log('notification confirm')}):()=>notification.success({message:'Em construção'})} to={item.to} style={{margin:'0px 5px'}}>
                  <BootstrapTooltip placement="bottom" TransitionProps={{ timeout: {enter:500, exit: 50} }} title={item.text} styletooltip={{transform: 'translateY(10px)'}}>
                    <IconButton aria-label={item.text}>
                      <Badge badgeContent={0} color="secondary">
                        <Icons type={item.icon} className={classes.iconColor} />
                      </Badge>
                    </IconButton>
                  </BootstrapTooltip>
                </ReactLink>
              :null}
              </div>
            ))}
          </div>

          <RichTooltip anchorRef={anchorRef}  open={openProfile} setOpen={setOpenProfile} translateY={18}>
            {itemsProfile.map((item, index) => (
                <div onClick={()=>onProfileClick(item.onClick)} className={classes.boxItem} key={item.text} >
                    <Icons className={classes.icons} type={item.icon}/>
                    <p style={{color:'#fff',fontSize:'15px',marginRight:20}} >{item.text}</p>
                </div>
            ))}
          </RichTooltip>

          <div onClick={()=>setOpenProfile(true)} className={classes.divName}>
            <p className={classes.profileName} style={{fontSize:17}}>
              {currentUser?.name ? AbreviarNome(currentUser.name,22) : 'Sem Identificação'}
            </p>
            <p className={classes.profileName} style={{fontSize:8}}>
              {currentUser?.company && currentUser.company?.name ? currentUser.company.name : 'Individual'}
            </p>
          </div>
          <div ref={anchorRef} onClick={()=>setOpenProfile(true)} className={classes.profileContainer}>
            <div className={classes.profile}>
                <p className={classes.profileCircleName} style={{fontSize:17}}>
                  {currentUser?.name ? InitialsName(currentUser.name,22) : 'SI'}
                </p>
                {/* <Icons className={classes.profileCircleName} type={'Person'}/> */}
            </div>
          </div>


        </Toolbar>
      </AppBar>
  );
}

