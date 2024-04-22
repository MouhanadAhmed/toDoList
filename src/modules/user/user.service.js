import slugify from "slugify";
import jwt from "jsonwebtoken";
import AppError from "../../utils/services/AppError.js";
import { catchAsyncError } from "../../utils/middleware/catchAsyncError.js";
import { sendEmail } from "../../email/sendEmail.js";
import { addOne } from "../../utils/handlers/refactor.js";

var dateDiffInDays = function (date1, date2) {
    let dt1 = new Date(date1);
    let dt2 = new Date(date2);
    return Math.floor(
        (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
            Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
            (1000 * 60 * 60 * 24),
    );
};

// const CheckInDb = async (model, UniqueKey) => {
//     const isFound = await model.findOne(UniqueKey);
//     // console.info("isFound",isFound);
//     return isFound ? true : false;
// };
/**
 * Get all documents handler.
 * @param {Model} model - The model to perform the operation on.
 * @param {string} result - The name to be displayed to the frontend as the returned document.
 */
// export const getAll = (model, result) =>
//     catchAsyncError(async ({ params, query }, res) => {
//         const filters = params.chatId ? { chat: params.chatId } : {};

//         const totalDocuments = await model.countDocuments();

//         const apiFeature = new ApiFeatures(model.find(filters), query)
//             .pagination()
//             .search();

//         let documents = await apiFeature.mongooseQuery;

//         // Check if the 'order' property exists before sorting
//         if (model.schema.paths.order) {
//             documents = documents.sort("order");
//         }

//         const documentCount =
//             documents.length / 10 > 1 ? documents.length / 10 : 1;

//         res.status(200).json({
//             page: apiFeature.page,
//             pages: documentCount,
//             count: totalDocuments,
//             [result]: documents,
//         });
//     });

/**
 * This is Delete One document  handler
 * ```
 *  Accepts id from Req.params
 * ```
 *  @param model  The model to perform the operation on
 *  @param result  The name to be displayed to the frontend as returned document
//  */
// export const deleteOne = (model, result) => {
//     return catchAsyncError(async (req, res, next) => {
//         const { id } = req.params;

//         const document = await model.findByIdAndDelete(id);
//         const response = {};
//         response[result] = document;
//         document && res.status(200).json({ message: "Success", ...response });
//         !document && next(new AppError("document not found", 404));
//     });
// };
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
export const insertUser = async(model, UniqueKey, body) => {
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
    return response
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
        if (result === "Blood") {
            if (req.body.approved === "true") {
                await userModel.findByIdAndUpdate(
                    req.user._id,
                    { lastDonation: Date.now() },
                    { new: true },
                );
            } else if (req.body.approved === "false") {
                sendEmail({
                    email: req.body.email,
                    api: "",
                    sub: "Blood Donation Request Declined!",
                    text: `Your donated blood virus test is positive`,
                    title: "Blood Donation Request",
                });
            }
        }

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
