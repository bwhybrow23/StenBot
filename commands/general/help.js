module.exports = {
  name: "help",
  category: "general",
  description: "Returns all commands, or information about one specific command.",
  usage: "[CATEGORY | COMMAND]",
  example: "ban",
  permission: "EVERYONE",
  aliases: [],
  enabled: true,
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    if (!message.guild) return;
    let prefix = bot.settings.prefix;

    //Capitalize function
    const capitalize = (s) => {
      if (typeof s !== "string") return "";
      return s.charAt(0).toUpperCase() + s.slice(1);
    };

    if (bot.categories.includes(args[0])) {
      //Category specific help

      let category = args[0];

      //Embed to Send
      const embed = new Discord.MessageEmbed()
        .setColor(bot.settings.color.blue)
        .setTitle(capitalize(args[0]))
        // .setDescription(commandSum)
        .setFooter(`Help Command | Syntax: <> = required, [] = optional`,bot.user.displayURL)
        .setTimestamp();

      bot.commands.forEach(cmd => {
        if(cmd.category != category) return;
        embed.addField(`\`${prefix}${cmd.name} ${cmd.usage}\``, `${cmd.description}`)
      });

      message.channel.send(embed);
    } else if (!args[0]) {
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
        .setFooter("Help Command", bot.user.displayURL)
        .setTimestamp();

      message.channel.send(embed);
    } else if (bot.commands.filter((cmd) => cmd.name === args[0])) {
      //Command Specific Help

      let input = args[0];

      return bot.helpEmbed(input, bot)
      .then((embed) => message.channel.send(embed))
      .catch((error) => {
        bot.createEmbed("error", "", `Cannot find a command under the name of ${input}`, [], message.author.tag, bot)
        .then((embed) => message.channel.send(embed));
      });
      // .catch((error) => bot.log.post("error", error));

    }
  },
};
