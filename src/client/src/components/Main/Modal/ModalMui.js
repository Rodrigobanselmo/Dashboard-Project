import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import {ButtonDisable,ArrowForward,ArrowRight} from '../../Initial/ButtonElements'
import AiOutlineClose from '@material-ui/icons/Close';
import styled from "styled-components";

const IconCloseButton = styled(AiOutlineClose)`
  position: absolute;
  top: 20px;
  left: 20px;
  color: #eee;
  font-size: 25px;
  cursor: pointer;

  &:hover {
    color:#bbb;
  }

  &:active {
    color:#555;
  }
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
    backgroundColor: '#000',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding:'60px 60px',
    marginLeft:30,
    marginRight:30,
    maxWidth:435,
    borderRadius:20,
    WebkitboxShadow: '0px 0px 16px 6px rgba(51,51,51,0.81)',
    boxShadow: '0px 0px 16px 6px rgba(51,51,51,0.81)',


  },
}));
// '&:hover': { /* … */ }

export function ModalMui({email,open,onClose,onClick}) {

/*   const [recaptcha, setRecaptcha] = React.useState(false) */

  const classes = useStyles();

/*   const recaptchaKey = '6Ld75T8aAAAAAFHCMlDdQldC2kLUaX-dHMnPFMWK' */
/*   const email = 'rodrigobanselmo@gmail.com' */

  function onCloseModal() {
    onClose()
/*     setRecaptcha(false) */
  }

  function onSendEmail(event) {
    event && event?.preventDefault && event.preventDefault();
    onClick()
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
        <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={600}>
          <div className={classes.paper}>
          <IconCloseButton onClick={onCloseModal} />
            <h2 style={{marginBottom:15,color:'#fff'}}>Esqueceu sua senha?</h2>
            <p style={{marginBottom:15,color:'#fff'}}>{`Deseja enviar um email para redefinir sua senha?`}</p>
            <div style={{backgroundColor:'#ddd',  borderColor:'#555',borderRadius:5, borderStyle:'solid', borderWidth:1,width:'100%',padding:'12px 20px'}}>
              <p style={{textAlign:'center',color:'#202020',fontSize:15}}>{`${(email).toLowerCase()}`}</p>
            </div>

{/*             <div style={{alignSelf: 'center',margin:'30px 0px',marginBottom:40}}>
              <ReCAPTCHA
                sitekey={recaptchaKey}
                onChange={()=>setRecaptcha(true)}
                onExpired={()=>setRecaptcha(false)}
              />
            </div> */}
            <ButtonDisable onClick={onSendEmail} /* disabled={!recaptcha} */ >
              <p>Enviar</p> <span><ArrowForward /></span>
            </ButtonDisable>
          </div>
        </Slide>
        </Fade>
      </Modal>
  );
}
