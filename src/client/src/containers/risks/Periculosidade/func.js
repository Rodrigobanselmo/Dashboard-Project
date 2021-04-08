import {GetAllCompanies} from '../../../services/firestoreCompany'

const createRow = () => ({
  atv: `Atividades de construção, operação e manutenção de redes de linhas aéreas ou subterrâneas de alta e  baixa tensões integrantes de sistemas elétricos de potência, energizadas ou desenergizadas, mas com possibilidade de energização, acidental ou por falha operacional, incluindo:`,
  area:` Estrutura, condutores e equipamentos de linhas aéreas de transmissão, subtransmissão e distribuição , incluindo plataformas e cestos aéreos usados para execução dos trabalhos. - Pátio e salas de operação de subestação. - Cabines de distribuição. - Estrutura, condutores e equipamentos de redes de tração elétrica, incluindo escadas, plataformas e cestos aéreos usados para execução dos trabalhos. - Valas, bancos de dutos, canaletas, condutores, recintos internos de caixas, poços de inspeção, câmaras, galerias, túneis, estruturas terminais e aéreas de superfície correspondentes. - Áreas submersas em rios, lagos e mares.`,
  padrao: 'Sim',
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

export function onGetAllCompanies(companyId,setDataRows,setLoadContent,notification,setLoaderDash) {
    function checkSuccess(response) {
        setLoadContent(false)
        setDataRows([...createData()])
        setLoaderDash(false)
      }

      function checkError(error) {
        setLoadContent(false)
        setTimeout(() => {
          notification.error({message:error,modal:true})
        }, 600);
        setLoaderDash(false)
      }

     // GetAllCompanies(companyId,checkSuccess,checkError)
     setTimeout(() => {
      checkSuccess()
    }, 600);
}
