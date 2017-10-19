Style = require '../styles/generated/props'

module.exports = React.createClass

	displayName: 'LazyRender'

	getDefaultProps: ->
		transitionSpeed: Style.transitionSpeed

	getInitialState: -> @props

	componentWillReceiveProps: (newProps) -> setTimeout(
		(=> @setState React.Children.only(newProps.children).props),
		@props.transitionSpeed
	)

	shouldComponentUpdate: (newProps, newState) -> @state isnt newState

	render: -> React.cloneElement React.Children.only(@props.children), @state
