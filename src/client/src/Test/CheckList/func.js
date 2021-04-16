import {GetAllCompanies} from '../../services/firestoreCompany'
import {v4} from "uuid";
import faker from 'faker';

const createRow = () => ({
  CNPJ: `${Math.random()*1000000000000000}`,
  creation: 1614528749269,
  end: 0,
  name: `${Math.random()*1000000000000000}`,
  responsavel: `${Math.random()*1000000000000000}`,
  status: 'Ativo',
});

const createData = (qty = 3) => {
  let data = [];

  for (let i = 0; i < qty; i++) {
    const row = createRow();
    data.push(row);
  }

  return data;
};


const Check = {title:"PGR",id:'1',company:'cnpj',worker:{cargo:'',setor:'',cargoDev:'',setorDev:''},data:[
  {group:'Limpeza e organização do local de trabalho',id:'gasyduuyg',groups:['Limpeza','Organizacional','EPI'],questions:[
    {type:'standard',action:{q_1:{id:'q_1',text:'SIM',jump:{q:['1.3s'],g:['Limpeza']},data:[{risk:'123',rec:['12345','wiw'],fonteG:'',medCont:'',man:true}]},q_2:{id:'q_2',text:'NÃO',data:[]},q_3:{id:'q_3',text:'N.A.',data:[]}},photo:true,text:'As saídas de emergência estão bem sinalizadas, são mantidas destrancadas e o acesso a elas não está impedido por obstáculos??',id:'1.2s',group:'Limpeza',mother:true},
    {action:{q_1:{id:'q_1',jump:['1.3s'],text:'SIM',data:[{risk:'123',rec:['12345','wiw'],fonteG:'',medCont:'',man:true}]},q_2:{id:'q_2',text:'NÃO',data:[]},q_3:{id:'q_3',text:'N.A.',data:[]}},text:'adequado?',id:'1.3s',group:'Limpeza'},
    {action:{q_1:{id:'q_1',text:'SIM',data:[{risk:'123',rec:['12345','wiw'],fonteG:'',medCont:'',man:true}]},q_2:{id:'q_2',text:'NÃO',data:[]},q_3:{id:'q_3',text:'N.A.',data:[]}},text:'traçados?',id:v4(),group:'Organizacional'},
    {action:{q_1:{id:'q_1',text:'SIM',data:[]},q_2:{id:'q_2',text:'NÃO',data:[]},q_3:{id:'q_3',text:'N.A.',data:[]}},text:'As saídas de emergência estão bem sinalizadas, são mantidas destrancadas e o acesso a elas não está impedido por obstáculos?',id:v4(),group:'Organizacional'},
    {action:{yes:{rec:''},no:{child:'1.1.1'},na:0},text:'',id:'1.1',group:'Organizacional'},
    {action:{yes:{rec:''},no:{child:'1.1.2'},na:0},hide:true,parent:'1.1',text:'',id:'1.1.1',group:'EPI'},
    {action:{yes:{risk:'1'},no:0,na:0},hide:true,parent:'1.1.1',text:'',id:'1.1.2',group:'EPI'},
  ]},
  {group:'Ruído',id:'2.0',groups:['EPI'],questions:[
    {action:{yes:{rec:''},no:{child:'2.1.1'},na:0},text:'As saídas de emergência estão bem sinalizadas, são mantidas destrancadas e o acesso a elas não está impedido por obstáculos .',id:'2.1',group:'EPI'},
    {action:{yes:{risk:'2'},no:0,na:0},parent:'2.1',text:'As saídas de emergência estão bem sinalizadas, são mantidas destrancadas e o acesso a elas não está impedido por obstáculos .',id:'2.1.1',group:'EPI'},
    {action:{yes:0,no:0,na:0},text:'Os trabalhadores, que lidam com substância químicas perigosas, recebem treinamento quanto aos riscos que estas substâncias representaram para a saúde e quanto às formas seguras de manipulação.',id:'2.2',group:'EPI'},
    {action:{yes:0,no:0,na:0},text:'São utilizadas listas adequadas para a realização das inspeções.',id:'2.3',group:'EPI'},
    {action:{yes:0,no:0,na:0},text:'São utilizadas listas adequadas para a realização das inspeções.',id:v4(),group:'EPI'},
    {action:{yes:0,no:0,na:0},text:'São utilizadas listas adequadas para a realização das inspeções.',id:v4(),group:'EPI'},
  ]},
]}
const Check1 = {title:"PGR",id:'1',company:'cnpj',worker:{cargo:'',setor:'',cargoDev:'',setorDev:''},data:[
  {group:'Limpeza e organização do local de trabalho',id:'1.0',groups:['Limpeza','Organizacional','EPI'],questions:[
    {action:{yes:{risk:['8b5cb64b-c5f5-406e-b06f-1ee19e1be34c','00d0fc0e-1543-428f-a405-9f7e46e80666']},no:0,na:0},text:'As seções (Setores/Áreas/Departamentos) e os processos estão localizados de forma a facilitar o trabalho?',id:'1.2',group:'Limpeza'},
    {action:{yes:{risk:['02c569a8-c8f8-47fc-9196-4dd48e7af63b','2180bdbb-189f-4acb-be14-752504d665d4','e612ad98-82f4-49e8-9d77-609d3f679af4']},no:0,na:0},text:'O espaço entre as máquinas é adequado?',id:'1.3',group:'Limpeza'},
    {action:{yes:{risk:['e612ad98-82f4-49e8-9d77-609d3f679af4']},no:0,na:0},text:'A ordem e arrumação são mantidas conforme os planos traçados?',id:v4(),group:'Organizacional'},
    {action:{yes:{risk:['80a73b57-ea8d-4502-a04e-fdea9c4ffbbc']},no:0,na:0},text:'As saídas de emergência estão bem sinalizadas, são mantidas destrancadas e o acesso a elas não está impedido por obstáculos?',id:v4(),group:'Organizacional'},
    {action:{yes:{rec:''},no:{child:'1.1.1'},na:0},text:'',id:'1.1',group:'Organizacional'},
    {action:{yes:{rec:''},no:{child:'1.1.2'},na:0},hide:true,parent:'1.1',text:'',id:'1.1.1',group:'EPI'},
    {action:{yes:{risk:'1'},no:0,na:0},hide:true,parent:'1.1.1',text:'',id:'1.1.2',group:'EPI'},
  ]},
  {group:'Ruído',id:'2.0',groups:['EPI'],questions:[
    {action:{yes:{rec:''},no:{child:'2.1.1'},na:0},text:'As saídas de emergência estão bem sinalizadas, são mantidas destrancadas e o acesso a elas não está impedido por obstáculos .',id:'2.1',group:'EPI'},
    {action:{yes:{risk:'2'},no:0,na:0},parent:'2.1',text:'As saídas de emergência estão bem sinalizadas, são mantidas destrancadas e o acesso a elas não está impedido por obstáculos .',id:'2.1.1',group:'EPI'},
    {action:{yes:0,no:0,na:0},text:'Os trabalhadores, que lidam com substância químicas perigosas, recebem treinamento quanto aos riscos que estas substâncias representaram para a saúde e quanto às formas seguras de manipulação.',id:'2.2',group:'EPI'},
    {action:{yes:0,no:0,na:0},text:'São utilizadas listas adequadas para a realização das inspeções.',id:'2.3',group:'EPI'},
    {action:{yes:0,no:0,na:0},text:'São utilizadas listas adequadas para a realização das inspeções.',id:v4(),group:'EPI'},
    {action:{yes:0,no:0,na:0},text:'São utilizadas listas adequadas para a realização das inspeções.',id:v4(),group:'EPI'},
  ]},
]}
const Check2 = {title:"Porte",id:'23eqwewq',data:[

]}

