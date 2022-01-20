const router = require('express').Router()
const axios = require('axios')

router.get('/:query', async (req, res) => {
	try {
		const uri = encodeURI(
			`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.params.query}&key=${process.env.GOOGLE_MAPS_API_KEY}`
		)

		const { data } = await axios.get(uri)

		res.json(data.results)
	} catch (err) {
		console.error(err)
		res.status(500).send('server error')
	}
})

module.exports = router
