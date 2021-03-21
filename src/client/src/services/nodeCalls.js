import axios from 'axios';

//const LOCAL = 'http://simplesst/api/nodemailer.com.br'
const LOCAL = 'http://localhost:3001/api/nodemailer'

const errorCatch = (error) => {

    let errorMessage = error

    if (error.code === 'storage/unknown') {
      errorMessage = 'Ocorreu um erro desconhecido.'
    }
    else {
      errorMessage = error.message
    }

    console.log('error',error)
    console.log('error code',error.code)

    return errorMessage
  }

export function NodeSendInviteEmail(data,checkSuccess,checkError) {

    const EMAIL = data.email
    const COMPANY = data.company

    let dataInfo = {
        to: EMAIL,
        subject:`Convite de participaçao da equipe ${COMPANY}`,
        html: `<p><b>Seja Ben-vindo</b> a SimpleSST, um lugar que simplifica como você trabalha! <br/>
        Link de acesso para entrar entra como membro da equipe da emrpesa ${COMPANY} <a href="http://localhost:5000/acesso?email=${EMAIL}">http://localhost:5000/acesso</a></p>
        <p>Qualquer dúvida, entre em contato./p>`
    }

    console.log('dataInfo',dataInfo)
    console.log('data',data)

    axios.post('/api/mail/invite-members',dataInfo).then(res=>{
        console.log(res)
        checkSuccess(res)
    }).catch((error)=>{
        console.log('error',error)
        checkError(error)
    })
}
