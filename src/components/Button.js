import React, { PropTypes } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import Button from '../../src/Button'
import './layout.scss'

export default class Layout extends React.Component {
  static propTypes = {}

  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    return (
      <div>
        <p>
          Probably the most capable and over-engineered button in the history of react components.
        </p>
        <div style={{ alignItems: 'flex-start' }}>
          <Button onClick={() => alert('Click')}>Hello</Button>
        </div>
      </div>
    )
  }
}
