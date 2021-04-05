import axios from 'axios';

export function GetCNPJ(cnpj,checkSuccess,checkError) {

    cnpj = cnpj.replace(/\D/g, '');

    axios.get(`http://localhost:3001/api/cnpj/${cnpj}`)
    .then(response => checkSuccess(response.data))
    .catch(error => checkError(typeof error === 'string' ? error : error?.message ? error.message : 'Erro ao consultar o servidor'))
}

/* export function GetCNPJe(cnpj,checkError) {
    // Limpa o CNPJ para conter somente numeros, removendo traços e pontos
    cnpj = cnpj.replace(/\D/g, '');

    // Consulta o CNPJ na ReceitaWS com 60 segundos de tempo limite
    return jsonp('https://www.receitaws.com.br/v1/cnpj/' + encodeURI(cnpj), 6000,checkError)
        .then((json) => {
            if (json['status'] === 'ERROR') {
                return Promise.reject(json['message']);
            } else {
                return Promise.resolve(json);
            }
        }).catch((err)=>{
            console.log(err)
        })
} */

/* function jsonp(url, timeout,checkError) {
    // Gera um nome aleatório para a função de callback
    const func = 'jsonp_' + Math.random().toString(36).substr(2, 5);

    return new Promise(function(resolve, reject) {
        // Cria um script
        let script = document.createElement('script');

        // Cria um timer para controlar o tempo limite
        let timer = setTimeout(() => {
            checkError('Tempo limite atingido')
            reject('Tempo limite atingido');
            document.body.removeChild(script);
        }, timeout);

        // Cria a função de callback
        window[func] = (json) => {
            clearTimeout(timer);
            resolve(json);
            document.body.removeChild(script);
            delete window[func];
        };

        // Adiciona o script na página para inicializar a solicitação
        script.src = url + '?callback=' + encodeURI(func);
        document.body.appendChild(script);
    });
} */

