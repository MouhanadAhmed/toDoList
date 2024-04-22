import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        name: { type: "String" },
        slug: {
            type: String,
            lowercase: true,
            required: true,
        },
        email: { type: "String", unique: true },
        password: {
            type: String,
            required: true,
            minlength: [5, "too short user password"],
        },
        changePasswordAt: Date,
        isActive: {
            type: Boolean,
            default: false,
        },
        loggedOutAt: Date,
        verified: {
            type: Boolean,
            default: false,
        },
        ressetCode: {
            type: String,
        },
        ressetCodeAt: Date,
    },
    { timestamps: true },
);
userSchema.pre("save", function () {
    this.password = bcrypt.hashSync(this.password, 7);
});

export const userModel = model("User", userSchema);
