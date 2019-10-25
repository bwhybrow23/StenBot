module.exports = {
    name: "help",
    category: "general",
    description: "List all commands that you can use with StenBot.",
    example: ".help",
    permission: "EVERYONE",
    run: async (bot, message, args) => {

    const Discord = require("discord.js");
    const zalgo = require("zalgolize");
    
    const mainE = new Discord.RichEmbed()
    .setColor(bot.settings.color.blue)
    .setTitle(`Help Menu - StenBot`)
    .setDescription(`For an indepth list of all the commands and features of StenBot, be sure to checkout the [docs](https://sbdocs.benwhybrow.xyz)\nBelow is a list of all the subcommands you can do for the \`.help\` command.\n\n\`.help admin\` - All admin related commands.\n\`.help bot\` - All commands related to StenBot.\n\`.help config\` - All commands related to setting up the config for your server.\n\`.help eco\` - All economy related commands.\n\`.help fun\` - All fun related commands to do with StenBot\n\`.help general\` - All general commands for StenBot that don't fit into a particular category.\n\`.help moderation\` - All moderation related commands.`)
    .setFooter(message.author.tag, message.author.avatarDisplayURL)
    .setTimestamp();

    const adminE = new Discord.RichEmbed()
    .setColor(bot.settings.color.blue)
    .setTitle(`Admin Commands - StenBot`)
    .setDescription(`This is for all admin related commands.\n\n\`.delchannel <channel name>\` - Delete any channel that the bot can see.\n\`.delrole <role name>\` - Delete any role that the bot can see.\n\`.txtcreate <name>\` - Create a text channel.\n\`.vccreate <name>\` - Create a voice channel.`)
    .setFooter(message.author.tag, message.author.avatarDisplayURL)
    .setTimestamp();

    const botE = new Discord.RichEmbed()
    .setColor(bot.settings.color.blue)
    .setTitle(`Bot Commands - StenBot`)
    .setDescription(`This is for all the commands related to StenBot.\n\n\`.about\` - Tells you all relevant information about StenBot.\n\`.ginvite <guild id>\` - **BOT OWNER ONLY** Gives an invite for a guild that the bot is in and has permission to.\n\`.glist\` - **BOT OWNER ONLY** Displays a list of all the servers the bot is in. \n\`.report <bug/player>\`\n\`.sponsors\` - Provides links to all StenBot sponsors.\n\`.status\` - Provides a link to view StenBot's status.`)
    .setFooter(message.author.tag, message.author.avatarDisplayURL)
    .setTimestamp();

    const configE = new Discord.RichEmbed()
    .setColor(bot.settings.color.blue)
    .setTitle(`Bot Commands - StenBot`)
    .setDescription(`This is for all the commands related to configuring StenBot to your server.\n\n\`.config\` - Shows the current config for the server the command is issued in.\n\`.config-log <value>\` - Configure logs for your server.\n\`.config-staff\` - Configure all staff related things for your server (This includes things like spam filters and link block filters.) \n\`.config-tickets\` - Setup tickets for your server. \n\`.config-userjoin\` - Configure your server for when people join. \n\`.config-welcomer\` - Configure welcomer for when people join/leave the server. \n\`.config-reset\` - Reset the config back to the default config. (This cannot be rolled back.)`)
    .setFooter(message.author.tag, message.author.avatarDisplayURL)
    .setTimestamp();

    const ecoE = new Discord.RichEmbed()
    .setColor(bot.settings.color.blue)
    .setTitle(`Economy Commands - StenBot`)
    .setDescription(`This is for all the commands related to the StenBot economy system. \n\n\`.bal/.balance {@user}\` - Find out your balance or another user's. \n\`.coinflip <amount>\` - Bet some money on a coinflip. \n\`.daily\` - Recieve your daily money. Time resets at midnight England time. \n\`.dice <amount>\` - Roll the dice and bet on what it lands on. \n\`.leaderboard\` - View the global leaderboard for money on the bot. \n\`.pay <@user> <amount>\` - Pay a specific user an amount. Has to be within your balance.`)
    .setFooter(message.author.tag, message.author.avatarDisplayURL)
    .setTimestamp();

    const funE = new Discord.RichEmbed()
    .setColor(bot.settings.color.blue)
    .setTitle(`Fun Commands - StenBot`)
    .setDescription(`This is for all the commands related to having fun with StenBot. \n\n\`.8ball <question>\` - Ask the bot a question and it will give you an answer. \n\`.achievement <message>\` - Put a message inside of a Minecraft achievement text box. \n\`.action <action> <@user>\` - Choose to cuddle, hug, kiss, pat, poke, slap or tickle someone. \n\`.binary <text>\` - Change a sentence into binary code. \n\`.cat\` - Show a random image of a cat. \n\`.dog\` = Show a random image of a dog. \n\`.gay <@user>\` - Find out how gay someone is. \n\`\.haveibeenpwned <email>\` - Check if your email has been pawned (sold to other companies or leaked). \n\`.invitelist\` - Check who's on the leaderboard for the most invites to the server. \n\`.mcping <ip>{:port} \` - Get an update from a Minecraft server (offline or online). \n\`.me {@user}\` - Check all the information the bot knows about you or someone else on the server. \n\`.stealpic <@user>\` - Steal a user's Discord avatar picture. \n\`.zalgo <text>\` - Zalgolize a word so it looks ${zalgo("like this", 0.3, [12, 6, 12])}.`)
    .setFooter(message.author.tag, message.author.avatarDisplayURL)
    .setTimestamp();

    const generalE = new Discord.RichEmbed()
    .setColor(bot.settings.color.blue)
    .setTitle(`General Commands - StenBot`)
    .setDescription(`This is for all the general StenBot commands. \n\n\`NONE\``)
    .setFooter(message.author.tag, message.author.avatarDisplayURL)
    .setTimestamp();

    const modE = new Discord.RichEmbed()
    .setColor(bot.settings.color.blue)
    .setTitle(`Moderation Commands - StenBot`)
    .setDescription(`This is all the moderation commands for StenBot. \n\n\`.ban <@user> <reason>\` - Ban a specific user permanently. \n\`.clear <amount of messages>\` - Clear a certain number of messages from the chat. \n\`.clearuser <@user> <amount>\` - Clear a certain amount of messages from a specific user. \n\`.kick <@user> <reason>\` - Kick a specific user with a provided reason. \n\`.tempmute <@user> <time> <reason>\` - Temporarily mute a user for a certain amount of time.`)
    .setFooter(message.author.tag, message.author.avatarDisplayURL)
    .setTimestamp();

    let subc = args[0];

    if (subc === "admin") {
        message.channel.send(adminE);
    } else if (subc === "bot") {
        message.channel.send(botE);
    } else if (subc === "config") {
        message.channel.send(configE);
    } else if (subc === "eco") {
        message.channel.send(ecoE);
    } else if (subc === "fun") {
        message.channel.send(funE);
    } else if (subc === "general") {
        message.channel.send(generalE);
    } else if (subc === "moderation") {
        message.channel.send(modE);
    } else {
        message.channel.send(mainE);
    }

}};
