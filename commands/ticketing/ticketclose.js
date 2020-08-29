module.exports = {
  name: "ticketclose",
  category: "ticketing",
  description: "Close an ongoing ticket.",
  usage: "sb!ticketclose",
  permission: "STAFF",
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    if (!message.guild) return;
    const fs = require("fs");

    const config = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8"));
    const eventFunctions = require(`../../main/functions/eventUtils.js`);

    if (message.channel.parent.name === "Tickets") {
      if (message.channel.name.startsWith("ticket-")) {
        if (config.loggingenabled) {
          if (eventFunctions.checkChannel(config.loggingchannel, bot)) {
            message.guild.channels.cache.get(config.loggingchannel).send({
              embed: {
                color: bot.settings.color.yellow,
                description: `**Ticket Closed**\n**Channel:** ${message.channel.name}\n**ID:** ${message.channel.id}`,
              },
            });
          }
        }
        message.channel.delete();
      } else {
        message.reply(
          'This channel does not start with "ticket-". Please delete the channel manually or change the name of the channel.'
        );
      }
    } else {
      message.reply(
        'This channel is not in the "Tickets" category. Please delete the channel manually or move it to the correct category.'
      );
    }
  },
};
