const mongoose = require('mongoose')
const { isEmail, isPhoneValid } = require('../utils/utils')


const contactSchema = mongoose.Schema({
    name: {
        first: {
            type: String,
            required: true,
            minlength: [3, 'first name should be at least 3 charecters or more']
        },
        middle: {
            type: String,
            minlength: [2, 'middle name should be at least 2 charecters or more']
        },
        last: {
            type: String,
            minlength: [2, 'last name should be at least 2 charecters or more']
        }
    },
    address: {
        street: {
            type: String,
            required: true,
            minlength: [3, 'street should be at least 3 charecters or more']
        },
        city: {
            type: String,
            required: true,
            minlength: [2, 'city name should be at least 3 charecters or more']
        },
        state: {
            type: String,
            required: true,
            minlength: [2, 'first name should be at least 3 charecters or more']
        },
        zip: {
            type: String,
            required: true,
            minlength: [5, 'zip code is not valid']
        }
    },
    phone: [{
        number: {
            type: String,
            required: true,
            validate: [isPhoneValid, 'Please provide valid phone number']
        },
        type: {
            type: String,
            required: true,
            enum: {
                values: ['home', 'work', 'mobile'],
                message: 'invalid phone type, available phone types are home, work and mobile'
            }
        }
    }],
    email: {
        type: String,
        required: true,
        validate: [isEmail, 'Email address is not valid']
    }
})

module.exports = mongoose.model('Contact', contactSchema)
