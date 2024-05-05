import ApiFeatures from "../../APIFeatures.js";

const CheckInDb = async (model, UniqueKey) => {
    const isFound = await model.findOne(UniqueKey);
    return isFound ? true : false;
};
export const findOne = async (model, UniqueKey) => {
    return await model.findOne(UniqueKey);
};
/**
 * Get all documents handler.
 * @param {Model} model - The model to perform the operation on.
 * @param {string} result - The name to be displayed to the frontend as the returned document.
 */
export const getAll = async (model, filters, query) => {
    const totalDocuments = await model.countDocuments();

    const apiFeature = new ApiFeatures(model.find(filters), query)
        .pagination()
        .search() ;
    let documents = await apiFeature.mongooseQuery;

    // Check if the 'order' property exists before sorting
    if (model.schema.paths.order) {
        documents = documents.sort("order");
    }

    const documentCount = documents.length / 100 > 1 ? documents.length / 100 : 1;

    return {
        page: apiFeature.page,
        pages: documentCount,
        count: totalDocuments,
        documents,
    };
};
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
export const addOne = async (model, body, UniqueKey) => {
    if (UniqueKey && await CheckInDb(model, UniqueKey)) {
        return "false";
    }
    const document = new model(body);
    await document.save();
    return document;
};
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
