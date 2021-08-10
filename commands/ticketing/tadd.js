module.exports = {
  name: "tadd",
  category: "ticketing",
  description: "Add a user to an ongoing ticket.",
  usage: "<@USER>",
  example: "@Lana#1505",
  options: { permission: "EVERYONE", enabled: true, guildOnly: true },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");

    const config = await bot.mutils.getGuildById(message.guild.id);

    function errsend(msg) {
      message.channel.send({
        embeds: [{
          color: bot.settings.color.red,
          description: `Error! ${msg}`,
          timestamp: Date.now(),
          footer: {
            icon_url: "https://i.imgur.com/BkZY6H8.png",
            text: `${message.guild.name}`,
          },
        }],
      });
    }

    //Check if tickets are enabled
    if (!config.tickets.enabled) {
      return errsend("Tickets are not enabled in the servers config.");
    }

    //Check if staff role is valid or set
    if (config.moderation.staff_role) {
      if (message.guild.roles.cache.get(config.moderation.staff_role == undefined)) {
        return errsend("The staff role set is no longer valid.");
      }
    } else {
      return errsend("A staff role is not set in the servers config.");
    }

    //if channel is in ticket cat
    if (message.channel.parent.name !== "Tickets") {
      return errsend("The channel is not in the tickets category.");
    }

    //add user
    let toBeAdded = message.mentions.members.first();
    if (!toBeAdded || args[0] == "help") {
      return bot.helpEmbed("tadd", bot)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }
    try {
      message.channel.permissionOverwrites.create(toBeAdded.id, {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true
      });
    } catch (e) {
      errsend("Error in adding this user. Please check the console.");
      bot.log.post("error", e);
    }

    let embed = new Discord.MessageEmbed()
      .setColor(bot.settings.color.green)
      .setDescription(`The user **${toBeAdded.user.tag}** has been added to the ticket.`)
      .setAuthor(message.guild.name, `https://i.imgur.com/BkZY6H8.png`)
      .setTimestamp();

    message.channel.send({embeds: [embed.toJSON()]});
  },
};