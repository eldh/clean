import React, { createClass, DOM } from 'react'
import { range } from 'ramda'

const classnames = require('classnames')
const moment = require('moment')
const DateComponent = React.createFactory(require('./DatepickerDate'))
const Icon = React.createFactory(require('../Icon'))
const Button = React.createFactory(require('../Button'))

const { div, span, h4 } = DOM

export default createClass({

	displayName: 'DatePickerMonth',

	propTypes: {
		timeperiod: React.PropTypes.object.isRequired,
		onDateSelected: React.PropTypes.func.isRequired,
		firstSelectableDate: React.PropTypes.object,
		lastSelectableDate: React.PropTypes.object,
		isFromMonth: React.PropTypes.bool,
		isSingleMonth: React.PropTypes.bool,
		translate: React.PropTypes.func,
	},

	getDefaultProps() {
		return {
			translate: (str) => str,
			isFromMonth: false,
			isSingleMonth: false,
		}
	},

	getInitialState() {
		return {
			firstDate: this._getFirstDate(),
			isEmptyPeriod: this.isEmptyPeriod(),
		}
	},

	render() {
		const buttonModifiers = ['quiet', 's']
		const datepickerClasses = classnames({
			'datepicker': true,
			'datepicker--start-month': this.props.isFromMonth,
			'datepicker--end-month': !this.props.isFromMonth,
		})
		const nextClasses = classnames({
			'datepicker__next': true,
			'datepicker__next--disabled': this._hideNextMonth(),
		})
		const previousClasses = classnames({
			'datepicker__previous': true,
			'datepicker__previous--disabled': this._hidePreviousMonth(),
		})
		return div({className: datepickerClasses},
			div( {className: 'datepicker__title'},
				span({className: 'datepicker__title-month'}, this.props.title || ''),
				span({
					className: 'datepicker__title-selected-date link',
					'data-touch-feedback': true,
					'data-test': 'datepicker-month__selected-date-title',
					onClick: this.onMonthTitleClicked,
				}, this._getSelectedDateString()),
			),
			div({className: 'datepicker__head'},
				Button({
					modifiers: buttonModifiers,
					disabled: this._hidePreviousMonth(),
					className: previousClasses,
					onClick: this.onPreviousMonthClicked,
				}, Icon({className: 'icon--s icon--quiet-action', name: 'arrow-left-s'})),
				h4({className: 'datepicker__month-name'}, this._getMonthString()),
				Button({
					modifiers: buttonModifiers,
					className: nextClasses,
					disabled: this._hideNextMonth(),
					onClick: this.onNextMonthClicked,
				}, Icon({className: 'icon--s icon--quiet-action', name: 'arrow-right-s'})),
			),
			div({className: 'datepicker__dates'},
				this._getDayLabels(),
				this._getDates(false),
			),
		)
	},

	componentWillReceiveProps(nextProps) {
		this.setState({
			isEmptyPeriod: this.isEmptyPeriod(nextProps),
			firstDate: this._getFirstDate(nextProps),
		})
	},

	_getSelectedDateString() {
		const date = this.props.isFromMonth ?
			this.props.timeperiod.fromDate : this.props.timeperiod.toDate
		if (!date) return ''
		if (date.get('year') === moment().get('year')) {
			return date.format && date.format(this.props.translate('MMMM Do'))
		}
		return date.format && date.format(this.props.translate('MMMM Do YYYY'))
	},

	_getSelectedDate() {
		if (this.props.isFromMonth) {
			return this.props.timeperiod.fromDate.clone()
		}
		return this.props.timeperiod.toDate.clone()
	},

	_getDayLabels() {
		return range(0, 7).map((i) => {
			return div({
				className: 'datepicker__daylabel',
				key: `${this.props.isFromMonth}-weekday-${i}`,
			}, moment().weekday(i).format('dd'))
		})
	},

	_getDates(next) {
		const date = moment(this.state.firstDate)
		if (next) date.add(1, 'months')
		let items = this._getLastMonthDates(date, [])
		items = this._getThisMonthDates(date, items)
		items = this._getNextMonthDates(date, items)
		return items
	},

	_getLastMonthDates(date, items) {
		const firstWeekday = moment(date).weekday() + 1
		if (firstWeekday === 1) return items
		for (const i of range(1, firstWeekday)) {
			items.push(this._getDateComponent({
				date: moment(date).subtract(firstWeekday - i, 'days').startOf('day'),
				isOtherMonth: true,
			}))
		}
		return items

	},

	_getNextMonthDates(d, items) {
		const date = moment(d)
			.endOf('month')
			.startOf('day')
		const lastWeekday = date.weekday()
		if (lastWeekday === 6) return items
		for (const i of range(1, 7 - lastWeekday)) {
			items.push( this._getDateComponent({
				date: moment(date).add(i, 'days').startOf('day'),
				isOtherMonth: true,
			}))
		}
		return items
	},

	_getThisMonthDates(date, items) {
		for (const i of range(1, date.daysInMonth() + 1)) {
			const tempDate = moment(date).startOf('day')
			tempDate.set('date', i)
			items.push(this._getDateComponent({date: tempDate}))
		}
		return items
	},

	_getDateComponent(props) {
		return DateComponent({...props,
			onDateSelected: this.onDateSelected,
			timeperiod: this.props.timeperiod,
			lastSelectableDate: this.props.lastSelectableDate,
			firstSelectableDate: this.props.firstSelectableDate,
			isFromMonth: this.props.isFromMonth,
			isSingleMonth: this.props.isSingleMonth,
			isEmptyPeriod: this.isEmptyPeriod(),
			key: `${this.props.isFromMonth ? 'start' : ''}-date-${props.date.format('YYYY-MM-DD')}`,
		})
	},

	_getMonthString() {
		if (this.state.firstDate.get('year') === moment().get('year')) {
			return this.state.firstDate.format(this.props.translate('MMMM'))
		}
		return this.state.firstDate.format(this.props.translate('MMMM YYYY'))
	},

	_getFirstDate(props) {
		const lprops = props || this.props
		if (lprops.isFromMonth) {
			return moment(lprops.timeperiod.fromDate).startOf('month')
		}
		return moment(lprops.timeperiod.toDate).startOf('month')
	},

	_hideNextMonth() {
		const lastOfMonth = moment(this.state.firstDate).endOf('month')
		if (this.props.isFromMonth && !this.isEmptyPeriod()) {
			if (!this.props.timeperiod.toDate) return true
			return this.props.timeperiod.toDate.isBefore(lastOfMonth)
		}
		return this.props.lastSelectableDate &&
			this.props.lastSelectableDate.isBefore(lastOfMonth) ||
			false
	},

	_hidePreviousMonth() {
		const firstOfMonth = this.state.firstDate
		if (this.props.isFromMonth || this.props.isSingleMonth || this.isEmptyPeriod()) {
			return this.props.firstSelectableDate &&
				(this.props.firstSelectableDate.isAfter(firstOfMonth) ||
				this.props.firstSelectableDate.isSame(firstOfMonth)) ||
				false
		}

		if (!this.props.timeperiod.fromDate) return true

		return this.props.timeperiod.fromDate.isAfter(firstOfMonth) ||
			this.props.timeperiod.fromDate.isSame(firstOfMonth, 'day')
	},

	isEmptyPeriod(props) {
		const lprops = props || this.props
		return (!lprops.timeperiod.toDate && !lprops.timeperiod.fromDate)
	},

	onNextMonthClicked() {
		if (!this._hideNextMonth()) {
			this.setState({
				firstDate: moment(this.state.firstDate).add(1, 'months')
			})
		}
	},

	onPreviousMonthClicked() {
		if (!this._hidePreviousMonth()) {
			this.setState({
				firstDate: moment(this.state.firstDate).subtract(1, 'months')
			})
		}
	},

	onDateSelected(e) {
		this.props.onDateSelected(e.currentTarget.dataset.formattedDate)
	},

	onMonthTitleClicked() {
		this.setState( {
			firstDate: this._getSelectedDate().startOf('month')
		})
	},

})
