import Joi from "joi";

/**
 * This is Sign in/out validation Schema - validates the following fields :
 * - email (String) : minDomainSegments 2 chars, allow  com,net domains      ---> required
 * - password (String) : minimum 5 chars, maximum 30 chars      ----------------> required
 */
export const signInOutSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
    password: Joi.string().min(5).max(30).required(),
});
/**
 * This is forgot password validation Schema - validates the following fields :
 * - email (String) : minDomainSegments 2 chars, allow  com,net domains      ---> required
 */
export const forgotPasswordSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
});
/**
 * This is verify resset code validation Schema - validates the following fields :
 * - email (String) : minDomainSegments 2 chars, allow  com,net domains               ---> required
 * - otp (String) : lenth 6 characters      ---------------------------------------------> required
 */
export const verifyRessetCodeSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
    otp: Joi.string().length(6).required(),
});
/**
 * This is verify change logged user password  validation Schema - validates the following fields :
 * - currentPassword (String) : minimum 5 chars, maximum 30 chars          ----------------> required
 * - password (String) : minimum 5 chars, maximum 30 chars          -----------------------> required
 * - rePassword (String) : matches password       -----------------------------------------> required
 */
export const changeMyPasswordSchema = Joi.object({
    currentPassword: Joi.string().min(5).max(30).required(),
    password: Joi.string().min(5).max(30).required(),
    rePassword: Joi.ref("password"),
});
/**
 * This is resset password validation Schema - validates the following fields :
 * - email (String) : minDomainSegments 2 chars, allow  com,net domains      ---> required
 * - newPassword (String) : minimum 5 chars, maximum 30 chars      ----------------> required
 */
export const resetPasswordSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
    newPassword: Joi.string().min(5).max(30).required(),
});
