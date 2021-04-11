import React from 'react';
import {ModalMui} from '../MuiHelpers/Modal'
import {CancelButton,ContinueButton} from '../MuiHelpers/Button'

export function ModalButtons({
            open,
            onClose,
            onClick,
            buttonDirection='normal',
            rightBnt='Confirmar',
            leftBnt='Cancelar',
            title='Modal',
            disable=false,
            children,
            onContextMenu
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
        <div style={{minWidth:'300px',marginTop:'10px'}}>
            {children}
        </div>
        <div style={{marginTop:27,flexDirection: buttonDirection === 'normal' ? 'row':'row-reverse',display:'flex', alignItems: 'center', justifyContent: buttonDirection === 'normal' ? 'flex-end':'flex-start',width:'100%'}}>
          <CancelButton  onClick={onClose} style={{  marginRight:buttonDirection === 'normal'?'15px':0}} variant="outlined" >{leftBnt}</CancelButton>
          <ContinueButton disable={`${disable}`} primary={'true'} onClick={onAction} style={{  marginRight:buttonDirection === 'normal'?'0px':'15px'}} >{rightBnt}</ContinueButton>
        </div>
    </ModalMui>
  );
}
