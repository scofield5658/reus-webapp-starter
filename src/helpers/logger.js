const winston = require("winston");
const WinstonRotateFile = require("winston-daily-rotate-file");
const path = require("path");
const moment = require("moment");

const transports = [];
if (process.env.NODE_ENV !== "production" || !process.env.LOG_PATH) { transports.push(new winston.transports.Console({ colorize: true })); }

const appPath = path.join(__dirname, "..");
const logFilename = process.env.LOG_PATH || path.join(appPath, "..", "logs", "webapp.log");

const { combine, printf } = winston.format;

transports.push(new WinstonRotateFile({
  filename: `${logFilename}.info.%DATE%`,
  datePattern: "YYYY-MM-DD",
  level: "info",
}));

transports.push(new WinstonRotateFile({
  filename: `${logFilename}.error.%DATE%`,
  datePattern: "YYYY-MM-DD",
  level: "error",
}));

const diyFormatter = printf(({ level, message }) => {
  const now = moment().format("YYYY-MM-DD HH:mm:ss");
  return `[${level.toUpperCase()}] ${now}: ${JSON.stringify(message)}`;
});

const logger = winston.createLogger({
  format: combine(
    diyFormatter,
  ),
  transports,
});

module.exports = logger;
