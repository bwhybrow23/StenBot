const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription(
      "Returns a list of commands, or a specific command's information."
    )
    .addStringOption((option) =>
      option
      .setName("category")
      .setDescription("A category to give a list of commands for.")
    ),
  category: "general",
  usage: "[CATEGORY]",
  example: "eco",
  options: { permission: "EVERYONE", enabled: true, guildOnly: false },
  run: async (bot, interaction) => {
    const Discord = require("discord.js");
    let prefix = "/";

    //Capitalize function
    const capitalize = (s) => {
      if (typeof s !== "string") return "";
      return s.charAt(0).toUpperCase() + s.slice(1);
    };

    if (interaction.options.getString("category") != null) {
      //Category Help

      let category = interaction.options.getString("category");

      //Embed to Send
      const embed = new Discord.MessageEmbed()
        .setColor(bot.settings.color.blue)
        .setTitle(capitalize(category))
        .setFooter({
          text: `Help Command | Syntax: <> = required, [] = optional`,
          iconURL: bot.user.avatarURL(),
        })
        .setTimestamp();

      //Get Commands
      bot.commands.forEach((cmd) => {
        if (cmd.category != category) return;
        embed.addField(
          `\`${prefix}${cmd.data.name} ${cmd.usage}\``,
          `${cmd.data.description}`
        );
      });

      if (embed.fields.length == 0) {
        embed.setDescription("No commands found under that category.");
      }

      return interaction.reply({ embeds: [embed.toJSON()] });
    } else {
      //General Help

      //Main Embed
      let embed = new Discord.MessageEmbed()
        .setTitle("All Commands")
        .setDescription(`Prefix: \`${prefix}\``)
        .setColor(bot.settings.color.blue)
        .addField(`Admin Commands`, `\`${prefix}help admin\``, true)
        .addField(`Bot Commands`, `\`${prefix}help bot\``, true)
        .addField(`Config Commands`, `\`${prefix}help config\``, true)
        .addField(`Economy Commands`, `\`${prefix}help eco\``, true)
        .addField(`Fun Commands`, `\`${prefix}help fun\``, true)
        .addField(`General Commands`, `\`${prefix}help general\``, true)
        .addField(`Moderation Commands`, `\`${prefix}help mod\``, true)
        .addField(`Ticketing Commands`, `\`${prefix}help ticketing\``, true)
        .setFooter({ text: "Help Command", iconURL: bot.user.avatarURL() })
        .setTimestamp();

      interaction.reply({ embeds: [embed.toJSON()] });
    }
  },
};