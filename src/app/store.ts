import { createStore, combineReducers, Reducer } from 'redux'

const reducer = (state: boolean | undefined) => true

const initialReducerMap = {
  initialized: reducer,
}

// A store with no real reducers, because we're going to be lazy
export const store = createStore(combineReducers(initialReducerMap))

// A horrible mutative function. Like super effectfull. We'll wrap this into a
// "functional box" in StoreIO.ts
export const injectReducer = <S>(name: string, reducerToInject: Reducer<S>) => {
  const nextReducer = combineReducers({
    ...initialReducerMap,
    [name]: reducerToInject
  });

  store.replaceReducer(nextReducer)

  return reducerToInject
}