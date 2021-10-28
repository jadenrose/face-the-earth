const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
    const morgan = require('morgan')
    app.use(morgan('dev'))
}

app.use(express.json())
app.use(cors({ origin: 'http://localhost:8080' }))

app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/artists', require('./routes/api/artists'))
app.use('/api/articles', require('./routes/api/articles'))
app.use('/api/shows', require('./routes/api/shows'))
app.use('/api/venues', require('./routes/api/venues'))
app.use('/api/videos', require('./routes/api/videos'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
