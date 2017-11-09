import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'
import moment from 'moment'
import MonthComponent from './DatepickerMonth'
import { datepickerWrapper, daterangepicker } from './styles'

// import './datepicker.scss'

export default class DatePicker extends React.Component {
  static propTypes = {
    timeperiod: PropTypes.object,
    onTimeperiodChange: PropTypes.func.isRequired,
    firstSelectableDate: PropTypes.object,
    lastSelectableDate: PropTypes.object,
    translate: PropTypes.func,
  }

  static defaultProps = {
    firstSelectableDate: moment(),
    translate: str => str,
    lastSelectableDate: null,
    timeperiod: {
      fromDate: moment().startOf('day'),
      toDate: moment().startOf('day'),
    },
  }
  onDateSelected = newDate => {
    this.props.onTimeperiodChange({
      ...this.props.timeperiod,
      fromDate: moment(newDate),
      toDate: moment(newDate),
    })
  }

  render() {
    return (
      <div {...css(datepickerWrapper)}>
        <MonthComponent
          firstSelectableDate={this.props.firstSelectableDate}
          isSingleMonth
          lastSelectableDate={this.props.lastSelectableDate}
          onDateSelected={this.onDateSelected}
          timeperiod={this.props.timeperiod}
          translate={this.props.translate}
        />
      </div>
    )
  }
}
