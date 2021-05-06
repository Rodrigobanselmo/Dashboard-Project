import {db,fb} from '../lib/firebase.prod'
import {errorCatch} from './firestoreUser'
import {keepOnlyNumbers,formatCPFeCNPJeCEPeCNAE} from '../helpers/StringHandle'
import {v4} from "uuid";


export function CreateNewCompany(data,readData,companyId,checkSuccess,checkError) { //get data and create if doesnt exists
  var companyRef = db.collection("company").doc(companyId)
  var companiesRef = companyRef.collection('companies')
  var reduceRef = companyRef.collection('reduceRead')

  let docId = null;

  var batch = db.batch();

  //SeeIfCNPJExists(data.cnpj,companyId,checkSuccess,checkError)

  //verifica se possui reduceRead doc com espaco vazio se nao ele cria
  reduceRef.where("id", "==", 'companies').get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      if(doc.data().data.length < 500) docId=doc.id
    })
    if (docId !== null) {
      batchCreate()
    } else {
      docId = v4()
      reduceRef.doc(docId).set({
        id:'companies',
        data:[]
      }).then(()=>{
        batchCreate()
      })
    }
    }).catch((error) => {
      checkError(errorCatch(error))
  });

  function batchCreate() {

    batch.set(companiesRef.doc(keepOnlyNumbers(data.cnpj)),{...data})
    batch.update(reduceRef.doc(docId),{data:fb.firestore.FieldValue.arrayUnion({...readData})})

    batch.commit().then(() => {
      checkSuccess({...readData})
    }).catch((error) => {
      checkError(errorCatch(error))
    });
  }

/*   function batchCreates() {
    companiesRef.doc(keepOnlyNumbers(data.CNPJ)).get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        checkError('Empresa já possui cadastro')
      } else {
        companiesRef.doc(keepOnlyNumbers(data.CNPJ)).set({...data})
        .then(()=>{
          checkSuccess()
        }).catch((err)=>{
          checkError(errorCatch(err))
        })
      }
    }).catch((error) => {
      checkError(errorCatch(error))
    });
  } */
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

export function SetOrganograma(companyId,cnpj,dataInitial,checkSuccess,checkError) { //get data and create if doesnt exists

  var companyRef = db.collection("company").doc(companyId).collection('companies').doc(keepOnlyNumbers(cnpj))
  companyRef.update({
    org:{...dataInitial}
  }).then(()=> {
      checkSuccess()
  }).catch((error) => {
    checkError(errorCatch(error))
  });

}
