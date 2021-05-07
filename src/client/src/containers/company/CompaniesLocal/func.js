import {GetCompany} from '../../../services/firestoreCompany'

export function onGetCompany({companyId,setDataRows,cnpj,setData,setLoadContent,notification,setLoaderDash}) {
    function checkSuccess(response) {
        setLoadContent(false)
        setData({...response})
        if (response?.workplace) setDataRows([...response.workplace])
        setLoaderDash(false)
      }

      function checkError(error) {
        setLoadContent(false)
        setTimeout(() => {
          notification.error({message:error,modal:false})
        }, 600);
      }

      GetCompany(companyId,cnpj,checkSuccess,checkError)
}
