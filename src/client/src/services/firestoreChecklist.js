import {db,fb} from '../lib/firebase.prod'
import {errorCatch} from './firestoreUser'
import {keepOnlyNumbers,formatCPFeCNPJeCEPeCNAE} from '../helpers/StringHandle'
import {v4} from "uuid";

export function GetAllChecklist(companyId,checkSuccess,checkError) {

  var dataRef = db.collection("company").doc(companyId).collection('reduceRead')
  let dataFirebase = []

  dataRef.where("id", "==", 'checklists').get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      dataFirebase.push(...doc.data().data)
    })
    checkSuccess([...dataFirebase])
  })
  .catch((error) => {
      checkError(errorCatch(error))
  });


}

export function GetChecklist(companyId,itemId,checkSuccess,checkError) {

  var dataRef = db.collection("company").doc(companyId).collection('checklists').doc(itemId)
  dataRef.get()
  .then(function(docSnapshots) {
    if (docSnapshots.exists) {
      checkSuccess(docSnapshots.data())
    } else {
      checkError(`Não conseguimos encontrar o checklist que está procurando, tente novamente mais tarde.`)
    }
  })
  .catch((error) => {
      checkError(errorCatch(error))
  });
}

export function CreateNewChecklist(id,title,companyId,checkSuccess,checkError) { //get data and create if doesnt exists
  var companyRef = db.collection("company").doc(companyId)
  var dataRef = companyRef.collection('checklists')
  var reduceRef = companyRef.collection('reduceRead')

  let docId = null;
  var batch = db.batch();

  //verifica se possui reduceRead doc com espaco vazio se nao ele cria
  reduceRef.where("id", "==", 'checklists').get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      if(doc.data().data.length < 500) docId=doc.id
    })
    if (docId !== null) {
      batchCreate()
    } else {
      docId = v4()
      reduceRef.doc(docId).set({
        id:'checklists',
        data:[]
      }).then(()=>{
        batchCreate()
      })
    }
    }).catch((error) => {
      checkError(errorCatch(error))
  });

  function batchCreate() {

    if (docId) batch.set(dataRef.doc(id),{title,id,data:[]})
    batch.update(reduceRef.doc(docId),{data:fb.firestore.FieldValue.arrayUnion({id,title})})

    batch.commit().then(() => {
      checkSuccess()
    }).catch((error) => {
      checkError(errorCatch(error))
    });
  }
}

export function DeleteChecklist(id,companyId,checkSuccess,checkError) { //get data and create if doesnt exists
  var companyRef = db.collection("company").doc(companyId)
  var dataRef = companyRef.collection('checklists')
  var reduceRef = companyRef.collection('reduceRead')

  var docId = null;
  var index = 0;
  var array = [];
  var batch = db.batch();

  reduceRef.where("id", "==", 'checklists').get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        if(doc.data().data.findIndex(i=>i.id == id) != -1) {
          array=[...doc.data().data.filter(i=>i.id != id)]
          docId=doc.id
        }
    })
      if (docId !== null) {
        updateEdit()
      } else {
        checkError('Não foi possivel encontrar este dado no servidor.')
      }
    }).catch((error) => {
      checkError(errorCatch(error))
    });

  function updateEdit() {
    batch.delete(dataRef.doc(id))
    if (docId) batch.update(reduceRef.doc(docId),{data:[...array]})

    batch.commit().then(() => {
      checkSuccess()
    }).catch((error) => {
      checkError(errorCatch(error))
    });
  }
}

export function SaveChecklist(data,companyId,checkSuccess,checkError) { //get data and create if doesnt exists
  var dataRef = db.collection("company").doc(companyId).collection('checklists').doc(data.id)
  dataRef.set({
    ...data
  }).then(()=>{
    checkSuccess()
  }).catch((error) => {
    checkError(errorCatch(error))
  });
}

