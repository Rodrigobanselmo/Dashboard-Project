import React, { useState } from "react";
import styled from 'styled-components/macro';
import {IconCLose,IconCheck,IconWarn,IconError,IconInfo} from '../../Icons'
import {DivItem,DivBar,DivItemModal,Icon} from './Notification'

const IconSimple = styled.img`
  height:26px;
  width:26px;
  resize:cover;
  margin:13px;
  align-self:center;
`;



const Notification = props => {
  const [exit, setExit] = useState(false);
  const [width, setWidth] = useState(0);
  const [intervalID, setIntervalID] = useState(null);

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setWidth(prev => {
        if (prev < 100) {
          return prev + 0.5;
        }

        clearInterval(id);
        return prev;
      });
    }, 20);

    setIntervalID(id);
  };

  const handlePauseTimer = () => {
    clearInterval(intervalID);
  };

  const handleCloseNotification = () => {
    handlePauseTimer();
    setExit(true);
    setTimeout(() => {
      props.dispatch({
        type: "REMOVE_NOTIFICATION",
        id: props.id
      })
    }, 400)
  };

  React.useEffect(() => {
    if (width === 100) {
      handleCloseNotification()
    }
  }, [width])

  React.useEffect(() => {
    handleStartTimer();
    return handleStartTimer
  }, []);

  return (
    <>
    {props.modal ? 
    <DivItemModal
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      type={props.type}
      notificationExit={exit ? "exit" : ""}
    >
    <div style={{flexDirection:'row',display:'flex'}}>
      <Icon type={props.type === 'success' ? "Check" : props.type === 'error' ? 'Error' : props.type === 'info' ? 'Info': props.type === 'warn' ? 'Warn' : null} />
      <p>{props.message}</p>
    </div>
    </DivItemModal>
    : 
    <DivItem
    onMouseEnter={handlePauseTimer}
    onMouseLeave={handleStartTimer}
    type={props.type}
    notificationExit={exit ? "exit" : ""}
  >
  <div style={{flexDirection:'row',display:'flex'}}>
    { props.type === 'success' ?
      <IconCheck/>
    : props.type === 'error' ?
      <IconError/>
    : props.type === 'info' ?
      <IconInfo/>
    : props.type === 'warn' ?
    <IconWarn/>
    : props.type === 'simple' ?
    <IconSimple src='/images/logoIcon.svg'/>
    : null
    }
    <p>{props.message}</p>
  </div>
    <IconCLose small={'true'} onClick={()=>handleCloseNotification()} />
    <DivBar type={props.type} style={{ width: `${width}%` }} />
  </DivItem>
      }
    </>
  );
};

export default Notification;
