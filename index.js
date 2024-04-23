import express from 'express';
import carRoutes from './routes/carRoutes.js';
import winston from 'winston';

const app = express();
app.use(express.json());
app.use('/cars', carRoutes);

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
    level: 'silly',
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'cars-api.log' })
    ],
    format: combine(
        label({ label: 'cars-api' }),
        timestamp(),
        myFormat
    )
});

app.listen("3000", () => {
    console.log("API Cars running");
});

