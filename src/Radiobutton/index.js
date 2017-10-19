import React, { PropTypes, DOM } from 'react'

import shouldPureComponentUpdate from 'react-pure-render/function'

const { label, input, span, div } = DOM

import './radiobutton.scss'

export default class Radiobutton extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate

	propTypes = {
		label: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		onItemSelected: PropTypes.func.isRequired,
		className: PropTypes.string,
		id: PropTypes.string,
		item: PropTypes.number,
		defaultChecked: PropTypes.bool,
	}

	render() {
		return label( {
			htmlFor: this.props.id,
			'data-touch-feedback': true,
			className: 'radiobutton ' + this.props.className,
		},
			input({
				...this.props,
				className: 'radiobutton__input',
				type: 'radio',
				'data-touch-feedback': true,
				onChange: this.onItemSelected,
				defaultChecked: this.props.defaultChecked,
			}),
			div({ className: 'radiobutton__indicator'}),
			span({ className: 'radiobutton__label'}, this.props.label),
		)
	}

	onItemSelected() {
		this.props.onItemSelected(this.props.item)
	}
}
