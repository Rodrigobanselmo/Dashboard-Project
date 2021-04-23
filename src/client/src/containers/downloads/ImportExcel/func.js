import {ImportationRisks} from '../../../services/firestoreImportations'

export function onSetRisks(data,setLoad,currentUser,notification,dispatch) {
  const newRiskData = []
  const newRiskReduceData = []
  // const newRecData = []
  // const newMedData = []
  // const newFontData = []
  var error = false
  data.map((item)=>{

    const uid = Math.floor((1 + Math.random()) * 0x1000000000000000).toString(32).substring(1);
    // const uidRec = Math.floor((1 + Math.random()) * 0x1000000000000000).toString(32).substring(1);
    // const uidMed = Math.floor((1 + Math.random()) * 0x1000000000000000).toString(32).substring(1);
    // const uidFont = Math.floor((1 + Math.random()) * 0x1000000000000000).toString(32).substring(1);
    const type = item.tipo ? item.tipo.toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "").slice(0,3) :''

    // if (item.rec) {
    //   item.rec.split(' --- ').map((item)=>{
    //   })
    //   if (item?.med) newRecData.push({text:item.nome,id:uidRec,risk:[],category:[],med:uidMed})
    //   else newRecData.push({text:item.nome,id:uidRec,risk:[],category:[]})
    //   newMedData.push({name:item.nome,id:uid,type})
    // //{id:'12345',text:`${random()}`,risk:['123','2','3'],category:[]}
    // }

    if (type == 'aci' || type == 'erg') {
      if (item?.Grupo) {
        newRiskData.push({name:item.nome,id:uid,type,group:item.Grupo})
        newRiskReduceData.push({name:item.nome,id:uid,type,group:item.Grupo})
      } else {
        newRiskData.push({name:item.nome,id:uid,type,group:'Sem Grupo'})
        newRiskReduceData.push({name:item.nome,id:uid,type,group:'Sem Grupo'})
      }
    } else {
      newRiskData.push({name:item.nome,id:uid,type})
      newRiskReduceData.push({name:item.nome,id:uid,type})
    }

    //newFontData.push({name:item.nome,id:uid,type})
    if (!item.nome) error = true
    if (!item.tipo) error = true
  })
  if (error) return notification.modal({title: 'Erro na importação',text:'Verifique todos os campos obrigatórios da planilha, foi encontrado um dado nulo ou com formatação inválida',rightBnt:'Fechar',open:true})


  function checkSuccess(t) {
    if (t) {
      ImportationRisks(newRiskData,newRiskReduceData,currentUser.company.id,checkSuccess,checkError,t)
      console.log('again')
      return
    }
    setLoad(false)
    console.log('response')
      // dispatch({ type: 'CREATE_RISKS', payload: [...response.risks.sort(sort)] })
      // dispatch({ type: 'CREATE_RISKS_DATA', payload: {...response.data} })
    }

    function checkError(error) {
      setLoad(false)
      setTimeout(() => {
        notification.error({message:error,modal:false})
      }, 600);
    }

    setLoad(true)
    ImportationRisks(newRiskData,newRiskReduceData,currentUser.company.id,checkSuccess,checkError)
}
