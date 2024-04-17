/**
 * This is AppError Class extended from ErrorConstructor.
 * @param {*} message The message to be displayed with the error.
 * @param {*} statusCode The statusCode to be displayed with the error.
 * @param {*} success The success to be displayed with the error.
 * @returns {Object} - Error Object.
 */
export default class AppError extends Error {
    constructor (message, statusCode) {
        super(message)
        this.status = statusCode
        this.message = message
        this.success = false
    }
}
