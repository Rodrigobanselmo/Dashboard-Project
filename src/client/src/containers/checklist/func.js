import {CreateNewChecklist,GetAllChecklist,GetChecklist,SaveChecklist,EditChecklist} from '../../services/firestoreChecklist'
import {GetAllRisks} from '../../services/firestoreRisks'
import {v4} from "uuid";
import faker from 'faker';

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

export function onGetAllChecklists(companyId,setAllChecklists,setLoadContent,setLoaderDash,notification) {
  function checkSuccess(response) {
      setLoadContent(false)
      setLoaderDash(false)
      setAllChecklists([...response])

    }

    function checkError(error) {
      setLoadContent(false)
      setLoaderDash(false)
      setTimeout(() => {
        notification.error({message:error})
      }, 600);
    }

    GetAllChecklist(companyId,checkSuccess,checkError)
}

export function onGetChecklist({currentUser,id: checklistId,setDataChecklist,setData,setLoad,notification}) {
    function checkSuccess(response) {
          setLoad(false)
        setDataChecklist({...response})
        setData([[{title:response.title,id:response.id}]])
      }

      function checkError(error) {
        setLoadContent(false)
        setTimeout(() => {
          notification.error({message:error,modal:true})
        }, 600);
      }

      GetChecklist(currentUser.company.id,checklistId,checkSuccess,checkError)
      setLoad(true)
}

export function onCreateChecklist({id,setAllChecklists,onSuccess,title,currentUser,setLoad,notification}) {
  const Checklist = {title,id,data:[]}
  function checkSuccess() {
    setTimeout(() => {setLoad(false)}, 600);
    onSuccess(Checklist)
    setAllChecklists(data=>[...data,{id,title}])
  }

  function checkError(error) {
    setLoadContent(false)
    setTimeout(() => {
      notification.error({message:error})
    }, 600);
  }

  CreateNewChecklist(id,title,currentUser.company.id,checkSuccess,checkError)
  setLoad(true)
}

export function onDuplicateChecklist({id,title,checklistData,onSuccess,currentUser,setLoad,notification}) {
  const Checklist = {...checklistData}
  function checkSuccess() {
    setTimeout(() => {setLoad(false)}, 600);
    onSuccess(Checklist)
  }

  function checkError(error) {
    setLoadContent(false)
    setTimeout(() => {
      notification.error({message:error,modal:true})
    }, 600);
  }

  //GetAllCompanies(currentUser.company.id,checkSuccess,checkError)
  setLoad(true)
  checkSuccess()
}

export function onDeleteChecklist({id,setAllChecklists,onSuccess,currentUser,setLoad,notification}) {

  function checkSuccess() {
    setTimeout(() => {setLoad(false)}, 600);
    onSuccess(id)
    setAllChecklists(data=>[...data.filter(i=>i.id!=id)])
  }

  function checkError(error) {
    setLoadContent(false)
    setTimeout(() => {
      notification.error({message:error,modal:true})
    }, 600);
  }

  //GetAllCompanies(currentUser.company.id,checkSuccess,checkError)
  setLoad(true)
  checkSuccess()
}

export function onEditChecklist({id,title,onSuccess,currentUser,setLoad,notification}) {

  function checkSuccess() {
    setTimeout(() => {setLoad(false)}, 600);
    onSuccess()
  }

  function checkError(error) {
    setLoad(false)
    setTimeout(() => {
      notification.error({message:error})
    }, 600);
  }

  EditChecklist(id,title,currentUser.company.id,checkSuccess,checkError)
  setLoad(true)
}

export function onSaveChecklistData({dataChecklist,setSave,setLoading,currentUser,notification}) {
    function checkSuccess() {
        setTimeout(() => {
          setLoading(false)
          notification.success({message:'Checklist salvo com sucesso!'})
        }, 900);
        setSave(false)
        console.log('dataChecklist save',dataChecklist)
      }

      function checkError(error) {
        setLoading(false)
        setTimeout(() => {
          notification.error({message:error})
        }, 600);
      }

      SaveChecklist(dataChecklist,currentUser.company.id,checkSuccess,checkError)
}

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
    dispatch({ type: 'CREATE_RISKS', payload: [...response.risks.sort(sort)] })
    dispatch({ type: 'CREATE_RISKS_DATA', payload: {...response.data} })
  }

    function checkError(error) {
      setLoadContent(false)
      setTimeout(() => {
        notification.error({message:error})
      }, 600);
    }

    GetAllRisks(currentUser.company.id,checkSuccess,checkError)
}
