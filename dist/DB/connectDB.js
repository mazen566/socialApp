"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dev_config_1 = require("../config/env/dev.config");
const connectDB = async () => {
    await mongoose_1.default
        .connect(dev_config_1.devConfig.DB_URL)
        .then(() => {
        console.log('Connected to DB');
    }).catch((err) => {
        console.log("Error connecting to DB", err);
    });
};
exports.connectDB = connectDB;
