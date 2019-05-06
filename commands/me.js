exports.run = (bot, message, args, func) => {

    const Discord = require("discord.js");
    const moment = require("moment")
    require("moment-duration-format")

    let user;
    if (message.guild.members.get(args[0])) user = message.guild.members.get(args[0])
    else if (message.mentions.users.first()) user = message.mentions.users.first()
    else if (args.join(" ")) user = func.autouser(message, args.join(" "))
    else if (!args.join(" ") || message.mentions.users.first()) user = message.author;
    const member = message.guild.member(user);

    function isBot() {

        let bot;
        if (user != func.autouser(message, args.join(" "))) {
            if (user.bot === true) bot = "Yes";
            else bot = "No"

            return bot;
        } else {
            if (user.user.bot === true) bot = "Yes";
            else bot = "No";

            return bot;
        }

    }

    function game() {
        let game;
        if (user.presence.activity !== null) game = user.presence.activity.name
        else game = "None";
        return game;
    }

    if (user === func.autouser(message, args.join(" ")) || message.guild.members.get(args[0])) {
        const embed = new Discord.MessageEmbed()
            .setColor(bot.settings.blue)
            .setThumbnail(user.user.displayAvatarURL())
            .setAuthor(`${user.user.username}#${user.user.discriminator}`, user.user.displayAvatarURL())
            .addField("ID:", `${user.user.id}`, true)
            .addField("Nickname:", `${member.nickname || 'None'}`, true)
            .addField("Status:", status(), true)
            .addField("Bot:", `${isBot()}`, true)
            .addField("Game", game(), true)
            .addField("Created At" + ` (${moment(user.user.createdAt, "dd").fromNow()})`, `${moment.utc(user.user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, false)
            .addField("Joined Server" + ` (${moment(member.joinedAt, "dd").fromNow()})`, `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, false)
            .addField("Highest Role", member.user.highestRole, true)
            .addField("Roles:", member.roles.map(roles => `${roles.name}`).join(', '), true)
            .setFooter(message.author.tag, message.author.displayAvatarURL());
        message.channel.send(embed);
    } else {
        const embed = new Discord.MessageEmbed()
            .setColor(bot.settings.blue)
            .setThumbnail(user.displayAvatarURL())
            .setAuthor(`${user.username}#${user.discriminator}`, user.displayAvatarURL())
            .addField("ID:", `${user.id}`, true)
            .addField("Nickname:", `${member.nickname || 'None'}`, true)
            .addField("Status:", status(), true)
            .addField("Bot:", `${isBot()}`, true)
            .addField("Game", game(), true)
            .addField("Created At" + ` (${moment(user.createdAt, "dd").fromNow()})`, `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, false)
            .addField("Joined Server" + ` (${moment(member.joinedAt, "dd").fromNow()})`, `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, false)
            .addField("Highest Role", member.highestRole, true)
            .addField("Roles:", member.roles.map(roles => `${roles.name}`).join(', '), true)
            .setFooter(message.author.tag, message.author.displayAvatarURL());
        message.channel.send(embed);
    }

}