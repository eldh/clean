// import React from 'react'
import PropTypes from 'prop-types'
import SharedStateComponent from './SharedStateComponent'

export default class CountState extends SharedStateComponent {
  static propTypes = {
    render: PropTypes.func.isRequired,
  }

  static state = {
    count: 0,
  }

  increaseCount = () => {
    this.setState(s => ({
      count: s.count + 1,
    }))
  }

  render() {
    return this.props.render(this.state, { increaseCount: this.increaseCount })
  }
}
