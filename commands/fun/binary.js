const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("binary").setDescription("Convert text to binary.")
    .addStringOption(option => option.setName("text").setDescription("The text to convert to binary.").setRequired(true)),
  category: "fun",
  options: { permission: "EVERYONE", enabled: true, guildOnly: false },
  run: async (bot, interaction) => {

    var output = "";
    var input = interaction.options.getString("text");
    for (var i = 0; i < input.length; i++) {
      output += input[i].charCodeAt(0).toString(2) + " ";
    }

    bot.createEmbed("success", "", ``, [{
        name: "Original Text",
        value: `${input}`
      }, {
        name: "Binary",
        value: `${output}`
      }, ], `${interaction.guild.name}`, interaction)
      .then((embed) => interaction.reply(embed))
      .catch((error) => bot.log.post("error", error));
  },
};