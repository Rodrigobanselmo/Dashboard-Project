import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {ModalMui} from '../MuiHelpers/Modal'
import {CancelButton,ContinueButton} from '../MuiHelpers/Button'
import styled from "styled-components";

const Text = styled.p`
  font-size: 1.05em;
  line-height:1.6;
  color: ${props=>props.theme.palette.text.primary};
`;

export function ModalInfo({
            open,
            onClose,
            onClick,
            buttonDirection,
            rightBnt,
            leftBnt,
            title,
            text,
            type
        })
    {


  function onCloseModal() {
    if (onClose) onClose()
  }

  function onAction(event) {
    event && event?.preventDefault && event.preventDefault();
    if (onClick) onClick()
    onCloseModal()
  }

  return (
    <ModalMui open={open} onClose={onCloseModal} title={title}>
        <div style={{minWidth:'400px',maxWidth:'450px',marginTop:'10px'}}>
            <Text >{text}</Text>
        </div>
        <div style={{marginTop:27,flexDirection: buttonDirection === 'normal' ? 'row':'row-reverse',display:'flex', alignItems: 'center', justifyContent: buttonDirection === 'normal' ? 'flex-end':'flex-start',width:'100%'}}>
            {type === 'inform' ?
              <ContinueButton primary={'true'} onClick={onAction} minwidth={'120px'} >{rightBnt}</ContinueButton>
            :
              <>
                <CancelButton onClick={onClose} style={{  marginRight:buttonDirection === 'normal'?'15px':0}} variant="outlined" >{leftBnt}</CancelButton>
                <ContinueButton onClick={onAction} style={{  marginRight:buttonDirection === 'normal'?'0px':'15px'}} >{rightBnt}</ContinueButton>
              </>
           }
        </div>
    </ModalMui>
  );
}
