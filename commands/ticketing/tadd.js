const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tadd").setDescription("Add a user to an ongoing ticket.")
    .addUserOption(option => option.setName("user").setDescription("The user to add to the ticket.").setRequired(true)),
  category: "ticketing",
  usage: "<@USER>",
  example: "@Lana#1505",
  options: { permission: "EVERYONE", enabled: true, guildOnly: true },
  run: async (bot, interaction) => {

    const Discord = require("discord.js");

    const config = await bot.mutils.getGuildById(interaction.guild.id);

    function errsend(msg) {
      interaction.reply({
        embeds: [{
          color: bot.settings.color.red,
          description: `Error! ${msg}`,
          timestamp: Date.now(),
          footer: {
            icon_url: "https://i.imgur.com/klY5xCe.png",
            text: `${interaction.guild.name}`,
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
      if (interaction.guild.roles.cache.get(config.moderation.staff_role === undefined)) {
        return errsend("The staff role set is no longer valid.");
      }
    } else {
      return errsend("A staff role is not set in the servers config.");
    }

    //if channel is in ticket cat
    if (interaction.channel.parent.name !== "Tickets") {
      return errsend("The channel is not in the tickets category.");
    }

    //add user
    let toBeAdded = interaction.options.getUser("user");
    if (!toBeAdded || args[0] === "help") {
      return bot.helpEmbed("tadd", bot)
        .then((embed) => interaction.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }
    try {
      interaction.channel.permissionOverwrites.create(toBeAdded.id, {
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
      .setAuthor(interaction.guild.name, `https://i.imgur.com/klY5xCe.png`)
      .setTimestamp();

    interaction.reply({embeds: [embed.toJSON()]});
  },
};