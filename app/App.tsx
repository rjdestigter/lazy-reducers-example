import { Provider } from 'react-redux'
import { store } from './store'
import * as React from 'react'
import Counter from './Counter'

export default class App extends React.PureComponent {
  public render() {
    return (
      <Provider store={store}>
        <Counter label="My value is: " />
      </Provider>
    )
  }
}