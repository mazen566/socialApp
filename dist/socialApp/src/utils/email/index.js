"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dev_config_1 = require("../../config/env/dev.config");
const sendMail = async (mailOptions) => {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: dev_config_1.devConfig.EMAIL,
            pass: dev_config_1.devConfig.PASSWORD,
        },
    });
    mailOptions.from = `Social-app <${dev_config_1.devConfig.EMAIL}>`;
    await transporter.sendMail(mailOptions);
};
exports.sendMail = sendMail;
