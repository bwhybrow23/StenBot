exports.run = (bot, message, args) => {

    const Discord = require("discord.js");

    let inline = true;

    const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
    let target = message.mentions.users.first() || message.author;

    if (member.user.bot === true) {
        bot = "Yes";
    } else {
        bot = "No";
    }

    let userStatus = member.user.presence.status;
    if (userStatus == "dnd") {

        let embed1 = new Discord.RichEmbed()
            .setThumbnail(target.displayAvatarURL)
            .setColor(14672927)
            .addField("Full Username", `${member.user.tag}`, inline)
            .addField("ID", member.user.id, inline)
            .addField("Nickname", `${member.nickname !== null ? `Nickname: ${member.nickname}` : "None"}`, true)
            .addField("Bot", `${bot}`, inline, true)
            .addField("Status", `Do Not Disturb/DND`, inline, true)
            .addField("Playing", `${member.user.presence.game ? `🎮 ${member.user.presence.game.name}` : "Not playing"}`, inline, true)
            .addField("Roles", `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles"}`, true)
            .addField("Joined Discord At", member.user.createdAt)
            .setFooter(`Information about ${member.user.username}`)
            .setTimestamp();

        message.channel.send(embed1);
    } else if (userStatus = "online") {

        let embed2 = new Discord.RichEmbed()
            .setThumbnail(target.displayAvatarURL)
            .setColor(14672927)
            .addField("Full Username", `${member.user.tag}`, inline)
            .addField("ID", member.user.id, inline)
            .addField("Nickname", `${member.nickname !== null ? `Nickname: ${member.nickname}` : "None"}`, true)
            .addField("Bot", `${bot}`, inline, true)
            .addField("Status", `Online`, inline, true)
            .addField("Playing", `${member.user.presence.game ? `🎮 ${member.user.presence.game.name}` : "Not playing"}`, inline, true)
            .addField("Roles", `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles"}`, true)
            .addField("Joined Discord At", member.user.createdAt)
            .setFooter(`Information about ${member.user.username}`)
            .setTimestamp();

        message.channel.send(embed2);
    } else if (userStatus == "idle") {

        let embed3 = new Discord.RichEmbed()
            .setThumbnail(target.displayAvatarURL)
            .setColor(14672927)
            .addField("Full Username", `${member.user.tag}`, inline)
            .addField("ID", member.user.id, inline)
            .addField("Nickname", `${member.nickname !== null ? `Nickname: ${member.nickname}` : "None"}`, true)
            .addField("Bot", `${bot}`, inline, true)
            .addField("Status", `Idle`, inline, true)
            .addField("Playing", `${member.user.presence.game ? `🎮 ${member.user.presence.game.name}` : "Not playing"}`, inline, true)
            .addField("Roles", `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles"}`, true)
            .addField("Joined Discord At", member.user.createdAt)
            .setFooter(`Information about ${member.user.username}`)
            .setTimestamp();

        message.channel.send(embed3);
    } else if (userStatus == "offline") {
        let embed4 = new Discord.RichEmbed()
            .setThumbnail(target.displayAvatarURL)
            .setColor(14672927)
            .addField("Full Username", `${member.user.tag}`, inline)
            .addField("ID", member.user.id, inline)
            .addField("Nickname", `${member.nickname !== null ? `Nickname: ${member.nickname}` : "None"}`, true)
            .addField("Bot", `${bot}`, inline, true)
            .addField("Status", `Offline`, inline, true)
            .addField("Playing", `${member.user.presence.game ? `🎮 ${member.user.presence.game.name}` : "Not playing"}`, inline, true)
            .addField("Roles", `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles"}`, true)
            .addField("Joined Discord At", member.user.createdAt)
            .setFooter(`Information about ${member.user.username}`)
            .setTimestamp();

        message.channel.send(embed4);
    }
}
