import {GetAllUsersCompany} from '../../../../services/firestoreUser'

export function onGetAllUsersCompany(companyId,setUsersRows,setLoadContent,notification,setLoaderDash) {
    function checkSuccess(response) {
        setLoadContent(false)
        setUsersRows([...response])
        setLoaderDash(false)
        console.log(response)
      }

      function checkError(error) {
        setLoadContent(false)
        setTimeout(() => {
          notification.error({message:error,modal:true})
        }, 600);
        setLoaderDash(false)
      }

    GetAllUsersCompany(companyId,checkSuccess,checkError)
}
