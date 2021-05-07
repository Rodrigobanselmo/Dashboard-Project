import React, {useRef,useContext,useCallback,useEffect,useState} from 'react';
import {Icons} from '../../../../../components/Icons/iconsDashboard';
import {
  ContainerDiv,
  ButtonContainer
} from '../../styles';
import {onGetCompanie} from '../../func'
import {keepOnlyNumbers} from '../../../../../helpers/StringHandle';
import Tabs from '../../../../../components/Main/MuiHelpers/Tabs'
import {estados} from '../../../../../constants/geral'
import {InputEnd,InputUnform,SelectedEnd} from '../../../../../components/Main/MuiHelpers/Input'
import {NumberFormatCNPJ,NumberFormatCNAE,NumberFormatOnly,NumberFormatCEP, NumberFormatCPF,NumberFormatTel,NumberFormatCell} from '../../../../../lib/textMask'
import {
  HeaderForm,
  FormContainer,
  SubTitleForm,
  TitleForm,DividerForm,
  ButtonForm
} from '../../../../../components/Dashboard/Components/Form/comp'
import { useField } from '@unform/core'
import * as Yup from 'yup'
import Tree from 'react-tree-graph';
import styled, {ThemeContext} from "styled-components";
import './style.css';
import {v4} from "uuid";
import { useResizeDetector } from 'react-resize-detector';
import {dataFake,onAdd,onDelete,onEdit,onContract,onSave as onSaveOrganograma} from './func';
import {CardEdit} from './comp';
import {FilterComponent,AddUserButton,AddTextButton} from '../../../../../components/Main/Table/comp'
import { ViewArray } from '@material-ui/icons';
import clone from 'clone';
import {ContinueButton} from '../../../../../components/Main/MuiHelpers/Button'
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from './Modal'
import { truncate } from 'lodash';

const Container = styled.div`
  align-items: center;
  justify-content: center;
  padding-left:30px;
	background-color: ${({theme})=>theme.palette.background.paper};
`;


