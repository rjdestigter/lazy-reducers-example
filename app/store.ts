import { createStore, combineReducers, Reducer } from 'redux'

const reducer = (state: boolean | undefined) => true

const initialReducerMap = {
  initialized: reducer,
}

export const store = createStore(combineReducers(initialReducerMap))


export const injectReducer = <S>(name: string, reducer: Reducer<S>) => {
  const nextReducer = combineReducers({
    ...initialReducerMap,
    [name]: reducer
  });

  store.replaceReducer(nextReducer)

  return reducer
}