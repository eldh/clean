{createFactory, createClass, createElement, PropTypes } = require 'react'
{ Mixin } = require('react-pure-render')

Button = createFactory require '../Button'
Icon = createFactory require '../Icon'

module.exports = createClass

	displayName:  'TableScrollButtons'

	mixins: [Mixin]

	propTypes:
		showLeft: PropTypes.bool.isRequired
		showRight: PropTypes.bool.isRequired
		scroll: PropTypes.func.isRequired

	render: ->
		createElement 'div', {className: 'table-scroll-buttons'},
			Button
				modifiers: ['quiet']
				className: "table-scroll-buttons__button #{ 'hidden' unless @props.showLeft}"
				onClick: @onScrollLeftClicked
			,  Icon {className: 'icon--s icon--quiet-action', name: 'arrow-left-s' }
			Button
				modifiers: ['quiet']
				className: "table-scroll-buttons__button #{ 'hidden' unless @props.showRight}"
				onClick: @onScrollRightClicked
			, Icon {className: 'icon--s icon--quiet-action', name: 'arrow-right-s' }

	onScrollRightClicked: ->
		@props.scroll 'right'

	onScrollLeftClicked: ->
		@props.scroll 'left'
