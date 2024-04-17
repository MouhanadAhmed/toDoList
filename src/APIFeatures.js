/**
 * This is API Features Class.
 * ```
 * Methods:
 * - Pagination : paginate over the returned documents
 * - Filter : Filter by a certain value including gt,gte,lt & lte
 * - Sort   : Sorts the documents by a field
 * - Search
 * - Fields
 * ```
 * @param {*} modelQuery The model mongoose query (e.g. "model.find()" ) to perform the API features on.
 * @param {*} req.query The req query string to extract the input queries from.
 */
export default class ApiFeatures {
    constructor (mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery
        this.queryString = queryString
    }

    /**
     * This is API Features Pagination method.
     * ```
     * - Extracts the page number from the query string if not provided will be 1
     * - The skip variable defines the number of documents to be skipped to display the required documents in the page (manually set to 4 documents matching the limit on the mongooseQuery)
     * ```
     */
    pagination () {
        const defaultLimit = 1000

        // Extract and validate the page number from the query string
        let page = parseInt(this.queryString.page, 10) || 1
        page = page > 0 ? page : 1

        // Calculate the skip value
        const skip = (page - 1) * defaultLimit

        // Set the page property
        this.page = page

        // Apply skip and limit to the mongoose query
        this.mongooseQuery.skip(skip).limit(defaultLimit)

        return this
    }

    /**
     * This is API Features Search method
     * ```
     * - Search in the documents by name
     * ```
     */
    search () {
        if (this.queryString.bot) {
            this.mongooseQuery.find({
                name: { $regex: this.queryString.bot, $options: 'i' }
            })
        }
        return this
    }
}
