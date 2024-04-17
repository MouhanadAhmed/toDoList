import mongoose from 'mongoose'

export default function dbConnection () {
    mongoose
        .connect(process.env.DB_CONNECTION)
        .then(() =>
            console.info(`Database connected on ${process.env.DB_CONNECTION}`)
        )
        .catch((err) => console.error(`Database Error ${err}`))
}
