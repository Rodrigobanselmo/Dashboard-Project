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
    console.log(nodeKey);
  }, [nodeKey])

  function onSetOpen(event,text) {
    event.preventDefault();
    if (text==='Editar' && position.nodeKey !== 'initial') {
      setOpen(text)
      if (open !== 'Editar') setData({title:getEditInfo('title'),type:getEditInfo('type')})
    }
    if (text==='Adicionar' && position.nodeKey.split('-').length != 4) {
      setOpen(text)
      if (open !== 'Adicionar')setData({title:'',type:''})
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
    if (open==='Adicionar' && position.nodeKey.split('-').length != 4) onAddChild({nodeKey:position.nodeKey,title:data.title,type:data.type})
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
      if (variable==='title') return dataState?.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[2]]?.text
      if (variable==='type') return dataState?.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[2]]?.type
    }
    return false
  }

  function onOptions() {
    const [...indexes] = position.nodeKey.split('-');
    console.log('dataStateTest',dataState)
    if (position.nodeKey === 'initial') { //empresa
      return ["Setor"]
    } else if (indexes.length == 1) { //estou no setor
      return ["Setor Desenvolvido", "Cargo"]
    } else if (indexes.length == 2) { //estou no setor Desenvolvido ou cargo
      if (dataState?.children[indexes[0]]?.children[indexes[1]]?.type === 'Setor Desenvolvido') return ["Cargo"]
      if (dataState?.children[indexes[0]]?.children[indexes[1]]?.type === 'Cargo') return ["Cargo Desenvolvido"]
      return []
    } else if (indexes.length == 3) { //estou no cargo ou cargo desenvolvido
      if (dataState?.children[indexes[0]]?.children[indexes[1]]?.children[indexes[2]]?.type === 'Cargo')  return ['Cargo Desenvolvido']
      if (dataState?.children[indexes[0]]?.children[indexes[1]]?.children[indexes[2]]?.type === 'Cargo Desenvolvido')  return []
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
    } else if (indexes.length == 4) {
      return true
    } else if (position.nodeKey.split('-').length != 4 && !filter) {
      return false
    }
    console.log('deepestJson(DATA)',deepestJson(DATA));
    return false
  }

  function Button({text}) {

    const style = validationDirectionOnLeft() ? {left:2,transform:`rotate(180deg)`}:{right:2}
    return(
      <ButtonRightClick text={text} indexes={position.nodeKey.split('-')} dataState={dataState} nodeKey={position.nodeKey}  position={position.nodeKey.split('-').length} onClick={(event)=>onSetOpen(event,text)}>
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
        <ContainerButtons style={{top:position.top+30,transform:`translate( 0px, ${(-positionScroll+position.fromTop)}px)`, left:position.left-80}}>
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
            <p style={{fontSize:16,marginTop:8,marginBottom:12}}>Você reamente deseja deletar este campo? Está ação é irreversivel!</p>
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
              options={onOptions()}
              onSelect={onSelect}
              placeholder={"Selecione o tipo de área"}
              defaultValue={data.type}
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
