import React, { createContext, useContext, useReducer, useState } from 'react';
import { v4 } from 'uuid';
import styled from 'styled-components';
import Notification from '../components/Main/Notifications';
import { ModalInfo } from '../components/Main/Modal/ModalInfo';

const DivContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 10px;
  z-index: 2000;
`;
const DivContainerModal = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  padding-top: 20px;
  align-items: center;
  width: 100vw;
  flex-direction: column;
  z-index: 2000;
  pointer-events: none;
`;

const NotificationContext = createContext({});

const NotificationProvider = (props) => {
  const [modal, setModal] = useState({});
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'ADD_MODAL':
        setModal({ ...modal, ...action.payload });
        return [...state];
      case 'ADD_NOTIFICATION':
        return [...state, { ...action.payload }];
      case 'REMOVE_NOTIFICATION':
        return state.filter((el) => el.id !== action.id);
      default:
        return state;
    }
  }, []);

  return (
    <NotificationContext.Provider value={dispatch}>
      <DivContainer>
        {state.map((note) => {
          if (!note.modal)
            return <Notification dispatch={dispatch} key={note.id} {...note} />;
        })}
      </DivContainer>
      <DivContainerModal>
        {state.map((note) => {
          if (note.modal)
            return <Notification dispatch={dispatch} key={note.id} {...note} />;
        })}
      </DivContainerModal>
      <ModalInfo
        title={modal?.title ? modal.title : 'Você tem certeza?'}
        text={modal?.text ? modal.text : ''}
        open={modal?.open && modal.open ? modal.open : false}
        onClick={modal.onClick}
        onClose={modal.onClose}
        type={modal?.type ? modal.type : false}
        buttonDirection={
          modal?.buttonDirection ? modal.buttonDirection : 'normal'
        }
        rightBnt={modal?.rightBnt ? modal.rightBnt : 'Continuar'}
        leftBnt={modal?.leftBnt ? modal.leftBnt : 'Cancelar'}
      />
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const dispatch = useContext(NotificationContext);

  function dispatchAction(type, props) {
    if (type === 'modalReset')
      return dispatch({
        type: 'ADD_MODAL',
        payload: {
          open: false,
          onClose: () => {},
          onClick: () => {},
          ...props,
        },
      });
    if (type === 'modal')
      return dispatch({
        type: 'ADD_MODAL',
        payload: {
          onClose: () => dispatchAction('modalReset', {}),
          onClick: () => dispatchAction('modalReset', {}),
          type: '',
          ...props,
        },
      });
      console.log(props)
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { id: v4(), type, ...props },
    });
  }

  return {
    error(props) {
      dispatchAction('error', props);
    },
    simple(props) {
      dispatchAction('simple', props);
    },
    success(props) {
      dispatchAction('success', props);
    },
    info(props) {
      dispatchAction('info', props);
    },
    warn(props) {
      dispatchAction('warn', props);
    },
    modal(props) {
      dispatchAction('modal', props);
    },
    modalReset(props) {
      dispatchAction('modalReset', props);
    },
  };
};

export default NotificationProvider;
