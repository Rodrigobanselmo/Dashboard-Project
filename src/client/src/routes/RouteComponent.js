import React from "react"
import { Route, Redirect } from "react-router-dom"
//import { useAuth } from "../context/AuthContext"
//import {useNotification} from "../context/NotificationContext"

export default function RouteComponent({ component: Component,privateRoute, ...rest }) {

  //const { currentUser } = useAuth()
  //const notification = useNotification()
  currentUser=null


  function onValidate() {
    if (rest?.infoUser && rest.infoUser) {
      const array = [];
      let val = true;
      rest.infoUser.map((item,index)=>{
        let conditionInfo={
          infoUser:item,
          condition:rest.condition[index],
          Equal:rest.Equal[index],
        }
        array.push(validate(conditionInfo))
      })
      array.map((item)=>{
        if (!item) val=false
      })

      return val
    } else {
      if (currentUser) {
        return true
      } else {
        return false
      }
    }
  }

  function validate(rest) {
    if (currentUser) {
      if (rest.infoUser) {
        if(currentUser[`${rest.infoUser}`] || currentUser[`${rest.infoUser}`]==='') {
          if (rest.condition || rest.condition === '' || Array.isArray(rest.condition)) {
            if (rest?.Equal && rest.Equal) {
              if (currentUser[`${rest.infoUser}`]===rest.condition || rest.condition.includes(currentUser[`${rest.infoUser}`])) return true
              else return false
            } else {
              if (currentUser[`${rest.infoUser}`]!==rest.condition || !rest.condition.includes(currentUser[`${rest.infoUser}`])) return true
              else return false
            }
          } else {
            return true
          }
        } else {
          return false
        }
      } else {
        return true
      }
    } else {
      return false
    }
  }

  return (
    <Route
      {...rest}
      render={props => {
        if (rest.isPrivate) return onValidate() ? <Component {...props} />
        :
        <>
        <Redirect to={{
          pathname: privateRoute,
          state: { from: props.location }
        }} />
{/*         {notification.error({message:'Você não possui autorização para acessar essa area.'})} */}
        {console.log(props.location)}
        </>

        else return <Component {...props} />
      }}
    ></Route>
  )
}

