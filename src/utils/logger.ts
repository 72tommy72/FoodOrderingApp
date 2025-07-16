import { createLogger, format, transports } from 'winston';
import 'winston-mongodb';

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console(),

        new transports.MongoDB({
            db: process.env.MONGO_URI || 'mongodb://localhost:27017/food-app',
            options: { useUnifiedTopology: true },
            collection: 'logs',
            level: 'info', // ممكن تخليها error لو حابب
            tryReconnect: true,
        }),
    ],
});

export default logger;
