import { injectReducer, store } from './store'

import { AppIO } from "./IO";

import { Reducer, Store } from 'redux'

type LazyWithStore<T> = (store: Store) => T

export const storeIo = <T>(run: LazyWithStore<T>) => AppIO.create(
  () => run(store)
)

export const reducerIo = (name: string, reducer: Reducer) => AppIO.create(
  () => injectReducer(name, reducer)
).once()