import React, { DOM, createClass, PropTypes, createFactory } from 'react'
const DragHandleLayer = createFactory(require('./DragHandleLayer'))
const { Mixin } = require('react-pure-render')

const { div } = DOM

export default createClass({

	displayName: 'DragHandle',

	propTypes: {
		onDrag: PropTypes.func.isRequired,
		onDragStart: PropTypes.func,
		onDragEnd: PropTypes.func,
		style: PropTypes.object,
		className: PropTypes.string,
		preventDefault: PropTypes.bool,
	},

	mixins: [Mixin],

	getInitialState() {
		return {
			dragging: false,
			lastPos: 0,
		}
	},

	getDefaultProps() {
		return {
			onDragStart: () => null,
			onDragEnd: () => null,
			style: {},
			className: '',
			preventDefault: false,
		}
	},

	render() {
		return div({
			className: 'drag-handle ' + this.props.className,
			style: this.props.style,
			onMouseDown: this.startMouseDrag,
			onTouchStart: this.startTouchDrag,
			onTouchMove: this.handleTouchDrag,
		},
			this.state.dragging ? this._renderLayer() : null
		)
	},

	_renderLayer() {
		return DragHandleLayer({
			className: 'drag-handle__layer',
			onMouseMove: this.handleMouseDrag,
			onTouchMove: this.handleTouchDrag,
			onMouseUp: this.endDrag,
			onMouseLeave: this.endDrag,
			onTouchEnd: this.endDrag,
		})
	},

	startMouseDrag(e) {
		this.props.onDragStart()
		this.setState({dragging: true, lastPos: {x: e.clientX, y: e.clientY} })
	},

	startTouchDrag(e) {
		this.props.onDragStart()
		const touch = e.touches[0]
		this.setState({dragging: true, lastPos: {x: touch.clientX, y: touch.clientY} })
	},

	handleMouseDrag(e) {
		this.handleDrag({x: e.clientX, y: e.clientY}, e)
	},

	handleTouchDrag(e) {
		const touch = e.touches[0]
		this.handleDrag({x: touch.clientX, y: touch.clientY}, e)
	},

	handleDrag(pos, e) {
		const { lastPos, dragging } = this.state
		const { onDrag, preventDefault } = this.props
		if(dragging) {
			onDrag(lastPos.x - pos.x, lastPos.y - pos.y)
		}
		this.setState({lastPos: {x: pos.x, y: pos.y} })
		if (preventDefault) e.preventDefault()
	},

	endDrag() {
		this.props.onDragEnd()
		this.setState({dragging: false})
	},
})
