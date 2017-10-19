import React, { createClass, createFactory, createElement, DOM } from 'react'
const Table = require('../../src/Table')

const headers = [
	'Mega Man',
	'Donkey Kong',
	'Alex Kidd',
	'Zelda',
	'Mario',
	'Simon Belmont',
	'Samus Aran',
	'Max Payne',
]

const categories = [
	'Strength',
	'Stamina',
	'Power',
	'Agility',
	'Speed',
	'Technique',
	'Cleverness',
]

export default createClass({

	displayName:  'TableView',

	render() {
		return (
			<div>
				<Table
					footerLabel='Total'
					scrollButtons={true}
					labelColumn={categories}
					headerRow={headers}
					dataRows={() => {
						return categories.map((i) => {
							return headers.map((i) => '' + parseInt(Math.random() * 100, 10))
						})
					}()}
					footerRow={() => {
						return headers.map((i) => '' + parseInt(Math.random() * 100, 10))
					}()}
				/>
			</div>
		)
	},
})
