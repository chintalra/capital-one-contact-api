const express = require('express')
const {
    getContact,
    getContacts,
    deleteContact,
    updateContact,
    saveContact
} = require('../controllers/contacts')


/**
 * Express router to mount contacts related functions on.
 * @type {object}
 * @const
 * @namespace module:routes/contact~contacts
 */
const router = express.Router()

router.get('/', getContacts)

router.post('/', saveContact)

router.get('/:id', getContact)

router.put('/:id', updateContact)

router.delete('/:id', deleteContact)

module.exports = router
