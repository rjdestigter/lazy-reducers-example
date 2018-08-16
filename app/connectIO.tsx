import * as React from 'react'
import { AppIO } from './IO'

interface WithIOState {
  ready: boolean,
}

export default function connectIo<T>(io: AppIO<T>) {
  return function<P extends {}>(Wrapped: React.ComponentType<P>) {
    return class WithIO extends React.PureComponent<P, WithIOState> {
      public state = { ready: false }

      public componentDidMount() {
        io.run()
        this.setState({ready: true})        
      }

      public render() {
        if (this.state.ready) {
          return (
            <Wrapped {...this.props} />
          )
        }

        return 'Busy...'
      }
    }
  }
}