import React, { createClass, DOM } from 'react'
import moment from 'moment'
const MonthComponent = React.createFactory(require('./DatepickerMonth'))

const { div } = DOM

import './datepicker.scss'

export default class DatePicker extends React.Component {
	static propTypes = {
		timeperiod: React.PropTypes.object.isRequired,
		onTimeperiodChange: React.PropTypes.func.isRequired,
		lastSelectableDate: React.PropTypes.object,
		translate: React.PropTypes.func,
	}

	getDefaultProps() {
		return {
			firstSelectableDate: moment(),
			translate: str => str,
			lastSelectableDate: null,
			timeperiod: {
				fromDate: moment().startOf('day'),
				toDate: moment().startOf('day'),
			},
		}
	}
	onDateSelected(newDate) {
		this.props.onTimeperiodChange({
			...this.props.timeperiod,
			fromDate: moment(newDate),
			toDate: moment(newDate),
		})
	}

	render() {
		return div(
			{ className: 'datepicker-wrapper daterangepicker' },
			MonthComponent({
				timeperiod: this.props.timeperiod,
				onDateSelected: this.onDateSelected,
				isSingleMonth: true,
				lastSelectableDate: this.props.lastSelectableDate,
				firstSelectableDate: this.props.firstSelectableDate,
				translate: this.props.translate,
			})
		)
	}
}
