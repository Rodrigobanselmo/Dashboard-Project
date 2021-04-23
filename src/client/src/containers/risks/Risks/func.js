import {GetAllRisks} from '../../../services/firestoreRisks'

export function onGetAllRisksAndGroups(companyId,setDataRows,setLoadContent,notification,setLoaderDash) {
  function checkSuccess(response) {
      setLoadContent(false)
      //setDataRows([Row1,Row2,Row3,...createData()])
      setDataRows([...response])
      setLoaderDash(false)
    }

    function checkError(error) {
      setLoadContent(false)
      setTimeout(() => {
        notification.error({message:error,modal:true})
      }, 600);
      setLoaderDash(false)
    }

    GetAllRisks(companyId,checkSuccess,checkError)
    // setTimeout(() => { checkSuccess()}, 600);
}

// const createRow = () => ({
//   name: `${Math.random()*1000000000000000}`,
//   type:`aci`,
//   padrao: 'Sim',
// /*   ins: `Anexo 11/Limite 85 dB`,
//   acgh: `Anexo 1/Limite 85 dB`, */
//   group:`${Math.floor(Math.random()*10)}`,
//   padrao: 'Sim',
//   id: `${Math.random()*1000000000000000}`,
// });
// const Row1 = ({
//   name: `Ruído Continui/intermitente`,
//   ins: `Anexo 1/Limite 85 dB`,
//   type:'fis',
//   grau: `Grau Médio`,
//   padrao: 'Sim',
//   status: 'Ativo',
//   id: `${Math.random()*1000000000000000}`,
// });
// const Row2 = ({
//   name: `Radiações Ionizantes`,
//   ins: `Anexo 2/Qualitativa`,
//   noc: `Anexo 2/Qualitativa`,
//   per: `Anexo 2/Qualitativa`,
//   grau: `Grau Médio`,
//   tempoAE: `25 anos`,
//   type:'fis',
//   padrao: 'Sim',
//   status: 'Ativo',
//   id: `${Math.random()*1000000000000000}`,
// });
// const Row3 = ({
//   name: `wfi ubf wuh ifhu ifehihuf ewui e fhuwi ehefuwh uifew huf ehfueiwfiu ehw fweihuihe wu fufhew efw`,
//   type:'qui',
//   padrao: 'Sim',
//   status: 'Ativo',
//   id: `${Math.random()*1000000000000000}`,
// });

// const createData = (qty = 30) => {
//   let data = [];

//   for (let i = 0; i < qty; i++) {
//     const row = createRow();
//     data.push(row);
//   }
//   return data;
// };
