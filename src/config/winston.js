import { createLogger, format, transports } from 'winston';

class Logger {
  constructor() {
    // Create a logger instance
    this.logger = createLogger({
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss.SSS', // Define the timestamp format
        }),
        format.json(), // Use JSON format for log messages
      ),
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(), // Add colorization to log messages in the console
            format.printf(({ message, timestamp, level, ...metadata }) => {
              // Custom log message formatting
              const { status, ...rest } = metadata;
              const color = status >= 500 ? '\x1b[31m' : status >= 400 ? '\x1b[33m' : '\x1b[34m';
              const statusStr = status ? `${status}` : '';
              const meta = Object.keys(rest).length > 0 ? `\n${JSON.stringify(rest, null, 2)}` : '';
              return `${timestamp} [${level}] ${color}${statusStr}\x1b[0m: ${message}${meta}`;
            }),
          ),
        }),
      ],
    });
  }

  // Log a message with the specified log level
  log(level, message, status, metadata) {
    const meta = metadata ? { ...metadata, status } : { status };
    if (['info', 'warn', 'error'].includes(level)) {
      this.logger.log(level, message, meta);
    } else {
      throw new Error(`Invalid log level: ${level}`);
    }
  }
}

export default new Logger();
