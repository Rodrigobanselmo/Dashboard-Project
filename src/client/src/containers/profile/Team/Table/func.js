import {GetAllUsersCompany} from '../../../../services/firestoreUser'

export function onGetAllUsersCompany(companyId,setUsersRows,setLoadContent,notification) {
    function checkSuccess(response) {
        setLoadContent(false)
        setUsersRows([...response])
          
      }
    
      function checkError(error) {
        setLoadContent(false)
        setTimeout(() => {
          notification.error({message:error,modal:true})
        }, 600);
      }

    GetAllUsersCompany(companyId,checkSuccess,checkError)
}