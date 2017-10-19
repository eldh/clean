import React, { createClass, PropTypes, DOM } from 'react'
const sanitizeProps = (props) => delete props.ref

const { div } = DOM

export default createClass({

	displayName: 'DragHandleLayer',

	propTypes: {
		isOpen: PropTypes.bool.isRequired,
		onClose: PropTypes.func,
		ariaHideApp: PropTypes.bool,
		closedCallback: PropTypes.func,
	},

	getDefaultProps() {
		return {
			isOpen: true,
			closeTimeoutMS: 0,
		}
	},

	componentDidMount() {
		this.node = document.createElement('div')
		this.node.className = 'ReactDragHandleLayerContent'
		document.body.appendChild(this.node)
		this.renderPortal(this.props)
	},

	componentWillReceiveProps(newProps) {
		this.renderPortal(newProps)
	},

	componentWillUnmount() {
		React.unmountComponentAtNode(this.node)
		document.body.removeChild(this.node)
	},

	renderPortal(props) {
		sanitizeProps(props)
		const content = div(props)
		if (this.portal) this.portal.setProps(props)
		else this.portal = React.render(content, this.node)
	},

	render() {
		return null
	},

})