export function onGetChecklist({currentUser,id: checklistId,setDataChecklist,setData,setLoad,notification}) {
    function checkSuccess(response) {
        setTimeout(() => {
          setLoad(false)
        }, 600);
        const checklist = checklistId !=1?Check2:response

        setDataChecklist(checklist)
        setData([[{title:checklist.title,id:checklist.id}]])
      }

      function checkError(error) {
        setLoadContent(false)
        setTimeout(() => {
          notification.error({message:error,modal:true})
        }, 600);
      }

      //GetAllCompanies(currentUser.company.id,checkSuccess,checkError)
      setLoad(true)
      checkSuccess(Check)
}

export function onCreateChecklist({id,setAllChecklists,onSuccess,title,currentUser,setLoad,notification}) {
    function checkSuccess(response) {
        setTimeout(() => {
          setLoad(false)
        }, 600);
        onSuccess()
        setAllChecklists(data=>[...data,{id:response.id,title}])
      }

      function checkError(error) {
        setLoadContent(false)
        setTimeout(() => {
          notification.error({message:error,modal:true})
        }, 600);
      }

      //GetAllCompanies(currentUser.company.id,checkSuccess,checkError)
      setLoad(true)
      checkSuccess({id})
}

export function onSaveChecklistData({dataChecklist,setSave,setLoading,currentUser,notification}) {
    function checkSuccess() {
        setTimeout(() => {
          setLoading(false)
        }, 1500);
        setSave(false)
      }

      function checkError(error) {
        setLoadContent(false)
        setTimeout(() => {
          notification.error({message:error,modal:true})
        }, 600);
      }

      //GetAllCompanies(currentUser.company.id,checkSuccess,checkError)
      checkSuccess()
}

