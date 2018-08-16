import * as React from 'react'

export interface Props {
  value: number,
  label: string,
}

export default class Counter extends React.PureComponent<Props> {
  public render() {
    return (
      <div>{this.props.label}: {this.props.value}</div>
    )
  }
}