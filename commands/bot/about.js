const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about").setDescription("Get some information about StenBot"),
  category: "bot",
  usage: "",
  example: "",
  options: { permission: "EVERYONE", enabled: true, guildOnly: false },
  run: async (bot, interaction) => {

    return interaction.reply({
      embeds: [{
        title: "Bot Information",
        color: bot.settings.color.blue,
        thumbnail: bot.user.avatarURL(),
        fields: [{
            name: "Bot Name",
            value: `${bot.user.tag}`
        }, {
            name: "Founded By",
            value: "Ben Whybrow (Stentorian#6969)"
        }, {
            name: "Created On",
            value: `${bot.user.createdAt}`
        }, {
            name: "Credit",
            value: `- <@285447788827770881> - Original Code & Occasional Help \n- <@236379670961061889> - Dealing with my code errors in his DMs`
        },
          {
            name: "Why was StenBot Created?",
            value: "StenBot was originally created with the idea in mind of reducing the amount of Discord bots every server needs. It was also to take the stress off making so many Discord bots for friends and just giving them this bot instead. It contains a plethra of features and more to come in the future with consistent updates."
        }],
        footer: {
          icon_url: bot.user.avatarURL(),
          text: `${interaction.guild.name}`
        }
      }]
    })

  }
};