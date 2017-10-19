Button = React.createFactory require './Button'

module.exports = React.createClass

	displayName: 'TabView'

	propTypes:
		items: React.PropTypes.array.isRequired
		names: React.PropTypes.array.isRequired
		defaultSelected: React.PropTypes.number
		onTabClicked: React.PropTypes.func

	getInitialState: ->
		selected: @props.defaultSelected or 0

	render: ->
		React.createElement 'div', {className: 'tab-view'},
			@getTabs()
			@getTabContent()

	getTabs: ->
		React.createElement 'div', {className: 'btn-group flex-center'},
			for name, i in @props.names
				Button
					modifiers: ['quiet']
					className: 'btn-group__btn'
					selected: @state.selected is i
					key: i
					dataset: {tab: i}
					onClick: @onTabClicked
				, name

	getTabContent: ->
		React.createElement 'div', {className: 'tab-view__content', key: @state.selected},
			@props.items[@state.selected]

	onTabClicked: (e) ->
		selected = parseInt e.target.dataset.tab
		@setState
			selected: selected

		@props.onTabClicked?(selected, e)
