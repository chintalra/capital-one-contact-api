const mongoose = require('mongoose')
const Contact = require('../models/contact')


/**
 * Controller serving list of contacts
 * @name GET/contacts
 * @function
 * @memberof module:controller/contact~contacts
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {RequestHandler} next = Express request handler callback function
 */
exports.getContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find({}, { __v: 0 })
        return res.status(200).json(contacts)
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

/**
 * Controller serving specific contact
 * @name GET/contacts
 * @function
 * @memberof module:controller/contact~contacts
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {RequestHandler} next = Express request handler callback function
 */
exports.getContact = async (req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.id)
        if (!contact) {
            return res.status(404).json({
                message: 'Contact not found'
            })
        }
        return res.status(200).json(contact)
    } catch (err) {
        if (err instanceof mongoose.Error.CastError) {
            err.statusCode = 403
            err.message = 'Contact id is not valid'
        } else if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

/**
 * Controller storing contact into database
 * @name POST/contacts
 * @function
 * @memberof module:controller/contact~contacts
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {RequestHandler} next = Express request handler callback function
 */
exports.saveContact = async (req, res, next) => {
    try {
        let contact = new Contact(req.body)
        contact = await contact.save()
        return res.status(201).json(contact)
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

/**
 * Controller update the specific contact
 * @name PUT/contacts
 * @function
 * @memberof module:controller/contact~contacts
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {RequestHandler} next = Express request handler callback function
 */
exports.updateContact = async (req, res, next) => {
    try {
        let contact = await Contact.findById(req.params.id)
        if (!contact) {
            return res.status(404).json({
                message: 'Contact not found'
            })
        }
        contact = contact.toObject()
        if (req.body.name) {
            contact.name = { ...contact.name, ...req.body.name }
        }

        if (req.body.address) {
            contact.address = { ...contact.address, ...req.body.address }
        }

        if (req.body.phone) {
            contact.phone = [...req.body.phone]
        }

        if (req.body.email) {
            contact.email = req.body.email
        }

        contact = await Contact.findByIdAndUpdate(req.params.id, contact, { runValidators: true, new: true })
        return res.status(200).json(contact)
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            err.statusCode = 403
        } else if (err instanceof mongoose.Error.CastError) {
            err.statusCode = 403
            err.message = 'Contact id is not valid'
        } else if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

/**
 * Controller delete the specific contact
 * @name DELETE/contacts
 * @function
 * @memberof module:controller/contact~contacts
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {RequestHandler} next = Express request handler callback function
 */
exports.deleteContact = async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id, { __v: 0 })
        if (!contact) {
            return res.status(404).json({
                message: 'Contact not found'
            })
        }
        return res.status(200).json({
            message: 'Contact Deleted Successfully'
        })
    } catch (err) {
        if (err instanceof mongoose.Error.CastError) {
            err.statusCode = 403
            err.message = 'Contact id is not valid'
        } else if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}
