exports.run = (bot, message, args) => {

    //const settings = require('../main/settings.json');
    const Discord = require("discord.js");

    let userimage = message.author.avatarURL;
    let usertag = message.author.tag;

    let aboutEmbed = new Discord.RichEmbed()
        .setThumbnail(bot.user.displayAvatarURL)
        .setColor(bot.settings.blue)
        .setTitle('Bot Information')
        .addField('Bot Name', bot.user.tag)
        .addField('Founded By', 'Stentorian')
        .addField('Created On', bot.user.createdAt)
        .addField('Why was StenBot created?', 'It was mainly created to save me from the pain of creating multiple bots for clients. I also don\'t like some of the features that are included with major Discord bots. It started as a copy and paste bot that i was going to publish "Open Source" on Github. Then I recieved some help from a friend called Samb8104 who gave me some old code from a bot he was working on and I was able to add per server configs and cool features that you\'re seeing today!')
        .setFooter(usertag, userimage)
        .setTimestamp();

    message.channel.send(aboutEmbed);

};