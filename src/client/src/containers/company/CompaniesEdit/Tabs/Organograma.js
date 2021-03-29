import React, {useRef,useContext,useCallback,useEffect,useState} from 'react';
import {Icons} from './../../../../components/Icons/iconsDashboard.tsx';
import {
  ContainerDiv,
  ButtonContainer
} from '../styles';
import {onGetCompanie} from '../func'
import {keepOnlyNumbers} from '../../../../helpers/StringHandle';
import Tabs from '../../../../components/Main/MuiHelpers/Tabs'
import {estados} from '../../../../constants/geral'
import {InputEnd,InputUnform,SelectedEnd} from '../../../../components/Main/MuiHelpers/Input'
import {NumberFormatCNPJ,NumberFormatCNAE,NumberFormatOnly,NumberFormatCEP, NumberFormatCPF,NumberFormatTel,NumberFormatCell} from '../../../../lib/textMask'
import {
  HeaderForm,
  FormContainer,
  SubTitleForm,
  TitleForm,DividerForm,
  ButtonForm
} from '../../../../components/Dashboard/Components/Form/comp'
import { useField } from '@unform/core'
import * as Yup from 'yup'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Tree from 'react-tree-graph';
import styled, {ThemeContext} from "styled-components";
import './style.css';
import {v4} from "uuid";
import { useResizeDetector } from 'react-resize-detector';
import {dataFake,onAdd,onContract} from './OrganogramaFunc';
import {FilterComponent} from '../../../../components/Main/Table/comp'
import { ViewArray } from '@material-ui/icons';
import clone from 'clone';

const Container = styled.div`
  align-items: center;
  justify-content: center;
  padding-left:30px;
	background-color: ${({theme})=>theme.palette.background.paper};
`;

export function Organograma({data,setData}) {

  const [position, setPosition] = useState({top:0,left:0})
  const [dataState, setDataState] = useState(dataFake)
  const [show, setShow] = useState(false)
  const [sizeHeight, setSizeHeight] = useState(500)
  const [filter, setFilter] = useState('')

  const { width, height, ref } = useResizeDetector();
  const theme = useContext(ThemeContext)

  const ContainerMain = document.getElementById('someRandomID');

  useEffect(() => {
    if (dataState.num > 10) {
      setSizeHeight(500+dataState.num*20)
    }
    ContainerMain.addEventListener('scroll', removeMenu);
    return function cleanupListener() {
      ContainerMain.removeEventListener('scroll', removeMenu)
    }
  }, []);

  const removeMenu = ({bool=true}) => {
    if (bool) setShow(false)
  };

  function onClick(event, nodeKey) {
    setPosition({top:event.pageY,left:event.pageX})
    setShow(true)
  }

  function onRightClick(event, nodeKey) {
    event.preventDefault();
    setPosition({top:event.pageY,left:event.pageX})
    //alert(`Right clicked ${nodeKey}`);
  }

  function onAddChild(event, nodeKey) {
    event.preventDefault();
    const location = [];
    if (nodeKey === 'initial') {
      onAdd({nodeKey,setDataState,dataState,setSizeHeight})
    } else {
      const [...indexes] = nodeKey.split('-');
      console.log('indexes',indexes,'nodeKey',nodeKey);
      onAdd({nodeKey,setDataState,dataState,setSizeHeight});
    }
  }

  function onContractChild(event, nodeKey) {
    event.preventDefault();
    const location = [];
    if (nodeKey === 'initial') {
      onContract({nodeKey,setDataState,dataState,setSizeHeight})
    } else {
      const [...indexes] = nodeKey.split('-');
      console.log('indexes',indexes,'nodeKey',nodeKey);
      onContract({nodeKey,setDataState,dataState,setSizeHeight});
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

  var root = {...dataState};
  root = clone(root);

  if (filter) {
    root = buildSubTree(root) || root;
  }

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
          onContextMenu: onAddChild,
        }}
        data={root}
        style={{backgroundColor:'red'}}
        labelProp='text'
        height={filter ? 500 : sizeHeight}
        width={width+20}
        animated
        textProps={{
            transform:'translate(5)'
          }}
          >
        </Tree>
        }
        {show &&
        <ClickAwayListener onClickAway={()=>removeMenu({bool:show})}>
          <div style={{width:100,height:80,background:'#262626',borderRadius:20,  position:'fixed', top:position.top+5, left:position.left-90}}>
            <p>adicionar</p>
            <p>deletar</p>
            <p>contrair</p>
          </div>
        </ClickAwayListener>
        }
      </Container>
  );
}

