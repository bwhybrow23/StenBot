const util = require("util");
const readdir = util.promisify(require("fs").readdir);

module.exports = async (bot, message) => {

  const Discord = require("discord.js");
  const efunctions = require("../functions/eventUtils.js");

  if ((message.channel.type === "dm")) return;

  let config = await bot.mutils.getGuildById(message.guild.id);

  if (config.logging_enabled == true) {
    if (config.logging_ignore.includes(message.channel.id)) return;
    if (config.logging_level == "low" || config.logging_level == "medium" || config.logging_level == "high") {
      if (efunctions.checkChannel(config.logging_channel, bot) == true) {
        if (message.author.bot) return;
        let files = await readdir("./commands/");
        possiblefilename =
          message.content.split(" ")[0].slice(bot.settings.prefix.length) +
          ".js";
        if (files.includes(possiblefilename)) return;

        let lchannel = bot.channels.cache.get(config.logging_channel);
        bot.eventEmbed("c70011", message.author, "Message Deleted", `**Channel:** ${message.channel}\n**Message:**\n${message}`, [], `${lchannel.guild.name}`, bot)
          .then(embed => lchannel.send(embed))
          .catch(error => console.error(error))
      }
    }
  }
};