import Joi from 'joi'

/**
 * This is Create User validation Schema - validates the following fields :
 * - name (String) : minimum 2 chars, maximum 30 chars     ---------------------> required
 * - email (String) : minDomainSegments 2 chars, allow  com,net domains      ---> required
 * - password (String) : minimum 5 chars, maximum 30 chars      ----------------> required
 * - phone (String) : length 11 numbers ----------------------------------------> required
 * - role (String) : accepts User or admin
 *
 */
export const createUserSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    city: Joi.string().min(2).max(10).required(),
    nationalId: Joi.string().min(2).max(14).required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    password: Joi.string().min(5).max(30).required(),
    // phone:Joi.string().length(11).pattern(/^\d+$/).required(),
    role: Joi.string().pattern(/^(donor|admin)$/)
})
/**
 * This is Update User validation Schema - validates the following fields :
 * - name (String) : minimum 2 chars, maximum 30 chars
 * - password (String) : minimum 5 chars, maximum 30 chars
 * - phone (String) : length 11 numbers -> required
 * - email (String) : minDomainSegments 2 chars, allow  com,net domains
 * - role (String) : accepts User or admin
 *
 */
export const updateUserSchema = Joi.object({
    name: Joi.string().min(2).max(30),
    password: Joi.string().min(5).max(30),
    phone: Joi.string().length(11).pattern(/^\d+$/),
    id: Joi.string().hex().length(24).required(),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] }
    }),
    role: Joi.string().pattern(/^(donor|admin)$/)
})
/**
 * This is Delete User validation Schema - validates the following fields :
 * - id (String) : length 24 chars -> required
 *
 */
export const deleteUserSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})
/**
 * This is Get User by id validation Schema - validates the following fields :
 * - id (String) : length 24 chars -> required
 *
 */
export const getUserByIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})
