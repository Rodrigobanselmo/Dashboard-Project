import {CreateNewEmployee} from '../../../../../../services/firestoreEmployee'

export function onCreateEmployee({data,setEmployee,notification,currentUser,setLoad,onClose}) {
  const uid = Math.floor((1 + Math.random()) * 0x1000000000000000).toString(32).substring(1);
  const ReduceData = {
    id:uid,
    cargoId:data.cargoId,
    cargoText:data.cargoText,
    cnpj:data.cnpj,
    creation:data.creation,
    end:data.end,
    name:data.name,
    status:data.status,
    workplaceId:data.workplaceId,
    workplaceName:data.workplaceName,
    companyName:data.companyName,
    companyIdent:data?.companyIdent,
    companyFan:data?.companyFan,
  }

  const DATA = {
    id:uid,
    cargoId:data.cargoId,
    cargoText:data.cargoText,
    cnpj:data.cnpj,
    cpf:data.cpf,
    creation:data.creation,
    end:data.end,
    name:data.name,
    status:data.status,
    workplaceId:data.workplaceId,
    workplaceName:data.workplaceName,
    companyName:data.companyName,
    companyIdent:data?.companyIdent,
    companyFan:data?.companyFan,
  }

  function checkSuccess() {
    setLoad(false)
    onClose('Dado Adicionado com sucesso!')
    setEmployee(setEmployee=>([...setEmployee,{...ReduceData}]))
  }

  function checkError(error) {
    setLoad(false)
    setTimeout(() => {
      notification.error({message:error,modal:true})
    }, 600);
  }
  setLoad(true)
  CreateNewEmployee(ReduceData,DATA,currentUser.company.id,data.cnpj,checkSuccess,checkError)
}

