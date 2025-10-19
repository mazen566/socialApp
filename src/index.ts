import { config } from "dotenv";
import express from "express";
import { bootstrap } from "./app.controller";
import { devConfig } from "./config/env/dev.config";
import { initSocket } from "./socket-io";
config();
const app = express();
const port = devConfig.PORT;
bootstrap(app, express);
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

initSocket(server);