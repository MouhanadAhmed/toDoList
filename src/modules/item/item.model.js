import { Schema, model, Types } from "mongoose";

const itemSchema = new Schema(
    {
        name: { type: "String" },
        list: {
            type: Types.ObjectId,
            ref: "List",
        },
        checked: { type: "Boolean", default:false},
    },
    { timestamps: true },
);
export const itemModel = model("Item", itemSchema);
