const chalk = require("chalk");
const Path = require("path");
const fs = require("fs");
const moment = require("moment");
const {
  resolve
} = require("path");

//Get the current time
const date = new Date();
//Convert to a readable format
const formatter = new Intl.DateTimeFormat("en", {
  timeStyle: "medium",
});

const post = (type, message) => {
  return new Promise((resolve, reject) => {

    switch (type) {
      case "success":
        _toConsole(type, "green", message)
          .then((success) => {
            _toFile(type, message)
              .then((success) => {
                resolve()
              }, (error) => {
                reject("Failed to log to file");
              })
          }, (error) => {
            reject("Failed to log to console");
          })
        break;
      case "info":
        _toConsole(type, "blue", message)
          .then((success) => {
            _toFile(type, message)
              .then((success) => {
                resolve()
              }, (error) => {
                reject("Failed to log to file");
              })
          }, (error) => {
            reject("Failed to log to console");
          })
        break;
      case "warn":
        _toConsole(type, "yellow", message)
          .then((success) => {
            _toFile(type, message)
              .then((success) => {
                resolve()
              }, (error) => {
                reject("Failed to log to file");
              })
          }, (error) => {
            reject("Failed to log to console");
          })
        break;
      case "error":
        _toConsole(type, "red", message)
          .then((success) => {
            _toFile(type, message)
              .then((success) => {
                resolve()
              }, (error) => {
                reject("Failed to log to file");
              })
          }, (error) => {
            reject("Failed to log to console");
          })
        break;
      case "urgent":
        _toConsole(type, "bgRed", message)
          .then((success) => {
            _toFile(type, message)
              .then((success) => {
                resolve()
              }, (error) => {
                reject("Failed to log to file");
              })
          }, (error) => {
            reject("Failed to log to console");
          })
        break;
    }
  })
}

//Async append new log to file
const _toFile = (type, message) => {

  let fileTimestamp = moment().format("YYYY-MM-DD").concat(".log");
  let objectTimestamp = moment().format("x");
  let formattedTime = moment().format("hh:mm:ss");

  return new Promise((resolve, reject) => {
    fs.appendFile(Path.join(__dirname, `../../Data/Logs/${fileTimestamp}`), JSON.stringify({
      objTime: objectTimestamp,
      time: formattedTime,
      type: type,
      message: message
    }).concat("\n"), (error) => {
      if (error) {
        reject(error.message)
      } else {
        resolve("Log appended to file")
      }
    })
  })
}

//Async write log to console stream
const _toConsole = (type, colour, message) => {
  return new Promise((resolve, reject) => {
    let dataTimestamp = `[ ${moment().format("HH:mm:ss")} ]`;
    try {
      // process.stdout.write(Buffer.from(`${options.colour ? (colours[options.colour] || "") : ""}[ ${options.error ? "ERROR" : "INFO"} ] ${dataTimestamp} ${type.toUpperCase()}: ${message}\x1b[0m\n`));
      console.log(chalk `{${colour} ${formatter.format(date)} [${type.toUpperCase()}]} {grey ${message}}`);
      resolve("Log created to console");
    } catch (error) {
      reject(error.message);
    }
  })
}

module.exports = {
  post
};