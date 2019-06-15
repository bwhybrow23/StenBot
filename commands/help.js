exports.run = (bot, message, args) => {

    const Discord = require("discord.js");
    
    const mainE = new Discord.RichEmbed()
    .setColor(bot.settings.blue)
    .setTitle(`Help Menu - StenBot`)
    .setDescription(`For an indepth list of all the commands and features of StenBot, be sure to checkout the [docs](https://sbdocs.benwhybrow.xyz)\nBelow is a list of all the subcommands you can do for the \`.help\` command.\n\n\`.help admin\` - All admin related commands.\n\`.help bot\` - All commands related to StenBot.\n\`.help config\` - All commands related to setting up the config for your server.\n\`.help eco\` - All economy related commands.\n\`.help fun\` - All fun related commands to do with StenBot\n\`.help general\` - All general commands for StenBot that don't fit into a particular category.\n\`.help moderation\` - All moderation related commands.`)
    .setFooter(message.author.tag, message.author.avatarDisplayURL);

    const adminE = new Discord.RichEmbed()
    .setColor(bot.settings.blue)
    .setTitle(`Admin Commands - StenBot`)
    .setDescription(`This is for all admin related commands\n\n\`.delchannel <channel name>\` - Delete any channel that the bot can see.\n\`.delrole <role name>\` - Delete any role that the bot can see.\n\`.txtcreate <name>\``)

  
};