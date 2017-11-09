import React from 'react'
import moment from 'moment'
import Datepicker from '../timeperiod/Datepicker'
import Daterangepicker from '../timeperiod/Daterangepicker'

import './layout.scss'

export default class Layout extends React.Component {
  static propTypes = {}

  state = {
    single: {
      fromDate: moment().startOf('day'),
      toDate: moment().startOf('day'),
    },
    period: {
      fromDate: moment().startOf('day'),
      toDate: moment()
        .startOf('day')
        .add(20, 'days'),
    },
  }

  render() {
    return (
      <div>
        <p>The datepicker depends on moment.js. It supports both single dates and date ranges.</p>
        <h3>Single date</h3>
        <Datepicker
          timeperiod={this.state.single}
          firstSelectableDate={moment().subtract(2, 'months')}
          lastSelectableDate={moment().add(2, 'months')}
          onTimeperiodChange={this.onSingleChange}
        />
        <h3>Date range</h3>
        <Daterangepicker
          timeperiod={this.state.period}
          firstSelectableDate={moment().subtract(2, 'months')}
          lastSelectableDate={moment().add(2, 'months')}
          onTimeperiodChange={this.onPeriodChange}
        />
      </div>
    )
  }

  onSingleChange = timeperiod => {
    this.setState({ single: timeperiod })
  }
  onPeriodChange = timeperiod => {
    this.setState({ period: timeperiod })
  }
}
