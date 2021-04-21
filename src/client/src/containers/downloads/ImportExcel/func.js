//import {GetCompany} from '../../../services/firestoreCompany'
//import {GetAllCompanies} from '../../../../../services/firestoreCompany'

export function onSetChemicalRisks(data,setLoad,currentUser,notification,dispatch) {
  function checkSuccess(response) {
    setLoad(false)
      dispatch({ type: 'ROUTE', payload: response })
    }

    function checkError(error) {
      setLoad(false)
      setTimeout(() => {
        notification.error({message:error,modal:false})
      }, 600);
    }

    setLoad(true)
    //GetCompany(currentUser.company.id,riskId,checkSuccess,checkError)
}
