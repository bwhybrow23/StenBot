module.exports = {
    name: "me",
    category: "fun",
    description: "Find out some of the information the bot knows about you.",
    usage: "[@USER]",
    example: "@Danny#7013",
    options: { permission: "EVERYONE", enabled: true, guildOnly: true },
    run: async (bot, message, args) => {
  
      const Discord = require("discord.js");
  
      if (args[0] == "help") {
        return bot.helpEmbed("me", bot)
          .then((embed) => message.reply(embed))
          .catch((error) => bot.log.post("error", error));
      }

      let member, user;
      if(message.mentions.members.first()) {
        member = await message.guild.members.fetch({ user: message.mentions.members.first().id, force: true });
        user = await (bot.users.fetch(message.mentions.members.first().id, true, true));
      } else {
        member = await message.guild.members.fetch({ user: message.author, force: true});
        user = await (bot.users.fetch(message.author.id, true, true));
      }
    
      if (user.bot == true) {
        bot = "Yes";
      } else {
        bot = "No";
      }
  
      let userStatus;
      switch (member.presence.status) {
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
          userStatus = member.presence.status;
          break;
      }

      let activities = [];
      member.presence.activities.forEach(activity => {
        if (activity.type === "CUSTOM") {
          activities.push(`${activity.emoji} ${activity.state}`)
        } else if (activity.type === "PLAYING") {
          activities.push(`:video_game: ${activity.name}`)
        } else {
          activities.push("Not playing")
        }
      });
      if(!activities == []) {
        activities.push("Not playing");
      }

      let meEmbed = new Discord.MessageEmbed()
        .setThumbnail(user.displayAvatarURL())
        .setColor(14672927)
        .addField("Full Username", `${user.tag}`, true)
        .addField("ID", user.id, true)
        .addField("Nickname", `${member.nickname !== null ? `Nickname: ${member.nickname}` : "None"}`, true)
        .addField("Bot", `${bot}`, true, true)
        .addField("Status", userStatus, true)
        .addField("Activities", activities.join("\n"))
        .addField("Roles", `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles"}`)
        .addField("Joined Discord At", `${user.createdAt}`)
        .addField("Joined this Guild At", `${member.joinedAt}`)
        .setFooter(`Information about ${user.username}`)
        .setTimestamp();
  
      message.channel.send({embeds: [meEmbed.toJSON()]});
  
    }
  };