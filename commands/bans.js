const Discord = require("discord.js")

  module.exports.run = async (bot, message, args) => {
    message.guild.fetchBans()
      .then(bans => message.channel.send(`This server has ${bans.size} bans`))
      .catch(console.error);

      message.delete().catch(O_o => {});

  }

  module.exports.help = {
    name: "bans"
  }
