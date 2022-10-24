"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const compression_1 = __importDefault(require("compression"));
//----------Security---------------//
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
//----------Utilities---------------//
const utilities_1 = require("./utilities/");
const utilities_2 = require("./utilities/");
//---------Routers---------------//
const formRoutes_1 = __importDefault(require("./routes/formRoutes"));
//----------Create Server-------------//
const app = (0, express_1.default)();
//----------Global Middleware-------------//
// Implement CORS and Security Headers in API Requests
const whitelist = ['http://localhost:3000', 'https://bruneljohnson.github.io'];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (whitelist.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: [
        'Access-Control-Allow-Origin',
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
    ],
    credentials: true,
};
app.options('*', (0, cors_1.default)(corsOptions));
app.use((0, cors_1.default)(corsOptions));
app.use((0, helmet_1.default)({ crossOriginResourcePolicy: false }));
// Log request in dev
process.env.NODE_ENV === 'development' && app.use((0, morgan_1.default)('dev'));
// Limit no. requests from one IP Address
const limiter = (0, express_rate_limit_1.default)({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP Address, please try again in 90mins.',
});
app.use('/api', limiter);
//Parse incoming JSON data to use in req.body
app.use(express_1.default.json());
//Sanitisation against NoSQL Injection Queries
app.use((0, express_mongo_sanitize_1.default)());
//Compress request/response cycle
app.use((0, compression_1.default)());
//----------Sub-Routes-------------//
app.use('/api/v1/forms', formRoutes_1.default);
//----------GLOBAL HANDLING & 404 ROUTE-------------//
app.use('*', (req, res, next) => {
    next(new utilities_1.AppError(`Can't find ${req.originalUrl} on this Server`, 404));
});
app.use(utilities_2.globalErrorHandler);
exports.default = app;
