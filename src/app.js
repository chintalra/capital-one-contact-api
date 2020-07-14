const express = require('express')
const mongoose = require('mongoose')
const contactRoute = require('./routes/contacts')

const app = express()

app.use(express.json())

app.use('/contacts', contactRoute)

/**
 * Common middleware for handle error
 * @param {Error} err - JavaScript error bbject
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {RequestHandler} next = Express request handler callback function
 */
app.use((err, req, res, next) => {
    console.error(err)
    const status = err.statusCode || 500
    const msg = err.message
    const data = err.data
    return res.status(status).json({
        msg,
        data
    })
})

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/contact_app'

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => {
        const PORT = process.env.PORT || 3000
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch((err) => console.log(err.message))

module.exports = app
