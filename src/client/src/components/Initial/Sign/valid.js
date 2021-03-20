//Aqui verifica se email é valido, se for poe o ICON CHECK TRUE e se não for, coloca ICON CHECK FALSE -- aqui nao faz nada se vc sair do input (OUTRO FUNÇÃO)
export function handleEmailChange(val,data,setData,setUpdate,onClearTimeO) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( re.test(val.trim()) ) { 
        setData({
            ...data,
            emailAddress: val.trim(),
            warnMessage: {body:'',type:'none'}
        });
        setUpdate(Math.random())
    } else {
        setData({
            ...data,
            emailAddress: val.trim(),
            warnMessage: {body:'',type:'none'}
        });
        onClearTimeO()
    }  
}

//Aqui verifica se password é valido, se for poe o 'Valid Password' TRUE e se não for, coloca 'Valid Password' FALSE
export  const handlePasswordChange = (val,data,setData) => {
    if( val.trim().length < 6 && data.password.length < val.trim().length && data.warnPassMessage.type !== 'none') {
        setData({
            ...data,
            password: val.trim(),
        });
    } else if( val.trim().length >= 6) {
        setData({
            ...data,
            password: val.trim(),
            warnConfirmMessage: (data.confirmPassword === val.trim()) ? { body:'Senha válida',type:'check'} : { body:'As senha devem ser iguais.',type:'warn'},
            warnPassMessage: { body:'Senha válida',type:'check'}
        });
    } else {
        setData({
            ...data,
            password: val.trim(),
            warnPassMessage: { body:'Senha deve conter no mínimo 6 dígitos',type:'warn'},
            warnConfirmMessage: { body:'',type:'none'}
        });
    }
}

export const confirmHandlePasswordChange = (val,data,setData) => {
    
    let newData = {}
    
    if( val.trim().length < data.password.length && data.confirmPassword.length < val.trim().length && data.warnConfirmMessage.type === 'none' ) {
        newData =  {
            confirmPassword: val.trim(),
            warnConfirmMessage: {body:'Senha deve conter no mínimo 6 dígitos',type:'warn'}
        };
    } else if( data.password === val && data.warnPassMessage.type === 'check') {
        newData =  {
            confirmPassword: val.trim(),
            warnConfirmMessage: {body:'Senha válida',type:'check'}
        };
    } else {
        newData =  {
            confirmPassword: val.trim(),
            warnConfirmMessage: {body:'As senhas devem ser iguais',type:'warn'}
        };
    }

    setData({ ...data,...newData });
}

// Aqui ao sair do input ele verifica se ta certo e avisa se estiver errado
export function checkValidUser(val,data,setData,setError) {
    
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if ( re.test(val.trim()) ) {
        setData({
            ...data,
            warnMessage: {body:'Verificando endereço de email',type:'load'}
        });
        return true
    }
    else if (val.trim().length !== 0) {
        setData({
            ...data,
            warnMessage: {body:'Email inserido com formatação inválida',type:'warn'}
        });
        /* setError('Email inserido com formatação inválida') */
        return false
    } else {
        setData({
            ...data,
            warnMessage: {body:'Por favor, insira seu email para continuar',type:'warn'}
        });
        /* setError('Por favor, insira seu email para continuar') */
        return false
    }
}

export const checkPass = (data,setError) => {

    if (data.warnMessage.type === 'check' && data.warnPassMessage.type === 'check') return  true
    else if (data.password === '' || data.emailAddress ==="") {
        setError('Preencha todos os campos para se cadastrar.')
        return  false
    }
    else if (data.password.length < 6) {
        setError('Senha deve conter no mínimo 6 dígitos')
        return  false
    }
}

export const checkConfirmPass = (data,setError) => {

    if (data.warnPassMessage.type === 'check' && data.warnConfirmMessage.type === 'check' && data.warnMessage.type === 'check') return  true
    else if (data.password === '' || data.confirmPassword === '' || data.emailAddress === '') {
        setError('Preencha todos os campos para se cadastrar.')
        return  false
    }
    else if (data.password !== data.confirmPassword) {
        setError('As senhas devem ser iguais.')
        return  false
    }
    else if (data.password.length < 6) {
        setError('Senha deve conter no mínimo 6 dígitos')
        return  false
    }
}
