const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const cors = require('cors')
const history = require('connect-history-api-fallback')

const connectDB = require(path.join(__dirname, './db'))

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
	const morgan = require('morgan')
	app.use(morgan('dev'))
}

app.use(express.json())
app.use(cors())

app.use('/api/auth', require(path.join(__dirname, './routes/api/auth')))
app.use('/api/users', require(path.join(__dirname, './routes/api/users')))
app.use('/api/artists', require(path.join(__dirname, './routes/api/artists')))
app.use('/api/articles', require(path.join(__dirname, './routes/api/articles')))
app.use('/api/shows', require(path.join(__dirname, './routes/api/shows')))
app.use('/api/venues', require(path.join(__dirname, './routes/api/venues')))
app.use('/api/videos', require(path.join(__dirname, './routes/api/videos')))
app.use('/api/bookings', require(path.join(__dirname, './routes/api/bookings')))
app.use(
	'/api/subscribe',
	require(path.join(__dirname, './routes/api/subscribe'))
)
app.use('/api/maps', require(path.join(__dirname, './routes/api/maps')))
app.use('/api/images', require(path.join(__dirname, './routes/api/images')))

app.use(history())
app.use('/', serveStatic(path.join(__dirname, 'client', 'dist')))

app.get(/.*/, (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'dist'))
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`)
})
