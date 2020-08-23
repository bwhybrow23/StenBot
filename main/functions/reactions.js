const fs = require("fs");
const logger = require("./console.js");
const utils = require("./utilities.js");

/**
 *
 * @param {*} reaction
 * @param {*} user
 */

const verifiedRole = (reaction, user) => {
  reaction.users.remove(user);

  const role = reaction.message.guild.roles.cache.find(
    (r) => r.id === "455794398438096896"
  );

  reaction.message.guild.members.fetch(user)
    .then((u) => {
      if (u.roles.cache.has(role.id)) {
        // console.log(`${user.username} already verified.`);
      } else {
        u.roles.add(role);
        // console.log(`Verified ${user.username}.`)
      }
    })
    .catch((err) => console.error(err));
};

module.exports = {
  verifiedRole,
};
