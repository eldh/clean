import React, { PropTypes, createElement } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import { mapObjIndexed, values } from 'ramda'
import './component-view.scss'
const list = {
	datepicker: {
		name: 'Date picker',
		component: require('./Datepicker')
	},
	button: {
		name: 'Button',
		component: require('./Button')
	},
	checkbox: {
		name: 'Checkbox',
		component: require('./Checkbox')
	},
	radiobutton: {
		name: 'Radiobutton',
		component: require('./Radiobutton')
	},
	table: {
		name: 'Table',
		component: require('./Table')
	},
}

export default class Layout extends React.Component {

	static propTypes = {
	}

	constructor(props) {
		super(props)
		this.state = {selected: 'datepicker'}
	}
	shouldComponentUpdate = shouldPureComponentUpdate

	render() {
		return (
			<div>
				{this.renderComponentList()}
				{this.renderSelectedComponent()}
			</div>
		)
	}

	renderComponentList() {
		return values(mapObjIndexed(({name, component}, id) => {
			return (
				<a key={id} href={`#${id}`} onClick={this.onSelected(id).bind(this)}>{name}</a>
			)
		}, list))
	}

	renderSelectedComponent() {
		const comp = list[this.state.selected].component
		return (
				<div className='component-view'>
					<h2>{list[this.state.selected].name}</h2>
					{createElement(comp)}
				</div>
			)
	}

	onSelected(id) {
		return () => {
			this.setState({selected: id})
		}
	}
}
