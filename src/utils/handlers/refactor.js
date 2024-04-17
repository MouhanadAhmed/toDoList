import slugify from "slugify";
import jwt from "jsonwebtoken";
import AppError from "../services/AppError.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";

import { sendEmail } from "../../email/sendEmail.js";
import ApiFeatures from "../../APIFeatures.js";

/**
 * Get all documents handler.
 * @param {Model} model - The model to perform the operation on.
 * @param {string} result - The name to be displayed to the frontend as the returned document.
 */
export const getAll = (model, result) =>
    catchAsyncError(async ({ params, query }, res) => {
        const filters = params.chatId ? { chat: params.chatId } : {};

        const totalDocuments = await model.countDocuments();

        const apiFeature = new ApiFeatures(model.find(filters), query)
            .pagination()
            .search();

        let documents = await apiFeature.mongooseQuery;

        // Check if the 'order' property exists before sorting
        if (model.schema.paths.order) {
            documents = documents.sort("order");
        }

        const documentCount = documents.length;

        res.status(200).json({
            page: apiFeature.page,
            pages: documentCount,
            count: totalDocuments,
            [result]: documents,
        });
    });

/**
 * This is Delete One document  handler
 * ```
 *  Accepts id from Req.params
 * ```
 *  @param model  The model to perform the operation on
 *  @param result  The name to be displayed to the frontend as returned document
 */
export const deleteOne = (model, result) => {
    return catchAsyncError(async (req, res, next) => {
        const { id } = req.params;

        const document = await model.findByIdAndDelete(id);
        const response = {};
        response[result] = document;
        document && res.status(200).json({ message: "Success", ...response });
        !document && next(new AppError("document not found", 404));
    });
};
/**
 * This is Add One document  handler
 * ```
 * - Accepts id from Req.params
 * - Verify user token to addd product
 * - Send Verification Email to the user
 * ```
 *  @param model  The model to perform the operation on
 *  @param result  The name to be displayed to the frontend as returned document
 */
export const addOne = (model, results) => {
    return catchAsyncError(async (req, res, next) => {
        if (results === "User") {
            const user = await model.findOne({
                nationalId: req.body.nationalId,
            });
            if (user) {
                return next(new AppError("national Id already exists", 409));
            }
        } else if (results === "Blood") {
            // console.log( "blood request",req.user);
            req.body.donor = req.user._id;
        }

        req.body.name ? (req.body.slug = slugify(req.body.name)) : "";
        const document = new model(req.body);
        await document.save();
        const response = {};
        response[results] = document;
        if (results === "User") {
            const verifyToken = jwt.sign(
                { id: document._id },
                process.env.VERIFY_SECRET,
            );
            sendEmail({
                email: req.body.email,
                api: `http://localhost:8080/api/v1/auth/verify/${verifyToken}`,
                sub: "Verify Email",
                text: "Tap the button below to confirm your email address. If you didn't create an account with Central Blood Bank, you can safely ignore this email",
                title: "Confirm Your Email Address",
                btn: "Verify Email",
            });
        }
        res.status(201).json({ message: "Success", ...response });
    });
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
export const updateOne = (model, result) => {
    return catchAsyncError(async (req, res, next) => {
        const { id } = req.params;

        if (req.body.name) req.body.slug = slugify(req.body.name);
        const document = await model.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        const response = {};
        response[result] = document;
        document && res.status(200).json({ message: "Success", ...response });
        !document && next(new AppError(`Invalid ${result} Id`, 404));
    });
};
/**
 * This is Get One document by id handler
 * ```
 * - Accepts id from Req.params
 * ```
 *  @param model  The model to perform the operation on
 *  @param result  The name to be displayed to the frontend as returned document
 */
export const getById = (model, result) => {
    return catchAsyncError(async (req, res, next) => {
        const { id } = req.params;
        if (result === "address") {
            const userId = req.user._id;
            const user = await model.findById(userId);
            const address = user.address.filter((item) => item._id === id);
            !user && next(new AppError("Invalid user Id", 404));
            if (address.length === 0) {
                return next(new AppError("Invalid address Id", 404));
            }
            res.status(200).json({ message: "Success", address: address[0] });
        }
        const document = await model.findById(id);
        if (result === "coupon") {
            const response = {};
            response[result] = document;
            document &&
                res.status(200).json({ message: "Success", ...response });
        }
        const response = {};
        response[result] = document;
        document && res.status(200).json({ message: "Success", ...response });
        !document && next(new AppError(`Invalid ${result} Id`, 404));
    });
};
