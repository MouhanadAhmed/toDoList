import { Schema, model } from "mongoose";

const hospitalSchema = new Schema(
    {
        name : { type: "String"  , unique:true },
        city : { type: "String" },
    },
    { timestamps: true }
);

export const hospitalModel = model("Hospital", hospitalSchema)