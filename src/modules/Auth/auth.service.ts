import bcrypt from "bcryptjs";
import crypto from "crypto";
import randomstring from "randomstring";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../utils/sendEmail";
import { signUpTemp, forgetCodeTemp } from "../../utils/generateHTML";
import { User } from "./auth.model";
// import { Token } from "../models/token.model";
// import logger from "utils/logger";
import { Token } from "../../models/token.model";
import logger from "../../utils/logger";

export async function registerService({
    userName,
    email,
    password,
}: {
    userName: string;
    email: string;
    password: string;
}) {
    const isUser = await User.findOne({ email });
    //check if user exists
    if (isUser) {
        //check if user is confirmed
        if (isUser.isConfirmed) {
            return {
                statusCode: 400,
                data: { message: "User already exists" },
            };
        }
        isUser.password = bcrypt.hashSync(
            password,
            Number(process.env.SALT_ROUNDS)
        );
        isUser.activationCode = crypto.randomBytes(64).toString("hex");
        await isUser.save();

        const link = `${process.env.ENVIROMENT === "development"
            ? process.env.DEV_URL
            : process.env.PRODUCTION_URL
            }/auth/confirmEmail/${isUser.activationCode}`;
        const isEmailSent = await sendEmail({
            to: email,
            subject: "Confirmation Email",
            html: signUpTemp(link),
        });

        if (!isEmailSent) {
            return {
                statusCode: 500,
                data: {
                    success: false,
                    message: "Please try again later or contact support",
                },
            };
        }

        return {
            statusCode: 200,
            data: { success: true, message: "Check your email" },
        };
    }

    const hashedPassword = bcrypt.hashSync(
        password,
        Number(process.env.SALT_ROUNDS)
    );
    const activationCode = crypto.randomBytes(64).toString("hex");

    const user = await User.create({
        userName,
        email,
        password: hashedPassword,
        activationCode,
    });

    const link = `${process.env.ENVIROMENT === "development"
        ? process.env.DEV_DOMAIN
        : process.env.PRODUCTION_DOMAIN
        }/auth/confirmEmail/${activationCode}`;
    const isEmailSent = await sendEmail({
        to: email,
        subject: "Confirmation Email",
        html: signUpTemp(link),
    });

    if (!isEmailSent) {
        return {
            statusCode: 500,
            data: {
                success: false,
                message: "Please try again later or contact support",
            },
        };
    }
    return {
        statusCode: 201,
        data: { success: true, message: "Activate your account", user },
    };
}
export async function activateAccountService({
    activationCode,
}: {
    activationCode: string;
}) {
    const user = await User.findOneAndUpdate(
        { activationCode },
        {
            isConfirmed: true,
            $unset: { activationCode: 1 },
            new: true
        }
    );
    if (!user) {
        return {
            statusCode: 404,
            data: { message: "User not found" },
        };
    }
}
export async function loginService({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    const user = await User.findOne({ email });
    if (!user) {
        logger.error("User not found");
        return {
            statusCode: 404,
            data: { message: "User not found" },
        };
    }
    if (!user.isConfirmed) {
        logger.error("Please activate your account")
        return {
            statusCode: 401,
            data: { message: "Please activate your account" },
        };
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        logger.error("Incorrect password");
        return {
            statusCode: 401,
            data: { message: "Incorrect password" },
        };
    }
    const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
    );
    logger.info(`Login successful for user ${user._id}`);
    return {
        statusCode: 200,
        data: { success: true, message: "Login successful", token },
    };
}
export async function forgetPasswordService({
    email
}: { email: string }) { 
    const user = await User.findOne({ email });
    if (!user) {
        logger.error("User not found");
        return {
            statusCode: 404,
            data: { message: "User not found" },
        };
    }
    const code = randomstring.generate({
        length: 6,
        charset: "numeric",
    })
    user.forgetCode = code;
    await user.save();
    const isEmailSent = await sendEmail({
        to: email,
        subject: "Forget Password",
        html: forgetCodeTemp(code),
    });
    if (!isEmailSent) {
        logger.error("Error sending email");
        return {
            statusCode: 500,
            data: {
                success: false, 
                message: "Please try again later or contact support",
            }
        }
    }
    logger.info(`Forget password code sent to ${email}`);
    return {
        statusCode: 200,
        data: { success: true, message: "Check your email" },
    }
}
export async function resetPasswordService({
    forgetCode , password
}:{forgetCode : string , password : string}) {
    const user = await User.findOne({ forgetCode }, {$unset: { forgetCode: 1 }});
    if (!user) {
        logger.error("Code invalid");
        return {
            statusCode: 404,
            data: { message: "Code invalid" },
        };
    }
    const hashedPassword = bcrypt.hashSync(
        password,
        Number(process.env.SALT_ROUNDS)
    )
    user.password = hashedPassword;
    await user.save();
    await Token.deleteMany({ user: user._id });
    logger.info(`Password changed for user ${user._id}`);
    return {
        statusCode: 200,
        data: { success: true, message: "Password changed successfully" },
    }   
}
export async function getUserService({
    userId
}: {userId : string}) {
    const user = await User.findById({ user: userId });
    logger.info("Logout successful")
    return {
        statusCode: 200,
        data: { success: true, message: "Logout successful" ,user },
    }
}
export async function logoutService({
    userId
}: {userId : string}) {
    await Token.deleteMany({ user: userId });
    logger.info(`Logout successful for user ${userId}`);
    return {
        statusCode: 200,
        data: { success: true, message: "Logout successful" },
    }
}