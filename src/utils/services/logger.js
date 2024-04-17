/**
 * Custom logger middleware for Morgan with enhanced logging format.
 *
 * @function customLogger
 * @param {Object} tokens - Morgan tokens object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {string} - Formatted log entry string.
 */
const logger = (tokens, req, res) => {
    const logType = res.statusCode >= 400 ? 'ERROR' : 'SUCCESS'

    /**
     * Formatted log entry string.
     * @type {string}
     */
    let logEntry = `${tokens.date(req, res, 'iso')}: ${logType} - ${tokens.method(req)} ${tokens.url(req)} ${tokens.status(req, res)}\nContent Length: ${tokens.res(req, res, 'content-length')}\nResponse time: ${tokens['response-time'](req, res)} ms`

    if (logType === 'ERROR') {
    /**
     * Request and response details for non-successful requests.
     * @type {string}
     */
        const details = `Body: ${JSON.stringify(req.body)}\nResponse: ${JSON.stringify(res.locals.responseBody)}`
        logEntry = `${logEntry}\n${details}`
    }

    return logEntry
}

export default logger
