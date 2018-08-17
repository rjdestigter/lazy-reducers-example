import * as React from 'react'
import { AppIO } from './IO'

interface WithIOState {
  ready: boolean,
}

// A function, taking an IO and returning:
// A higher-order-component, returning
// A component that will render the given component
// once the IO program has run

/**
 * @param {io: IO<T>} io - The IO program we want run when the component mounts
 */
export default function connectIo<T>(io: AppIO<T>) {
  /**
   * @param {ComponentType<P>} Wrapped - The component we're wrapping around
   */
  return function<P extends {}>(Wrapped: React.ComponentType<P>) {
    // Where it all comes together
    return class WithIO extends React.PureComponent<P, WithIOState> {
      public state = { ready: false }

      // Runs the damn thing and updates tate so that your component renders
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