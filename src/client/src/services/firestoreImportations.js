import {db,fb} from '../lib/firebase.prod'
import {errorCatch} from './firestoreUser'
import {keepOnlyNumbers,formatCPFeCNPJeCEPeCNAE} from '../helpers/StringHandle'
import {v4} from "uuid";


export function ImportationRisks(risksData,reduceReadData,companyId,checkSuccess,checkError,t) { //get data and create if doesnt exists
  var companyRef = db.collection("company").doc(companyId)
  var riskRef = companyRef.collection('risks')
  var reduceRef = companyRef.collection('reduceRead')

  var data = [];
  var reduceRead = [];
  var tries = t?t:0
  if (risksData.length > 490) {
    data = [...risksData.slice(tries*490,(tries+1)*490)]
    reduceRead = [...reduceReadData.slice(tries*490,(tries+1)*490)]
  } else {
    data = [...risksData]
    reduceRead = [...reduceReadData]
  }

  let docId = null;
  let docData = [];

  var batch = db.batch();


  //verifica se possui reduceRead doc com espaco vazio se nao ele cria
  reduceRef.where("id", "==", 'risks').get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      if(doc.data().data.length < 500-reduceRead.length) {
        docId=doc.id
        docData = doc.data().data
      }
    })
    if (docId !== null) {
      batchCreate()
    } else {
      docId = v4()
      reduceRef.doc(docId).set({
        id:'risks',
        data:[]
      }).then(()=>{
        batchCreate()
      })
    }
    }).catch((error) => {
      checkError(errorCatch(error))
  });

  function batchCreate() {
    data.map(item=>{
      batch.set(riskRef.doc(item.id),{...item})
    })
    batch.update(reduceRef.doc(docId),{data:[...docData,...reduceRead]})

    batch.commit().then(() => {
      if (risksData.length > 490*(tries+1)) {
        checkSuccess(tries+1)
        console.log('one more')
      }
      else checkSuccess()
    }).catch((error) => {
      checkError(errorCatch(error))
    });
  }

  // batch.commit().then(() => {
  //   checkSuccess({...data})
  // }).catch((error) => {
  //   checkError(errorCatch(error))
  // });

}

export function SeeIfCNPJExists(CNPJ,companyId,checkSuccess,checkError) {

  var companiesRef = db.collection("company").doc(companyId).collection('companies')

  console.log(CNPJ)
  companiesRef.where("CNPJ", "==", CNPJ).get()
  .then(function(querySnapshot) {
      let response = false
      querySnapshot.forEach(function() {
        console.log(9)
          response = true
      })
      checkSuccess(response)
    }).catch((error) => {
      checkError(errorCatch(error))
  });
}
export function GetAllCompanies(companyId,checkSuccess,checkError) {

  var dataRef = db.collection("company").doc(companyId).collection('reduceRead')

  dataRef.where("id", "==", 'companies').get()
  .then(function(querySnapshot) {
    let response = []
    querySnapshot.forEach(function(doc) {
      response.push(...doc.data().data)
    })
    checkSuccess(response)
  })
  .catch((error) => {
      checkError(errorCatch(error))
  });
}
export function GetCompany(companyId,cnpj,checkSuccess,checkError) {

  var dataRef = db.collection("company").doc(companyId).collection('companies').doc(keepOnlyNumbers(cnpj))

  dataRef.get()
  .then(function(docSnapshots) {
    if (docSnapshots.exists) {
      checkSuccess(docSnapshots.data())
    } else {
      checkError(`A empresa com o CNPJ ${formatCPFeCNPJeCEPeCNAE(cnpj)} não é cadastrado em sua empresa ou possui formato inválido`)
    }
  })
  .catch((error) => {
      checkError(errorCatch(error))
  });
}
