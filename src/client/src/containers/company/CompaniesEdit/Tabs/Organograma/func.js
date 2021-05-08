import styled from "styled-components";
import clone from 'clone';
import {v4} from "uuid";
import {SetOrganograma} from '../../../../../services/firestoreCompany'

export const Container = styled.div`
  align-items: center;
  justify-content: center;
  padding-left:30px;
	background-color: ${({theme})=>theme.palette.background.paper};
`;

export const dataFake = {
    text: "Embraer S.a.",
    type: "Empresa",
    children: [
        {
            text: "Nome do Setor 1",
            type: "Setor",
            children: [],
            childrenHide: false,
            nodeProps: {}
        },
        {
            text: "Nome do Setor 2",
            type: "Setor",
            children: [
                {
                    type: "Setor Desenvolvido",
                    text: "Nome Desenvolvido 3",
                    children: [
                        {
                            text: "Nome do Cargo 4",
                            type: "Cargo",
                            children: [
                                {
                                    text: "Nome do Cargo 5",
                                    children: [
                                      {
                                        text: "Nome do Cargo 5",
                                        children: [],
                                        type: "Cargo Desenvolvido",
                                        nodeProps: {}
                                      },
                                    ],
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    text: "Nome do Cargo 6",
                                    children: [],
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    text: "Nome do Cargo",
                                    children: [],
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    children: [],
                                    text: "Nome do Cargo",
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    text: "Nome do Cargo",
                                    children: [],
                                    type: "Cargo Desenvolvido"
                                }
                            ],
                            childrenHide: false,
                            nodeProps: {}
                        },
                        {
                            text: "Nome do Cargo",
                            type: "Cargo",
                            children: [
                                {
                                    text: "Nome do Cargo",
                                    children: [],
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    children: [],
                                    text: "Nome do Cargo",
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    text: "Nome do Cargo",
                                    children: [],
                                    type: "Cargo Desenvolvido"
                                }
                            ]
                        }
                    ]
                },
                {
                    type: "Setor Desenvolvido",
                    text: "Nome Desenvolvido",
                    children: [
                        {
                            text: "Nome do Cargo",
                            type: "Cargo",
                            children: []
                        },
                        {
                            text: "Nome do Cargo",
                            type: "Cargo",
                            children: [
                                {
                                    text: "Nome do Cargo",
                                    children: [],
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    children: [],
                                    text: "Nome do Cargo",
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    text: "Nome do Cargo",
                                    children: [],
                                    type: "Cargo Desenvolvido"
                                }
                            ]
                        },
                        {
                            text: "Nome do Cargo",
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
            text: "Nome do Setor",
            type: "Setor",
            children: [
                {
                    type: "Setor Desenvolvido",
                    text: "Nome Desenvolvido",
                    children: []
                },
                {
                    type: "Setor Desenvolvido",
                    text: "Nome Desenvolvido",
                    children: [
                        {
                            text: "Nome do Cargo",
                            type: "Cargo",
                            children: []
                        },
                        {
                            text: "Nome do Cargo",
                            type: "Cargo",
                            children: []
                        },
                        {
                            text: "Nome do Cargo",
                            type: "Cargo",
                            children: []
                        }
                    ]
                },
                {
                    type: "Setor Desenvolvido",
                    text: "Nome Desenvolvido",
                    children: []
                }
            ],
            childrenHide: false,
            nodeProps: {}
        },
        {
            text: "Nome do Setor",
            type: "Setor",
            children: [
                {
                    type: "Setor Desenvolvido",
                    text: "Nome Desenvolvido",
                    children: []
                },
                {
                    type: "Setor Desenvolvido",
                    text: "Nome Desenvolvido",
                    children: []
                },
                {
                    type: "Setor Desenvolvido",
                    text: "Nome Desenvolvido",
                    children: [
                        {
                            text: "Nome do Cargo77",
                            type: "Cargo",
                            children: [
                                {
                                    text: "Nome do Cargo",
                                    children: [],
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    text: "Nome do Cargo",
                                    children: [],
                                    type: "Cargo Desenvolvido"
                                },
                                {
                                    text: "Nome do Cargo123",
                                    children: [],
                                    type: "Cargo Desenvolvido"
                                }
                            ]
                        },
                        {
                            text: "Nome do Cargo543",
                            type: "Cargo",
                            children: []
                        },
                        {
                            text: "Nome do Cargo",
                            type: "Cargo",
                            children: []
                        },
                        {
                            text: "Nome do Cargo345",
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
            text: "Nome do Setor345",
            type: "Setor",
            children: [
                {
                    type: "Setor Desenvolvido",
                    text: "Nome Desenvolvido",
                    children: []
                },
                {
                    type: "Setor Desenvolvidos",
                    text: "Mecanico",
                    children: []
                },
                {
                    type: "Setor Desenvolvido",
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

export function onAdd({nodeKey,setDataState,dataState,title,type,dataInitial}) {

    let dataCopy = {...dataState};
    const [...indexes] = nodeKey.split('-');
    const uid = Math.floor((1 + Math.random()) * 0x1000000000000000).toString(32).substring(1);

    if (nodeKey === 'initial') {
      if (dataInitial) {
        dataCopy.children.push({
          name: `${dataInitial.children.length}`,
          type: type,
          text: title,
          children: [],
          id: uid
        })
     // console.log(dataInitial.children.length);
    } else if (dataCopy?.childrenHide) {
        dataCopy.childrenHide.push({
          name: `${dataCopy.childrenHide.length}`,
          text: title,
          type: type,
          children: [],
          id: uid
        })
      } else {
        dataCopy.children.push({
          name: `${dataCopy.children.length}`,
          text: title,
          type: type,
          children: [],
          id: uid
        })
      }
    } else if (indexes.length == 1) {
      if (dataInitial) {
        const index1 = dataCopy.children.findIndex(i=>i.name == indexes[0])
        dataCopy.children[index1].children.push({
          name: `${indexes[0]}-${dataInitial.children[indexes[0]].children.length-1}`,
          type: type,
          text: title,
          children: [],
          id: uid
        })
        //console.log(`${dataInitial.children[indexes[0]].children.length}`);
      } else if (dataCopy.children[indexes[0]]?.childrenHide) {
        dataCopy.children[indexes[0]].childrenHide.push({
          name: `${indexes[0]}-${dataCopy.children[indexes[0]].childrenHide.length}`,
          type: type,
          text: title,
          children: [],
          id: uid
        })
      } else {
        dataCopy.children[indexes[0]].children.push({
          type: type,
          text: title,
          children: [],
          id: uid
        })
        console.log('dataCopy2',dataCopy);
      }
    } else if (indexes.length == 2) {
      if (dataInitial) {
        const index1 = dataCopy.children.findIndex(i=>i.name == indexes[0])
        const index2 = dataCopy.children[index1].children.findIndex(i=>i.name == `${indexes[0]}-${indexes[1]}`)
        dataCopy.children[index1].children[index2].children.push({
          name: `${indexes[0]}-${indexes[1]}-${dataInitial.children[indexes[0]].children[indexes[1]].children.length-1}`,
          type: type,
          text: title,
          children: [],
          id: uid
        })
      } else if (dataCopy.children[indexes[0]].children[indexes[1]]?.childrenHide) {
        dataCopy.children[indexes[0]].children[indexes[1]].childrenHide.push({
          name: `${indexes[0]}-${indexes[1]}-${dataCopy.children[indexes[0]].children[indexes[1]].childrenHide.length}`,
          text: title,
          num:0,
          type: type,
          children: [],
          id: uid
        })
      } else {
        dataCopy.children[indexes[0]].children[indexes[1]].children.push({
          name: `${indexes[0]}-${indexes[1]}-${dataCopy.children[indexes[0]].children[indexes[1]].children.length}`,
          text: title,
          type: type,
          children: [],
          id: uid
        })
      }
    } else if (indexes.length == 3) {
      if (dataInitial) {
        const index1 = dataCopy.children.findIndex(i=>i.name == indexes[0])
        const index2 = dataCopy.children[index1].children.findIndex(i=>i.name == `${indexes[0]}-${indexes[1]}`)
        const index3 = dataCopy.children[index1].children[index2].children.findIndex(i=>i.name == `${indexes[0]}-${indexes[1]}-${indexes[2]}`)
        dataCopy.children[index1].children[index2].children[index3].children.push({
          name: `${indexes[0]}-${indexes[1]}-${indexes[2]}-${dataInitial.children[indexes[0]].children[indexes[1]].children[indexes[2]].children.length-1}`,
          type: type,
          text: title,
          children: [],
          id: uid
        })
      } else if (dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]]?.childrenHide) {
        dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].childrenHide.push({
          name: `${indexes[0]}-${indexes[1]}-${indexes[2]}-${dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].childrenHide.length}`,
          text: title,
          type: type,
          children: [],
          id: uid
        })
      } else {
        dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children.push({
          name: `${indexes[0]}-${indexes[1]}-${indexes[2]}-${dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children.length}`,
          text: title,
          type: type,
          children: [],
          id: uid
        })
      }
    } else if (indexes.length == 4) {
      if (dataInitial) {
        const index1 = dataCopy.children.findIndex(i=>i.name == indexes[0])
        const index2 = dataCopy.children[index1].children.findIndex(i=>i.name == `${indexes[0]}-${indexes[1]}`)
        const index3 = dataCopy.children[index1].children[index2].children.findIndex(i=>i.name == `${indexes[0]}-${indexes[1]}-${indexes[2]}`)
        const index4 = dataCopy.children[index1].children[index2].children[index3].children.findIndex(i=>i.name == `${indexes[0]}-${indexes[1]}-${indexes[2]}-${indexes[3]}`)
        dataCopy.children[index1].children[index2].children[index3].children[index4].children.push({
          name: `${indexes[0]}-${indexes[1]}-${indexes[2]}-${indexes[3]}-${dataInitial.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children.length-1}`,
          type: type,
          text: title,
          children: [],
          id: uid
        })
      } else if (dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]]?.childrenHide) {
        dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].childrenHide.push({
          name: `${indexes[0]}-${indexes[1]}-${indexes[2]}-${indexes[3]}-${dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].childrenHide.length}`,
          text: title,
          type: type,
          children: [],
          id: uid
        })
      } else {
        dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children.push({
          name: `${indexes[0]}-${indexes[1]}-${indexes[2]}-${indexes[3]}-${dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children.length}`,
          text: title,
          type: type,
          children: [],
          id: uid
        })
      }
    } else if (indexes.length == 5) {
      if (dataInitial) {
        const index1 = dataCopy.children.findIndex(i=>i.name == indexes[0])
        const index2 = dataCopy.children[index1].children.findIndex(i=>i.name == `${indexes[0]}-${indexes[1]}`)
        const index3 = dataCopy.children[index1].children[index2].children.findIndex(i=>i.name == `${indexes[0]}-${indexes[1]}-${indexes[2]}`)
        const index4 = dataCopy.children[index1].children[index2].children[index3].children.findIndex(i=>i.name == `${indexes[0]}-${indexes[1]}-${indexes[2]}-${indexes[3]}`)
        const index5 = dataCopy.children[index1].children[index2].children[index3].children[index4].children.findIndex(i=>i.name == `${indexes[0]}-${indexes[1]}-${indexes[2]}-${indexes[3]}-${indexes[4]}`)
        dataCopy.children[index1].children[index2].children[index3].children[index4].children[index5].children.push({
          name: `${indexes[0]}-${indexes[1]}-${indexes[2]}-${indexes[3]}-${indexes[4]}-${dataInitial.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].children.length-1}`,
          type: type,
          text: title,
          children: [],
          id: uid
        })
      } else if (dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]]?.childrenHide) {
        dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].childrenHide.push({
          name: `${indexes[0]}-${indexes[1]}-${indexes[2]}-${indexes[3]}-${indexes[4]}-${dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].childrenHide.length}`,
          text: title,
          type: type,
          children: [],
          id: uid
        })
      } else {
        dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].children.push({
          name: `${indexes[0]}-${indexes[1]}-${indexes[2]}-${indexes[3]}-${indexes[4]}-${dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].children.length}`,
          text: title,
          type: type,
          children: [],
          id: uid
        })
      }
    }
    setDataState({...dataCopy})
  }

export function onDelete({nodeKey,setDataState,dataState,setPrevFilter}) {

  let dataCopy = {...dataState};
  const [...indexes] = nodeKey.split('-');
  //if (addIdRecursively) addIdRecursively([dataCopy])
  if (setPrevFilter) setPrevFilter('16524563612')

  if (nodeKey === 'initial') {
  } else if (indexes.length == 1) {
    dataCopy.children = [...dataCopy.children.slice(0,indexes[0]),...dataCopy.children.slice(Number(indexes[0])+1,dataCopy.children.length)]
  } else if (indexes.length == 2) {
    dataCopy.children[indexes[0]].children = [...dataCopy.children[indexes[0]].children.slice(0,indexes[1]),...dataCopy.children[indexes[0]].children.slice(Number(indexes[1])+1,dataCopy.children[indexes[0]].children.length)]
  } else if (indexes.length == 3) {
    dataCopy.children[indexes[0]].children[indexes[1]].children = [...dataCopy.children[indexes[0]].children[indexes[1]].children.slice(0,indexes[2]),...dataCopy.children[indexes[0]].children[indexes[1]].children.slice(Number(indexes[2])+1,dataCopy.children[indexes[0]].children[indexes[1]].children.length)]
  } else if (indexes.length == 4) {
/*     if (setPrevFilter) {
      const index1 = dataCopy.children.findIndex(i=>i.name == indexes[0])
      const index2 = dataCopy.children[index1].children.findIndex(i=>i.name == `${indexes[0]}-${indexes[1]}`)
      const index3 = dataCopy.children[index1].children[index2].children.findIndex(i=>i.name == `${indexes[0]}-${indexes[1]}-${indexes[2]}`)
      const index4 = dataCopy.children[index1].children[index2].children[index3].children.findIndex(i=>i.name == `${indexes[0]}-${indexes[1]}-${indexes[2]}-${indexes[3]}`)
      dataCopy.children[index1].children[index2].children[index3].children = [...dataCopy.children[index1].children[index2].children[index3].children.slice(0,index4),...dataCopy.children[index1].children[index2].children[index3].children.slice(Number(index4)+1,dataCopy.children[index1].children[index2].children[index3].children.length)]

    }  */
    dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children = [...dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children.slice(0,indexes[3]),...dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children.slice(Number(indexes[3])+1,dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children.length)]
  } else if (indexes.length == 5) {
    dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children = [...dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children.slice(0,indexes[4]),...dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children.slice(Number(indexes[4])+1,dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children.length)]
  } else if (indexes.length == 6) {
    dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].children = [...dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].children.slice(0,indexes[5]),...dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].children.slice(Number(indexes[5])+1,dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].children.length)]
  }
  setDataState({...dataCopy})
}

