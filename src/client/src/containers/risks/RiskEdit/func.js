import {GetRisk,GetAllRisks} from '../../../services/firestoreRisks'
//import {GetAllCompanies} from '../../../../../services/firestoreCompany'
// import {v4} from "uuid";
// import faker from 'faker';

const sort = function (a, b) {
  if (a.name > b.name) {
      return 1;
  }
  if (b.name > a.name) {
      return -1;
  }
  return 0;
};

export function onGetRisk({companyId,itemId,setData,setLoadContent,notification,setLoaderDash,dispatch,getRiskData}) {
    function checkSuccess(response) {
      setData({...response})
      if (!getRiskData) {
        setLoadContent(false)
        setLoaderDash(false)
      } else {
        onGetRisksData(companyId,notification,dispatch,setLoadContent,setLoaderDash)
      }
      }

      function checkError(error) {
        setLoadContent(false)
        setTimeout(() => {
          notification.error({message:error,modal:false})
        }, 600);
      }

      GetRisk(companyId,itemId,checkSuccess,checkError)
}


export function onGetRisksData(companyId,notification,dispatch,setLoadContent,setLoaderDash) {
function checkSuccess(response) {
  console.log('responseRisk',response.risks)
  if (setLoadContent) setLoadContent(false)
  if (setLoaderDash) setLoaderDash(false)
  dispatch({ type: 'CREATE_RISKS', payload: [...response.risks.sort(sort)] })
  dispatch({ type: 'CREATE_RISKS_DATA', payload: {...response.data} })
}

  function checkError(error) {
    if (setLoadContent) setLoadContent(false)
    if (setLoaderDash) setLoaderDash(false)
    setTimeout(() => {
      notification.error({message:error})
    }, 600);
  }

  GetAllRisks(companyId,checkSuccess,checkError)
  //checkSuccess({risks,data:{rec,med,font}})
}
