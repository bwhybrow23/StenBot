module.exports = {
  name: "help",
  category: "general",
  description: "Returns all commands, or information about one specific command.",
  usage: "sb!help <CATEGORY | COMMAND>",
  example: "sb!help 8ball",
  permission: "EVERYONE",
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

      //Get Command List for Category Provided
      // const commandSum = bot.commands
      //   .filter((cmd) => cmd.category === category)
      //   .map((cmd) => `- \`${prefix}${cmd.name} ${cmd.usage}\` - ${cmd.description}`)
      //   .join("\n");

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
      .catch((error) => bot.logger("error", error));

      // // Get the cmd by the name or alias
      // const cmd =
      //   bot.commands.get(input.toLowerCase()) ||
      //   bot.commands.get(bot.aliases.get(input.toLowerCase()));

      // let info = `No information found for command **${input.toLowerCase()}**`;

      // // If no cmd is found, send not found embed
      // if (!cmd) {
      //   return message.channel.send(embed.setColor("RED").setDescription(info));
      // }

      // // No output if botowner is the category
      // if (cmd.category == "botowner") {
      //   return message.channel.send(embed.setColor("RED").setDescription(info));
      // }

      // // Add all cmd info to the embed
      // if (cmd.name) info = `**Command name**: ${capitalize(cmd.name)}`;
      // if (cmd.aliases)
      //   info += `\n**Aliases**: ${cmd.aliases
      //     .map((a) => `\`${a}\``)
      //     .join(", ")}`;
      // if (cmd.description) info += `\n**Description**: ${cmd.description}`;
      // if (cmd.usage != "") {
      //   info += `\n**Usage**: \`${prefix}${cmd.name} ${cmd.usage}\``;
      //   embed.setFooter(`Help Command | Syntax: <> = required, [] = optional`);
      // } else if (cmd.usage == "") {
      //   info += `\n**Usage**: \`${prefix}${cmd.name}\``;
      //   embed.setFooter(`Help Command | Syntax: <> = required, [] = optional`);
      // }
      // if (cmd.example != "") {
      //   info += `\n**Example**: \`${prefix}${cmd.name} ${cmd.example}\``
      // } else if (cmd.usage == "") {
      //   info += `\n**Example**: \`${prefix}${cmd.name}\``;
      // }
      // if (cmd.permission) info += `\n**Permission**: ${cmd.permission}`;

      // return message.channel.send(
      //   embed.setColor(bot.settings.color.blue).setDescription(info).setTimestamp()
      // );
    }
  },
};
