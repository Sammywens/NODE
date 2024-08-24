const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fsPromises = require('fs').promises;  
const path = require('path');   

const logEvents = async (message) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);

    const logsDir = path.join(__dirname,'..', 'logs');
    const logFilePath = path.join(logsDir, 'reqLog.txt');

    try {
        if (fs.existsSync(path.join(logFilePath, '..', 'logs'))) {
        // Create the logs directory if it doesn't exist
        await fsPromises.mkdir(logsDir, { recursive: true });
        }
        // Append the logItem to the log file...
        await fsPromises.appendFile(logFilePath, logItem + '\n');
        
        console.log('Event logged successfully.');
    } catch (err) {
        console.error('Error logging event:', err);
    }
}
const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt')
    console.log(`${req.method} ${req.path}`);
    next();

}

module.exports = {logger, logEvents};
