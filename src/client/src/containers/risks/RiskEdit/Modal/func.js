import {GetCNPJ} from '../../../../services/handleCNPJ'
import {SeeIfCNPJExists,CreateNewCompany} from '../../../../services/firestoreCompany'
import {wordUpper,formatTel,formatCPFeCNPJeCEPeCNAE} from '../../../../helpers/StringHandle'

export function onCreateNewCompany({data,setDataRows,receitaFederal,currentUser,notification,setLoad,onClose}) {

  function checkSuccess(resp) {
    setLoad(false)
    onClose('Empresa Adicionada com sucesso!')
    setDataRows(data=>[...data,resp])
  }

  function checkError(error) {
    setLoad(false)
    setTimeout(() => {
      notification.error({message:error,modal:true})
    }, 600);
  }

  CreateNewCompany(companyData,readData,currentUser.company.id,checkSuccess,checkError)

}


