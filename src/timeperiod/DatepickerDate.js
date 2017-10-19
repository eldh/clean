import React, { createClass, DOM } from 'react'

import classnames from 'classnames'

const { div } = DOM

export default createClass({

	displayName: 'DatePickerDate',

	propTypes: {
		timeperiod: React.PropTypes.object.isRequired,
		date: React.PropTypes.object.isRequired,
		onDateSelected: React.PropTypes.func.isRequired,
		isFromMonth: React.PropTypes.bool.isRequired,
		isSingleMonth: React.PropTypes.bool,
	},

	getDefaultProps() {
		return {isSingleMonth: false}
	},

	getInitialState() {
		return {
			selected: false,
			disabled: false,
		}
	},

	render() {
		const { date } = this.props
		const classes = classnames({
			'datepicker__date': true,
			'datepicker__date--selected': this.isSelected(),
			'datepicker__date--disabled': this.isDisabled(),
			'datepicker__date--selected-first': this.isFirstSelected(),
			'datepicker__date--selected-last': this.isLastSelected(),
			'datepicker__date--active': this.isActive(),
			'datepicker__date--other-month': this.props.isOtherMonth,
		})

		return div({
			className: classes,
			'data-formatted-date': date.format('YYYY-MM-DD'),
			'data-date': date.format(),
			'data-touch-feedback': true,
			onClick: this.onDateClicked,
		}, date.get('date'))
	},

	isSelected() {
		const { date } = this.props
		const startDate = this.props.timeperiod.fromDate
		const endDate = this.props.timeperiod.toDate
		return (!startDate && date.isBefore(endDate)) ||
			(!endDate && date.isAfter(startDate)) ||
			(date.isBefore(endDate) && date.isAfter(startDate)) ||
			this.isFirstSelected() ||
			this.isLastSelected()
	},

	isFirstSelected() {
		return this.props.date.isSame(this.props.timeperiod.fromDate)
	},

	isLastSelected() {
		return this.props.date.isSame(this.props.timeperiod.toDate)
	},

	isDisabled() {
		const {
			date,
			isSingleMonth,
			isEmptyPeriod,
			timeperiod,
			isFromMonth,
			firstSelectableDate,
			lastSelectableDate
		} = this.props

		if (isSingleMonth || isEmptyPeriod) {
			return firstSelectableDate && date.isBefore(firstSelectableDate) ||
				lastSelectableDate && date.isAfter(lastSelectableDate) ||
				false
		} else if (isFromMonth) {
			return (timeperiod.toDate && date.isAfter(timeperiod.toDate)) ||
				firstSelectableDate && date.isBefore(firstSelectableDate) ||
				firstSelectableDate && date.isSame(firstSelectableDate)
		}
		return (timeperiod.fromDate && date.isBefore(timeperiod.fromDate)) ||
				lastSelectableDate && date.isAfter(lastSelectableDate)
	},

	isActive() {
		const {
			date,
			timeperiod,
			isFromMonth,
		} = this.props

		if (isFromMonth) {
			if (!timeperiod.fromDate) return false
			return date.isSame(timeperiod.fromDate, 'day')
		}
		if (!timeperiod.toDate) return false
		return date.isSame(timeperiod.toDate, 'day')
	},

	onDateClicked(e) {
		if (!this.isDisabled()) {
			return this.props.onDateSelected(e)
		}
	}
})
