import {GetCNPJ} from '../../../../services/handleCNPJ'
import {SeeIfCNPJExists,CreateNewCompany} from '../../../../services/firestoreCompany'
import {wordUpper,formatTel,formatCPFeCNPJeCEPeCNAE} from '../../../../helpers/StringHandle' 

export function onCreateNewCompany({data,setDataRows,receitaFederal,currentUser,notification,setLoad,onClose}) {

  var companyData = {
    CNPJ:formatCPFeCNPJeCEPeCNAE(receitaFederal.cnpj),
    nome: wordUpper((receitaFederal.nome.trim()).split(" ")),
    fantasia: wordUpper((receitaFederal.fantasia.trim()).split(" ")),
    type: data.type,
    atv1:receitaFederal.atividade_principal,
    atv2:receitaFederal.atividades_secundarias.filter(i=>i.text !== ''),
    cep: formatCPFeCNPJeCEPeCNAE(receitaFederal.cep),
    city: receitaFederal.municipio,
    neighbor: receitaFederal.bairro,
    address: receitaFederal.logradouro,
    num: receitaFederal.numero,
    comp: receitaFederal.complemento,
    tel: formatTel(receitaFederal.telefone),
    email: receitaFederal.email,
    uf:receitaFederal.uf,
    cel: formatTel(receitaFederal.celular),
    responsavel:wordUpper((data.responsavel.trim()).split(" ")),
    fiscal:wordUpper((data.fiscal.trim()).split(" ")),
    fiscalCell:formatTel(data.fiscalCell),
    identificacao:wordUpper((data.identificacao.trim()).split(" ")),
    status:'Ativo',
    creation:(new Date() - 1),
    end:0,
    supervisor:data.supervisor.toLowerCase()
  }

  let name = wordUpper((data.identificacao.trim()).split(" "))
  if (!name) {
    name = wordUpper((receitaFederal.fantasia.trim()).split(" "))
  }
  if (!name) {
    name = wordUpper((receitaFederal.nome.trim()).split(" "))
  }

  var readData = {
    CNPJ:formatCPFeCNPJeCEPeCNAE(receitaFederal.cnpj),
    name: name,
    responsavel:wordUpper((data.responsavel.trim()).split(" ")),
    status:'Ativo',
    creation:(new Date() - 1),
    end:0,
  }

  function checkSuccess(resp) {
    setLoad(false)
    onClose('Empresa Adicionada com sucesso!')
    setDataRows(data=>[...data,resp])
  }

  function checkError(error) {
    setLoad(false)
    setTimeout(() => {
      notification.error({message:error,modal:true})
    }, 600);
  }


  CreateNewCompany(companyData,readData,currentUser.company.id,checkSuccess,checkError)

}

export function onCheckCNPJExists(value,companyId,setData,notification){

    function checkSuccess(response) {
      if (response) {
        setData(data=>({...data,CNPJ:value, status:'Warn',message:'CNPJ já cadastrado'}))
      } else {
        setData(data=>({...data,CNPJ:value, status:'Check',message:'CNPJ válido'}))
      }
    }
  
    function checkError(error) {
      notification.error({message:error,modal:true})
      setData(data=>({...data,CNPJ:value, status:'Warn',message:error}))
    }

    SeeIfCNPJExists(formatCPFeCNPJeCEPeCNAE(value),companyId,checkSuccess,checkError)
}

export function onGetCNPJ(value,setData,notification,setReceitaFederal,setPosition,setLoad){

  function checkSuccess(response) {
    if (response?.message === "Request failed with status code 429") {
      notification.modal({
        title:'Erro ao consultar CNPJ',
        text:'A consulta de CNPJ foi bloqueada por 1 minuto devido ao número de requisições maior que o permitido, tente novamente após esse período',
        type:'inform',
        rightBnt:'OK',
        open:true,
      })
      setLoad(false)
    } else {
      setReceitaFederal(data=>({...data,...response}))
      setPosition(position=>position+1)
      setLoad(false)
    }
  }

  function checkError(error) {
    notification.error({message:error,modal:true})
    setData(data=>({...data,CNPJ:value, status:'Warn',message:error}))
    setLoad(false)
  }

    GetCNPJ(value,checkSuccess,checkError)
}

