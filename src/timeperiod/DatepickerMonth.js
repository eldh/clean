import React from 'react'
import PropTypes from 'prop-types'

import { range } from 'ramda'
import { css } from 'glamor'
import moment from 'moment'
import DateComponent from './DatepickerDate'
// import Icon from '../Icon'
// import button from '../button'

export default class DatePickerMonth extends React.Component {
  static propTypes = {
    timeperiod: PropTypes.object.isRequired,
    onDateSelected: PropTypes.func.isRequired,
    firstSelectableDate: PropTypes.object,
    lastSelectableDate: PropTypes.object,
    isFromMonth: PropTypes.bool,
    isSingleMonth: PropTypes.bool,
    translate: PropTypes.func,
    title: PropTypes.string,
  }

  static defaultProps = {
    translate: str => str,
    isFromMonth: false,
    isSingleMonth: false,
  }

  state = {
    firstDate: this._getFirstDate(),
    isEmptyPeriod: this.isEmptyPeriod(),
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isEmptyPeriod: this.isEmptyPeriod(nextProps),
      firstDate: this._getFirstDate(nextProps),
    })
  }

  onNextMonthClicked = () => {
    if (!this._hideNextMonth()) {
      this.setState({
        firstDate: moment(this.state.firstDate).add(1, 'months'),
      })
    }
  }

  onPreviousMonthClicked = () => {
    if (!this._hidePreviousMonth()) {
      this.setState({
        firstDate: moment(this.state.firstDate).subtract(1, 'months'),
      })
    }
  }

  onDateSelected = e => {
    this.props.onDateSelected(e.currentTarget.dataset.formattedDate)
  }

  onMonthTitleClicked = () => {
    this.setState({
      firstDate: this._getSelectedDate().startOf('month'),
    })
  }
  _getSelectedDateString() {
    const date = this.props.isFromMonth ? this.props.timeperiod.fromDate : this.props.timeperiod.toDate
    if (!date) return ''
    if (date.get('year') === moment().get('year')) {
      return date.format && date.format(this.props.translate('MMMM Do'))
    }
    return date.format && date.format(this.props.translate('MMMM Do YYYY'))
  }

  _getSelectedDate() {
    if (this.props.isFromMonth) {
      return this.props.timeperiod.fromDate.clone()
    }
    return this.props.timeperiod.toDate.clone()
  }

  _getDayLabels() {
    const daylabel = {
      fontWeight: '700',
      width: '40px',
      height: '40px',
      lineHeight: '40px',
      color: '#999999',
    }
    return range(0, 7).map(i => {
      return (
        <div {...css(daylabel)} key={`${this.props.isFromMonth}-weekday-${i}`}>
          {moment()
            .weekday(i)
            .format('dd')}
        </div>
      )
    })
  }

  _getDates(next) {
    const date = moment(this.state.firstDate)
    if (next) date.add(1, 'months')
    let items = this._getLastMonthDates(date, [])
    items = this._getThisMonthDates(date, items)
    items = this._getNextMonthDates(date, items)
    return items
  }

  _getLastMonthDates(date, items) {
    const firstWeekday = moment(date).weekday() + 1
    if (firstWeekday === 1) return items
    for (const i of range(1, firstWeekday)) {
      items.push(
        this._getDateComponent({
          date: moment(date)
            .subtract(firstWeekday - i, 'days')
            .startOf('day'),
          isOtherMonth: true,
        })
      )
    }
    return items
  }

  _getNextMonthDates(d, items) {
    const date = moment(d)
      .endOf('month')
      .startOf('day')
    const lastWeekday = date.weekday()
    if (lastWeekday === 6) return items
    for (const i of range(1, 7 - lastWeekday)) {
      items.push(
        this._getDateComponent({
          date: moment(date)
            .add(i, 'days')
            .startOf('day'),
          isOtherMonth: true,
        })
      )
    }
    return items
  }

  _getThisMonthDates(date, items) {
    for (const i of range(1, date.daysInMonth() + 1)) {
      const tempDate = moment(date).startOf('day')
      tempDate.set('date', i)
      items.push(this._getDateComponent({ date: tempDate }))
    }
    return items
  }

  _getDateComponent(props) {
    return React.createElement(DateComponent, {
      ...props,
      onDateSelected: this.onDateSelected,
      timeperiod: this.props.timeperiod,
      lastSelectableDate: this.props.lastSelectableDate,
      firstSelectableDate: this.props.firstSelectableDate,
      isFromMonth: this.props.isFromMonth,
      isSingleMonth: this.props.isSingleMonth,
      isEmptyPeriod: this.isEmptyPeriod(),
      key: `${this.props.isFromMonth ? 'start' : ''}-date-${props.date.format('YYYY-MM-DD')}`,
    })
  }

  _getMonthString() {
    if (this.state.firstDate.get('year') === moment().get('year')) {
      return this.state.firstDate.format(this.props.translate('MMMM'))
    }
    return this.state.firstDate.format(this.props.translate('MMMM YYYY'))
  }

  _getFirstDate(props) {
    const lprops = props || this.props
    if (lprops.isFromMonth) {
      return moment(lprops.timeperiod.fromDate).startOf('month')
    }
    return moment(lprops.timeperiod.toDate).startOf('month')
  }

  _hideNextMonth() {
    const lastOfMonth = moment(this.state.firstDate).endOf('month')
    if (this.props.isFromMonth && !this.isEmptyPeriod()) {
      if (!this.props.timeperiod.toDate) return true
      return this.props.timeperiod.toDate.isBefore(lastOfMonth)
    }
    return (this.props.lastSelectableDate && this.props.lastSelectableDate.isBefore(lastOfMonth)) || false
  }

  _hidePreviousMonth() {
    const firstOfMonth = this.state.firstDate
    if (this.props.isFromMonth || this.props.isSingleMonth || this.isEmptyPeriod()) {
      return (
        (this.props.firstSelectableDate &&
          (this.props.firstSelectableDate.isAfter(firstOfMonth) ||
            this.props.firstSelectableDate.isSame(firstOfMonth))) ||
        false
      )
    }

    if (!this.props.timeperiod.fromDate) return true

    return (
      this.props.timeperiod.fromDate.isAfter(firstOfMonth) || this.props.timeperiod.fromDate.isSame(firstOfMonth, 'day')
    )
  }

  isEmptyPeriod(props) {
    const lprops = props || this.props
    return !lprops.timeperiod.toDate && !lprops.timeperiod.fromDate
  }

  render() {
    const buttonModifiers = ['quiet', 's']

    const title_selected_date = { paddingTop: '10px' }

    const dates = {
      display: 'inline-flex',
      flexFlow: 'row wrap',
    }

    const month_name = { textAlign: 'center', padding: '5px 0', margin: '0 00' }

    const dateClass = {
      cursor: 'pointer',
      marginBottom: '5px',
      fontWeight: '700',
      color: '#29BF96',
      transition: 'all 0.15s cubic-bezier(0.23, 1, 0.32, 1)',
    }
    const date_selected = {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      borderTop: '0 rgba(0, 0, 0, 0.15) solid',
      borderBottom: '0 rgba(0, 0, 0, 0.15) solid',
    }

    const next = { padding: '0 7px', minWidth: '0' }
    const previous = { padding: '0 7px', minWidth: '0' }
    const next_disabled = { cursor: 'default' }
    const previous_disabled = { cursor: 'default' }
    const title = {
      flexDirection: 'row',
      alignSelf: 'center',
      lineHeight: '20px',
      textAlign: 'center',
      fontWeight: '600',
    }
    const title_month = { textTransform: 'uppercase', paddingBottom: '10px' }

    return (
      <div
        {...css({
          opacity: '1',
          width: '280px',
          height: 'auto',
          paddingBottom: '20px',
          userSelect: 'none',
        })}
      >
        <div {...css(title)}>
          <span {...css(title_month)}>{this.props.title || ''}</span>
          <span
            {...css(title, date_selected, dateClass, title_selected_date)}
            data-test="datepicker-month__selected-date-title"
            data-touch-feedback
            onClick={this.onMonthTitleClicked}
            role="button"
            tabIndex="0"
          >
            {this._getSelectedDateString()}
          </span>
        </div>
        <div
          {...css({
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: '5px 0',
          })}
        >
          <button
            {...css([previous, this._hidePreviousMonth() && previous_disabled])}
            disabled={this._hidePreviousMonth()}
            modifiers={buttonModifiers}
            onClick={this.onPreviousMonthClicked}
          >
            {/* <Icon className="icon--s icon--quiet-action" name="arrow-left-s" /> */}
          </button>
          <h4 {...css(month_name)}>{this._getMonthString()}</h4>
          <button
            {...css([next, this._hideNextMonth() && next_disabled])}
            disabled={this._hideNextMonth()}
            modifiers={buttonModifiers}
            onClick={this.onNextMonthClicked}
          >
            {/* <Icon className="icon--s icon--quiet-action" name="arrow-right-s" /> */}
          </button>
        </div>
        <div {...css(dates)}>
          {this._getDayLabels()}
          {this._getDates(false)}
        </div>
      </div>
    )
  }
}
