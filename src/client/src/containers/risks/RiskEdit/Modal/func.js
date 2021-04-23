import {GetCNPJ} from '../../../../services/handleCNPJ'
import {CreateNewRiskData} from '../../../../services/firestoreRisks'
import {wordUpper,formatTel,formatCPFeCNPJeCEPeCNAE} from '../../../../helpers/StringHandle'

export function onCreateNewRiskData(companyId,notification,dispatch,setLoad,onClose) {

  function checkSuccess(resp) {
    setLoad(false)
    onClose('Dado Adicionado com sucesso!')
    //dispatch({ type: 'CREATE_RISKS_DATA', payload: {...response.data} })
  }

  function checkError(error) {
    setLoad(false)
    setTimeout(() => {
      notification.error({message:error,modal:true})
    }, 600);
  }
  setLoad(true)
  CreateNewCompany(companyId,data,checkSuccess,checkError)

}


