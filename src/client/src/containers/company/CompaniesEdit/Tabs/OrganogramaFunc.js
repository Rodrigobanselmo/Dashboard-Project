import styled from "styled-components";
import {v4} from "uuid";

export const Container = styled.div`
  align-items: center;
  justify-content: center;
  padding-left:30px;
	background-color: ${({theme})=>theme.palette.background.paper};
`;

export const dataFake = {
    name: "initial",
    num: 45,
    numHide: 0,
    text: "Embraer S.a.",
    type: "Empresa",
    children: [
        {
            name: "0",
            text: "Nome do Setor 1",
            type: "Setor",
            num: 0,
            children: [],
            childrenHide: false,
            nodeProps: {}
        },
        {
            name: "1",
            text: "Nome do Setor 2",
            type: "Setor",
            num: 18,
            children: [
                {
                    name: "1-0",
                    type: "Setor Desenvolvido",
                    num: 10,
                    text: "Nome Desenvolvido 3",
                    children: [
                        {
                            name: "1-0-0",
                            text: "Nome do Cargo 4",
                            num: 5,
                            type: "Cargo",
                            children: [
                                {
                                    name: "1-0-0-0",
                                    text: "Nome do Cargo 5",
                                    children: [],
                                    num: 0,
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    name: "1-0-0-1",
                                    text: "Nome do Cargo 6",
                                    children: [],
                                    num: 0,
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    name: "1-0-0-2",
                                    text: "Nome do Cargo",
                                    children: [],
                                    num: 0,
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    name: "1-0-0-3",
                                    children: [],
                                    text: "Nome do Cargo",
                                    num: 0,
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    name: "1-0-0-4",
                                    text: "Nome do Cargo",
                                    children: [],
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
                                    children: [],
                                    num: 0,
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    name: "1-0-1-1",
                                    children: [],
                                    text: "Nome do Cargo",
                                    num: 0,
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    name: "1-0-1-2",
                                    text: "Nome do Cargo",
                                    num: 0,
                                    children: [],
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
                                    children: [],
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    name: "1-1-1-1",
                                    children: [],
                                    text: "Nome do Cargo",
                                    num: 0,
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    name: "1-1-1-2",
                                    text: "Nome do Cargo",
                                    children: [],
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
                                    children: [],
                                    num: 0,
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    name: "3-2-0-1",
                                    text: "Nome do Cargo",
                                    num: 0,
                                    children: [],
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    name: "3-2-0-2",
                                    text: "Nome do Cargo",
                                    num: 0,
                                    children: [],
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
                    type: "Setor Desenvolvidos",
                    num: 0,
                    text: "Mecanico",
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

export function onAdd({nodeKey,setDataState,dataState,setSizeHeight}) {

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

export function onContract({nodeKey,setDataState,dataState,setSizeHeight}) {

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

