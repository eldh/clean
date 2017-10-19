import React, { PropTypes } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import Radiobutton from '../../src/Radiobutton'

export default class RadiobuttonView extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate

	constructor(props) {
		super(props)
		this.state = {selected: 1}
	}

	render() {
		return (
			<div>
				<p>
					A pretty simple wrapper around a stylable Radiobutton.
				 </p>
				<div style={{alignItems: 'flex-start'}}>
					<Radiobutton
						onItemSelected={() => this.setState({selected: 1})}
						checked={this.state.selected === 1}
						label={'Hello'}
					/>
					<Radiobutton
						onItemSelected={() => this.setState({selected: 2})}
						checked={this.state.selected === 2}
						label={'Hello'}
					/>
				</div>
			</div>
		)
	}

}
