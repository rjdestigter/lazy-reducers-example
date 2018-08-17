import { reducerIo } from './StoreIO'
import { Counter, prefix, reducer } from '../modules/counter'
import connectIo from './connectIO'

export default connectIo(
  // Use our utility function to create an IO program
  // that, when executed, will inject our "counter" module reducer
  reducerIo(prefix, reducer)
)(Counter)