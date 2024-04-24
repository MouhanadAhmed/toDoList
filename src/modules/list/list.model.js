import { Schema, model, Types } from "mongoose";

const listSchema = new Schema(
    {
        name: { type: "String" },
        user: {
            type: Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true },
);
export const listModel = model("List", listSchema);
