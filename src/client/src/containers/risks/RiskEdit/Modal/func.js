import {CreateNewRiskData,DeleteRiskData,EditRiskData} from '../../../../services/firestoreRisks'

export function onCreateNewRiskData({companyId,data,notification,dispatch,setLoad,onClose}) {

  function checkSuccess(resp) {
    setLoad(false)
    onClose('Dado Adicionado com sucesso!')
    console.log('resp',resp)
    dispatch({ type: 'ADD_RISKS_DATA', payload: [...resp] })
  }

  function checkError(error) {
    setLoad(false)
    setTimeout(() => {
      notification.error({message:error,modal:true})
    }, 600);
  }
  setLoad(true)
  CreateNewRiskData(companyId,data,checkSuccess,checkError)

}

export function onEditRiskData({data,companyId,notification,dispatch,setLoad,onClose}) {

  function checkSuccess() {
    setLoad(false)
    onClose('Dado modificado com sucesso!')
    dispatch({ type: 'EDIT_RISKS_DATA', payload: {...data} })
  }

  function checkError(error) {
    setLoad(false)
    setTimeout(() => {
      notification.error({message:error,modal:true})
    }, 600);
  }
  setLoad(true)
  EditRiskData(companyId,data,checkSuccess,checkError)

}

export function onDeleteRiskData({data,companyId,notification,dispatch,setLoad,onClose}) {

  function checkSuccess() {
    setLoad(false)
    onClose('Dado removido com sucesso!')
    dispatch({ type: 'REMOVE_RISKS_DATA', payload: data.id })
  }

  function checkError(error) {
    setLoad(false)
    setTimeout(() => {
      notification.error({message:error,modal:true})
    }, 600);
  }
  setLoad(true)
  DeleteRiskData(companyId,data,checkSuccess,checkError)

}


