import { INCREMENT, DECREMENT } from './constants'
import { AnyAction } from 'redux'

// Reducers
export interface CounterState {
  value: number,
}

const initialState = {
  value: 0,
}

const reducerMap = {
  [INCREMENT]: (state: CounterState) => {
    return {
      ...state,
      value: (state.value += 1)
    };
  },
  [DECREMENT]: (state: CounterState) => {
    return {
      ...state,
      value: (state.value += 1)
    };
  }
};

export default (state: CounterState | undefined = initialState, action: AnyAction) => {
  if (reducerMap.hasOwnProperty(action.type)) {
    return reducerMap[action.type](state)
  }

  return state
}