export function Organograma({data,cnpj,workplaceId,currentUser,notification,setData}) {

  const dataToStart = {
    text: data.nome,
    type: "Empresa",
    children: [],
    childrenHide: false,
    nodeProps: {}
  }

  const [position, setPosition] = useState({top:0,left:0,nodeKey:'',fromTop:0})
  const [positionScroll, setPositionScroll] = useState(0)
  const [initialized, setInitialized] = useState(false)
  const [dataInitial,setDataInitial] = useState(data?.org?clone(data.org):clone(dataToStart))
  const [dataBeforeFilter,setDataBeforeFilter] = useState(data?.org?clone(data.org):clone(dataToStart))
  const [dataState, setDataState] = useState(data?.org?clone(data.org):clone(dataToStart))
  const [show, setShow] = useState(false)
  const [save, setSave] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sizeHeight, setSizeHeight] = useState(500)
  const [filter, setFilter] = useState('')
  const [prevFilter, setPrevFilter] = useState('')
  const [open, setOpen] = useState(false)

  const { width, height, ref } = useResizeDetector();
  const theme = useContext(ThemeContext)

  const ContainerMain = document.getElementById('someRandomID');

  useEffect(() => {
    if (initialized) {
      ContainerMain.addEventListener('scroll', setScrollPosition);
      return function cleanupListener() {
        ContainerMain.removeEventListener('scroll', setScrollPosition)
      }
    }
    if (!initialized) setInitialized(true)
  }, [initialized]);

  const setScrollPosition = (value) => {
    setPositionScroll(value.target.scrollTop);
  };

  const removeMenu = ({bool=true}) => {
    if (bool) setShow(false)
  };

  function onRightClick(event, nodeKey) {
    event && event.preventDefault();
    setPosition({top:event.pageY,left:event.pageX,nodeKey:nodeKey,fromTop:positionScroll})
    setShow(true)
  }

  function onAddChild({nodeKey,title,type}) {
    setSave(true)
    if (nodeKey === 'initial') {
      onAdd({nodeKey,setDataState:setDataInitial,dataState:dataInitial,setSizeHeight,title,type})
      onAdd({nodeKey,setDataState:setDataBeforeFilter,dataState:dataBeforeFilter,setSizeHeight,title,type})
      if (filter && filter==prevFilter) onAdd({nodeKey,setDataState,dataState,setSizeHeight,title,type,dataInitial})
    } else {
      onAdd({nodeKey,setDataState:setDataInitial,dataState:dataInitial,setSizeHeight,title,type});
      onAdd({nodeKey,setDataState:setDataBeforeFilter,dataState:dataBeforeFilter,setSizeHeight,title,type});
      if (filter && filter==prevFilter) onAdd({nodeKey,setDataState,dataState,setSizeHeight,title,type,dataInitial})
    }
  }

  function onDeleteChild({nodeKey}) {
    setSave(true)
    if (nodeKey === 'initial') {
    } else {
      onDelete({nodeKey,setDataState:setDataInitial,dataState:dataInitial,setPrevFilter});
      onDelete({nodeKey,setDataState:setDataBeforeFilter,dataState:dataBeforeFilter,setPrevFilter});
    }
  }

  function onEditChild({nodeKey,text,type}) {
    setSave(true)
    if (nodeKey === 'initial') {
    } else {
      onEdit({nodeKey,setDataState:setDataInitial,dataState:dataInitial,text,type,setPrevFilter});
      onEdit({nodeKey,setDataState:setDataBeforeFilter,dataState:dataBeforeFilter,text,type,setPrevFilter});
      //if (filter && filter==prevFilter) onEdit({nodeKey,setDataState,dataState,text,type,setPrevFilter});
    }
  }

  function onContractChild(event, nodeKey) {
    event && event.preventDefault();
    const location = [];
    if (nodeKey === 'initial') {
      onContract({nodeKey,setDataState:setDataBeforeFilter,dataState:dataBeforeFilter,setSizeHeight})
    } else {
      const [...indexes] = nodeKey.split('-');
      console.log('indexes',indexes,'nodeKey',nodeKey);
      onContract({nodeKey,setDataState:setDataBeforeFilter,dataState:dataBeforeFilter,setSizeHeight});
    }
  }

  const buildSubTree = (root) => {

		let newChildren = [];

		for (let i = 0; i < root.children.length; i++) {
			let child = buildSubTree(root.children[i]);
			if (child) {
				newChildren.push(child);
			}
		}

		if (newChildren.length > 0) {
			root.children = newChildren;
		}

		if (newChildren.length > 0 || root.text.toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "").indexOf(filter.toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "")) !== -1) {
			return root;
		}
		return null;
	}

  function addIdRecursively(root,oldIndex){
    root.forEach((item,index)=> {
      if(!oldIndex) item.name = `initial`
      else item.name = oldIndex!='initial'&&oldIndex?`${oldIndex}-${index}`:`${index}`
         if(item.children.length>0){
            addIdRecursively(item.children,item.name)
         } else if (item?.childrenHide && item.childrenHide.length>0) {
            addIdRecursively(item.childrenHide,item.name)
         }
    })
  }

  function deepestJson(data) {
    var indexes = 0;
    function count(root,maxPosition){
      if (indexes<maxPosition) indexes = maxPosition
      root.forEach((item)=> {
        if(item.children.length>0){
          count(item.children,maxPosition?Number(maxPosition)+1:1)
        }
      })
    }
    count([data])
    return indexes
  }

  useEffect(() => {
    var root = {};
    if (filter) root = {...dataInitial};
    else root = {...dataBeforeFilter};
    root = clone(root);

    var num = 1;
    function constNum(root){
      root.forEach((item,index)=> {
        num = num + item.children.length
        if(item.children.length>0){
          constNum(item.children)
        }
      })
    }

    addIdRecursively([root]);


    if (filter && filter!=prevFilter && filter !== 'expandAllNodes') {
      root = buildSubTree(root) || root;
      setDataState(root)
    } else if (!filter) {
      setDataState(root)
    } else {
      //setDataState(root)
    }
    setPrevFilter(filter)
    constNum([root]);
    setSizeHeight(200+num*20)
  }, [filter,dataInitial,dataBeforeFilter])

  function onSave() {
    onSaveOrganograma({setLoading,setSave,data,workplaceId,setData,currentUser,notification,dataInitial})
  }

  function onHandleExpand() {
    var root = {};
    root = {...dataInitial};
    root = clone(root);
    setDataBeforeFilter({...root})
  }

  return (
      <Container ref={ref}>
        <div style={{display:'flex',flexDirection:'row', alignItems:'center',marginTop:15}}>
          <FilterComponent
            style={{margin:0,marginRight:10,padding:0}}
            setSearch={setFilter}
            search={filter}
            onCleanSearch={()=>setFilter('')}
            />
          <div style={{position: 'relative'}}>
            <ContinueButton disable={`${loading || !save}`} style={{width:100,padding:2.5,opacity:loading?0.6:1}} onClick={onSave} primary={!save?'outlined':'true'} size={'medium'}>
              Salvar
            </ContinueButton>
            {loading && <CircularProgress size={24} style={{color: theme.palette.primary.main,position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}} />}
          </div>
          <AddUserButton style={{marginRight:20}} onClick={onHandleExpand} text={'Expandir Todos'} icon={'AllOut'} width={180} />
          <AddTextButton transparent style={{marginLeft:'auto'}} onClick={()=>setOpen(true)} text={'-  Grupo Homogenio de Exposixão'} shortText={'GHE'} width={290} />
        </div>
        {width >10 &&
        <Tree
        svgProps={{
          className: theme.palette.type == 'dark' ? 'custom' : 'customLight' ,
        }}
        gProps={{
          onClick: onContractChild,
          onContextMenu: onRightClick,
        }}
        data={dataState}
        labelProp='text'
        height={filter ? 450 : sizeHeight}
        width={deepestJson(dataState) == 1 ? (width+20)/2 :width+20}
        animated
        textProps={{
            transform:'translate(5)'
          }}
          >
        </Tree>
        }
        {show &&
          <CardEdit deepestJson={deepestJson} nodeKey={position.nodeKey} positionScroll={positionScroll} onContractChild={onContractChild} filter={filter} dataState={filter ? dataInitial : dataState} data={dataState} theme={theme} onDeleteChild={onDeleteChild} onEditChild={onEditChild} onAddChild={onAddChild} removeMenu={removeMenu} position={position}/>
        }
        <Modal open={open} setOpen={setOpen}/>
      </Container>
  );
}

