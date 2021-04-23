import {db,fb} from '../lib/firebase.prod'
import {errorCatch} from './firestoreUser'
import {keepOnlyNumbers,formatCPFeCNPJeCEPeCNAE} from '../helpers/StringHandle'
import {v4} from "uuid";

export function GetAllRisks(companyId,checkSuccess,checkError) {

  var dataRef = db.collection("company").doc(companyId).collection('reduceRead')
  let risks = []
  let rec = []
  let med = []
  let font = []

  function getData() {
    dataRef.where("id", "==", 'risksData').get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.data().data.map(item=>{
          if (item.type == 'rec') rec.push({...item})
          else if (item.type == 'med') med.push({...item})
          else if (item.type == 'font') font.push({...item})
        })
      })
      checkSuccess({risks,data:{rec,med,font}})
    })
    .catch((error) => {
        checkError(errorCatch(error))
    });
  }

  dataRef.where("id", "==", 'risks').get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      risks.push(...doc.data().data)
    })
    getData()
  })
  .catch((error) => {
      checkError(errorCatch(error))
  });


}

export function GetRisk(companyId,riskId,checkSuccess,checkError) {

  var dataRef = db.collection("company").doc(companyId).collection('risks').doc(riskId)
console.log('riskId',riskId)
  dataRef.get()
  .then(function(docSnapshots) {
    if (docSnapshots.exists) {
      checkSuccess(docSnapshots.data())
    } else {
      checkError(`Não conseguimos encontrar o risco que está procurando, tente novamente mais tarde.`)
    }
  })
  .catch((error) => {
      checkError(errorCatch(error))
  });
}

export function CreateNewRiskData(companyId,data,checkSuccess,checkError) { //get data and create if doesnt exists
  var dataRef = db.collection("company").doc(companyId)
  var reduceRef = dataRef.collection('reduceRead')

  let docId = null;


  //verifica se possui reduceRead doc com espaco vazio se nao ele cria
  reduceRef.where("id", "==", 'risksData').get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      if(doc.data().data.length < 500) docId=doc.id
    })
    if (docId !== null) {
      updateCreate()
    } else {
      docId = v4()
      reduceRef.doc(docId).set({
        id:'risksData',
        data:[]
      }).then(()=>{
        updateCreate()
      })
    }
    }).catch((error) => {
      checkError(errorCatch(error))
  });

  function updateCreate() {
    reduceRef.doc(docId).update({
      data:fb.firestore.FieldValue.arrayUnion(...data)
    }).then(() => {
      checkSuccess({...data})
    }).catch((error) => {
      checkError(errorCatch(error))
    });
  }

}
