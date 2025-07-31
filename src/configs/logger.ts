import * as fs from 'fs';
import path from 'path';
import winston from 'winston';
import morgan from 'morgan';

const logDir = path.join(__dirname, '..', '..', 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(logDir, 'combined.log') }),
    ],
});

export const morganMiddleware = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    {
        stream: {
            write: (message: any) => logger.http(message.trim()),
        },
    }
)