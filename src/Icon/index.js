import React from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'

import './icon.scss'

export default class Icon extends React.Component {

	constructor(props) {
		super(props)
		this.state =  {
			icon: require(`./svg/${this.props.name}.svg`)
		}
	}

	shouldComponentUpdate = shouldPureComponentUpdate

	render() {
		const { className, onClick } = this.props
		return (
		<div
			dangerouslySetInnerHTML={{__html: this.state.icon}
			}
			className={'icon ' + className}
			onClick={onClick}
		>
		</div>
		)
	}
}