function random() {
    return `${faker.random.words()} ${faker.random.words()} ${faker.random.words()} ${faker.random.words()} ${faker.random.words()}`
}

const types = ['fis','qui','bio','aci','erg','qui','qui','qui','qui','qui','qui']
const risks = [
  {id:'123',name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},
  {id:'2',name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},
  {id:'3',name:random(),type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},
  {id:'4',name:faker.random.words() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},
  {id:'5',name:faker.random.words() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},
  {id:'6',name:faker.random.words() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},{id:v4(),name:random() ,type:types[Math.floor(Math.random()*10)]},
]

const rec = [
  {id:'12345',text:random(),risk:['123','2','3'],category:[]},{id:v4(),text:random(),risk:['123','2','3'],category:[]},{id:v4(),text:random(),risk:['123','2','3'],category:[]},{id:v4(),text:random(),risk:['123','2','3'],category:[]},{id:v4(),text:random(),risk:['123','2','3'],category:[]},
  {id:'wiw',text:random(),category:['aci']},
  {id:v4(),text:random(),category:['qui','fis']},
  {id:v4(),text:random(),category:['aci']},
]
const med = [
  {id:v4(),text:random(),risk:['123','2','3'],category:[]},{id:v4(),text:random(),risk:['123','2','3'],category:[]},{id:v4(),text:random(),risk:['123','2','3'],category:[]},{id:v4(),text:random(),risk:['123','2','3'],category:[]},{id:v4(),text:random(),risk:['123','2','3'],category:[]},
  {id:v4(),text:random(),risk:['6'],category:[]},
  {id:v4(),text:random(),risk:[],category:['qui','fis']},
  {id:v4(),text:random(),risk:[],category:['qui']},
]
const font = [
  {id:v4(),text:random(),risk:['123','2','3'],category:[]},{id:v4(),text:random(),risk:['123','2','3'],category:[]},{id:v4(),text:random(),risk:['123','2','3'],category:[]},{id:v4(),text:random(),risk:['123','2','3'],category:[]},{id:v4(),text:random(),risk:['123','2','3'],category:[]},
  {id:v4(),text:random(),risk:[],category:['qui']},
  {id:v4(),text:random(),risk:[],category:['qui','fis']},
  {id:v4(),text:random(),risk:['3'],category:[]},
]
const sort = function (a, b) {
  if (a.name > b.name) {
      return 1;
  }
  if (b.name > a.name) {
      return -1;
  }
  return 0;
};

export function onGetRisks({currentUser,notification,dispatch}) {
  function checkSuccess(response) {
    console.log({...response})
    dispatch({ type: 'CREATE_RISKS', payload: [...response.risks.sort(sort)] })
    dispatch({ type: 'CREATE_RISKS_DATA', payload: {...response.data} })
  }

    function checkError(error) {
      setLoadContent(false)
      setTimeout(() => {
        notification.error({message:error,modal:true})
      }, 600);
    }

    //GetAllCompanies(currentUser.company.id,checkSuccess,checkError)
    checkSuccess({risks,data:{rec,med,font}})
}
