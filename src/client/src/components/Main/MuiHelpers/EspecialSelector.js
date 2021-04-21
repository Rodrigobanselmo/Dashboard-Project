import React, {useRef,useCallback,useEffect,useState} from 'react';
import {keepOnlyNumbers} from '../../../helpers/StringHandle';
import {InputEnd,InputUnform,SelectedEnd} from './Input'
import {NumberFormatCNPJ,NumberFormatCNAE,NumberFormatOnly,NumberFormatCEP, NumberFormatCPF,NumberFormatTel,NumberFormatCell} from '../../../lib/textMask'
import {
  FormContainer,
  TitleForm,DividerForm,
  AddAnotherForm,
  ButtonForm
} from '../../Dashboard/Components/Form/comp'
import { useField } from '@unform/core'
import * as Yup from 'yup'
import {Icons} from '../../Icons/iconsDashboard';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {Search} from './Search';
// import {Selector} from './Selector';
import styled, {ThemeContext,css} from "styled-components";
import Checkbox from '@material-ui/core/Checkbox';
import { lighten,darken,fade } from "@material-ui/core/styles";
import LinearProgress from '@material-ui/core/LinearProgress';
import useTimeOut from '../../../hooks/useTimeOut'

const Box = styled.div`
  position: absolute;
  width: 100%;
  box-shadow: ${({theme})=>theme.palette.type!== 'dark'? '1px 1px 3px 1px rgba(0,0,0,0.22)': '1px 1px 3px 1px rgba(0,0,0,0.32)'};
  border-radius:5px;
  z-index:134;

  ${props => props.bottom && css`
    bottom:  45px;
  `}

  ${props => !props.bottom && css`
    top:  45px;
  `}
`;


const Selector = styled.div`
  height:35px;
  width:100%;
  border: 1px solid ${({theme})=>theme.palette.type!== 'dark'? darken(theme.palette.background.contrast,0):darken(theme.palette.background.contrast,0)};
  background-color: ${({theme})=>theme.palette.type!== 'dark'? darken(theme.palette.background.paper,0):darken(theme.palette.background.paper,0)};
  display:flex;
  align-items: center;
  flex-direction:row;
  padding:5px 12px;
  border-radius:5px;
  box-shadow: ${({theme})=>theme.palette.type!== 'dark'? 'none':'inset 0px 0px 33px -6px rgba(0,0,0,0.2)'};


  p {
    flex:1;
    font-size:14px;
  }
`;


const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 2px;
  border-top-left-radius:4px;
  border-top-right-radius:4px;
  padding:3px 12px 3px 5px;

  p {
  }

  &:hover {
    background-color: ${({theme})=>theme.palette.type!== 'dark'? darken(theme.palette.background.paper,0.1):darken(theme.palette.background.contrast,0.2)};
  }
  &:active {
    opacity:0.7;
  }

`;


const ItemsContainer = styled.div`
  background-color: ${({theme})=>theme.palette.type!== 'dark'? darken(theme.palette.background.paper,0.01):darken(theme.palette.background.paper,0.2)};
  border-radius:4px;
  border-top-left-radius:0px;
  border-top-right-radius:0px;
  border: 1px solid ${({theme})=>theme.palette.type!== 'dark'? darken(theme.palette.background.contrast,0):darken(theme.palette.background.contrast,0)};
  border-top: none;
  cursor: pointer;
  width:100%;
  max-height:250px;
  overflow-y:auto;
  //margin-top:5px;

  p {
    margin-top:2px;
    color:${({theme})=>theme.palette.text.secondary};;
  }
