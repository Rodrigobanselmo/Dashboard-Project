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
import {dataFake,onAdd,onDelete,onEdit,onContract} from './func';
import {CardEdit} from './comp';
import {FilterComponent} from '../../../../../components/Main/Table/comp'
import { ViewArray } from '@material-ui/icons';
import clone from 'clone';

const Container = styled.div`
  align-items: center;
  justify-content: center;
  padding-left:30px;
	background-color: ${({theme})=>theme.palette.background.paper};
`;

export function Organograma({data,cnpj,currentUser}) {

  const [position, setPosition] = useState({top:0,left:0,nodeKey:'',fromTop:0})
  const [positionScroll, setPositionScroll] = useState(0)
  const [dataInitial,setDataInitial] = useState(clone(dataFake))
  const [dataBeforeFilter,setDataBeforeFilter] = useState(clone(dataFake))
  const [dataState, setDataState] = useState(clone(dataFake))
  const [show, setShow] = useState(false)
  const [sizeHeight, setSizeHeight] = useState(500)
  const [filter, setFilter] = useState('')
  const [prevFilter, setPrevFilter] = useState('')

  const { width, height, ref } = useResizeDetector();
  const theme = useContext(ThemeContext)

  const ContainerMain = document.getElementById('someRandomID');

  useEffect(() => {
/*     if (dataState.num > 10) {
      setSizeHeight(500+dataState.num*20)
    } */
    ContainerMain.addEventListener('scroll', setScrollPosition);
    return function cleanupListener() {
      ContainerMain.removeEventListener('scroll', setScrollPosition)
    }
  }, []);

  const setScrollPosition = (value) => {
    setPositionScroll(value.target.scrollTop);
  };

  const removeMenu = ({bool=true}) => {
    if (bool) setShow(false)
  };

  function onClick(event, nodeKey) {
    event && event.preventDefault();
    setPosition({top:event.pageY,left:event.pageX,nodeKey:nodeKey})
    setShow(true)
  }

  function onRightClick(event, nodeKey) {
    event && event.preventDefault();
    setPosition({top:event.pageY,left:event.pageX,nodeKey:nodeKey,fromTop:positionScroll})
    setShow(true)
    console.log(nodeKey)
    //alert(`Right clicked ${nodeKey}`);
  }

  function onAddChild({nodeKey,title,type}) {
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
    if (nodeKey === 'initial') {
    } else {
      onDelete({nodeKey,setDataState:setDataInitial,dataState:dataInitial});
      onDelete({nodeKey,setDataState:setDataBeforeFilter,dataState:dataBeforeFilter});
      if (filter && filter==prevFilter) onDelete({nodeKey,setDataState,dataState,setPrevFilter})
    }
  }

  function onEditChild({nodeKey}) {
    if (nodeKey === 'initial') {
    } else {
      onDelete({nodeKey,setDataState:setDataInitial,dataState:dataInitial});
      onDelete({nodeKey,setDataState:setDataBeforeFilter,dataState:dataBeforeFilter});
      if (filter && filter==prevFilter) onAdd({nodeKey,setDataState,dataState})
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


    if (filter && filter!=prevFilter) {
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




  return (
      <Container ref={ref}>
        <FilterComponent
          setSearch={setFilter}
          search={filter}
          onCleanSearch={()=>setFilter('')}
        />
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
      </Container>
  );
}

