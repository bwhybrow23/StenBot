exports.run = async (bot, message, args) => {

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
   }