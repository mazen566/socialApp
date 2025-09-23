"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const app_controller_1 = require("./app.controller");
const dev_config_1 = require("./config/env/dev.config");
const app = (0, express_1.default)();
const port = dev_config_1.devConfig.PORT;
(0, app_controller_1.bootstrap)(app, express_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
