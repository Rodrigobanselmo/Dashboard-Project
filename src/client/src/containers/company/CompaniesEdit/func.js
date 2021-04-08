import {GetCompany} from '../../../services/firestoreCompany'

export function onGetCompany({companyId,cnpj,setData,setLoadContent,notification,setLoaderDash}) {
    function checkSuccess(response) {
        setLoadContent(false)
        setData({...response})
        setLoaderDash(false)
        console.log('data',{...response});
      }

      function checkError(error) {
        setLoadContent(false)
        setTimeout(() => {
          notification.error({message:error,modal:false})
        }, 600);
      }

      GetCompany(companyId,cnpj,checkSuccess,checkError)
}
