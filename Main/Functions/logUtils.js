import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import moment from 'moment';
import { createGithubIssue } from '../Functions/githubUtils.js';

//__dirname
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//Convert to a readable format
const formatter = new Intl.DateTimeFormat('en', {
  dateStyle: 'short',
  timeStyle: 'medium'
});

const post = (type, message) => {
  return new Promise((resolve, reject) => {

    const handleError = (error) => {
      console.error(`Error while processing log: ${error}`);
      reject(error); // Pass the error up to be handled by the caller
    };

    switch (type) {
      case 'success':
        _toConsole(type, 'green', message)
          .then(() => {
            _toFile(type, message)
              .then(resolve)
              .catch(() => reject('Failed to log to file'));
          })
          .catch(handleError);
        break;
      case 'info':
        _toConsole(type, 'blue', message)
          .then(() => {
            _toFile(type, message)
              .then(resolve)
              .catch(() => reject('Failed to log to file'));
          })
          .catch(handleError);
        break;
      case 'warn':
        _toConsole(type, 'yellow', message)
          .then(() => {
            _toFile(type, message)
              .then(resolve)
              .catch(() => reject('Failed to log to file'));
          })
          .catch(handleError);
        break;
      case 'error':
        _toConsole(type, 'red', message)
          .then(() => {
            _toFile(type, message)
              .then(resolve)
              .catch(() => reject('Failed to log to file'));
            createGithubIssue(message, {});
          })
          .catch(() => console.log(message)); // Log to console if console logging fails
        break;
      case 'urgent':
        _toConsole(type, 'bgRed', message)
          .then(() => {
            _toFile(type, message)
              .then(resolve)
              .catch(() => reject('Failed to log to file'));
          })
          .catch(handleError);
        break;
    }
  });
};

//Async append new log to file
const _toFile = (type, message) => {

  let fileTimestamp = moment().format('YYYY-MM-DD').concat('.log');
  let objectTimestamp = moment().format('x');
  let formattedTime = moment().format('hh:mm:ss');

  return new Promise((resolve, reject) => {
    fs.appendFile(path.join(__dirname, `../../Data/Logs/${fileTimestamp}`), JSON.stringify({
      objTime: objectTimestamp,
      time: formattedTime,
      type: type,
      message: message
    }).concat('\n'), (error) => {
      if (error) {
        reject(error.message);
      } else {
        resolve('Log appended to file');
      }
    });
  });
};

//Async write log to console stream
const _toConsole = (type, color, message) => {
  return new Promise((resolve, reject) => {
    // Convert message to array
    let messageArray = message.split('\n');

    try {
      // Formatting date and message type
      const timestamp = formatter.format(new Date()); // Ensure you have a formatter or replace with a suitable formatting.
      const typeFormatted = `[${type.toUpperCase()}]`;

      // Dynamically selecting the chalk method based on the 'color' parameter
      const colorize = chalk[color] ? chalk[color] : chalk.white; // Fallback to white if the color is not found

      // Composing and logging messages
      const logMessage = `${timestamp} ${typeFormatted}`;
      console.log(colorize(logMessage) + ' ' + chalk.grey(messageArray[0]));
      if (messageArray.length > 1) {
        console.log(colorize(logMessage) + ' ' + chalk.grey(messageArray[1]));
        if (messageArray.length > 2) {
          console.log(colorize(logMessage) + ' ' + chalk.grey(messageArray[2]));
        }
      }
      resolve('Log created to console');
    } catch (error) {
      reject(error.message);
    }
  });
};

//Purge all logs from before the specified amount of days
const purge = (days) => {
  return new Promise(async (resolve, reject) => {
    fs.readdir(path.join(__dirname, '../../Data/Logs'), (error, files) => {
      if (error) {
        reject(error.message);
      } else {
        files.forEach(file => {
          let fileTimestamp = file.split('.')[0];
          let fileDate = moment(fileTimestamp, 'YYYY-MM-DD');
          let currentDate = moment();
          let diff = currentDate.diff(fileDate, 'days');

          if (diff > days) {
            fs.unlink(path.join(__dirname, `../../Data/Logs/${file}`), (error) => {
              if (error) {
                reject(error.message);
              }
            });
          }
        });
        resolve('Logs purged');
      }
    });
  });
}

export default {
  post,
  purge
};