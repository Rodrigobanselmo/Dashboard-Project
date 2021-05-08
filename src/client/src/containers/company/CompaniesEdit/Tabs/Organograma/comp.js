import React, {useState} from 'react'
import {Icons} from './../../../../../components/Icons/iconsDashboard';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {InputEnd,SelectedEnd} from '../../../../../components/Main/MuiHelpers/Input'
import {ContinueButton} from '../../../../../components/Main/MuiHelpers/Button'
import {Menu} from '../../../../../components/Main/MuiHelpers/Selected'
import {ContainerButtons,ContainerInputs,ButtonRightClick,Span} from './style';

export function CardEdit({deepestJson, onAddChild,onDeleteChild,onEditChild,nodeKey, position,removeMenu,theme,data:DATA,dataState,filter,onContractChild,positionScroll}) {

  const [open, setOpen] = useState('none')
  const [data, setData] = useState({title:'',type:''})

  React.useEffect(() => {
    setOpen('none')
  }, [nodeKey])

  function onSetOpen(event,text) {
    event.preventDefault();
    if (text==='Editar' && position.nodeKey !== 'initial') {
      setOpen(text)
      console.log('getEditInfo(type)',getEditInfo('type'))
      if (open !== 'Editar') setData({title:getEditInfo('title'),type:getEditInfo('type')})
    }
    if (text==='Adicionar' && position.nodeKey.split('-').length != 6) {
      setOpen(text)
      if (open !== 'Adicionar') setData({title:'',type:''})
    }
    if (text==='Deletar' && position.nodeKey !== 'initial' && !isContract()) {
      setOpen(text)
    }
    if (text==='Expandir') {
      onContractChild(null,position.nodeKey)
      removeMenu({bool:true})
    }
  }

  function onSelect(value) {
    setData({title:data.title,type:value})
  }

  function onSave() {
    setOpen('none')
    removeMenu({bool:true})
    if (open==='Editar' && position.nodeKey !== 'initial') {onEditChild({nodeKey:position.nodeKey,text:data.title,type:data.type})}
    if (open==='Adicionar' && position.nodeKey.split('-').length != 6) onAddChild({nodeKey:position.nodeKey,title:data.title,type:data.type})
    if (open==='Deletar' && position.nodeKey !== 'initial') { onDeleteChild({nodeKey:position.nodeKey}) }
    //onAddChild(e,position.nodeKey)
  }

  function getEditInfo(variable) {
    const [...indexes] = position.nodeKey.split('-');
    if (indexes.length == 1) {
      if (variable==='title') return dataState?.children[indexes[0]]?.text
      if (variable==='type') return dataState?.children[indexes[0]]?.type
    } else if (indexes.length == 2) {
      if (variable==='title') return dataState?.children[indexes[0]].children[indexes[1]]?.text
      if (variable==='type') return dataState?.children[indexes[0]].children[indexes[1]]?.type
    } else if (indexes.length == 3 ) {
      if (variable==='title') return dataState?.children[indexes[0]].children[indexes[1]].children[indexes[2]]?.text
      if (variable==='type') return dataState?.children[indexes[0]].children[indexes[1]].children[indexes[2]]?.type
    } else if (indexes.length == 4 ) {
      if (variable==='title') return dataState?.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]]?.text
      if (variable==='type') return dataState?.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]]?.type
    } else if (indexes.length == 5 ) {
      if (variable==='title') return dataState?.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]]?.text
      if (variable==='type') return dataState?.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]]?.type
    } else if (indexes.length == 6 ) {
      if (variable==='title') return dataState?.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].children[indexes[5]]?.text
      if (variable==='type') return dataState?.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].children[indexes[5]]?.type
    }
    return false
  }

  function onOptions() {
    const [...indexes] = position.nodeKey.split('-');
    if (position.nodeKey === 'initial') { //empresa
      return ["Diretória","Gerencia","Setor","Cargo"]
    } else if (indexes.length == 1) {
      if (dataState?.children[indexes[0]]?.type === 'Diretória') return ["Gerencia","Setor","Cargo"]
      if (dataState?.children[indexes[0]]?.type === 'Gerencia') return ["Setor","Cargo"]
      if (dataState?.children[indexes[0]]?.type === 'Setor') return ["Subsetor","Cargo"]
      if (dataState?.children[indexes[0]]?.type === 'Cargo') return ["Função"]
      return ["Gerencia","Setor","Cargo"]
    } else if (indexes.length == 2) {
      if (dataState?.children[indexes[0]]?.children[indexes[1]]?.type === 'Gerencia') return ["Setor","Cargo"]
      if (dataState?.children[indexes[0]]?.children[indexes[1]]?.type === 'Setor') return ["Subsetor","Cargo"]
      if (dataState?.children[indexes[0]]?.children[indexes[1]]?.type === 'Subsetor') return ["Cargo"]
      if (dataState?.children[indexes[0]]?.children[indexes[1]]?.type === 'Cargo') return ["Função"]
      return []
    } else if (indexes.length == 3) {
      if (dataState?.children[indexes[0]]?.children[indexes[1]]?.children[indexes[2]]?.type === 'Setor')  return ["Subsetor","Cargo"]
      if (dataState?.children[indexes[0]]?.children[indexes[1]]?.children[indexes[2]]?.type === 'Subsetor')  return ["Cargo"]
      if (dataState?.children[indexes[0]]?.children[indexes[1]]?.children[indexes[2]]?.type === 'Cargo')  return ["Função"]
      return []
    } else if (indexes.length == 4) {
      if (dataState?.children[indexes[0]]?.children[indexes[1]]?.children[indexes[2]]?.children[indexes[3]]?.type === 'Subsetor')  return ['Cargo']
      if (dataState?.children[indexes[0]]?.children[indexes[1]]?.children[indexes[2]]?.children[indexes[3]]?.type === 'Cargo')  return ['Função']
      return []
    } else if (indexes.length == 5) {
      if (dataState?.children[indexes[0]]?.children[indexes[1]]?.children[indexes[2]]?.children[indexes[3]]?.children[indexes[4]]?.type === 'Cargo')  return ['Função']
      return []
    }
    return []
  }

  function isContract() {
    const [...indexes] = position.nodeKey.split('-');
    if (position.nodeKey === 'initial' && dataState?.childrenHide) {
      return true
    } else if (indexes.length == 1 && dataState?.children[indexes[0]]?.childrenHide) {
      return true
    } else if (indexes.length == 2 && dataState?.children[indexes[0]]?.children[indexes[1]]?.childrenHide) {
      return true
    } else if (indexes.length == 3 && dataState?.children[indexes[0]]?.children[indexes[1]]?.children[indexes[2]]?.childrenHide) {
      return true
    } else if (indexes.length == 4 && dataState?.children[indexes[0]]?.children[indexes[1]]?.children[indexes[2]]?.children[indexes[3]]?.childrenHide) {
      return true
    } else if (indexes.length == 5 && dataState?.children[indexes[0]]?.children[indexes[1]]?.children[indexes[2]]?.children[indexes[3]].children[indexes[4]]?.childrenHide) {
      return true
    } else if (indexes.length == 6 && dataState?.children[indexes[0]]?.children[indexes[1]]?.children[indexes[2]]?.children[indexes[3]].children[indexes[4]].children[indexes[5]]?.childrenHide) {
      return true
    }
    return false
  }

  function validationDirectionOnLeft() {
    const [...indexes] = position.nodeKey.split('-');
    if (position.nodeKey === 'initial') {
      return false
    } else if (indexes.length == 1 && deepestJson(DATA) <= 1) {
      return true
    } else if (indexes.length == 2 && deepestJson(DATA) <= 2) {
      return true
    } else if (indexes.length == 3 && deepestJson(DATA) <= 3) {
      return true
    } else if (indexes.length == 4 && deepestJson(DATA) <= 4) {
      return true
    } else if (indexes.length == 5 ) {
      return true
    } else if (indexes.length == 6) {
      return true
    } else if (position.nodeKey.split('-').length != 6 && !filter) {
      return false
    }
    return false
  }

  function Button({text}) {

    const style = validationDirectionOnLeft() ? {left:2,transform:`rotate(180deg)`}:{right:2}
    return(
      <ButtonRightClick text={text} indexes={position.nodeKey.split('-')} dataState={dataState} nodeKey={position.nodeKey}  position={position.nodeKey.split('-').length} onOptions={onOptions()} onClick={(event)=>onSetOpen(event,text)}>
        <div>
          <span>{text}</span>
          {open===text &&
            <Icons style={{fontSize:17,position: 'absolute',top:6,color:theme.palette.text.secondary,...style}}  type={`KeyboardArrowRightIcon`}/>
          }
        </div>
      </ButtonRightClick>
    )
  }

  return (
    <ClickAwayListener disableReactTree={true}  onClickAway={()=>removeMenu({bool:true})}>
      <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
        <ContainerButtons style={{zIndex:1091019861896198168917917918618916189179871891619618,top:position.top+30,transform:`translate( 0px, ${(-positionScroll+position.fromTop)}px)`, left:position.left-80}}>
          <Button text={'Editar'}/>
          {isContract() ?
            <Button text={'Expandir'}/>
          :
            <Button text={'Adicionar'}/>
          }
          <Button text={'Deletar'}/>
        </ContainerButtons>
        {open!=='none' &&
        <ContainerInputs style={{top:position.top+30,transform:`translate( 0px, ${(-positionScroll+position.fromTop)}px)`, left:validationDirectionOnLeft() ? position.left-400:position.left+30}}>
          {open ==='Deletar' ?
            <p style={{fontSize:16,marginTop:8,marginBottom:12}}>Você realmente deseja deletar este campo? Está ação é irreversível!</p>
          :
          <>
            <InputEnd
              width={'100%'}
              style={{color:theme.palette.text.primary}}
              value={data.title}
              onChange={({target})=>setData(data=>({...data,title:target.value}))}
              labelWidth={45}
              label={'Nome'}
              variant="outlined"
              inputProps={{style: {textTransform: 'capitalize'}}}
            />
            <Menu
              reloadDefault={false}
              options={onOptions()}
              onSelect={onSelect}
              placeholder={"Selecione o tipo de área"}
              defaultValue={data.type}
              value={open == 'Editar' ? data.type : false}
            />
          </>
          }
          <ContinueButton disable={data.title == '' || data.type == '' ? open ==='Deletar' ? 'false' : 'true' : 'false'} style={{width:'100%',padding:0,marginBottom:10,marginTop:8}} onClick={onSave} primary={open ==='Deletar'?'':'true'} /* onClick={onClickContinue}  */size={'medium'}>
            <p>{open==='Editar'?"Salvar":open}</p>
          </ContinueButton>
        </ContainerInputs>
        }
      </div>
    </ClickAwayListener>
  )
}
