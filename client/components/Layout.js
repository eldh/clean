import React, { PropTypes } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import ComponentsView from './ComponentsView'

import './layout.scss'

export default class Layout extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate

	render() {
		const { dispatch } = this.props
		return (
			<main id='app-view' className='layout'>
				<h1>React Components</h1>
				<p>We have made a few React components that we think could be
				useful to other people.</p>
				<ComponentsView />
			</main>
		)
	}
}
