exports.run = (bot, message, args) => {

    const Discord = require("discord.js");

    let member = message.mentions.members.first();

    if (member === undefined) {
        let authtag = message.author.tag;
        let authid = message.author.id;
        let authcreate = message.author.createdAt;
        let authjoined = message.member.joinedAt;
        let authhoistr = message.member.highestRole;

        return message.channel.send({
            embed: {
                color: bot.settings.green,
                description: '**Your information**\n\nTag: **' + authtag + '**\nId: **' + authid + '**\nCreated: **' + authcreate + '**\nJoined: **' + authjoined + '**\nHighest Role: ' + authhoistr
            }
        });
    };

    let menname = member.displayName;
    let menid = member.id;
    let menjoined = member.joinedAt;
    let menhoistr = member.highestRole;

    message.channel.send({
        embed: {
            color: bot.settings.green,
            description: '**' + menname + ' Information**\n**\nId: **' + menid + '\n**Joined:**' + menjoined + '\nHighest Role: ' + menhoistr
        }
    });


};
