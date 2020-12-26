module.exports = {
  name: "me",
  category: "fun",
  description: "Find out some of the information the bot knows about you.",
  usage: "[@USER]",
  example: "@Danny#7013",
  permission: "EVERYONE",
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    if (!message.guild) return;

    let inline = true;

    // let member = message.mentions.members.first() || message.guild.members.fetch(args[0].id) || message.member;
    let member = await message.guild.members.fetch(message.author) || await message.guild.members.fetch(message.mentions.members.first().id);
    let user = await (bot.users.fetch(message.author.id, true, true)) || await (bot.users.fetch(message.mentions.first().id, true, true))

    if (args[0] === "help") {
        return bot.helpEmbed("me", bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
      }

    if (user.bot === true) {
        bot = "Yes";
    } else {
        bot = "No";
    }

    let userStatus;
    switch(user.presence.status) {
        case "dnd":
            userStatus = "Do Not Disturb";
            break;
        case "online":
            userStatus = "Online";
            break;
        case "idle":
            userStatus = "Idle";
            break;
        case "offline":
            userStatus = "Offline";
            break;
        default:
            userStatus = user.presence.status;
            break;
    }

    /*let activity;
    if(user.presence.activities !== "CUSTOM_STATUS") {
        return;
    } else {
        if(user.presence.activities[0].type != "CUSTOM_STATUS") return;
        activity = `${user.presence.activities[0].emoji} ${user.presence.activities[0].name}`
    } */

       let meEmbed = new Discord.MessageEmbed()
            .setThumbnail(user.displayAvatarURL())
            .setColor(14672927)
            .addField("Full Username", `${user.tag}`, inline)
            .addField("ID", user.id, inline)
            .addField("Nickname", `${member.nickname !== null ? `Nickname: ${member.nickname}` : "None"}`, true)
            .addField("Bot", `${bot}`, inline, true)
            .addField("Status", userStatus, inline, true)
            .addField("Activities", `${user.presence.activities}` ? `${user.presence.activities.map((a)=>a.type === "CUSTOM_STATUS" ? a.state : a.toString()).join("\n")}` : "Not playing")
            // .addField("Playing", activity, inline, true)
            .addField("Roles", `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles"}`)
            .addField("Joined Discord At", user.createdAt)
	        .addField("Joined this Guild At", member.joinedAt)
            .setFooter(`Information about ${user.username}`)
            .setTimestamp();

        message.channel.send(meEmbed);
    
}};
