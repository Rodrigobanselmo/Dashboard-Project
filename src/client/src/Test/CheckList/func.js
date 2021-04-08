import {GetAllCompanies} from '../../services/firestoreCompany'

const createRow = () => ({
  CNPJ: `${Math.random()*1000000000000000}`,
  creation: 1614528749269,
  end: 0,
  name: `${Math.random()*1000000000000000}`,
  responsavel: `${Math.random()*1000000000000000}`,
  status: 'Ativo',
});

const createData = (qty = 3) => {
  let data = [];

  for (let i = 0; i < qty; i++) {
    const row = createRow();
    data.push(row);
  }

  return data;
};
export function onGetAllCompanies(companyId,setDataRows,setLoadContent,notification) {
    function checkSuccess(response) {
        setLoadContent(false)
        setDataRows([...createData()])

      }

      function checkError(error) {
        setLoadContent(false)
        setTimeout(() => {
          notification.error({message:error,modal:true})
        }, 600);
      }

      GetAllCompanies(companyId,checkSuccess,checkError)
}
