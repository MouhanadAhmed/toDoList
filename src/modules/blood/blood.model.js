import { Schema, model, Types } from "mongoose";

const bloodSchema = new Schema(
    {
        type: { type: "String" },
        city: { type: "String" },
        expiry: Date,
        donor: {
            type: Types.ObjectId,
            ref: "User",
        },
        virusTest: { type: Boolean },
        approved: { type: Boolean, default: false },
    },
    { timestaps: true },
);

export const bloodModel = model("Blood", bloodSchema);
