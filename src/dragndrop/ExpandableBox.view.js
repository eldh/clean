import React, { DOM, createFactory, createClass } from 'react'

const DragHandle = createFactory(require('./DragHandle'))

const { div, h4 } = DOM

export default createClass({

	displayName: 'ExpandableBox',

	propTypes: {
		className: React.PropTypes.string,
	},

	getInitialState() {
		return {
			left: 10,
			right: 10,
		}
	},

	render() {
		return div({style: {position: 'relative', width: '100%'}},
			div({
				className: 'expandable card no-margin',
				style: this._getStyles(),
			},
				DragHandle({
					onDrag: this.handleDragLeft,
					className: 'drag-handle--x drag-handle--left',
				}),
				DragHandle({
					onDrag: this.handleDragRight,
					className: 'drag-handle--x drag-handle--right',
				}),
				h4({}, 'Drag the edges'),
			)
		)
	},

	handleDragLeft(x) {
		this.setState({
			left: Math.max(this.state.left - x, 0)
		})
	},

	handleDragRight(x) {
		this.setState({
			right: Math.max(this.state.right + x, 0)
		})
	},

	_getStyles() {
		const { left, right } = this.state
		return {
			position: 'relative',
			backgroundColor: 'rgba(0,0,0,0.2)',
			left: left,
			right: right,
			width: `calc(100% - ${+left}px - ${+right}px)`
		}
	},
})
