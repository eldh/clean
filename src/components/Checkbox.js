import React, { PropTypes } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import Checkbox from '../../src/Checkbox'

export default class CheckboxView extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate

	render() {
		return (
			<div>
				<p>
					A pretty simple wrapper around a stylable checkbox.
				 </p>
				<div style={{alignItems: 'flex-start'}}>
					<Checkbox onClick={() => alert('Click')} label={'Hello'} >Hello</Checkbox>
				</div>
			</div>
		)
	}

}
