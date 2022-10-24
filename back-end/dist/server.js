"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_config_1 = __importDefault(require("./config/database.config"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../config.env') });
// process.on('uncaughtException', (err) => {
//   console.log('UNCAUGHTEXCEPTION');
//   process.exit(1);
// });
const app_1 = __importDefault(require("./app"));
//----------CONNECT TO DATABASE-------------//
const launchSquelize = async () => {
    try {
        await database_config_1.default.sync();
        console.log(`CONNECTED TO DB SUCCESSFULLY`);
    }
    catch (err) {
        console.log(`FAILED TO CONNECT TO DB!`);
    }
};
launchSquelize();
//----------START SERVER-------------//
const port = process.env.PORT;
const server = app_1.default.listen(port, () => {
    console.log(`EXPRESS SERVER RUNNING AT ${port}`);
});
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLEDREJECTION');
    console.log(err.name, err.message);
    server.close(() => process.exit(1));
});
process.on('SIGTERM', (err) => {
    console.log('SIGTERM RECIEVED, SHUTTING DOWN NOW.');
    server.close(() => console.log('PROCESS TERMINATED!'));
});
