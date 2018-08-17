import { prefix } from './constants'
import { CounterState } from './reducer'

// Selectors
const moduleState = (storeState: any): CounterState => storeState[prefix]

export const counts = (storeState: any) => moduleState(storeState).value;