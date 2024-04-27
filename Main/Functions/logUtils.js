import chalk from 'chalk';
import { Path } from 'path';
import * as fs from 'fs';
const moment = require('moment');

//Get the current time
const date = new Date();
//Convert to a readable format
const formatter = new Intl.DateTimeFormat('en', {
  dateStyle: 'short',
  timeStyle: 'medium'
});

const post = (type, message) => {
  return new Promise((resolve, reject) => {

    switch (type) {
    case 'success':
      _toConsole(type, 'green', message)
        .then(() => {
          _toFile(type, message)
            .then(() => {
              resolve();
            }, () => {
              reject('Failed to log to file');
            });
        }, () => {
          reject('Failed to log to console');
        });
      break;
    case 'info':
      _toConsole(type, 'blue', message)
        .then(() => {
          _toFile(type, message)
            .then(() => {
              resolve();
            }, () => {
              reject('Failed to log to file');
            });
        }, () => {
          reject('Failed to log to console');
        });
      break;
    case 'warn':
      _toConsole(type, 'yellow', message)
        .then(() => {
          _toFile(type, message)
            .then(() => {
              resolve();
            }, () => {
              reject('Failed to log to file');
            });
        }, () => {
          reject('Failed to log to console');
        });
      break;
    case 'error':
      _toConsole(type, 'red', message)
        .then(() => {
          _toFile(type, message)
            .then(() => {
              resolve();
            }, () => {
              reject('Failed to log to file');
            });
        }, () => {
          // reject('Failed to log to console');
          console.log(message);
        });
      break;
    case 'urgent':
      _toConsole(type, 'bgRed', message)
        .then(() => {
          _toFile(type, message)
            .then(() => {
              resolve();
            }, () => {
              reject('Failed to log to file');
            });
        }, () => {
          reject('Failed to log to console');
        });
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
    fs.appendFile(Path.join(__dirname, `../../Data/Logs/${fileTimestamp}`), JSON.stringify({
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
const _toConsole = (type, colour, message) => {
  return new Promise((resolve, reject) => {
    //Convert message to array
    let messageArray = message.split('\n');

    try {
      console.log(chalk `{${colour} ${formatter.format(date)} [${type.toUpperCase()}]} {grey ${messageArray[0]}}`);
      if(messageArray.length > 1) {
        console.log(chalk `{${colour} ${formatter.format(date)} [${type.toUpperCase()}]} {grey ${messageArray[1]}}`);
        console.log(chalk `{${colour} ${formatter.format(date)} [${type.toUpperCase()}]} {grey ${messageArray[2]}}`);
      }
      resolve('Log created to console');
    } catch (error) {
      reject(error.message);
    }
  });
};

module.exports = {
  post
};