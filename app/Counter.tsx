import { reducerIo } from './StoreIO'
import { Counter, reducer } from '../modules/counter'
import connectIo from './connectIO'

export default connectIo(reducerIo('counter', reducer))(Counter)