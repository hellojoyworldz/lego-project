const initState = {
  count: 0,
};

function reducer(state = initState, action) {
  switch (action.type) {
    case "INCREASE":
      return { ...state, count: state.count + action.playload.num };
    case "DECREASE":
      return { ...state, count: state.count - action.playload.num };
    default:
      return { ...state };
  }
}

export default reducer;
