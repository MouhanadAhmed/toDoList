import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
// import { addOne } from "../../utils/handlers/refactor.js";

import { catchAsyncError } from "../../utils/middleware/catchAsyncError.js";
import AppError from "../../utils/services/AppError.js";
import { sendEmail } from "../../email/sendEmail.js";
import { userModel } from "../user/user.model.js";
import { findUserService } from "./auth.service.js";

/**
 * This is Sign up User Controller
 
 */
// export const signUp = addOne(userModel, "User");

/**
 * This is Sign in User Controller
 * - Accepts email & password from Req.body
 * - Updates isActive and removes LoggedOut
 * - Generates Token
 *
 */
export const signIn = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    const UniqueKey ={email:email}
    const response = await findUserService(userModel,UniqueKey,password);
    if (response.err) {
        next(new AppError(response.err, response.code));
        return;
    } else {
        return res.status(200).json({ message: response.message, token:response.token });
    }
});
/**
 * This is log out User Controller
 * - Accepts token in the headers
 * - Updates isActive to false , LoggedOutAt to date
 
 */
// export const logOut = catchAsyncError(async (req, res, next) => {
//     const { token } = req.headers;
//     if (!token) return next(new AppError("Please provide token", 401));

//     const decoded = await jwt.verify(token, process.env.VERIFY_SECRET);
//     console.info(decoded);

//     const user = await userModel.findByIdAndUpdate(
//         decoded.userId,
//         { isActive: false, loggedOutAt: Date.now() },
//         { new: true },
//     );
//     if (!user) return next(new AppError("Invalid user", 404));
//     return res.json({ message: "Success", user });
// });
/**
 * This is Protected Routes  Controller
 * Verifies user token for the following criteria :
 * - Valid token
 * - Token generated after last password change
 * - Token's user is active
 
 */
// export const protectedRoutes = catchAsyncError(async (req, res, next) => {
//     const { token } = req.headers;
//     if (!token) return next(new AppError("Please provide token", 401));

//     const decoded = await jwt.verify(token, process.env.VERIFY_SECRET);
//     console.info(decoded);

//     const user = await userModel.findById(decoded.userId);
//     if (!user) return next(new AppError("Invalid user", 404));

//     if (user.changePasswordAt) {
//         const changePasswordTime = parseInt(
//             user.changePasswordAt?.getTime() / 1000,
//         );

//         if (changePasswordTime > decoded.iat) {
//             return next(new AppError("Invalid token", 401));
//         }
//     }
//     if (!user.isActive) {
//         return next(new AppError("Invalid token (user inActive)", 401));
//     }

//     req.user = user;
//     next();
// });
/**
 * This is Allow to (Authorization)  Controller
 * Verifies user role authorized to  use the endpoint
 * @param roles (Object) : containig allowed roles as strings
 */
// export const allowTo = (...roles) => {
//     return catchAsyncError((req, res, next) => {
//         if (roles.includes(req.user.role)) {
//             return next();
//         }
//         return next(new AppError("Access denied", 403));
//     });
// };
/**
 * This is forgotPassword  Controller
 * - Accepts email  from Req.body
 * - generates otp and send email to the user email
 * - Updates ressetCode with the otp
 */
// export const forgotPassword = catchAsyncError(async (req, res, next) => {
//     const { email } = req.body;
//     const user = await userModel.findOne({ email });
//     if (!user) return next(new AppError("User with this email not found", 404));
//     const otp = otpGenerator.generate(6, {
//         digits: false,
//         upperCaseAlphabets: false,
//         specialChars: false,
//     });
//     const updatedUser = await userModel.findByIdAndUpdate(user._id, {
//         ressetCode: otp,
//         ressetCodeAt: Date.now(),
//     });
//     if (updatedUser) {
//         sendEmail({
//             email: req.body.email,
//             api: "",
//             sub: "Resset Code",
//             text: `Submit this reset password code : ${otp} If you did not request a change of password, please ignore this email!`,
//             title: "Resset password code",
//         });
//         return res.json({ message: "Success" });
//     }
// });

/**
 * This is Verify Email  Controller
 * - Accepts token from the Req.params
 * - Decodes id from the token
 * - Updates verified to true
 */
// export const verifyEmail = (req, res, next) => {
//     const { token } = req.params;
//     jwt.verify(token, process.env.VERIFY_SECRET, async (err, decoded) => {
//         if (err) return next(new AppError("Invalid token", 401));
//         const updateUser = await userModel.findByIdAndUpdate(
//             decoded.id,
//             { verified: true },
//             { new: true },
//         );
//         res.json({ message: "Success", updateUser });
//     });
// };
/**
 * This is Verify Resset code  Controller
 * - Accepts OTP, email from the Req.body
 * - Validates OTP time
 */