export function onEdit({nodeKey,setDataState,dataState,text='',type='',setPrevFilter}) {


  let dataCopy = {...dataState};
  const [...indexes] = nodeKey.split('-');
  if (setPrevFilter) setPrevFilter('123321123')
  if (nodeKey === 'initial') {
  } else if (indexes.length == 1) {
    dataCopy.children[indexes[0]].text = text
    dataCopy.children[indexes[0]].type = type
  } else if (indexes.length == 2) {
    dataCopy.children[indexes[0]].children[indexes[1]].text = text
    dataCopy.children[indexes[0]].children[indexes[1]].type = type
  } else if (indexes.length == 3) {
    dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].text = text
    dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].type = type
  } else if (indexes.length == 4) {
    dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].text = text
    dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].type = type
  } else if (indexes.length == 5) {
    dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].text = text
    dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].type = type
  } else if (indexes.length == 6) {
    dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].children[indexes[5]].text = text
    dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].children[indexes[5]].type = type
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
      //dataCopy.num = //dataCopy.numHide
      //dataCopy.numHide = 0
    } else if (dataCopy?.children && dataCopy.children.length) {
      dataCopy.childrenHide = [...dataCopy.children]
      dataCopy.children = []
      dataCopy.nodeProps = {style:{fill:'#d9560b',stroke: '#d9560b',strokeWidth: 0.7,fontSize: 16}}
      //dataCopy.numHide = //dataCopy.num
      //dataCopy.num = 0
    }
  } else if (indexes.length == 1) {
    if (dataCopy.children[indexes[0]]?.childrenHide) {
      dataCopy.children[indexes[0]].children = [...dataCopy.children[indexes[0]].childrenHide]
      dataCopy.children[indexes[0]].childrenHide = false
      dataCopy.children[indexes[0]].nodeProps = {}
      //dataCopy.num = //dataCopy.num + dataCopy.children[indexes[0]].num
    } else if (dataCopy?.children[indexes[0]]?.children && dataCopy.children[indexes[0]].children.length) {
      dataCopy.children[indexes[0]].childrenHide = [...dataCopy.children[indexes[0]].children]
      dataCopy.children[indexes[0]].children = []
      dataCopy.children[indexes[0]].nodeProps = {style:{fill:'#d9560b',stroke: '#d9560b',strokeWidth: 0.7,fontSize: 16}}
      //dataCopy.num = //dataCopy.num - dataCopy.children[indexes[0]].num
    }
  } else if (indexes.length == 2) {
    if (dataCopy.children[indexes[0]].children[indexes[1]]?.childrenHide) {
      dataCopy.children[indexes[0]].children[indexes[1]].children = [...dataCopy.children[indexes[0]].children[indexes[1]].childrenHide]
      dataCopy.children[indexes[0]].children[indexes[1]].childrenHide = false
      dataCopy.children[indexes[0]].children[indexes[1]].nodeProps = {}
      //dataCopy.num = //dataCopy.num + dataCopy.children[indexes[0]].children[indexes[1]].num
    } else if (dataCopy?.children[indexes[0]]?.children[indexes[1]]?.children && dataCopy.children[indexes[0]].children[indexes[1]].children.length) {
      dataCopy.children[indexes[0]].children[indexes[1]].childrenHide = [...dataCopy.children[indexes[0]].children[indexes[1]].children]
      dataCopy.children[indexes[0]].children[indexes[1]].children = []
      dataCopy.children[indexes[0]].children[indexes[1]].nodeProps = {style:{fill:'#d9560b',stroke: '#d9560b',strokeWidth: 0.7,fontSize: 16}}
      //dataCopy.num = //dataCopy.num - dataCopy.children[indexes[0]].children[indexes[1]].num
    }
  } else if (indexes.length == 3) {
    if (dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]]?.childrenHide) {
      dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children = [...dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].childrenHide]
      dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].childrenHide = false
      dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].nodeProps = {}
      //dataCopy.num = //dataCopy.num + dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].num
    } else if (dataCopy?.children[indexes[0]]?.children[indexes[1]]?.children[indexes[2]]?.children && dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children.length){
      dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].childrenHide = [...dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children]
      dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children = []
      dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].nodeProps = {style:{fill:'#d9560b',stroke: '#d9560b',strokeWidth: 0.7,fontSize: 16}}
      //dataCopy.num = //dataCopy.num - dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].num
    }
  } else if (indexes.length == 4) {
    if (dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]]?.childrenHide) {
      dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children = [...dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].childrenHide]
      dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].childrenHide = false
      dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].nodeProps = {}
      //dataCopy.num = //dataCopy.num + dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].num
    } else if (dataCopy?.children[indexes[0]]?.children[indexes[1]]?.children[indexes[2]]?.children[indexes[3]]?.children && dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children.length){
      dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].childrenHide = [...dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children]
      dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children = []
      dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].nodeProps = {style:{fill:'#d9560b',stroke: '#d9560b',strokeWidth: 0.7,fontSize: 16}}
      //dataCopy.num = //dataCopy.num - dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].num
    }
  } else if (indexes.length == 5) {
    if (dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]]?.childrenHide) {
      dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].children = [...dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].childrenHide]
      dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].childrenHide = false
      dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].nodeProps = {}
      //dataCopy.num = //dataCopy.num + dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].num
    } else if (dataCopy?.children[indexes[0]]?.children[indexes[1]]?.children[indexes[2]]?.children[indexes[3]]?.children[indexes[4]]?.children && dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].children.length){
      dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].childrenHide = [...dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].children]
      dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].children = []
      dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].nodeProps = {style:{fill:'#d9560b',stroke: '#d9560b',strokeWidth: 0.7,fontSize: 16}}
      //dataCopy.num = //dataCopy.num - dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].num
    }
  }
  setDataState({...dataCopy})
}

