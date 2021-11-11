const { configure, getLogger } = require("log4js");
configure({
    appenders: {
        miLoggerConsole: { type: "console" },
        miLoggerWarn: { type: 'file', filename: 'warn.log' },
        miLoggerError: { type: 'file', filename: 'error.log' }
    },
    categories: {
        default: { appenders: ["miLoggerConsole"], level: "info" },
        warn: { appenders: ["miLoggerConsole", "miLoggerWarn"], level: "warn" },
        error: { appenders: ["miLoggerConsole", "miLoggerError"], level: "error" }
    }
});

const logger = getLogger();
const loggerwarn = getLogger('warn')
const loggererror = getLogger('error')
module.exports = { logger, loggerwarn, loggererror }