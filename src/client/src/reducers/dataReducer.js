const initialState = {}


export default (state = initialState, action) => {



    switch(action.type) {
        case 'ADD_COMPANY':
        return {...state,company:{...action.payload}};

        case 'LOGOUT_DATA':
            return {};

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
