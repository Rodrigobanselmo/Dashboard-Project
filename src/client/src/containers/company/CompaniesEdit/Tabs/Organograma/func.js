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
                                    children: [],
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


    if (nodeKey === 'initial') {
      if (dataInitial) {
        dataCopy.children.push({
          name: `${dataInitial.children.length}`,
          type: type,
          text: title,
          children: []
        })
     // console.log(dataInitial.children.length);
    } else if (dataCopy?.childrenHide) {
        dataCopy.childrenHide.push({
          name: `${dataCopy.childrenHide.length}`,
          text: title,
          type: type,
          children: []
        })
      } else {
        dataCopy.children.push({
          name: `${dataCopy.children.length}`,
          text: title,
          type: type,
          children: []
        })
      }
    } else if (indexes.length == 1) {
      if (dataInitial) {
        const index1 = dataCopy.children.findIndex(i=>i.name == indexes[0])
        dataCopy.children[index1].children.push({
          name: `${indexes[0]}-${dataInitial.children[indexes[0]].children.length-1}`,
          type: type,
          text: title,
          children: []
        })
        //console.log(`${dataInitial.children[indexes[0]].children.length}`);
      } else if (dataCopy.children[indexes[0]]?.childrenHide) {
        dataCopy.children[indexes[0]].childrenHide.push({
          name: `${indexes[0]}-${dataCopy.children[indexes[0]].childrenHide.length}`,
          type: type,
          text: title,
          children: []
        })
      } else {
        dataCopy.children[indexes[0]].children.push({
          type: type,
          text: title,
          children: []
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
          children: []
        })
      } else if (dataCopy.children[indexes[0]].children[indexes[1]]?.childrenHide) {
        dataCopy.children[indexes[0]].children[indexes[1]].childrenHide.push({
          name: `${indexes[0]}-${indexes[1]}-${dataCopy.children[indexes[0]].children[indexes[1]].childrenHide.length}`,
          text: title,
          num:0,
          type: type,
          children: []
        })
      } else {
        dataCopy.children[indexes[0]].children[indexes[1]].children.push({
          name: `${indexes[0]}-${indexes[1]}-${dataCopy.children[indexes[0]].children[indexes[1]].children.length}`,
          text: title,
          type: type,
          children: []
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
          children: []
        })
      } else if (dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]]?.childrenHide) {
        dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].childrenHide.push({
          name: `${indexes[0]}-${indexes[1]}-${indexes[2]}-${dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].childrenHide.length}`,
          text: title,
          type: type,
          children: []
        })
      } else {
        dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children.push({
          name: `${indexes[0]}-${indexes[1]}-${indexes[2]}-${dataCopy.children[indexes[0]].children[indexes[1]].children[indexes[2]].children.length}`,
          text: title,
          type: type,
          children: []
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
  }
  setDataState({...dataCopy})
}

export function onSave({setLoading,setSave,setData,data,currentUser,notification,dataInitial}) {
  function checkSuccess(response) {
    setLoading(false)
    setData(data=>({...data,org:{...dataInitial}}))
  }

  function checkError(error) {
    setSave(true)
    setLoading(false)
    setTimeout(() => {
      notification.error({message:error,modal:true})
    }, 600);
  }
  setSave(false)
  setLoading(true)
  SetOrganograma(currentUser.company.id,data.cnpj,dataInitial,checkSuccess,checkError)
  //console.log(currentUser.company.id,data.cnpj,dataInitial)
}
