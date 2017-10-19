import React, { PropTypes, createClass, createFactory, createElement, DOM } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import classnames from 'classnames'
import throttle from 'lodash.throttle'
const ScrollButtons = createFactory(require('./table-scroll-buttons'))
const { div, table, td, tr, th, thead, tbody, tfoot, h4 } = DOM

require('./_table.scss')

export default createClass({

	displayName:  'TableView',

	propTypes: {
		labelColumn: PropTypes.array.isRequired,
		headerRow: PropTypes.array.isRequired,
		dataRows: PropTypes.array.isRequired,
		footerLabel: PropTypes.string,
		title: PropTypes.string,
		footerRow: PropTypes.array,
		rotateHeaders: PropTypes.bool,
		scrollable: PropTypes.bool,
		scrollButtons: PropTypes.bool,
	},

	getDefaultProps() {
		return {scrollable: true}
	},

	componentDidMount() {
		this.tableBody = findDOMNode(this.refs.body)
		this.tableHeadcol = findDOMNode(this.refs.headcol)
		this.wrapper = findDOMNode(this.refs.bodyWrapper)
		this.measure = findDOMNode(this.refs.measure)
		if (this.props.scrollable) {
			window.addEventListener('resize', this.updateOverflow)
			this.updateOverflow()
		}
	},

	componentWillUnmount() {
		if (this.props.scrollable) {
			window.removeEventListener('resize', this.updateOverflow)
		}
	},

	scroll(offsetDirection) {
		const positionLeft = this.tableBody.offsetLeft - this.wrapper.scrollLeft
		const bodySign = offsetDirection === 'right' ? 1 : -1
		// TODO do scrolling
	},

	componentDidUpdate(oldProps) {
		if (oldProps !== this.props && this.props.scrollable) {
			this.updateOverflow()
		}
	},

	getInitialState() {
		return {
			overflowLeft: false,
			overflowRight: false,
			scrollbarHeight: 0,
		}
	},

	render() {
		const props = this.props
		const classes = classnames({
			'table-wrapper': true,
			'table--rotate-headers': props.rotateHeaders,
			'table--has-scroll-buttons': props.scrollable &&
				props.scrollButtons &&
				(this.state.overflowLeft || this.state.overflowRight),
			'table--has-title': props.title,
			'table--overflow-left': this.state.overflowLeft,
			'table--overflow-right': this.state.overflowRight,
			[props.className]: props.className
		})
		return div({className: classes},
			div({
				key: 'measure',
				ref: 'measure',
				style: {
					display: 'block',
					width: '100px',
					height: '100px',
					overflow: 'scroll',
					position: 'absolute',
					top: '-9999px',
				}
			}),
			props.title ? h4({className: 'table__title'}, props.title) : null,
			props.scrollButtons ?
			ScrollButtons({
				scroll: this.scroll,
				showLeft: this.state.overflowLeft,
				showRight: this.state.overflowRight,
			}) : null,
			div({
				className: 'table__headcol',
				style: {marginBottom: this.state.scrollbarHeight},
			},
				table({ref: 'headcol'},
					props.headerRow ? thead({}, tr({}, th({},
						String.fromCharCode(160)
					))) : null,
					tbody({},
						props.labelColumn.map((label, i) => {
							return tr({key: (label.key || label + i)},
								td({}, label.element || label))
						})
					),
					props.footerLabel ?
						tfoot({}, tr({}, td({}, props.footerLabel))) : null,
				)
			),
			div({
				className: 'table__body',
				ref: 'bodyWrapper',
				onScroll: throttle(this.updateOverflow, 300, true),
			},
				table({ref: 'body'},
					thead({},
						tr( {className: 'td--headrow'},
							props.headerRow.map( (header, i) => {
								return th( {key: header.key || header + i},
									header.element || header,
									props.rotateHeaders ?
									div({key: 'spacer', className: 'table__header-spacer'}) : null
								)
							})
						)
					), tbody({},
						props.dataRows.map((row, j) => {
							return tr({
								key: 'row' + j + props.labelColumn[j] && props.labelColumn[j].key
							},
								row.map((value, i) => {
									return td({key: value.key || '' + value + i},
										value.element || value)
								})
							)
						})
					), tfoot({},
						tr({className: 'tr--totalrow'},
							props.footerRow.map( (value, i) => {
								return td({key: value.key || value + i}, value.element || value)
							})
						)
					)
				)
			)
		)
	},

	updateOverflow() {
		const positionLeft = this.tableBody.offsetLeft - this.wrapper.scrollLeft
		const scrollWidth = this.tableBody.scrollWidth
		const bodyWrapperWidth = this.wrapper.offsetWidth
		const scrollValue = scrollWidth + positionLeft - bodyWrapperWidth

		const newState = {
			overflowLeft: positionLeft < -1,
			overflowRight: scrollValue > 1,
		}

		if (newState && (this.state.overflowRight !== newState.overflowRight ||
				this.state.overflowLeft !== newState.overflowLeft)) {
			this.setState({
				overflowLeft: positionLeft < -1,
				overflowRight: scrollValue > 1,
				scrollbarHeight: newState.overflowLeft || newState.overflowRight ?
					this.measure.offsetWidth - this.measure.clientWidth : 0,
			})
		}
	},
})
