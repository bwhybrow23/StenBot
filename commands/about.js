exports.run = (bot, message, args) => {

    //const settings = require('../main/settings.json');
    const Discord = require("discord.js");

    let userImage = message.author.displayAvatarURL;
    let userTag = message.author.tag;

    let embed = new Discord.RichEmbed()
    .setColor(bot.settings.blue)
    .setThumbnail(bot.user.displayAvatarURL)
    .setTitle('Bot Information')
    .addField('Bot Name', bot.user.username)
    .addField('Founded By', 'Stentorian')
    .addField('Created On', bot.user.createdAt)
    .addField('Why was StenBot created?', 'It was mainly created as a save for me having to create multiple bots for people. I also didn\'t like some of the features included with major Discord bots. It started as a bot that could easily be copied and pasted to make new ones and then eventually (with help from Samb8104) I was able to add per server configs and cool features that you\'re seeing today!')
    .setFooter(userTag, userImage);

    message.channel.send({
        embed: embed
    });

};
