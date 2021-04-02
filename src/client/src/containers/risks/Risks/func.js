import {GetAllCompanies} from '../../../services/firestoreCompany'

export function onGetAllCompanies(companyId,setDataRows,setLoadContent,notification) {
    function checkSuccess(response) {
        setLoadContent(false)
        setDataRows([...response])

      }

      function checkError(error) {
        setLoadContent(false)
        setTimeout(() => {
          notification.error({message:error,modal:true})
        }, 600);
      }

      GetAllCompanies(companyId,checkSuccess,checkError)
}
