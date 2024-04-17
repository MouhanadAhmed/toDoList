/**
 * This is Global Error handler MiddleWare.
 * ```
 * - Display Error Stack in development mode only (Controlled by `process.env.MODE`)
 * - Destructs Error message and the Error code (if no error code, 500 will be displayed)
 * ```
 * @param {*} err The error from any controller or route.
 * @param req
 * @param res
 * @param next
 */
export const globalError = (err, req, res, next) => {
    const message =
        err?.response?.statusText || err.message || 'Internal Server Error'
    const status = err.statusCode || err?.response?.status || err.status || 500

    res.status(status).json({ status, message, success: false })

    next()
}
