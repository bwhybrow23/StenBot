const util = require("util");
const readdir = util.promisify(require("fs").readdir);

module.exports = async (bot, message) => {

  const Discord = require("discord.js");
  const efunctions = require("../functions/eventUtils.js");

  if ((message.channel.type == "DM")) return;

  let config = await bot.mutils.getGuildById(message.guild.id);
  if(!config) return;

  if (config.logging.enabled == true) {
    if (config.logging.ignore.includes(message.channel.id)) return;
    if (config.logging.level == "low" || config.logging.level == "medium" || config.logging.level == "high") {
      if (efunctions.checkChannel(config.logging.channel, bot) == true) {
        if (message.author.bot) return;
        let files = await readdir("./commands/");
        possiblefilename =
          message.content.split(" ")[0].slice(bot.settings.prefix.length) +
          ".js";
        if (files.includes(possiblefilename)) return;

        let lchannel = bot.channels.cache.get(config.logging.channel);
        bot.eventEmbed("c70011", message.author, "Message Deleted", `**Channel:** ${message.channel}\n**Message:**\n${message}`, [], `${lchannel.guild.name}`, bot)
          .then(embed => lchannel.send(embed))
          .catch(error => console.error(error))
      }
    }
  }
};