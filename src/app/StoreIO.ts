/**
 * Usages of IO for redux
 */

 // The store, and the function updating it's reducers
import { injectReducer, store } from './store'

// Our IO
import { AppIO } from "./IO";

// Some Redux related types
import { Reducer, Store } from 'redux'

// A function, taking the store and returning T
type LazyWithStore<T> = (store: Store) => T

// Similar to IO.create, but instead of working with thunks
// it works with functions that take the store.
// This allows us to define IO's that are store dependant.
export const storeIo = <T>(run: LazyWithStore<T>) => AppIO.create(
  () => run(store)
)

// A function returning an IO that will inject the given reducer into the store
export const reducerIo = (name: string, reducer: Reducer) => AppIO.create(
  () => injectReducer(name, reducer)
).once()