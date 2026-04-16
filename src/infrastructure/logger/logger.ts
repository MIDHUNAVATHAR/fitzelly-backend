import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

const isDev = process.env.NODE_ENV === "development";

// Dev format
const consoleFormat = printf(({ level, message, timestamp, ...meta }) => {

    let log = `${timestamp} [${level}]: ${message}`;

    if (Object.keys(meta).length) {
        log += ` ${JSON.stringify(meta, null, 2)}`;
    }

    return log;
});

//file format
const fileFormat = combine(
    timestamp(),
    errors({ stack: true }),
    json()
)

export const logger = winston.createLogger({
    level: "info",
    format: fileFormat,
    transports: [

        //  Console → only in development
        ...(isDev
            ? [
                new winston.transports.Console({
                    format: combine(
                        colorize(),
                        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                        consoleFormat
                    )
                })
            ]
            : []),

        //  Info Logs
        new DailyRotateFile({
            filename: "logs/info-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            level: "info",
            maxSize: "20m",
            maxFiles: "14d",    // Auto delete after 14 days
            zippedArchive: true // compress old logs
        }),

        // Error Logs
        new DailyRotateFile({
            filename: "logs/error-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            level: "error",
            maxSize: "10m",     // smaller limit for errors
            maxFiles: "30d",    // keep errors longer
            zippedArchive: true
        })
    ]
});
