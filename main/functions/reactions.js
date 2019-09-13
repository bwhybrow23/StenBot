const fs = require("fs");
const logger = require("./console.js");
const utils = require("./utilities.js");

/**
 * 
 * @param {*} reaction 
 * @param {*} user 
 */
const verifiedRole = (reaction, user) => {
  reaction.remove(user);

  const role = reaction.message.guild.roles.find(r => r.name === 'Member');
  
  reaction.message.guild.fetchMember(user).then(u => {
    if (u.roles.has(role.id)) {
      console.log(`${user.username} already verified.`);
    } else {
      u.addRole(role);
      console.log(`Verified ${user.username}.`)
    }
  }).catch(err => console.error(err));

  
}

module.exports = {
    verifiedRole
}
