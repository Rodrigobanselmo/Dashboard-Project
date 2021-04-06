import {GetAllCompanies} from '../../../services/firestoreCompany'

const createRow = () => ({
  desc: `${Math.random()*1000000000000000}`,
  type:`${Math.random()*1000000000000000}`,
  padrao: 'Sim',
  status: 'Ativo',
  id: `${Math.random()*1000000000000000}`,
});
const Row1 = ({
  desc: `Ruído Continui/intermitente`,
  ins: `Anexo 1/Limite 85 dB`,
  per: `wfiubfwuh ifhu ifehihufewui e fhuwi ehefuwh uifew huf ehfueiwfiuehw fweihuihewu fufhew efw`,
  // inss: `${Math.random()*1000000000000000}`,
  type:'fis',
  padrao: 'Sim',
  status: 'Ativo',
  id: `${Math.random()*1000000000000000}`,
});
const Row2 = ({
  desc: `Radiações Ionizantes`,
  type:'fis',
  per: `wfiubfwuhifhuifehihufewui efhuwiehefuwhuifew hufiehfueiwfiuehw fweihuihewufufhew efw`,
  padrao: 'Sim',
  status: 'Ativo',
  id: `${Math.random()*1000000000000000}`,
});
const Row3 = ({
  desc: `wfi ubf wuh ifhu ifehihuf ewui e fhuwi ehefuwh uifew huf ehfueiwfiu ehw fweihuihe wu fufhew efw`,
  type:'fis',
  padrao: 'Sim',
  status: 'Ativo',
  id: `${Math.random()*1000000000000000}`,
});

const createData = (qty = 10) => {
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
        setDataRows([Row1,Row2,Row3,...createData()])

      }

      function checkError(error) {
        setLoadContent(false)
        setTimeout(() => {
          notification.error({message:error,modal:true})
        }, 600);
      }

     // GetAllCompanies(companyId,checkSuccess,checkError)
     checkSuccess()
}
