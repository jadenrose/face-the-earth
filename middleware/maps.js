const axios = require('axios')

module.exports = async (req, res, next) => {
	try {
		const uri = encodeURI(
			`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.params.query}&key=${process.env.GOOGLE_MAPS_API_KEY}`
		)

		const results = await axios.get(uri)

		res.map = results.data

		next()
	} catch (err) {
		console.error(err)
		res.map = null
	}
}
