module.exports = {
    name: "glist",
    category: "bot",
    description: "Gain a list of all the guilds the bot is in. Only name and ID is given.",
    example: ".glist",
    permission: "BOT OWNER",
    run: async (bot, message, args) => {

    const Discord = require("discord.js");
   
    let guildList = [];
    bot.guilds.forEach(function(guilds) {
     guildList.push(`${guilds.name} ||  ${guilds.id}`)
    })
   
    const lgEmbed = new Discord.RichEmbed()
     .setTitle(`**GUILD LIST**`)
     .setColor(bot.settings.color.blue)
     .addField('Guilds', `\`\`\`${guildList.join('\n')}\`\`\``)
     .setFooter(`${message.author.tag}`, `${message.author.avatarURL}`);
   
    message.channel.send(lgEmbed);
   }};
