import { connect } from 'react-redux'

// Selector
import { counts } from '../selectors'

const mapStateToProps = (storeState: any) => {
  return {
    value: counts(storeState)
  }
}

export default connect(mapStateToProps)