import slugify from "slugify";
import AppError from "../services/AppError.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { userModel } from "../../modules/user/user.model.js";
import { sendEmail } from "../../email/sendEmail.js";
import ApiFeatures from "../../APIFeatures.js";

// var dateDiffInDays = function (date1, date2) {
//     let dt1 = new Date(date1);
//     let dt2 = new Date(date2);
//     return Math.floor(
//         (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
//             Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
//             (1000 * 60 * 60 * 24),
//     );
// };

const CheckInDb = async (model, UniqueKey) => {
    const isFound = await model.findOne(UniqueKey);
    return isFound ? true : false;
};
/**
 * Get all documents handler.
 * @param {Model} model - The model to perform the operation on.
 * @param {string} result - The name to be displayed to the frontend as the returned document.
 */
export const getAll = async (model, UniqueKey, filters, query) => {
    const totalDocuments = await model.countDocuments();

    const apiFeature = new ApiFeatures(model.find(filters), query)
        .pagination()
        .search();

    let documents = await apiFeature.mongooseQuery;

    // Check if the 'order' property exists before sorting
    if (model.schema.paths.order) {
        documents = documents.sort("order");
    }

    const documentCount = documents.length / 10 > 1 ? documents.length / 10 : 1;

    return {
        page: apiFeature.page,
        pages: documentCount,
        count: totalDocuments,
        [UniqueKey]: documents,
    };
};

export const getAllOld = (model, result) =>
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

        const documentCount =
            documents.length / 10 > 1 ? documents.length / 10 : 1;

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
export const deleteOne = async (model, id) => {
    const document = await model.findByIdAndDelete(id);
    return document;
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
export const addOne = async (model, UniqueKey, body) => {
    if (await CheckInDb(model, UniqueKey)) {
        return "false";
    }
    const document = new model(body);
    await document.save();
    return document;
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
 */
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
export const updateOne = async (model, id, body) => {
    const document = await model.findByIdAndUpdate(id, body, {
        new: true,
    });
    console.info("document from repo", document);

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
export const getById = async (model, id) => {
    const response = await model.findById(id);
    return response;
};
