import * as React from 'react'
import { Provider } from 'react-redux'
import Counter from './Counter'
import { store } from './store'

export default class App extends React.PureComponent {
  public render() {
    return (
      <Provider store={store}>
        <Counter label="My value is " />
      </Provider>
    )
  }
}