import React, { useContext, useState, useEffect } from "react"
import { auth } from "../lib/firebase.prod"
import { useHistory,useLocation } from "react-router-dom"
import {DASHBOARD,SIGN} from '../routes/routesNames'
import {useNotification} from './NotificationContext'
import {useLoaderScreen} from './LoaderContext'
import {GetUserData} from '../services/firestoreUser'
import {LogOut} from '../services/firebaseAuth'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("")

  const location = useLocation();
  const history = useHistory()
  const {setLoad} = useLoaderScreen();
  const notification = useNotification();


  function checkSuccess(doc,user,newUser) {
    setCurrentUser({...user,...doc})
    setLoad(false)
    console.log('user',{...doc})
    if (location.pathname.includes(SIGN)) history.replace(DASHBOARD)
    if (newUser) {
      setTimeout(() => {
        notification.simple({message:'Seja bem-vindo!'})
      }, 1000);
    }
    if (newUser !== true && newUser) {
      setTimeout(() => {
        notification.simple({message:`Parabens, agora você é membro da empresa ${newUser}`})
      }, 1400);
    }
  }

  function checkError(error) {
    setTimeout(() => {
      notification.error({message:error,modal:true})
    }, 600);
    LogOut(()=>{},()=>{})
    setLoad(false)
    setCurrentUser(null)
  }

  useEffect(() => {
    // const unsubscribe = auth.onAuthStateChanged(user => {
    //   if (!user) {
    //     setCurrentUser(user)
    //     setLoad(false)
    //   }
    //   if (user) GetUserData(user,checkSuccess,checkError)
    // })

    // return unsubscribe
    setCurrentUser({
      company: {
          name: "simplesst",
          id: "nDSBFRU9H180cpXyAbtE"
      },
      image: "Admin",
      creation: {
          end: 0,
          start: 1613677117162
      },
      access: "master",
      type: "Master",
      status: "Ativo",
      admin: "Current",
      email: "rodrigobanselmo@gmail.com",
      uid: "IEU8lYKaOifsF1pXeIxWFffPfzZ2",
      info: {
          CREA: "123",
          CPF: "656.564.672-99"
      },
     name: "Rodrigo Barbosa Anselmo"
  })
    setLoad(false)
  }, [])

  return (
    <AuthContext.Provider value={{currentUser,setCurrentUser}}>
      {currentUser !== '' && children}
    </AuthContext.Provider>
  )
}




/*     notification.modal({
      title:'Usuário Adicionado',
      text:'Um email de autenticação foi enviado aos usuários para se tornarem membros de sua equipe.',
      type:'inform',
      rightBnt:'OK',
      open:true,
    }) */
