const initialState = false


export default (state = initialState, action) => {


    switch(action.type) {
        case 'SAVE':
        return action.payload;

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
