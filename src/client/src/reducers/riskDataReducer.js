const initialState = {rec:[],font:[],med:[]}


export default (state = initialState, action) => {



    switch(action.type) {
        case 'CREATE_RISKS_DATA':
        return {...action.payload};

        case 'ADD_RISKS_DATA':
          var oldState = {...state}
          action.payload.map((item)=>{
            if (item.type == 'rec') oldState.rec = [...oldState.rec,{...item}]
            if (item.type == 'med') oldState.med = [...oldState.med,{...item}]
            if (item.type == 'font') oldState.font = [...oldState.font,{...item}]
          })

        return {...oldState};

        case 'EDIT_RISKS_DATA':
          var oldState = {...state}
          if (action.payload?.rec) {
            const index = oldState.rec.findIndex(i=>i.id == action.payload.rec.id)
            if (index != -1) oldState.rec[index] = {...action.payload.rec}
            else oldState.rec = [...oldState.rec,{...action.payload.rec}]
          }
          if (action.payload?.med) {
            const index = oldState.med.findIndex(i=>i.id == action.payload.med.id)
            if (index != -1) oldState.med[index] = {...action.payload.med}
            else oldState.med = [...oldState.med,{...action.payload.med}]
          }
          if (action.payload?.font) {
            const index = oldState.font.findIndex(i=>i.id == action.payload.font.id)
            if (index != -1) oldState.font[index] = {...action.payload.font}
          }
        return {...oldState};

        case 'REMOVE_RISKS_DATA':
          var oldState = {...state}
          oldState.rec = [...oldState.rec.filter(i=>i.id!=action.payload)]
          oldState.med = [...oldState.med.filter(i=>i.id!=action.payload)]
          oldState.font = [...oldState.font.filter(i=>i.id!=action.payload)]
        return {...oldState};

        /* case 'ANSWER_RISK':
            var groupId = list.data.findIndex((i)=>i?.id && i.id===action.payload.groupId)
            var itemId = list.data[groupId].questions.findIndex((i)=>i?.id && i.id===action.payload.itemId)
            var childId = list.data[groupId].questions.findIndex((i)=>i?.id && i.id===action.payload.childId)
        return {...list}; */


        case 'LOGOUT_RISK_DATA':
            return {...initialState};

        default:
        return state;
    }
}



/*             action.payload?.data && action.payload.data.map((group)=>{
                let GROUP = {id:item.id, response:[]}
                group?.questions && group.questions.map((question)=>{
                    GROUP.push({})
                })
            }) */
