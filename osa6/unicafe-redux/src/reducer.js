const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  let newState = {...state}
  switch (action.type) {
    case 'GOOD':
      //let newStateGood = {...initialState}
      newState.good = state.good + 1
      return newState
    case 'OK':
      //let newStateOk = {...initialState}
      newState.ok = state.ok + 1
      return newState
    case 'BAD':
      //let newStateBad = {...initialState}
      newState.bad = state.bad + 1
      return newState
    case 'ZERO':
      //let newStateZero = {...initialState}
      newState.good = 0
      newState.ok = 0
      newState.bad = 0 
      return newState
    default: return state
  }
  
}

export default counterReducer