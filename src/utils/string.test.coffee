s = require './string'

describe 'string getSpaceString', ->
	it 'returns spaces', ->
		s.getSpaceString(1).should.equal String.fromCharCode(160)

describe 'string truncate', ->
	it 'returns truncated string', ->
		s.truncate('Hiphoposaurus', 3).should.equal 'Hip…'
	it 'returns untruncated string when limit is longer than string', ->
		s.truncate('Hiphoposaurus', 30).should.equal 'Hiphoposaurus'