// export const verifyRessetCode = async (req, res, next) => {
//     const { otp, email } = req.body;
//     const user = await userModel.findOne({ email });
//     if (!user) return next(new AppError("User with this email not found", 404));
//     if (user.ressetCode !== otp) {
//         return next(new AppError("User with this email not found", 404));
//     }
//     // let changePasswordTime = parseInt(user.changePasswordAt?.getTime()/1000);
//     const interval =
//         new Date(Date.now()).getHours() > user.ressetCodeAt.getHours() + 2;
//     console.info("interval = ", interval);
//     if (interval) return next(new AppError("OTP expired", 401));
//     res.json({ message: "Success" });
// };

/**
 * This is Change logged user password Controller
 * - Accepts token from the Req.params
 * - Validate token, user is active
 * - Accepts currentPassword, password, rePassword  from Req.body
 * - Verifies current password
 * - Updates password and changePasswordAt
 */
// export const changeMyPassword = async (req, res, next) => {
//     const { token } = req.headers;
//     const { currentPassword, password, rePassword } = req.body;

//     jwt.verify(token, process.env.VERIFY_SECRET, async (err, decoded) => {
//         if (err) return next(new AppError("Invalid token", 401));
//         const user = await userModel.findById(decoded.userId);
//         if (!user) return next(new AppError("Invalid User token", 404));
//         if (user.changePasswordAt) {
//             const changePasswordTime = parseInt(
//                 user.changePasswordAt?.getTime() / 1000,
//             );

//             if (changePasswordTime > decoded.iat) {
//                 return next(new AppError("Invalid token , expired", 401));
//             }
//         }
//         if (!user.isActive) {
//             return next(new AppError("User is not active", 403));
//         }

//         const match = await bcrypt.compare(currentPassword, user.password);
//         if (!match) {
//             return next(new AppError("Incorrect password", 403));
//         }
//         if (password !== rePassword) {
//             return next(new AppError("Passwords do not match"));
//         }
//         const hashedNewPassword = await bcrypt.hash(password, 8);
//         const updatedUser = await userModel.findByIdAndUpdate(
//             user._id,
//             { password: hashedNewPassword, changePasswordAt: Date.now() },
//             { new: true },
//         );
//         if (updatedUser) {
//             return res.json({ message: "Success", updatedUser });
//         }
//     });
// };
/**
 * This is Resset user password Controller to be used after verify resst code
 * - Accepts email, newPassword from the Req.body
 * - Updates password, changePasswordAt
 */
// export const ressetPassword = async (req, res, next) => {
//     const { email, newPassword } = req.body;
//     const user = await userModel.findOne({ email });
//     if (!user) return next(new AppError("Invalid User token", 404));

//     const hashedNewPassword = await bcrypt.hash(newPassword, 8);
//     const updatedUser = await userModel.findByIdAndUpdate(
//         user._id,
//         { password: hashedNewPassword, changePasswordAt: Date.now() },
//         { new: true },
//     );
//     return res.json({ message: "Success", updatedUser });
// };

/**
 * This is Change logged user details Controller
 * - Accepts token from the Req.params
 * - Validate token, user is active
 * - Accepts name, email, city  from Req.body
 * - Verifies current password
 * - Updates password and changePasswordAt
 */
// export const updateMe = async (req, res, next) => {
//     const { token } = req.headers;
//     const { name, email, city } = req.body;

//     jwt.verify(token, process.env.VERIFY_SECRET, async (err, decoded) => {
//         if (err) return next(new AppError("Invalid token", 401));
//         const user = await userModel.findById(decoded.userId);
//         if (!user) return next(new AppError("Invalid User token", 404));
//         if (user.changePasswordAt) {
//             const changePasswordTime = parseInt(
//                 user.changePasswordAt?.getTime() / 1000,
//             );

//             if (changePasswordTime > decoded.iat) {
//                 return next(new AppError("Invalid token , expired", 401));
//             }
//         }
//         if (!user.isActive) {
//             return next(new AppError("User is not active", 403));
//         }

//         const updatedUser = await userModel.findByIdAndUpdate(
//             user._id,
//             { name, email, city },
//             { new: true },
//         );
//         if (updatedUser) {
//             return res.json({ message: "Success", updatedUser });
//         }
//     });
// };
