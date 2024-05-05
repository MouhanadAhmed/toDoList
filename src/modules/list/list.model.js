import { Schema, model, Types } from "mongoose";

const listSchema = new Schema(
    {
        name: { type: "String" },
        user: {
            type: Types.ObjectId,
            ref: "User",
        },
        items:[
            {
                type:Types.ObjectId,
                ref: "Item"
            }
        ]
    },
    { timestamps: true },
);
listSchema.pre(/^find/, function (){
    this.populate('items')
})
export const listModel = model("List", listSchema);
