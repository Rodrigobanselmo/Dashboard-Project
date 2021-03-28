import {GetCompanie} from '../../../services/firestoreCompany'

export function onGetCompanie({companyId,cnpj,setData,setLoadContent,notification}) {
    function checkSuccess(response) {
        setLoadContent(false)
        setData({...response})
        console.log('data',{...response});
      }

      function checkError(error) {
        setLoadContent(false)
        setTimeout(() => {
          notification.error({message:error,modal:false})
        }, 600);
      }

      GetCompanie(companyId,cnpj,checkSuccess,checkError)
}