export function EditChecklist(id,title,companyId,checkSuccess,checkError) { //get data and create if doesnt exists
  var companyRef = db.collection("company").doc(companyId)
  var dataRef = companyRef.collection('checklists')
  var reduceRef = companyRef.collection('reduceRead')

  var docId = null;
  var index = 0;
  var array = [];
  var batch = db.batch();

  reduceRef.where("id", "==", 'checklists').get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        if(doc.data().data.findIndex(i=>i.id == id) != -1) {
          index = doc.data().data.findIndex(i=>i.id == id)
          array=[...doc.data().data]
          array[index] = {...array[index],title}
          docId=doc.id
        }
    })
      if (docId !== null) {
        updateEdit()
      } else {
        checkError('Não foi possivel encontrar este dado no servidor.')
      }
    }).catch((error) => {
      checkError(errorCatch(error))
    });

  function updateEdit() {
    batch.update(dataRef.doc(id),{title})
    if (docId) batch.update(reduceRef.doc(docId),{data:[...array]})

    batch.commit().then(() => {
      checkSuccess()
    }).catch((error) => {
      checkError(errorCatch(error))
    });
  }



}



export function DeleteRiskData(companyId,data,checkSuccess,checkError) { //get data and create if doesnt exists
  var dataRef = db.collection("company").doc(companyId)
  var reduceRef = dataRef.collection('reduceRead')

  let docId = null;


  //verifica se possui reduceRead doc com espaco vazio se nao ele cria
  reduceRef.where("id", "==", 'risksData').get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      console.log('id',data.id)
      if(doc.data().data.findIndex(i=>i.id == data.id) != -1) docId=doc.id
    })
    if (docId !== null) {
      updateDelete()
    } else {
      checkError('Não foi possivel encontrar este dado no servidor.')
    }

    }).catch((error) => {
      checkError(errorCatch(error))
  });

  function updateDelete() {
    console.log('docId',docId)
    reduceRef.doc(docId).update({
      data:fb.firestore.FieldValue.arrayRemove({...data})
    }).then(() => {
      checkSuccess()
    }).catch((error) => {
      checkError(errorCatch(error))
    });
  }

}

export function EditRiskData(companyId,data,checkSuccess,checkError) { //get data and create if doesnt exists
  var dataRef = db.collection("company").doc(companyId)
  var reduceRef = dataRef.collection('reduceRead')

  let docId = null;
  let docId2 = null;
  let docId3 = null;
  let array = [];
  let array2 = [];

  var batch = db.batch();
  console.log('server',data,docId)

  //verifica se possui reduceRead doc com espaco vazio se nao ele cria
  reduceRef.where("id", "==", 'risksData').get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      if(data?.rec) {
        if(doc.data().data.findIndex(i=>i.id == data.rec.id) != -1) {
          array=[...doc.data().data]
          docId=doc.id
        }
      }
      if(data?.med) {
        if(doc.data().data.findIndex(i=>i.id == data.med.id) != -1) {
          array2=[...doc.data().data]
          docId2=doc.id
        }
      }
      if (data?.med && !docId2) docId2 = docId
      if (data?.rec && !docId) docId = docId2

      if(data?.font) {
        if(doc.data().data.findIndex(i=>i.id == data.font.id) != -1) {
          array=[...doc.data().data]
          docId3=doc.id
        }
      }
    })
    if (docId !== null || docId2 !== null ||docId3 !== null) {
      updateEdit()
    } else {
      console.log('server',data,docId)
      checkError('Não foi possivel encontrar este dado no servidor.')
      return
    }

    }).catch((error) => {
      checkError(errorCatch(error))
      return
    });

  function updateEdit() {
    if (docId==docId2 && docId) {
      batch.update(reduceRef.doc(docId),{data:[...array.filter(i=>i.id!=data.rec.id && i.id!=data.med.id),{...data.rec},{...data.med}]})
    } else {
      if (docId) {
        batch.update(reduceRef.doc(docId),{data:[...array.filter(i=>i.id!=data.rec.id),{...data.rec}]})
      }
      if (docId2) {
        batch.update(reduceRef.doc(docId2),{data:[...array2.filter(i=>i.id!=data.med.id),{...data.med}]})
      }
      if (docId3) {
        batch.update(reduceRef.doc(docId3),{data:[...array.filter(i=>i.id!=data.font.id ),{...data.font}]})
      }
    }


    batch.commit().then(() => {
      checkSuccess({...data})
    }).catch((error) => {
      checkError(errorCatch(error))
    });
  }

}
