
{curry} = require 'ramda' # auto_require:funp

module.exports =
	getSpaceString: (length) ->
		returnString = ''
		for i in [0...length]
			returnString += String.fromCharCode 160
		returnString

	truncate: (str, length) ->
		if str.length > length
			str.substr(0, length) + '…'
		else
			str

	startsWith: curry (start, string) -> string.indexOf(start) is 0
