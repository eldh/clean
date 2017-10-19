import React, {createClass, PropTypes, DOM} from 'react'
import moment from 'moment'

const DatepickerMonth = React.createFactory(require('./DatepickerMonth'))

const { div } = DOM

export default createClass({

	displayName: 'DateRangePicker',

	propTypes: {
		timeperiod: PropTypes.object.isRequired,
		onTimeperiodChange: PropTypes.func.isRequired,
		translate: PropTypes.func,
		allowOpenEnds: PropTypes.bool,
	},

	getDefaultProps() {
		return {
			firstSelectableDate: null,
			translate: (str) => str,
			lastSelectableDate: null,
			allowOpenEnds: true,
			timeperiod: {
				fromDate: moment(),
				toDate: moment('2015-07-01', 'YYYY-MM-DD'),
			}
		}

	},

	render() {
		return div({className: 'datepicker-wrapper daterangepicker'},
			DatepickerMonth({
				title: this.props.translate('From'),
				timeperiod: this.props.timeperiod,
				firstSelectableDate: this.props.firstSelectableDate,
				lastSelectableDate: this.props.lastSelectableDate,
				onDateSelected: this.onStartDateSelected,
				isFromMonth: true,
				translate: this.props.translate,
			}),
			DatepickerMonth({
				title: this.props.translate('To'),
				timeperiod: this.props.timeperiod,
				firstSelectableDate: this.props.firstSelectableDate,
				lastSelectableDate: this.props.lastSelectableDate,
				onDateSelected: this.onEndDateSelected,
				isFromMonth: false,
				translate: this.props.translate,
			}),
		)
	},

	onStartDateSelected(newDate) {
		return this.onDateSelected(newDate, 'fromDate')
	},

	onEndDateSelected(newDate) {
		this.onDateSelected(newDate, 'toDate')
	},

	onDateSelected(newDate, position) {
		const oldPosition = this.props.timeperiod[position]
		const selectedDate = moment(newDate)
		const newPosition = oldPosition && oldPosition.isSame(selectedDate) ?
			this.props.allowOpenEnds ? null : selectedDate
			: selectedDate
		this.props.onTimeperiodChange({
			...this.props.timeperiod,
			[position]: newPosition,
		})

	},

})
