function reducer(state, action) {
    switch (action.type) {
      case 'list':
        return {...initialState,list:action.payload};
      case 'subList':
        return {...state,subList:action.payload,subSubList:null};
      case 'subSubList':
        return {...state,subSubList:action.payload};
      case 'clean':
        return {...initialState};
      default:
        break
    }
  }

  const [activityState, dispatchActivity] = React.useReducer(reducer, initialState)