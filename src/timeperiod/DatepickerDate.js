import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'

export default class DatePickerDate extends React.Component {
  static propTypes = {
    timeperiod: PropTypes.object.isRequired,
    date: PropTypes.object.isRequired,
    onDateSelected: PropTypes.func.isRequired,
    isFromMonth: PropTypes.bool.isRequired,
    isSingleMonth: PropTypes.bool,
    firstSelectableDate: PropTypes.object,
    lastSelectableDate: PropTypes.object,
    isEmptyPeriod: PropTypes.bool,
    isOtherMonth: PropTypes.bool,
  }

  static defaultProps = { isSingleMonth: false }

  state = {
    selected: false,
    disabled: false,
  }

  onDateClicked = e => {
    if (!this.isDisabled()) {
      return this.props.onDateSelected(e)
    }
  }

  isSelected() {
    const { date } = this.props
    const startDate = this.props.timeperiod.fromDate
    const endDate = this.props.timeperiod.toDate
    return (
      (!startDate && date.isBefore(endDate)) ||
      (!endDate && date.isAfter(startDate)) ||
      (date.isBefore(endDate) && date.isAfter(startDate)) ||
      this.isFirstSelected() ||
      this.isLastSelected()
    )
  }

  isFirstSelected() {
    return this.props.date.isSame(this.props.timeperiod.fromDate)
  }

  isLastSelected() {
    return this.props.date.isSame(this.props.timeperiod.toDate)
  }

  isDisabled() {
    const {
      date,
      isSingleMonth,
      isEmptyPeriod,
      timeperiod,
      isFromMonth,
      firstSelectableDate,
      lastSelectableDate,
    } = this.props

    if (isSingleMonth || isEmptyPeriod) {
      return (
        (firstSelectableDate && date.isBefore(firstSelectableDate)) ||
        (lastSelectableDate && date.isAfter(lastSelectableDate)) ||
        false
      )
    } else if (isFromMonth) {
      return (
        (timeperiod.toDate && date.isAfter(timeperiod.toDate)) ||
        (firstSelectableDate && date.isBefore(firstSelectableDate)) ||
        (firstSelectableDate && date.isSame(firstSelectableDate))
      )
    }
    return (
      (timeperiod.fromDate && date.isBefore(timeperiod.fromDate)) ||
      (lastSelectableDate && date.isAfter(lastSelectableDate))
    )
  }

  isActive() {
    const { date, timeperiod, isFromMonth } = this.props

    if (isFromMonth) {
      if (!timeperiod.fromDate) return false
      return date.isSame(timeperiod.fromDate, 'day')
    }
    if (!timeperiod.toDate) return false
    return date.isSame(timeperiod.toDate, 'day')
  }

  render() {
    const { date } = this.props

    const base = {
      cursor: 'pointer',
      marginBottom: '5px',
      fontWeight: '700',
      width: '40px',
      height: '40px',
      lineHeight: '40px',
      textAlign: 'center',
      margin: '0',
      color: '#29BF96',
      transition: 'all 0.15s cubic-bezier(0.23, 1, 0.32, 1)',
      ':active, :hover': {
        outline: 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
      },
      ':disabled:active, :disabled:hover': { backgroundColor: 'transparent' },
      ':nth-child(7n)': {
        borderTopRightRadius: '12px',
        borderBottomRightRadius: '12px',
      },
      ':nth-child(7n-6)': {
        borderTopLeftRadius: '12px',
        borderBottomLeftRadius: '12px',
      },
    }
    const selected = {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      borderTop: '0 rgba(0, 0, 0, 0.15) solid',
      borderBottom: '0 rgba(0, 0, 0, 0.15) solid',
      ':nth-child(7n)': {
        borderRight: '0 rgba(0, 0, 0, 0.15) solid',
      },
      ':nth-child(7n-6)': {
        borderLeft: '0 rgba(0, 0, 0, 0.15) solid',
      },
      ':active, :hover': {
        outline: 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
      },
    }
    const selected_first = { border: '0 #29BF96 solid' }
    const selected_last = { border: '0 #29BF96 solid' }
    const active = { backgroundColor: '#29BF96', color: 'white' }
    const other_month = { opacity: '.4' }
    const disabled = { cursor: 'default', color: '#999999' }
    const not_selected = { borderRadius: '12px' }

    return (
      <div
        {...css([
          base,
          this.isSelected() ? selected : not_selected,
          this.isDisabled() && disabled,
          this.isFirstSelected() && selected_first,
          this.isLastSelected() && selected_last,
          this.isActive() && active,
          this.props.isOtherMonth && other_month,
        ])}
        data-date={date.format()}
        data-formatted-date={date.format('YYYY-MM-DD')}
        data-touch-feedback
        onClick={this.onDateClicked}
        role="button"
        tabIndex="0"
      >
        {date.get('date')}
      </div>
    )
  }
}
