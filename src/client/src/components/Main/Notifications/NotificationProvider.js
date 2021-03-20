import React, {createContext, useContext, useReducer, useState} from "react";
import {v4} from "uuid";
import Notification from "./index";


const NotificationContext = createContext();

const NotificationProvider = (props) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD_NOTIFICATION":
        return [...state, {...action.payload}];
      case "REMOVE_NOTIFICATION":
        return state.filter(el => el.id !== action.id);
      default:
        return state
    }
  }, []);

  return(
    <NotificationContext.Provider value={dispatch}>
        {state.map((note) => {
          return <Notification dispatch={dispatch} key={note.id} {...note} />
        })}
      {props.children}
    </NotificationContext.Provider>
  )
};

export const useNotification = () => {
  const dispatch = useContext(NotificationContext);

  function dispatchAction(type,props) {
    dispatch({type: "ADD_NOTIFICATION",payload: {id: v4(),type,...props }})
  }

  return {
    error: function (props) {
      dispatchAction('error',props)
    },
    simple: function (props) {
      dispatchAction('simple',props)
    },
    success: function (props) {
      dispatchAction('success',props)
    },
    info: function (props) {
      dispatchAction('info',props)
    },
    warn: function (props) {
      dispatchAction('warn',props)
    },
  }
};

export default NotificationProvider;