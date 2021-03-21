import React, {useState,useRef,useEffect} from 'react';
import { Collapse } from '@material-ui/core';
import Sign from './comp'
import { Base, Title,Form} from './styles';
import {handleEmailChange,handlePasswordChange,confirmHandlePasswordChange} from './valid'
import {onCheckEmail,onLoginUser,onCreateAccount,onRecoveryEmail} from './func'
import { useHistory } from "react-router-dom"
import { useAuth } from "../../../context/AuthContext"
import {useLoaderScreen} from '../../../context/LoaderContext'
import useFade from '../../../hooks/useFadeInOut'
import useTimeOut from '../../../hooks/useTimeOut';
import {useNotification} from '../../../context/NotificationContext'
import {DASHBOARD} from '../../../routes/routesNames'

export default function SignIn({emailQuery}) {

  const initialState = {
    emailAddress: emailQuery ? emailQuery:'rodrigobanselmo@gmail.com',
    password: 'qweqwe',
    confirmPassword: '',
    warnMessage: {body:'Campo de email não pode ser nulo',type:'none'},
    warnPassMessage: {body:'Campo de senha não pode ser nulo',type:'none'},
    warnConfirmMessage: {body:'Confirme sua senha para continuar',type:'none'},
  }

  const history = useHistory()

  const [error, setError] = useState('');
  const [recoveryModal, setRecoveryModal] = useState(false);
  const [login, setLogin] = useState(false); //tels us with state the component is // Enter-Login-Register
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialState);

  const [update, setUpdate] = useState(false); // will tell us if need to check the email input

  const inputPass = useRef(null);
  const inputConfirm = useRef(null);

  const { currentUser } = useAuth()
  const {load,setLoad} = useLoaderScreen();
  const notification = useNotification();

  const [fade,change,fadeInOut] = useFade('Entrar')
  const [onTimeOutReset] = useTimeOut() //to undo an error message and if i sent a new error will erase the old setTimeout to undo it
  const [onTimeOutR,onClearTimeO] = useTimeOut()  //to see if email is valid and if user stopped texting


  useEffect(() => {  //redirect to app if user is logged  and if user email is coming from query it will valid it
    if (currentUser) {
      setLoad(true)
      setTimeout(() => {
        setLoad(false)
        history.replace(DASHBOARD)
      }, 1000);
    } else if (emailQuery) {
      setTimeout(() => {
        onButtonSign()
      }, 800);
    }
  }, [currentUser])

  useEffect(() => {
    if (error && error !== '') onTimeOutReset(()=>setError(''),4000);
  }, [error])


  useEffect(() => {  //when email input is lazy and email is valid will call this checkEmail func
    update && onTimeOutR(onButtonSign,1500)
  }, [update])


  function onChangeAuthMethod(type) { //it will change the title of the form box
    let message= 'Entrar'
    if (type === 'register') message = 'Cadastro'
    else if (type === 'login') message = 'Login'
    fadeInOut(()=>{setLogin(type)},message)
  }

  const onButtonSign = (event) => {
    event && event?.preventDefault && event.preventDefault();
    if (!loading) {
      if (login === false ) {
        onCheckEmail({data,setData,setLoading,setError,onChangeAuthMethod,inputPass,onErrorNotification})
        onClearTimeO()
      } else if (login === 'login') {
        onLoginUser({data,setLoad,setError,onErrorNotification})
      } else if (login === 'register') {
        onCreateAccount({data,setLoad,setError,onErrorNotification})
      }
    }
  };

  function onSentRecoveryEmail() {
    onRecoveryEmail({data,setLoad,setError,onSuccessNotification,onErrorNotification,setRecoveryModal})
  }

  function onSetEmailAddress(value) {
    handleEmailChange(value,data,setData,setUpdate,onClearTimeO)
  }

  function onSetPassword(value) {
    handlePasswordChange(value,data,setData)
  }

  function onSetConfirmPassword(value) {
    confirmHandlePasswordChange(value,data,setData)
  }


  function onFocusEmail(value) { //every time I focus the email will disappear the others inputs
    if (login !== false  ) {
      setData({...initialState,emailAddress:value})
      setLogin(false)
    }
  }

  function onErrorNotification(error)  {
    notification.error({message: error})
  }

  function onSuccessNotification(message)  {
    notification.success({message})
  }

  return (
    <Sign >
    <Sign.VideoBackground/>
      <Sign.Logo/>
      <Form style={{transform: 'scale(0.9)'}} >
        <Title fade={fade}>{change}</Title>
        <Collapse timeout={1000} in={error && error !== '' ? true : false}>
          <Sign.Errors error={error}/>
        </Collapse>
        <Base
          onSubmit={onButtonSign}
          method="POST"
        >
          <Sign.InputEmail
            loading={loading}
            data={data}
            onSetEmailAddress={onSetEmailAddress}
           /*  onBlurEmail={onBlurEmail} */
            onFocusEmail={onFocusEmail}
            onKerPress={({key})=>key==='Enter' && onButtonSign()}
            />
          <Sign.InputPass
            inputPass={inputPass}
            data={data}
            loading={loading}
            login={login}
            onSetPassword={onSetPassword}
            onKerPress={({key})=>key==='Enter' && (login === 'register' ? inputConfirm.current.focus() : onButtonSign())}
            />
          <Sign.InputConfirmPass
            inputConfirm={inputConfirm}
            data={data}
            onSetConfirmPassword={onSetConfirmPassword}
            login={login}
            loading={loading}
            />
          <Sign.ContinueButton
            handleSignIn={onButtonSign}
            login={login}
            data={data}
          />
          <Sign.ForgotPassword
            login={login}
            setRecoveryModal={setRecoveryModal}
          />
        </Base>
        <div onClick={() => onLoginUser({data,setLoad,setError,onErrorNotification})}>jio</div>
        <Sign.Duvida/>
      </Form>
      <Sign.RecoveryModal email={data.emailAddress} onSentRecoveryEmail={onSentRecoveryEmail} setRecoveryModal={setRecoveryModal} recoveryModal={recoveryModal} />
    </Sign>
  );
}





