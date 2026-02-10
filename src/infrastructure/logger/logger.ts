import winston from "winston";

const { combine, timestamp, printf, colorize } = winston.format;

const isProd = process.env.NODE_ENV === "production";

const devFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
})

export const logger = winston.createLogger({
    level: isProd ? "info" : "debug",
    format: isProd ? combine(colorize(), timestamp(), devFormat) : combine(colorize(), timestamp(), devFormat),
    transports: [new winston.transports.Console()]
})