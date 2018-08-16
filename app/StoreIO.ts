import { store, injectReducer } from './store'
import { AppIO, Lazy } from "./IO";
import { Store, Reducer } from 'redux'

type LazyWithStore<T> = (store: Store) => T

export const storeIo = <T>(run: LazyWithStore<T>) => AppIO.create(
  () => run(store)
)

export const reducerIo = (name: string, reducer: Reducer) => AppIO.create(
  () => injectReducer(name, reducer)
).once()