//MODAL function

export function onChooseEndNode({nodeKey,dataState,notification,setDataState,setDataSelected}) {

  let dataCopy = {...dataState};
  const [...indexes] = nodeKey.split('-');

  function alert(message) {
    notification.error({message,modal:true})
  }
  if (nodeKey === 'initial') {
    return alert('Selecione um cargo ou função.')
  } else if (indexes.length == 1) {
    if (dataCopy.children[indexes[0]].type == 'Cargo' || dataCopy.children[indexes[0]].type == "Função") {
      dataCopy.children[indexes[0]].nodeProps = {style:{fill:'#d9560b',stroke: '#d9560b',strokeWidth: 0.7,fontSize: 16}}
      setDataSelected(dataCopy.children[indexes[0]].id)
    } else return alert('Selecione um cargo ou função.')

    } else if (indexes.length == 2) {
    if (dataCopy.children[indexes[0]].children[indexes[1]].type == 'Cargo' || dataCopy.children[indexes[0]].children[indexes[1]].type == "Função") {
      dataCopy.children[indexes[0]].children[indexes[1]].nodeProps = {style:{fill:'#d9560b',stroke: '#d9560b',strokeWidth: 0.7,fontSize: 16}}
      const DATA = {
        cargoId:dataCopy.children[indexes[0]].children[indexes[1]].id,
        cargoText:dataCopy.children[indexes[0]].children[indexes[1]].text,
      }
      setDataSelected({...DATA})
    } else return alert('Selecione um cargo ou função.')

  } else if (indexes.length == 3) {
    if (dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].type == 'Cargo' || dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].type == "Função") {
      dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].nodeProps = {style:{fill:'#d9560b',stroke: '#d9560b',strokeWidth: 0.7,fontSize: 16}}
      const DATA = {
        cargoId:dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].id,
        cargoText:dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].text,
      }
      setDataSelected({...DATA})
    } else return alert('Selecione um cargo ou função.')

  } else if (indexes.length == 4) {
    if (dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].type == 'Cargo' || dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].type == "Função") {
      dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].nodeProps = {style:{fill:'#d9560b',stroke: '#d9560b',strokeWidth: 0.7,fontSize: 16}}
      const DATA = {
        cargoId:dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].id,
        cargoText:dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].text,
      }
      setDataSelected({...DATA})
    } else return alert('Selecione um cargo ou função.')

  } else if (indexes.length == 5) {
    if (dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].type == 'Cargo' || dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].type == "Função") {
      dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].nodeProps = {style:{fill:'#d9560b',stroke: '#d9560b',strokeWidth: 0.7,fontSize: 16}}
      const DATA = {
        cargoId:dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].id,
        cargoText:dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].text,
      }
      setDataSelected({...DATA})
    } else return alert('Selecione um cargo ou função.')

  } else if (indexes.length == 6) {
    if (dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].children[indexes[5]].type == 'Cargo' || dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].children[indexes[5]].type == "Função") {
      dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].children[indexes[5]].nodeProps = {style:{fill:'#d9560b',stroke: '#d9560b',strokeWidth: 0.7,fontSize: 16}}
      const DATA = {
        cargoId:dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].children[indexes[5]].id,
        cargoText:dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children[indexes[3]].children[indexes[4]].children[indexes[5]].text,
      }
      setDataSelected({...DATA})
    } else return alert('Selecione um cargo ou função.')

  }
  setDataState({...dataCopy})
}


export function onSave({setLoading,setSave,setData,data,workplaceId,currentUser,notification,dataInitial,onModalClick}) {
  function checkSuccess() {
    setLoading(false)
    setData(data=>({...data,org:{...dataInitial}}))
    if (onModalClick) onModalClick(setSave)
  }

  function checkError(error) {
    setSave(true)
    setLoading(false)
    setTimeout(() => {
      notification.error({message:error})
    }, 600);
  }
  setSave(false)
  setLoading(true)
  SetOrganograma(currentUser.company.id,data.cnpj,dataInitial,workplaceId,checkSuccess,checkError)
  //console.log(currentUser.company.id,data.cnpj,dataInitial)
}

// export function onGetOrganograma({starterData,data,currentUser,notification,dataInitial}) {
//   function checkSuccess(response) {
//     //setLoading(false)
//     starterData(response)
//   }

//   function checkError(error) {
//     //setLoading(false)
//     setTimeout(() => {
//       notification.error({message:error})
//     }, 600);
//   }
//   //setLoading(true)
//   GetOrganograma(currentUser.company.id,data.cnpj,checkSuccess,checkError)
//   //console.log(currentUser.company.id,data.cnpj,dataInitial)
// }
