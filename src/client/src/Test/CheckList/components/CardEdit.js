import React from 'react';
import {Icons} from '../../../components/Icons/iconsDashboard';
import IconButton from '../../../components/Main/MuiHelpers/IconButton';
import RichTooltip from '../../../components/Dashboard/Components/MultUsage/RichTooltip'
import styled, {ThemeContext} from "styled-components";
import { lighten,darken, } from "@material-ui/core/styles";

const ButtonRightClick = styled.button`
  width:100%;
  height: 33%;
  position: relative;
  border-radius:5px;
  color: ${({theme})=>lighten(theme.palette.text.primary,0.031)};
  border: none;
  background: ${({theme})=>theme.palette.type !=='dark'?darken(theme.palette.background.paper,0.00):lighten(theme.palette.background.default,0.1)};
  &:hover {
    background: ${({theme,disable})=>disable?'transparent':darken(theme.palette.background.paper,0.04)};
  }
  span {
    opacity:${({disable})=>disable?0.6:1};
  }
`;


export function CardEdit({open,item,disableDel,disableEdit,disableDup,setOpen,anchorRef,onClick,title="Filtro Avançado",...restProps}) {
  const theme = React.useContext(ThemeContext)

  function onClickFunction(text) {
    onClick(text,item)
    setOpen(false)
  }

  function Button({text,disable}) {
    return(
      <ButtonRightClick onClick={()=>onClickFunction(text)} disable={disable} disabled={disable} text={text}>
        <div style={{padding:'7px 0px'}}>
          <span className={'noSelect'}>{text}</span>
        </div>
      </ButtonRightClick>
    )
  }

  return (
    <div ref={anchorRef} style={{marginBottom:-30,marginTop:-30}}>
      <RichTooltip elevation={theme.palette.type !=='dark'?5:15} {...restProps} open={open} setOpen={setOpen} width={100} background={theme.palette.type === 'dark' ? 'grey' : 'Light'} placement={'bottom-end'} anchorRef={anchorRef}  translateY={3}>
          <Button disable={disableEdit} text={'Editar'}/>
          <Button disable={disableDup} text={'Duplicar'}/>
          <Button disable={disableDel} text={'Deletar'}/>
      </RichTooltip>
    </div>
  )
}
