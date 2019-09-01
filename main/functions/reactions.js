const fs = require("fs");
const logger = require("./console.js");
const utils = require("./utilities.js");

/*
  Verified Role
*/
const verifiedRole = (message, reaction, user) => {
    reaction.remove(user);
    
    //CHECK IF USER HAS ROLE
    let roleName = "Member";
    var roleObj = message.guild.roles.find(r => r.name === roleName);
    var userObj = message.guild.members.get(user.id);

    if(userObj.hasRole(roleObj)) {
      user.send("You already have already verified yourself on the StenBot Discord. If you still see this channel then please contact support.")
    } else {    
    userObj.addRole(roleObj);
    }
}

module.exports = {
    verifiedRole
}