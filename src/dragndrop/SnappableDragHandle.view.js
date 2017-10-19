import React, { createFactory, createClass, PropTypes } from 'react'
const { Mixin } = require('react-pure-render')

const DragHandle = createFactory(require('./DragHandle'))

export default createClass({

	displayName: 'SnappableDragHandle',

	propTypes: {
		onDrag: PropTypes.func.isRequired,
		onDragStart: PropTypes.func,
		onDragEnd: PropTypes.func,
		style: PropTypes.object,
		className: PropTypes.string,
		preventDefault: PropTypes.bool,
		snapDistance: PropTypes.number,
	},

	mixins: [Mixin],

	getInitialState() {
		return {
			position: 0,
		}
	},

	getDefaultProps() {
		return {
			onDragStart: () => null,
			onDragEnd: () => null,
			style: {},
			className: '',
			preventDefault: false,
			snapDistance: 0,
		}
	},

	render() {
		const { onDragEnd, style, className, preventDefault } = this.props
		return DragHandle({
			onDrag: this._onDrag,
			onDragStart: this._onDragStart,
			onDragEnd,
			style,
			className,
			preventDefault,
		})
	},

	_onDragStart() {
		this.setState({position: 0})
		this.props.onDragStart()
	},

	_onDrag(pos) {
		const { snapDistance } = this.props
		const { position } = this.state
		const newPosition = position + pos

		if (Math.abs(newPosition) >= snapDistance) {
			const excess = snapDistance ? newPosition % snapDistance : 0
			const change = newPosition - excess
			const changeBySnap = snapDistance ? change / snapDistance	: change
			this.setState({position: excess})
			this.props.onDrag(changeBySnap)
		} else {
			this.setState({position: newPosition})
		}
	},
})
