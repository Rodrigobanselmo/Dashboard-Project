
import {LogOut} from '../../../services/firebaseAuth'

export function onLogout({setLoad,notification}) {

    setLoad(true)
    LogOut(checkSuccess,checkError)
    
    function checkSuccess() {
        setLoad(false)
        setTimeout(() => {
            notification.success({message:'Usuário deslogado com sucesso'})
        }, 1000);
    }

    function checkError(error) {
        setLoad(false)
        setTimeout(() => {
            notification.error({message:error})
        }, 1000);
    }

}