/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import firebase from 'firebase';
import { auth } from '../lib/firebase.prod.js';

const errorCatch = (error: any) => {
  let errorMessage = error;

  if (error.code === 'auth/user-not-found') {
    errorMessage =
      'Usuario de email não cadastrado, por vafor cadastre-se antes de logar!';
  } else if (error.code === 'auth/network-request-failed') {
    errorMessage =
      'Falha de conexão com a internet, tente novamente quando estiver conectado a uma rede!';
  } else if (error.code === 'auth/invalid-email') {
    errorMessage = 'Endereço de e-mail mal formatado';
  } else if (error.code === 'auth/email-already-in-use') {
    errorMessage = 'O endereço de email já esta cadastrado!';
  } else if (error.code === 'auth/network-request-failed') {
    errorMessage =
      'Falha de conexão com a internet, tente novamente quando estiver conectado a uma rede!';
  } else if (error.code === 'auth/wrong-password') {
    errorMessage = 'Senha incorreta. Por favor, tente novamente';
  } else if (error.code === 'auth/too-many-requests') {
    errorMessage =
      'O Acesso a essa conta está temporariamente desabilitado devido ao grande números de requisoções ao servidor. Por favor, tente novamente mais tarde';
  } else {
    errorMessage = error.message;
  }

  console.log('error', error);
  console.log('error code', error.code);

  return errorMessage;
};

export function CheckEmailExists(
  email: string,
  checkSuccess: (props: string[]) => void,
  checkError: (props: any) => void,
) {
  auth
    .fetchSignInMethodsForEmail(email)
    .then((response) => {
      setTimeout(() => {
        checkSuccess(response);
      }, 500);
    })
    .catch((error) => {
      checkError(errorCatch(error));
    });
}

export function CreateEmail(
  email = '',
  password = '',
  checkSuccess: (props: firebase.auth.UserCredential) => void,
  checkError: (props: any) => void,
) {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((loggedUser) => {
      setTimeout(() => {
        checkSuccess(loggedUser);
      }, 500);
    })
    .catch((error) => {
      checkError(errorCatch(error));
    });
}

export function SignInEmail(
  email = '',
  password = '',
  checkSuccess: (props: firebase.auth.UserCredential) => void,
  checkError: (props: any) => void,
) {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((loggedUser) => {
      checkSuccess(loggedUser);
    })
    .catch((error) => {
      checkError(errorCatch(error));
    });
}

export function RecoveryEmail(
  email = '',
  checkSuccess: () => void,
  checkError: (props: any) => void,
) {
  auth
    .sendPasswordResetEmail(email)
    .then(function () {
      checkSuccess();
    })
    .catch(function (error) {
      checkError(errorCatch(error));
    });
}

export function LogOut(
  checkSuccess: () => void,
  checkError: (props: any) => void,
) {
  auth
    .signOut()
    .then(() => {
      checkSuccess();
    })
    .catch((error) => {
      checkError(errorCatch(error));
    });
}
