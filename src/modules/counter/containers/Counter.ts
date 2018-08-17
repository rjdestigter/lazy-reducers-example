import { connect } from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'

// Selector
import { counts } from '../selectors'

import * as actions from '../actions'

const mapStateToProps = (storeState: any) => {
  return {
    value: counts(storeState)
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)