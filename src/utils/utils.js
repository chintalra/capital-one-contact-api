/**
 * This method checks whether an input email is valid or not
 * @param {String} email - input value which this method has to check
 * @returns {Boolean} - true if input is a valid email otherwise false
 */
exports.isEmail = email => {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    return emailRegex.test(email)
}

/**
 * This method checks whether an input phone nomber is valid or not
 * @param {String} phone - input value which this method has to check
 * @returns {Boolean} - true if input is a valid phone number otherwise false
 */
exports.isPhoneValid = (phone) => {
    const phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/
    const digits = phone.replace(/\D/g, "")
    return phoneRe.test(digits)
}
