module.exports = (reaction, user) => {

    const logger = require("../functions/console.js");
    const utils = require("../functions/utilities.js");
    const reactionFunctions = require("../functions/reactions.js");
    const fs = require("fs");
   
   
    //VERIFICATION STUFF
    const botData = JSON.parse(fs.readFileSync("./data/global/bot-data.json"))
   
    if (user.bot == false) {
   
     //Green Tick is Checked
     if (reaction._emoji.name == "✅") {
      reactionFunctions.verifiedRole(reaction.message, reaction, user, botData)
     }
   
    }
   
   }