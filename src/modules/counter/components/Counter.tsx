import * as React from 'react'

export interface Props {
  value: number,
  label: string,
  increment: () => void,
  decrement: () => void,
}

export default class Counter extends React.PureComponent<Props> {
  public render() {
    return (
      <div>
        <div>{this.props.label}: {this.props.value}</div>
        <button onClick={this.props.increment}>Increment</button>
        <button onClick={this.props.decrement}>Decrement</button>
      </div>
    )
  }
}