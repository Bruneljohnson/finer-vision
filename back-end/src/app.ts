import express from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import compression from 'compression';

//----------Security---------------//
import helmet from 'helmet';
import cors from 'cors';
import mongoSanitise from 'express-mongo-sanitize';

//----------Utilities---------------//
import { AppError } from './utilities/AppError';
import { globalErrorHandler } from './utilities/GlobalError';

//---------Routers---------------//
import formRouter from './routes/formRoutes';

//----------Create Server-------------//
const app = express();

//----------Interface & Type Alias-------------//
type CB = (a: null | Error, b: boolean) => void;

//----------Global Middleware-------------//

// Implement CORS and Security Headers in API Requests
const whitelist = ['http://localhost:3000', 'https://bruneljohnson.github.io'];

const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (!origin) return callback(null, true);
    if (whitelist.indexOf(origin) === -1) {
      const msg =
        'The CORS policy for this site does not allow access from the specified Origin.';
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

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(helmet({ crossOriginResourcePolicy: false }));

// Log request in dev
process.env.NODE_ENV === 'development' && app.use(morgan('dev'));

// Limit no. requests from one IP Address
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message:
    'Too many requests from this IP Address, please try again in 90mins.',
});

app.use('/api', limiter);

//Parse incoming JSON data to use in req.body
app.use(express.json());

//Sanitisation against NoSQL Injection Queries
app.use(mongoSanitise());

//Compress request/response cycle
app.use(compression());

//----------Sub-Routes-------------//
app.use('/api/v1/forms', formRouter);

//----------GLOBAL HANDLING & 404 ROUTE-------------//
app.use('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this Server`, 404));
});
app.use(globalErrorHandler);

export default app;
