"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const utils_1 = require("../../../utils");
const email_1 = require("../../../utils/email");
exports.userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        minLength: 3,
        maxLength: 20,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        minLength: 3,
        maxLength: 20,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: function () {
            if (this.userAgent === utils_1.USER_AGENT.google)
                return false;
            return true;
        }
    },
    credentialUpdatedAt: Date,
    phoneNumber: String,
    role: {
        type: Number,
        enum: utils_1.SYS_ROLE,
        default: utils_1.SYS_ROLE.user
    },
    gender: {
        type: Number,
        enum: utils_1.GENDER,
        default: utils_1.GENDER.male
    },
    userAgent: {
        type: String,
        enum: utils_1.USER_AGENT,
        default: utils_1.USER_AGENT.local
    },
    otp: {
        type: String,
    },
    otpExpiredAt: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    friendRequests: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User"
        }],
    friends: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User"
        }]
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
exports.userSchema
    .virtual("fullName")
    .get(function () {
    return this.firstName + " " + this.lastName;
}).set(function (value) {
    const [fName, lName] = value.split(" ");
    this.firstName = fName;
    this.lastName = lName;
});
exports.userSchema.pre("save", async function (next) {
    if (this.userAgent != utils_1.USER_AGENT.google && this.isNew == true)
        await (0, email_1.sendMail)({
            to: this.email,
            subject: "confirm email",
            html: `<h1>your otp is ${this.otp}</h1>`
        });
});
