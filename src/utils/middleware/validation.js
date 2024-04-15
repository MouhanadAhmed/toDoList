/**
 * This is Validation MiddleWare
 * ```
 * - Accept all inputs from Req.body, Req.params & Req.query 
 * - Dectects errors and send it to Global Error Handler Middleware
 * ```
* @param {*} schema The validatation schema for the controller inputs
*/


export const validation = (schema)=>{
    return async(req,res,next) => {
        let inputs = {...req.body,...req.params,...req.query}
        let {error} = schema.validate(inputs,{abortEarly:false});
       if (error) {
        let errors = error.details.map((detail)=> detail.message);
        res.json(errors)
       } else {
        next();
       }
    } 
}