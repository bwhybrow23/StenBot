module.exports = {
    name: "config-welcomer",
    category: "config",
    description: "Change all config variables related to welcomer.",
    usage: "<SUBCOMMAND>",
    example: "channel #welcome",
    options: { permission: "ADMIN", aliases: ["c-welcomer"], enabled: true, guildOnly: true },
    run: async (bot, message, args) => {
  
      const Discord = require("discord.js");
      const format = require("string-template");
  
      if (message.member.hasPermission("ADMINISTRATOR") == false) {
        return bot.noPermsEmbed(`${message.guild.name}`, bot)
          .then((embed) => message.channel.send(embed))
          .catch((error) => bot.log.post("error", error));
      }
  
      //Check if they included a setting
      let setting = args[0];
  
      if (setting == undefined) {
        return bot.createEmbed("error", "", `Error! You forgot to include a config setting to change.`, [], `${message.guild.name}`, bot)
          .then((embed) => message.channel.send(embed))
          .catch((error) => bot.log.post("error", error));
      }
  
      //Get the server config
      const config = await bot.mutils.getGuildById(message.guild.id);
  
      //settings library
      switch (setting) {
        case "enable":
          if (config.gatekeeper.welcome_enabled) {
            return bot.createEmbed("error", "", `Error! Welcomer is already enabled!`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.log.post("error", error));
          }
          bot.mutils.updateGuildById(message.guild.id, {
            welcomer_enabled: true
          })
          bot.createEmbed("success", "", `Welcomer has been enabled.`, [], `${message.guild.name}`, bot)
            .then((embed) => message.channel.send(embed))
            .catch((error) => bot.log.post("error", error));
  
          break;
  
        case "disable":
          if (!config.gatekeeper.welcome_enabled) {
            return bot.createEmbed("error", "", `Error! Welcomer is already disabled!`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.log.post("error", error));
          }
          bot.mutils.updateGuildById(message.guild.id, {
            welcomer_enabled: false
          })
          bot.createEmbed("success", "", `Welcomer has been disabled.`, [], `${message.guild.name}`, bot)
            .then((embed) => message.channel.send(embed))
            .catch((error) => bot.log.post("error", error));
  
          break;
  
        case "channel":

          var targetchannel = message.mentions.channels.first();
          if (!args[1] || args[1] == "None") {
            bot.mutils.updateGuildById(message.guild.id, {
                welcomer_channel: "0"
            })
            return bot.createEmbed("success", "", `The welcomer channel has been reset.`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.log.post("error", error));
          }
  
          if (targetchannel.id == config.gatekeeper.welcome_channel) {
            return bot.createEmbed("error", "", `Error! That channel is already set as the welcomer channel!`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.log.post("error", error));
          }
  
          bot.mutils.updateGuildById(message.guild.id, {
            welcomer_channel: targetchannel.id
          })
          bot.createEmbed("success", "", `The welcomer channel has been set to **#${targetchannel.name}**`, [], `${message.guild.name}`, bot)
            .then((embed) => message.channel.send(embed))
            .catch((error) => bot.log.post("error", error));
  
          break;
        case "message":
          var setmessage = args.slice(1).join(" ");
  
          if (setmessage.length < 1 || setmessage == "None") {
            bot.mutils.updateGuildById(message.guild.id, {
              welcomer_message: "Welcome {user} to {server}!"
            })
            return bot.createEmbed("success", "", `The welcomer message has been reset.`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.log.post("error", error));
          }
  
          if (setmessage.length > 254) {
            return bot.createEmbed("error", "", `Error! Your message is too long! It needs to be less than **254** characters.`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.log.post("error", error));
          }
  
          if (setmessage == config.gatekeeper.welcome_message) {
            return bot.createEmbed("error", "", `Error! Your message is the same as the current one!`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.log.post("error", error));
          }
  
          bot.mutils.updateGuildById(message.guild.id, {
            welcomer_message: setmessage
          })
          bot.createEmbed("success", "", `New welcomer message set!\n\nTo: \n${setmessage}`, [], `${message.guild.name}`, bot)
            .then((embed) => message.channel.send(embed))
            .catch((error) => bot.log.post("error", error));
  
          break;
        case "placeholders":
          bot.createEmbed("warning", "", `**Welcomer Message Placeholders**\n\nPlaceholders are words that are replaced by what they represent in the message. Here are some placeholders you can use.\n\n**{user}** - The user who joined\n**{usermention}** - Mention of the user who joined\n**{userdiscrim}** - The discriminator of the user who joined\n**{server}** - The server the user joined\n**{date}** - The date they joined`, [], `${message.guild.name}`, bot)
            .then((embed) => message.channel.send(embed))
            .catch((error) => bot.log.post("error", error));
          break;
        case "test":
          //Check if enabled
          if (config.gatekeeper.welcome_enabled == false) {
            return bot.createEmbed("error", "", `Error! Your configuration didn't work. This was because you haven't enabled welcomer yet! You can do so by doing **sb!config-welcomer enable**`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.log.post("error", error));
          }
          //Check if channel is set
          if (config.gatekeeper.welcome_channel == 0) {
            return bot.createEmbed("error", "", `Error! Your configuration didn't work. This was because you haven't set a channel for your welcome messages. You can do so by doing **sb!config-welcomer channel <#CHANNEL>**`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.log.post("error", error));
          }
          //Check if channel is accessible by bot or exists
          let testingchannel = bot.channels.cache.get("" + config.gatekeeper.welcome_channel + "");
          if (testingchannel == undefined) {
            return bot.createEmbed("error", "", `Error! Your configuration didn't work. This is beacuse the channel you have set no longer exists. Please set a new channel by doing **sb!config-welcomer channel <#CHANNEL>**`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.log.post("error", error));
          }
          //Check if the bot has perms to send messages in that channel
          let botmember = message.guild.members.cache.get(bot.user.id);
          if (botmember.permissionsIn(message.guild.channels.cache.get("" + config.gatekeeper.welcome_channel + "")).has("SEND_MESSAGES") == false) {
            return bot.createEmbed("error", "", `Error! Your configuration didn't work. This is because the bot is unable to send messages in the configured channel you have set.`, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.log.post("error", error));
          }
  
          //Get the current time
          const date = new Date();
          //Convert to a readable format
          const dFormatter = new Intl.DateTimeFormat("en", {
            dateStyle: "medium"
          });
          const tFormatter = new Intl.DateTimeFormat("en", {
            timeStyle: "medium"
          });
  
          let themsg = format(config.gatekeeper.welcome_message, {
            user: message.author.tag,
            usermention: message.author,
            username: message.author.name,
            usertag: message.author.discriminator,
            server: message.guild.name,
            date: dFormatter.format(date),
            time: tFormatter.format(date),
            posInMemberCount: message.guild.memberCount,
            posInUserCount: message.guild.members.cache.filter(member => !member.user.bot).size
          });
  
          bot.channels.cache.get(config.gatekeeper.welcome_channel).send({
            embed: {
              color: bot.settings.color.yellow,
              description: themsg,
            },
          });
          message.react("✅");
          break;
        default:
          bot.createEmbed("error", "", `Error! There isn't a welcomer config setting called **${setting}**`, [], `${message.guild.name}`, bot)
            .then((embed) => message.channel.send(embed))
            .catch((error) => bot.log.post("error", error));
      }
    },
  };