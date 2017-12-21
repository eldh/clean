import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { css } from 'glamor'

import DatepickerMonth from './DatepickerMonth'
const wrapper = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '580px',
}
export default class DateRangePicker extends React.Component {
  static propTypes = {
    timeperiod: PropTypes.object.isRequired,
    lastSelectableDate: PropTypes.object,
    firstSelectableDate: PropTypes.object,
    onTimeperiodChange: PropTypes.func.isRequired,
    translate: PropTypes.func,
    allowOpenEnds: PropTypes.bool,
  }

  static defaultProps = {
    firstSelectableDate: null,
    translate: str => str,
    lastSelectableDate: null,
    allowOpenEnds: true,
  }

  onStartDateSelected = newDate => {
    return this.onDateSelected(newDate, 'fromDate')
  }

  onEndDateSelected = newDate => {
    this.onDateSelected(newDate, 'toDate')
  }

  onDateSelected = (newDate, position) => {
    const oldPosition = this.props.timeperiod[position]
    const selectedDate = moment(newDate)
    const newPosition =
      oldPosition && oldPosition.isSame(selectedDate) ? (this.props.allowOpenEnds ? null : selectedDate) : selectedDate
    this.props.onTimeperiodChange({
      ...this.props.timeperiod,
      [position]: newPosition,
    })
  }
  render() {
    return (
      <div {...css(wrapper)}>
        <DatepickerMonth
          firstSelectableDate={this.props.firstSelectableDate}
          isFromMonth
          lastSelectableDate={this.props.lastSelectableDate}
          onDateSelected={this.onStartDateSelected}
          timeperiod={this.props.timeperiod}
          title={this.props.translate('From')}
          translate={this.props.translate}
        />
        <DatepickerMonth
          firstSelectableDate={this.props.firstSelectableDate}
          isFromMonth={false}
          lastSelectableDate={this.props.lastSelectableDate}
          onDateSelected={this.onEndDateSelected}
          timeperiod={this.props.timeperiod}
          title={this.props.translate('To')}
          translate={this.props.translate}
        />
      </div>
    )
  }
}