`;


export function EspecialSelector({options=[],defaultValue=[],hideSelectAll,bottom,width='100%',isSimpleSelection,onSelectFunction,onSearch,override,isToMany,...rest}) {

    const [selected, setSelected] = useState(defaultValue);
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const theme = React.useContext(ThemeContext)
    const [isOpen, setIsOpen] = useState(false);
    const [onTimeOut,onClearTime] = useTimeOut();


    var text = {
      "allItemsAreSelected": "Todo os items foram selecionados",
      "noOptions": "Nenhuma opção",
      "search": "Pesquisar...",
      "selectAll": "Selecionar Todos",
      "select": "Items selecionados",
      "selectSomeItems": "Selecione..."
    }
    if (override) text = override

    // const text = {
    //   "allItemsAreSelected": "Todo os Riscos Quimicos foram selecionados",
    //   "clearSearch": "Limpar Pesquisa",
    //   "noOptions": "Nenhuma opção",
    //   "search": "Pesquisar",
    //   "selectAll": "Selecionar Todos",
    //   "selectSomeItems": "Selecione os Fatores de Risco..."
    // }

  useEffect(() => {
    if (onSelectFunction && !isSimpleSelection) onSelectFunction(selected)
    if (onSelectFunction && isSimpleSelection) {
      onSelectFunction(selected)
      setIsOpen(false)
    }
  }, [selected])

  function onSelectAllClick() {
    if (selected.includes('all')) {
      setSelected([])
      return
    }
    setSelected(['all'])
  }

  function onSelect(item) {
    if (isSimpleSelection) {
      setSelected([item.id])
      return
    }

    if (selected.includes('all') && !isToMany) {
      const selec = []
      if (Array.isArray(options)) options.map(i=>{
        if (item.id != i.id) selec.push(i.id)
      })
      setSelected([...selec])
      return
    }

    if (selected.includes('all')) {
      setSelected([item.id])
      return
    }

    if (selected.includes(item.id)) {
      const selec = [...selected]
      const selecIndex = selec.findIndex(i=>i ==item.id)
      selec.splice(selecIndex,1)
      setSelected([...selec])
      return
    }

    const selec = [...selected]
    selec.push(item.id)
    setSelected([...selec])
  }

  function onSearchText(text) {
    onSearch(text)
    setSearch(text)
    setLoading(true)
    onClearTime()
    onTimeOut(()=>{
      setLoading(false)
    },400)
  }

  function onClickAway() {
    setIsOpen(false)
    setSearch('')
    onSearch('')
  }

  const sort = function (a, b) {
    if (selected.includes(a.id)) {
        return -1;
    }
    return 1;
  };

  return (
      <ClickAwayListener onClickAway={onClickAway}>
        <div style={{position:'relative',cursor:'pointer',width}}>
          <Selector onClick={()=>setIsOpen(isOpen?false:true)} >
            <p style={{opacity:!selected.includes('all')?selected.length>0?1:0.6:1}}>
              {!selected.includes('all')?selected.length>0? <><span>{text.select}: </span><strong>{selected.length}</strong></>:text.selectSomeItems:<><span>{text.select}: </span><strong>Todos</strong></>}
            </p>
            <Icons style={{fontSize:25}} type={`KeyboardArrowDownIcon`}/>
          </Selector>
          <>
            {isOpen &&
            <Box bottom={bottom}>
              <Search
                style={{boxShadow:'none',borderBottomLeftRadius:0,borderBottomRightRadius:0,backgroundColor:theme.palette.type !=='dark'?darken(theme.palette.background.paper,0.02):darken(theme.palette.background.paper,0.25)}}//
                onSearch={onSearchText}
                searchLabel={text.search}
              />
              <ItemsContainer >
              {loading ?
                <LinearProgress style={{margin:'5px 5px 50px 5px'}}/>
              :
              <>
                {options.length > 0 ?
                  <>
                    {search == '' && !hideSelectAll &&
                      <ItemContainer onClick={onSelectAllClick}>
                        <Checkbox
                          color={'primary'}
                          size={'small'}
                          checked={selected.includes('all')}
                          onChange={onSelectAllClick}
                          inputProps={{ 'aria-label': 'select all desserts' }}
                          />
                        <p style={{paddingTop:8}}>{text.selectAll} </p>
                      </ItemContainer>
                    }
                    {options.sort(sort).map((item,index)=>{
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <ItemContainer key={index} onClick={()=>onSelect(item)}>
                          <Checkbox
                            color={'primary'}
                            onChange={()=>onSelect(item)}
                            size={'small'}
                            checked={selected.includes('all') || selected.includes(item.id)}
                            inputProps={{ 'aria-labelledby': labelId }}
                            />
                          <p style={{paddingTop:8}}>{item?.name ?? item?.text}</p>
                        </ItemContainer>
                      )
                    })}
                  </>
                  :
                  <div style={{margin:'15px 0px',display:'flex',alignItems:'center',justifyContent:'center',opacity:0.6}}>
                    {text.noOptions}
                  </div>
                }
              </>
              }
              </ItemsContainer>
            </Box>
          }
          </>
        </div>
      </ClickAwayListener>
  )
}
