const initialState = []


export default (state = initialState, action) => {



    switch(action.type) {
        case 'CREATE_RISKS':
        return [...action.payload];

        /* case 'ANSWER_RISK':
            var groupId = list.data.findIndex((i)=>i?.id && i.id===action.payload.groupId)
            var itemId = list.data[groupId].questions.findIndex((i)=>i?.id && i.id===action.payload.itemId)
            var childId = list.data[groupId].questions.findIndex((i)=>i?.id && i.id===action.payload.childId)
        return {...list}; */


        case 'LOGOUT_RISK':
            return [...initialState];

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
