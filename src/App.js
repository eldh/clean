import React, { Component } from 'react'
import './App.css'
import Datepicker from './components/Datepicker'
// import CountState from './components/CountState'
import { css } from 'glamor'

class App extends Component {
  state = { show: true }
  render() {
    return (
      <div className="App" {...css({ width: '150px', padding: '20px' })}>
        <Datepicker />

        {/* {this.state.show && (
          <CountState
            render={({ count }) => (
              <div {...css({ display: 'block', padding: '20px 0' })}>{`The count is ${count}`}</div>
            )}
          />
        )}
        <CountState
          render={({ count }, { increaseCount }) => (
            <button {...css({ display: 'block', padding: '10px' })} onClick={increaseCount}>
              {'Click me ' + count}
            </button>
          )}
        />
        <button
          {...css({ display: 'block', padding: '10px' })}
          onClick={() => this.setState({ show: !this.state.show })}
        >
          {'Toggle counter'}
        </button> */}
      </div>
    )
  }
}

export default App
