/**
 * This is Validation MiddleWare
 * ```
 * - Accept all inputs from Req.body, Req.params & Req.query
 * - Dectects errors and send it to Global Error Handler Middleware
 * ```
 * @param {*} schema The validatation schema for the controller inputs
 */

export const validation = (schema) => {
    return async (req, res, next) => {
        const inputs = { ...req.body, ...req.params, ...req.query };
        const { error } = schema.validate(inputs, { abortEarly: false });
        if (error) {
            //    console.log("error",error)
            const errors = error.details.map((detail) => detail.message);
            // console.log("errors",errors)
            // return next(new AppError(errors,403))
            res.json(errors);
        } else {
            next();
        }
    };
};
