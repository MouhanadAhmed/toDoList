import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        nationalId: { type: "String" , unique:true},
        name: { type: "String" },
        city: { type: "String" },
        email: { type: "String", unique:true },
        lastDonation: Date,
        role:{
            type:String,
            enum:['admin','donor'],
            default:'donor'
        },
        password:{
            type:String,
            required:true,
            minlength: [5, 'too short user password']
        },
        changePasswordAt:Date,
        isActive:{
            type:Boolean,
            default:false
        },
        loggedOutAt:Date,
        verified:{
            type:Boolean,
            default:false
        },
        ressetCode:{
            type:String,
        },
        ressetCodeAt:Date
    },
    { timestaps: true },
);
userSchema.pre("save", function   ()  {
    this.password = bcrypt.hashSync(this.password,7)
})

export const userModel = model("User", userSchema);
