import { reducerIo } from './StoreIO'
import { Counter, prefix, reducer } from '../modules/counter'
import connectIo from './connectIO'

export default connectIo(reducerIo(prefix, reducer))(Counter)