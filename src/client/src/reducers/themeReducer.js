const initialState = {company:'SIMPLESST'};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'THEME_COMPANY':
        return { company: state.company === 'REALIZA' ? 'SIMPLESST' : 'REALIZA'};
    default:
        return state
  }
}
