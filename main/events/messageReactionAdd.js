module.exports = (bot, reaction, user) => {
  const reactionFunctions = require("../functions/reactions.js");

  if (user.id !== bot.user.id) {
    // Reaction not from StenBot
    if (reaction.emoji.name === "✅") {
      reactionFunctions.verifiedRole(reaction, user);
    }
  }
};
