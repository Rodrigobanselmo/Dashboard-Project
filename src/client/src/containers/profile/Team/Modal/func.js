import {CreatePendingUser,SeeIfUserExists} from '../../../../services/firestoreUser'
import {NodeSendInviteEmail} from '../../../../services/nodeCalls'


function onSendInviteEmail(data,onClose,setLoad,notification) {
  
  function checkSuccess() {
    onClose('Email enviado com sucesso')
    setLoad(false)
    notification.modal({
      title:'Usuário Adicionado',
      text:'Um email de autenticação foi enviado aos usuários para se tornarem membros de sua equipe.',
      type:'inform',
      rightBnt:'OK',
      open:true,
    })
      
  }

  function checkError(error) {
    setLoad(false)
    onClose()
    notification.modal({
      title:'Erro ao enviar email',
      text:'Não foi possivel enviar o email de convite aos usuários, informe-os que já para se cadastrarem na plataforma',
      type:'inform',
      rightBnt:'OK',
      open:true,
    })
    setTimeout(() => {notification.error({message:'Error ao enviar email'})}, 1000);
  }

  const emails = []

  data.array.map((item)=>{
    emails.push(item.email.trim())
  })

  const newData = {
    email:emails.join(' '),
    company:data.currentUser.company.name
  }

  NodeSendInviteEmail(newData,checkSuccess,checkError) 
}

export function onCreatePendingUser({dataToTreat,currentUser,notification,setLoad,onClose,setUsersRows}) {

  var data = {array:dataToTreat,currentUser}

  function checkSuccess(resp) {
    onSendInviteEmail(data,onClose,setLoad,notification)
    setUsersRows(row=>[...row,...resp])
  }

  function checkError(error) {
    setLoad(false)
    setTimeout(() => {
      notification.error({message:error,modal:true})
    }, 600);
  }


  CreatePendingUser(data,checkSuccess,checkError)

}

export function onCheckUser(value,companyId,index,setEmails,emails,notification) {
  
  let allEmails = [...emails]

    function checkSuccess(response) {
      if (response[1]) {
        allEmails[index] = {...allEmails[index],email:value, status:'Warn',message:'Email já cadastrado em uma empresa',type:''}
        setEmails(allEmails)
      } else if (response[0]) {
        allEmails[index] = {...allEmails[index],email:value, status:'Check',message:'Email válido',type:'',id:response[0]}
        setEmails(allEmails)
      } else {
        allEmails[index] = {...allEmails[index],email:value, status:'Check',message:'Email válido',type:''}
        setEmails(allEmails)
      }
    }
  
    function checkError(error) {
      notification.error({message:error,modal:true})
    }

    SeeIfUserExists(value,companyId,checkSuccess,checkError)

}

