const chalk = require("chalk")

//Create new console log
const post = (type, message) => {
  
  //Get the current time
  const now = new Date()
  var nowSimple = `[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}]`
  
  switch(type) {
    case "success":
      console.log(chalk.green(nowSimple,"[SUCCESS]",message))
      break
    case "info":
      console.log(chalk.blue(nowSimple,"[INFO]",message))
      break
    case "warn":
      console.log(chalk.yellow(nowSimple,"[WARN]",message))
      break
    case "error":
     console.log(chalk.red(nowSimple,"[ERROR]",message))
      break
    case "urgent":
      console.log(chalk.bgRed(nowSimple,"[URGENT]",message))
      break
  }
}

module.exports = {
  post
}