import {GetCompanyWorkplace,GetEmployee} from '../../../services/firestoreCompany'

export function onGetCompanyWorkplace({companyId,workplaceId,cnpj,setData,setEmployee,setLoadContent,notification,setLoaderDash}) {
    function checkSuccess(response) {
        onGetEmployee({setEmployee,companyId,cnpj,setLoadContent,notification,setLoaderDash})
        setData({...response})
      }

      function checkError(error) {
        setLoadContent(false)
        setLoaderDash(false)
        setTimeout(() => {
          notification.error({message:error,modal:false})
        }, 600);
      }

      GetCompanyWorkplace(companyId,cnpj,workplaceId,checkSuccess,checkError)
}

export function onGetEmployee({companyId,cnpj,setEmployee,setLoadContent,notification,setLoaderDash}) {
  function checkSuccess(response) {
      setLoadContent(false)
      setEmployee([...response])
      setLoaderDash(false)
    }

    function checkError(error) {
      setLoadContent(false)
      setTimeout(() => {
        notification.error({message:error,modal:false})
      }, 600);
    }

    GetEmployee(companyId,cnpj,checkSuccess,checkError)
}
