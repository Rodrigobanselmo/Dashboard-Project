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
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Tree from 'react-tree-graph';
import styled, {ThemeContext} from "styled-components";
import './style.css';
import {v4} from "uuid";
import { useResizeDetector } from 'react-resize-detector';

const Container = styled.div`
  align-items: center;
  justify-content: center;
  padding-left:30px;
	background-color: ${({theme})=>theme.palette.background.paper};
`;

export function Organograma({data,setData}) {


  let datas = {
    name: "initial",
    num: 45,
    numHide: 0,
    text: "Embraer S.a.",
    type: "Empresa",
    children: [
        {
            name: "0",
            text: "Nome do Setor",
            type: "Setor",
            num: 0,
            children: [],
            childrenHide: false,
            nodeProps: {}
        },
        {
            name: "1",
            text: "Nome do Setor",
            type: "Setor",
            num: 18,
            children: [
                {
                    name: "1-0",
                    type: "Setor Desenvolvido",
                    num: 10,
                    text: "Nome Desenvolvido",
                    children: [
                        {
                            name: "1-0-0",
                            text: "Nome do Cargo",
                            num: 5,
                            type: "Cargo",
                            children: [
                                {
                                    name: "1-0-0-0",
                                    text: "Nome do Cargo",
                                    num: 0,
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    name: "1-0-0-1",
                                    text: "Nome do Cargo",
                                    num: 0,
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    name: "1-0-0-2",
                                    text: "Nome do Cargo",
                                    num: 0,
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    name: "1-0-0-3",
                                    text: "Nome do Cargo",
                                    num: 0,
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    name: "1-0-0-4",
                                    text: "Nome do Cargo",
                                    num: 0,
                                    type: "Cargo Desenvolvido"
                                }
                            ],
                            childrenHide: false,
                            nodeProps: {}
                        },
                        {
                            name: "1-0-1",
                            text: "Nome do Cargo",
                            num: 3,
                            type: "Cargo",
                            children: [
                                {
                                    name: "1-0-1-0",
                                    text: "Nome do Cargo",
                                    num: 0,
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    name: "1-0-1-1",
                                    text: "Nome do Cargo",
                                    num: 0,
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    name: "1-0-1-2",
                                    text: "Nome do Cargo",
                                    num: 0,
                                    type: "Cargo Desenvolvido"
                                }
                            ]
                        }
                    ]
                },
                {
                    name: "1-1",
                    type: "Setor Desenvolvido",
                    num: 6,
                    text: "Nome Desenvolvido",
                    children: [
                        {
                            name: "1-1-0",
                            text: "Nome do Cargo",
                            num: 0,
                            type: "Cargo",
                            children: []
                        },
                        {
                            name: "1-1-1",
                            text: "Nome do Cargo",
                            num: 3,
                            type: "Cargo",
                            children: [
                                {
                                    name: "1-1-1-0",
                                    text: "Nome do Cargo",
                                    num: 0,
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    name: "1-1-1-1",
                                    text: "Nome do Cargo",
                                    num: 0,
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    name: "1-1-1-2",
                                    text: "Nome do Cargo",
                                    num: 0,
                                    type: "Cargo Desenvolvido"
                                }
                            ]
                        },
                        {
                            name: "1-1-2",
                            text: "Nome do Cargo",
                            num: 0,
                            type: "Cargo",
                            children: []
                        }
                    ],
                    childrenHide: false,
                    nodeProps: {}
                }
            ],
            childrenHide: false,
            nodeProps: {}
        },
        {
            name: "2",
            text: "Nome do Setor",
            type: "Setor",
            num: 6,
            children: [
                {
                    name: "2-0",
                    type: "Setor Desenvolvido",
                    num: 0,
                    text: "Nome Desenvolvido",
                    children: []
                },
                {
                    name: "2-1",
                    type: "Setor Desenvolvido",
                    num: 3,
                    text: "Nome Desenvolvido",
                    children: [
                        {
                            name: "2-1-0",
                            text: "Nome do Cargo",
                            num: 0,
                            type: "Cargo",
                            children: []
                        },
                        {
                            name: "2-1-1",
                            text: "Nome do Cargo",
                            num: 0,
                            type: "Cargo",
                            children: []
                        },
                        {
                            name: "2-1-2",
                            text: "Nome do Cargo",
                            num: 0,
                            type: "Cargo",
                            children: []
                        }
                    ]
                },
                {
                    name: "2-2",
                    type: "Setor Desenvolvido",
                    num: 0,
                    text: "Nome Desenvolvido",
                    children: []
                }
            ],
            childrenHide: false,
            nodeProps: {}
        },
        {
            name: "3",
            text: "Nome do Setor",
            type: "Setor",
            num: 10,
            children: [
                {
                    name: "3-0",
                    type: "Setor Desenvolvido",
                    num: 0,
                    text: "Nome Desenvolvido",
                    children: []
                },
                {
                    name: "3-1",
                    type: "Setor Desenvolvido",
                    num: 0,
                    text: "Nome Desenvolvido",
                    children: []
                },
                {
                    name: "3-2",
                    type: "Setor Desenvolvido",
                    num: 7,
                    text: "Nome Desenvolvido",
                    children: [
                        {
                            name: "3-2-0",
                            text: "Nome do Cargo",
                            num: 3,
                            type: "Cargo",
                            children: [
                                {
                                    name: "3-2-0-0",
                                    text: "Nome do Cargo",
                                    num: 0,
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    name: "3-2-0-1",
                                    text: "Nome do Cargo",
                                    num: 0,
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    name: "3-2-0-2",
                                    text: "Nome do Cargo",
                                    num: 0,
                                    type: "Cargo Desenvolvido"
                                }
                            ]
                        },
                        {
                            name: "3-2-1",
                            text: "Nome do Cargo",
                            num: 0,
                            type: "Cargo",
                            children: []
                        },
                        {
                            name: "3-2-2",
                            text: "Nome do Cargo",
                            num: 0,
                            type: "Cargo",
                            children: []
                        },
                        {
                            name: "3-2-3",
                            text: "Nome do Cargo",
                            num: 0,
                            type: "Cargo",
                            children: []
                        }
                    ]
                }
            ],
            childrenHide: false,
            nodeProps: {}
        },
        {
            name: "4",
            text: "Nome do Setor",
            type: "Setor",
            num: 3,
            children: [
                {
                    name: "4-0",
                    type: "Setor Desenvolvido",
                    num: 0,
                    text: "Nome Desenvolvido",
                    children: []
                },
                {
                    name: "4-1",
                    type: "Setor Desenvolvido",
                    num: 0,
                    text: "Nome Desenvolvido",
                    children: []
                },
                {
                    name: "4-2",
                    type: "Setor Desenvolvido",
                    num: 0,
                    text: "Nome Desenvolvido",
                    children: []
                }
            ],
            childrenHide: false,
            nodeProps: {}
        }
    ],
    childrenHide: false,
    nodeProps: {}
}

  const [position, setPosition] = useState({top:0,left:0})
  const [dataState, setDataState] = useState(datas)
  const [show, setShow] = useState(false)
  const [sizeHeight, setSizeHeight] = useState(500)
  const [scrollNav, setScrollNav] = useState(false);

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

  function onAdd(nodeKey) {

    let dataCopy = {...dataState};
    const [...indexes] = nodeKey.split('-');
    dataCopy.num = dataCopy.num + 1;

    if (nodeKey === 'initial') {
      dataCopy.children.push({
        name: `${dataCopy.children.length}`,
        text: 'Nome do Setor',
        type: 'Setor',
        num:0,
        children: []
      })
    } else if (indexes.length == 1) {
      dataCopy.children[indexes[0]].num = dataCopy.children[indexes[0]].num + 1
      dataCopy.children[indexes[0]].children.push({
        name: `${indexes[0]}-${dataCopy.children[indexes[0]].children.length}`,
        type: 'Setor Desenvolvido',
        num:0,
        text: 'Nome Desenvolvido',
        children: []
      })
    } else if (indexes.length == 2) {
      dataCopy.children[indexes[0]].num = dataCopy.children[indexes[0]].num + 1
      dataCopy.children[indexes[0]].children[indexes[1]].num = dataCopy.children[indexes[0]].children[indexes[1]].num + 1
      dataCopy.children[indexes[0]].children[indexes[1]].children.push({
        name: `${indexes[0]}-${indexes[1]}-${dataCopy.children[indexes[0]].children[indexes[1]].children.length}`,
        text: 'Nome do Cargo',
        num:0,
        type: 'Cargo',
        children: []
      })
    } else if (indexes.length == 3) {
      dataCopy.children[indexes[0]].num = dataCopy.children[indexes[0]].num + 1
      dataCopy.children[indexes[0]].children[indexes[1]].num = dataCopy.children[indexes[0]].children[indexes[1]].num + 1
      dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].num = dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].num + 1
      dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children.push({
        name: `${indexes[0]}-${indexes[1]}-${indexes[2]}-${dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children.length}`,
        text: 'Nome do Cargo',
        num:0,
        type: 'Cargo Desenvolvido',
      })
    }
    console.log(dataCopy);
    if (dataCopy.num > 10) {
      setSizeHeight(500+dataCopy.num*20)
    }
    setDataState({...dataCopy})
  }

  function onContract(nodeKey) {

    let dataCopy = {...dataState};
    const [...indexes] = nodeKey.split('-');

    if (nodeKey === 'initial') {
      if (dataCopy?.childrenHide) {
        dataCopy.children = [...dataCopy.childrenHide]
        dataCopy.childrenHide = false
        dataCopy.nodeProps = {}
        dataCopy.num = dataCopy.numHide
        dataCopy.numHide = 0
      } else {
        dataCopy.childrenHide = [...dataCopy.children]
        dataCopy.children = []
        dataCopy.nodeProps = {style:{fill:'#d9560b',stroke: '#d9560b',strokeWidth: 0.7,fontSize: 16}}
        dataCopy.numHide = dataCopy.num
        dataCopy.num = 0
      }
    } else if (indexes.length == 1) {
      if (dataCopy.children[indexes[0]]?.childrenHide) {
        dataCopy.children[indexes[0]].children = [...dataCopy.children[indexes[0]].childrenHide]
        dataCopy.children[indexes[0]].childrenHide = false
        dataCopy.children[indexes[0]].nodeProps = {}
        dataCopy.num = dataCopy.num + dataCopy.children[indexes[0]].num
      } else {
        dataCopy.children[indexes[0]].childrenHide = [...dataCopy.children[indexes[0]].children]
        dataCopy.children[indexes[0]].children = []
        dataCopy.children[indexes[0]].nodeProps = {style:{fill:'#d9560b',stroke: '#d9560b',strokeWidth: 0.7,fontSize: 16}}
        dataCopy.num = dataCopy.num - dataCopy.children[indexes[0]].num
      }
    } else if (indexes.length == 2) {
      if (dataCopy.children[indexes[0]].children[indexes[1]]?.childrenHide) {
        dataCopy.children[indexes[0]].children[indexes[1]].children = [...dataCopy.children[indexes[0]].children[indexes[1]].childrenHide]
        dataCopy.children[indexes[0]].children[indexes[1]].childrenHide = false
        dataCopy.children[indexes[0]].children[indexes[1]].nodeProps = {}
        dataCopy.num = dataCopy.num + dataCopy.children[indexes[0]].children[indexes[1]].num
      } else {
        dataCopy.children[indexes[0]].children[indexes[1]].childrenHide = [...dataCopy.children[indexes[0]].children[indexes[1]].children]
        dataCopy.children[indexes[0]].children[indexes[1]].children = []
        dataCopy.children[indexes[0]].children[indexes[1]].nodeProps = {style:{fill:'#d9560b',stroke: '#d9560b',strokeWidth: 0.7,fontSize: 16}}
        dataCopy.num = dataCopy.num - dataCopy.children[indexes[0]].children[indexes[1]].num
      }
    } else if (indexes.length == 3) {
      if (dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]]?.childrenHide) {
        dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children = [...dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].childrenHide]
        dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].childrenHide = false
        dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].nodeProps = {}
        dataCopy.num = dataCopy.num + dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].num
      } else {
        dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].childrenHide = [...dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children]
        dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children = []
        dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].nodeProps = {style:{fill:'#d9560b',stroke: '#d9560b',strokeWidth: 0.7,fontSize: 16}}
        dataCopy.num = dataCopy.num - dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].num
      }
    }
    if (dataCopy.num > 10) {
      setSizeHeight(500+dataCopy.num*20)
    } else {
      setSizeHeight(500)
    }
    console.log(dataCopy)
    setDataState({...dataCopy})
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
  }

  function onContractChild(event, nodeKey) {
    event.preventDefault();
    const location = [];
    if (nodeKey === 'initial') {
      onContract(nodeKey)
    } else {
      const [...indexes] = nodeKey.split('-');
      console.log('indexes',indexes,'nodeKey',nodeKey);
      onContract(nodeKey);
    }
  }


  return (
      <Container ref={ref}>
        {width >10 &&
        <Tree
        svgProps={{
          className: theme.palette.type == 'dark' ? 'custom' : 'customLight' ,
        }}
        gProps={{
          onClick: onContractChild,
          onContextMenu: onAddChild,
        }}
        data={dataState}
        style={{backgroundColor:'red'}}
        labelProp='text'
        height={sizeHeight}
        width={width+30}
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

