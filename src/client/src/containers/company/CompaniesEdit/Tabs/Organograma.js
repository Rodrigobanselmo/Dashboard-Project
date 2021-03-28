import React, {useRef,useContext,useCallback,useEffect,useState} from 'react';
import {Icons} from './../../../../components/Icons/iconsDashboard.tsx';
import {
  ContainerDiv,
  ButtonContainer
} from '../styles';
import {onGetCompanie} from '../func'
import {keepOnlyNumbers} from '../../../../helpers/StringHandle';
import Tabs from '../../../../components/Main/MuiHelpers/Tabs'
import {LoadingContent} from '../../../../components/Main/Loader/LoadingContent'
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
import Tree from 'react-tree-graph';
import styled, {ThemeContext} from "styled-components";
import './style.css';
import {v4} from "uuid";

const Container = styled.div`
	background-color: ${({theme})=>theme.palette.background.paper};
`;

export function Organograma({data,setData}) {

  let datas = {
    name: 'initial',
    text: 'key One',
    type: 'tipo 1',
    children: []
    };
    //nodeProps:{style:{fill:'#d9560b',stroke: '#d9560b',strokeWidth: 0.7,fontSize: 16}}
  const [position, setPosition] = useState({top:0,left:0})
  const [dataState, setDataState] = useState(datas)
  const [show, setShow] = useState(false)

  function onClick(event, nodeKey) {
    console.log('event',event);
    setPosition({top:event.clientY,left:event.clientX})
    console.log('event',event.clientX,event.clientY);
    //alert(`Left clicked ${nodeKey}`);
  }

  function onRightClick(event, nodeKey) {
    event.preventDefault();
    setPosition({top:event.clientY,left:event.clientX})
    //alert(`Right clicked ${nodeKey}`);
  }

  function onFind(nodeKey,location) {
    location.map((item,index)=>{
      console.log(s);
    })
  }

  function onAdd(nodeKey,location) {

    let dataCopy = {...dataState};
    const [...indexes] = nodeKey.split('-');

    if (nodeKey === 'initial') {
      dataCopy.children.push({
        name: `${dataCopy.children.length}`,
        text: 'key Ones \t \n yssgs',
        type: 'tipo 1',
        children: []
      })
    } else if (indexes.length == 1) {
      dataCopy.children[indexes[0]].children.push({
        name: `${indexes[0]}-${dataCopy.children[indexes[0]].children.length}`,
        type: 'tipo 1',
        text: 'key Ones',
        children: []
      })
    } else if (indexes.length == 2) {
      dataCopy.children[indexes[0]].children[indexes[1]].children.push({
        name: `${indexes[0]}-${indexes[1]}-${dataCopy.children[indexes[0]].children[indexes[1]].children.length}`,
        text: 'key Ones',
        type: 'tipo 1',
        children: []
      })
    } else if (indexes.length == 3) {
      dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children.push({
        name: `${indexes[0]}-${indexes[1]}-${indexes[2]}-${dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children.length}`,
        text: 'key Ones',
        type: 'tipo 1',
      })
    }
    setDataState({...dataState})
  }

  function onAddChild(event, nodeKey) {
    event.preventDefault();
    const location = [];
    if (nodeKey === 'initial') {
      onAdd(nodeKey)
    } else {
      const [...indexes] = nodeKey.split('-');
      console.log('indexes',indexes,'nodeKey',nodeKey);
      onAdd(nodeKey);
    }
    //onFind(nodeKey,location)

  }

    const theme = useContext(ThemeContext)

  return (
    <>
      <Container>
        <Tree
          svgProps={{
            className: theme.palette.type == 'dark' ? 'custom' : 'customLight' ,
          }}
          gProps={{
            onClick: onAddChild,
            onContextMenu: onAddChild,
          }}
          data={dataState}
          labelProp='text'
          height={500}
          width={700}
          animated
          textProps={{
            transform:'translate(5)'
          }}
        >
        </Tree>
      </Container>
          <div style={{width:100,height:80,background:'#262626',borderRadius:20, position:'absolute',top:position.top+5,left:position.left-90}}>
            <p>adicionar</p>
            <p>deletar</p>
            <p>contrair</p>
          </div>
          </>
  );
}

