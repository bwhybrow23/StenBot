const chalk = require("chalk");

//Create new console log
const post = (type, message) => {
  //Get the current time
  const date = new Date();

  //Convert to a readable format
  const formatter = new Intl.DateTimeFormat("en" , {
    timeStyle: "medium",
  });

  // var nowSimple = `[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}]`;

  switch (type) {
    case "success":
      console.log(chalk.green(formatter.format(date), "[SUCCESS] ") + chalk.grey(message));
      break;
    case "info":
      console.log(chalk.blue(formatter.format(date), "[INFO] ") + chalk.grey(message));
      break;
    case "warn":
      console.log(chalk.yellow(formatter.format(date), "[WARN] ") + chalk.grey(message));
      break;
    case "error":
      console.log(chalk.red(formatter.format(date), "[ERROR] ") + chalk.grey(message));
      break;
    case "urgent":
      console.log(chalk.bgRed(formatter.format(date), "[URGENT]", message));
      break;
  }
};

module.exports = {
  post
};
