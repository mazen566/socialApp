import express from "express";
import { bootstrap } from "./app.controller";
import { config } from "dotenv";
config({ path: "./config/.env" });
const app = express();
const port = 3000;
bootstrap(app, express);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
