const Discord = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "help",
    category: "general",
    description: "Returns all commands, or information about one specific command.",
    usage: "[command | alias]",
    run: async (bot, message, args) => {
        // If there's an args found
        // Send the info of that command found
        // If no info found, return not found embed.
        if (args[0]) {
            return getCMD(bot, message, args[0]);
        } else {
            // Otherwise send all the commands available
            // Without the cmd info
            return getAll(bot, message);
        }
    }
}

function getAll(bot, message) {
    const embed = new Discord.RichEmbed()
        .setColor(bot.settings.color.blue)
        
    // Map all the commands
    // with the specific category
    const commands = (category) => {
        return bot.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `- \`${cmd.name}\``)
            .join("\n");
    }

    // Map all the categories
    const info = bot.categories
        .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category);

    return message.channel.send(embed.setDescription(info));
}

function getCMD(bot, message, input) {
    const embed = new Discord.RichEmbed()

    // Get the cmd by the name or alias
    const cmd = bot.commands.get(input.toLowerCase()) || bot.commands.get(bot.aliases.get(input.toLowerCase()));
    
    let info = `No information found for command **${input.toLowerCase()}**`;

    // If no cmd is found, send not found embed
    if (!cmd) {
        return message.channel.send(embed.setColor("RED").setDescription(info));
    }

    // Add all cmd info to the embed
    if (cmd.name) info = `**Command name**: ${cmd.name}`;
    if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Usage**: ${cmd.usage}`;
        embed.setFooter(`Syntax: <> = required, [] = optional`);
    }

    return message.channel.send(embed.setColor("GREEN").setDescription(info));
}
