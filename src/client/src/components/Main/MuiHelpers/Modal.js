import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import {ButtonDisable,ArrowForward,ArrowRight} from '../../Initial/ButtonElements'
import styled from "styled-components";
import IconButton from '@material-ui/core/IconButton';
import {Icons} from '../../Icons/iconsDashboard'
import Carrousel from '../Carrousel/CarrouselFirst'
import {useNotification} from '../../../context/NotificationContext'

const FullModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props=>props.transparent?'#000000bb':props.theme.palette.background.paper};
  position:relative;
  z-index:1111110;
  width:100%;
  height:100%;
  overflow-y:scroll;
`;


const Title = styled.p`
  position: absolute;
  top: 15px;
  left: 20px;
  color: ${props=>props.theme.palette.text.primary};
  font-size: 22px;
  font-weight: bold;
`;

const IconCloseButton = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 25px;
  padding:7px;
  border-radius:4px;
  max-width:100px;
`;

const IconCloseFull = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  font-size: 30px;
  padding:7px;
  border-radius:4px;
  z-index:111441110;

`;

const Icon = styled(Icons)`
  font-size: 30px;
  border-radius:4px;
  color: ${props=>props.transparent?'#eee':props.theme.palette.text.primary};
  cursor: pointer;

  &:hover {
    /* color:${({theme})=>theme.palette.text.secondary}; */
  color: ${props=>props.transparent?'#fff':props.theme.palette.text.secondary};
  }

  &:active {
    /* color:${({theme})=>theme.palette.text.third}; */
  color: ${props=>props.transparent?'#eff':props.theme.palette.text.third};
  }
`;

const IconGoBackFull = styled(IconCloseButton)`
  top: 30px;
  left: 30px;
  font-size: 30px;
  max-width:100px;
  z-index:111441110;
`;

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position:'relative',
    display: 'flex',
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
    /* border: '2px solid #000', */
    boxShadow: theme.shadows[10],
    padding:'60px 23px 20px 20px',
    marginLeft:30,
    marginRight:30,
    borderRadius:10,
  },
  fullScreen: {
    position:'relative',
    zIndex:1111110,
    backgroundColor: theme.palette.background.paper,
    width:'100%',
    height:'100%',
    overflowY:'scroll'
  },
}));

export function ModalMui({children,open,onClose,title}) {

  const classes = useStyles();

  function onCloseModal() {
    onClose()
  }

  return (
      <Modal
        className={classes.modal}
        open={open}
        onClose={onCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
{/*         <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={600}> */}
          <div className={classes.paper}>
            {title ?
            <Title>{title}</Title>
            : null}
              <IconCloseButton >
                <IconButton onClick={onCloseModal} aria-label="close">
                    <Icon type={'Close'} />
                </IconButton>
            </IconCloseButton>
            {children}
          </div>
{/*         </Slide> */}
        </Fade>
      </Modal>
  );
}

export function ModalFullScreen({children,open,transparent,onClose,infoModal=false,onGoBack=false,arrow=false}) {

    const classes = useStyles();
    const notification = useNotification();


    function onCloseInfoModalAndFullScreen() {
        notification.modalReset({})
        onClose()
    }

    function onCloseModal() {
      if (infoModal && infoModal?.title) {
        notification.modal({title: infoModal.title,text:infoModal.text,open:true,onClick:onCloseInfoModalAndFullScreen})
      } else {
        onClose()
      }
    }

    return (
        <Modal
          className={classes.modal}
          open={open}
          onClose={onCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>

            <FullModalContainer transparent={transparent} >
              <IconCloseFull >
                  <IconButton onClick={onCloseModal} aria-label="close">
                      <Icon transparent={transparent} type={'Close'} />
                  </IconButton>
              </IconCloseFull>
              {onGoBack && arrow?
                <IconGoBackFull >
                    <IconButton onClick={onGoBack} aria-label="goBack">
                        <Icon transparent={transparent}  type={'ArrowBack'} />
                    </IconButton>
                </IconGoBackFull>
              : null}
              {children}
            </FullModalContainer>
          </Fade>
        </Modal>
    );
  }
