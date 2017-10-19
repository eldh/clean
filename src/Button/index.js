require('./button.scss')
import React from  'react'
import classnames from 'classnames'

export default class Button extends React.Component {
	static propTypes = {
		className: React.PropTypes.string,
		selected: React.PropTypes.bool,
		disabled: React.PropTypes.bool,
		responsiveTouch: React.PropTypes.bool,
		modifiers: React.PropTypes.array,
		dataset: React.PropTypes.object,
		element: React.PropTypes.oneOfType([
			React.PropTypes.func,
			React.PropTypes.string,
		]),
	}

	static defaultProps = {
		modifiers: ['normal'],
		element: 'div',
	}
	render() {
		const { responsiveTouch, disabled, loading, element, children } = this.props
		const buttonProps = {
			...this.props,
			className: this.getClasses(),
			type: 'button',
			ariaRole: 'button',
			disabled: loading || disabled,
			onClick: !responsiveTouch ? this.onClick.bind(this) : null,
			onTouchStart: responsiveTouch ? this.onClick.bind(this) : null,
			onMouseDown: responsiveTouch ? this.onClick.bind(this) : null,
			'data-touch-feedback': (loading || disabled) ? null : true,
		}
		return React.createElement(element, buttonProps, children)
	}
	getClasses() {
		const classes = {
			'button': true,
			'button--loading': this.props.loading,
			'button--selected': this.props.selected,
			'button--disabled': this.props.disabled,
			[this.props.className]: !!this.props.className
		}
		const modifiers = this.props.modifiers.reduce((classObj, mod) => {
			classObj[`button--${mod}`] = true
			return classObj
		}, classes)
		return classnames(classes)
	}

	onClick(e) {
		const { responsiveTouch, disabled, loading, onClick } = this.props
		if (!(loading || disabled)) {
			onClick && onClick(e)
			if (responsiveTouch) {
				e.stopPropagation()
				e.preventDefault()
			}
		}
	}
}
