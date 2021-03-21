import {TEAM,DASHBOARD,TEAM_MODAL_OPEN,COMPANY} from '../routes/routesNames'

const initialState = {list:null,subList:null,subSubList:null}

export default (state = initialState, action) => {

    if(action.type === 'SET_ROUTE') {

        let route = state
        if (action.payload.list) route.list = action.payload.list
        if (action.payload.subList) route.subList = action.payload.subList
        if (action.payload.subSubList) route.subSubList = action.payload.subSubList

        return { ...state,...route};
    } else {
        switch (action.payload) {
            case DASHBOARD:
                return {...initialState,list:DASHBOARD};
            case TEAM:
                return {...initialState,list:TEAM};
            case COMPANY:
                return {...initialState,list:COMPANY};
            default:
                return state
        }
    }

    return state;
}