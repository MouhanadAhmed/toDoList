import slugify from "slugify";
import jwt from "jsonwebtoken";
import AppError from "../../utils/services/AppError.js";
import { catchAsyncError } from "../../utils/middleware/catchAsyncError.js";
import { sendEmail } from "../../email/sendEmail.js";
import {
    addOne,
    getAll,
    deleteOne,
    getById,
    updateOne,} from "../../utils/handlers/refactor.js";

var dateDiffInDays = function (date1, date2) {
    let dt1 = new Date(date1);
    let dt2 = new Date(date2);
    return Math.floor(
        (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
            Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
            (1000 * 60 * 60 * 24),
    );
};
/**
 * Get all documents handler.
 * @param {Model} model - The model to perform the operation on.
 * @param {string} result - The name to be displayed to the frontend as the returned document.
 */
export const getAllUsers = async (model, UniqueKey, filters, query) => {
    return await getAll(model, UniqueKey, filters, query);
};

/**
 * This is Delete One document  handler
 * ```
 *  Accepts id from Req.params
 * ```
 *  @param model  The model to perform the operation on
 *  @param result  The name to be displayed to the frontend as returned document
//  */
export const deleteUser = async (model, id) => {
    const dbResponse = await deleteOne(model, id);
    return dbResponse;
};
/**
 * This is insert One user service
 * ```
 * - Accepts id from Req.params
 * - Verify user token to addd product
 * - Send Verification Email to the user
 * ```
 *  @param model  The model to perform the operation on
 *  @param UniqueKey  The object to contianing the unique key identifier
 *  @param body  The input object from the controller
 */
export const insertUser = async (model, UniqueKey, body) => {
    const response = await addOne(model, UniqueKey, body);
    console.info("response from service", response);

    if (response !== "false") {
        const verifyToken = jwt.sign(
            { id: response._id },
            process.env.VERIFY_SECRET,
        );
        sendEmail({
            email: body.email,
            api: `http://localhost:8080/api/v1/auth/verify/${verifyToken}`,
            sub: "Verify Email",
            text: "Tap the button below to confirm your email address. If you didn't create an account with Central Blood Bank, you can safely ignore this email",
            title: "Confirm Your Email Address",
            btn: "Verify Email",
        });
    }
    return response;
};
/**
 * This is Get all documents  handler
 * ```
 *API Features:
 * - Accepts id from Req.params for category
 * - Pagination, Search, Sort, Fields & Filter
 * ```
 *  @param model  The model to perform the operation on
 *  @param result  The name to be displayed to the frontend as returned document
//  */
// export const getAll = (model,result) =>{
//     return catchAsyncError(async (req,res,next) => {

//         let filters ={};
//         if(req.params && req.params.id){
//             filters = {
//                 category :req.params.id
//             }
//         }

//         let apiFeature =   new ApiFeatures(model.find({...filters}), req.query).pagination().search().sort().fields().filter();
//         // excute query
//         let documents = await apiFeature.mongooseQuery;
//         let response= {}
//         let count = documents.length
//         response[result] = documents;
//         res.status(200).json({message:"Success",page:apiFeature.page,count:count, ...response});
//     })
// }
/**
 * This is Update One document  handler
 * ```
 * - Accepts id from Req.params
 * ```
 *  @param model  The model to perform the operation on
 *  @param result  The name to be displayed to the frontend as returned document
 */
export const updateUserService = async (model, id, body) => {
    const document = await updateOne(model, id, body);
    return document;
};
/**
 * This is Get One document by id handler
 * ```
 * - Accepts id from Req.params
 * ```
 *  @param model  The model to perform the operation on
 *  @param result  The name to be displayed to the frontend as returned document
 */
export const getUserByIdService = async (model, id) => {
    console.log("id", id);
    const response = await getById(model, id);
    console.info("service", response);

    return response;
};
