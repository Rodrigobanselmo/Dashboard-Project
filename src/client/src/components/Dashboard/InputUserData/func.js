import {AddUserData} from '../../../services/firestoreUser'
import {wordUpper} from '../../../helpers/StringHandle' 

export function onAddUserData({data,currentUser,setCurrentUser,setLoad,notification}) {

    let formattedData = {}
    data.map((item,index)=>{
        if(index===0) formattedData.name=item.data.trim()
        else if(index===1) formattedData.name=wordUpper((formattedData.name.trim() + ' ' + item.data.trim()).split(" "))
        else if(index===2) formattedData.info={CPF:item.data}
        else {
            let obj = {}
            obj[item.name] = item.data
            formattedData.info={...formattedData.info,...obj}
        }
    })
    setLoad(true)
    AddUserData(formattedData,currentUser.uid,checkSuccess,checkError)
    
    function checkSuccess() {
        setCurrentUser(currentUser=>({...currentUser,...formattedData}))
        setTimeout(() => {
            setLoad(false)
            notification.success({message:'Usuário criado com sucesso'})
        }, 1000);
    }

    function checkError(error) {
        setLoad(false)
        setTimeout(() => {
            notification.error({message:error})
        }, 1000);
    }

}