import {checkValidUser,checkConfirmPass,checkPass} from './valid'
import {CheckEmailExists,CreateEmail,RecoveryEmail,SignInEmail} from '../../../services/firebaseAuth'
import {DASHBOARD} from '../../../routes/routesNames'


export function onCheckEmail({data,setData,setLoading,setError,onChangeAuthMethod,inputPass,onErrorNotification}) {

    function checkSuccess(response) {
      if (response.length == 0) {
        setData({...data,warnMessage: {body:'Seja bem vindo!',type:'check'}});
        onChangeAuthMethod('register')
      }
      else {
        setData({...data,warnMessage: {body:'Bem vindo de volta!',type:'check'}});
        onChangeAuthMethod('login')
      }
      setLoading(false)
      inputPass.current.focus()
    }
  
    function checkError(error) {
      onErrorNotification(error)
      setData({...data,warnMessage: {body:error,type:'error'}});
      setLoading(false)
    }

    if (checkValidUser(data.emailAddress,data,setData,setError)) {
      setLoading(true)
      CheckEmailExists(data.emailAddress,checkSuccess,checkError)
    } else {
      setError(data.warnMessage.body)
    }
}

export function onLoginUser({data,setLoad,setError,onErrorNotification}) {

  function checkSuccess() {
/*     history.replace(DASHBOARD) */
    setLoad(false)
  }

  function checkError(error) {
      onErrorNotification(error);
      setLoad(false)
  }

  if (checkPass(data,setError)) {
      setLoad(true)
      SignInEmail(data.emailAddress,data.password,checkSuccess,checkError)
  }

}

export function onCreateAccount({data,setLoad,setError,onErrorNotification}) {

    function checkSuccess() {
/*         history.replace(DASHBOARD) */
        setLoad(false)
    }

    function checkError(error) {
        onErrorNotification(error);
        setLoad(false)
    }

    if (checkConfirmPass(data,setError)) {
      setLoad(true)
        CreateEmail(data.emailAddress,data.password,checkSuccess,checkError)
    }
}

export function onRecoveryEmail({data,setLoad,setError,onSuccessNotification,onErrorNotification,setRecoveryModal}) {

      function checkSuccess() {
        setLoad(false)
        setRecoveryModal(false)
        onSuccessNotification('Email enviado com sucesso, verifique em sua caixa de entrada e/ou span')
    }

    function checkError(error) {
        onErrorNotification(error);
        setLoad(false)
        setRecoveryModal(false)
    }

    if (data.emailAddress) {
        setLoad(true)
        RecoveryEmail(data.emailAddress,checkSuccess,checkError)
    } else {
      setError('Não foi possivel identificar seu endereço de email')
    }
}