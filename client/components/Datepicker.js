import React, { PropTypes } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import Datepicker from '../../src/timeperiod/Datepicker'
import Daterangepicker from '../../src/timeperiod/Daterangepicker'
import moment from 'moment'

import './layout.scss'

export default class Layout extends React.Component {

	static propTypes = {
	}

	shouldComponentUpdate = shouldPureComponentUpdate
	constructor(props) {
		super(props)
		this.state = {
			single: {
				fromDate: moment().startOf('day'),
				toDate: moment().startOf('day'),
			},
			period: {
				fromDate: moment().startOf('day'),
				toDate: moment().startOf('day').add(20, 'days'),
			}
		}
	}

	render() {
		return (
			<div>
				<p>
					The datepicker depends on moment.js.
					It supports both single dates and date ranges.
				</p>
				<h3>Single date</h3>
				<Datepicker
					timeperiod={this.state.single}
					firstSelectableDate={moment().subtract(2, 'months')}
					lastSelectableDate={moment().add(2, 'months')}
					onTimeperiodChange={this.onSingleChange.bind(this)}
				/>
				<h3>Date range</h3>
				<Daterangepicker
					timeperiod={this.state.period}
					firstSelectableDate={moment().subtract(2, 'months')}
					lastSelectableDate={moment().add(2, 'months')}
					onTimeperiodChange={this.onPeriodChange.bind(this)}
				/>
			</div>
		)
	}

	onSingleChange(timeperiod) {
		this.setState({single: timeperiod})
	}
	onPeriodChange(timeperiod) {
		this.setState({period: timeperiod})
	}

}
