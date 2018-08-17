import { createStore, combineReducers, Reducer } from 'redux'

const reducer = (state: boolean | undefined) => true

const initialReducerMap = {
  initialized: reducer,
}

export const store = createStore(combineReducers(initialReducerMap))


export const injectReducer = <S>(name: string, reducerToInject: Reducer<S>) => {
  const nextReducer = combineReducers({
    ...initialReducerMap,
    [name]: reducerToInject
  });

  store.replaceReducer(nextReducer)

  return reducerToInject
}