import {ImportationChemRisks} from '../../../services/firestoreImportations'

export function onSetChemicalRisks(data,setLoad,currentUser,notification,dispatch) {
  const newData = []
  console.log(data)
  data.map((item)=>{
    const uid = Math.floor((1 + Math.random()) * 0x10000000000000).toString(16).substring(1);
    newData.push({name:item.Agente,id:uid,type:'qui'})
  })

  function checkSuccess(response) {
    setLoad(false)
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
    ImportationChemRisks(newData,currentUser.company.id,checkSuccess,checkError)
}
