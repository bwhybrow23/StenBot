const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test").setDescription("This is a test command"),
  category: "general",
  options: { permission: "EVERYONE", enabled: true, guildOnly: false },
  run: async (bot, interaction) => {

    const Discord = require("discord.js");

    let bicon = bot.user.avatarURL;

    let inviteEmbed = new Discord.MessageEmbed()
      .setDescription("Invite StenBot to your Discord Server")
      .setColor(bot.settings.color.blue)
      .addField("Default Help Command", "`sb!help`")

    interaction.reply({embeds: [inviteEmbed.toJSON()]});
    
  },
};