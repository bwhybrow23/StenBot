module.exports = {
  name: "config-welcomer",
  category: "config",
  description: "Change all config variables related to welcomer.",
  usage: "sb!config-welcomer <SUBCOMMAND>",
  permission: "ADMIN",
  run: (bot, message, args) => {
    const Discord = require("discord.js");
    const fs = require("fs");
    var format = require("string-template");

    let servertag = message.guild.name;

    const ownersid = message.guild.ownerID;
    const adminperm = message.member.hasPermission("ADMINISTRATOR");

    var access = true;

    if (adminperm == false) {
      var access = false;
    }

    if (access == false) {
      if (ownersid == message.author.id) {
        var access = true;
      }
    }

    if (access == false) {
      return bot.createEmbed("error","",`Error! You are not the owner or the admin on this guild.`,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    //Check if they included a setting
    let setting = args[0];

    if (setting == undefined) {
      return bot.createEmbed("error","",`Error! You forgot to include a config setting to change.`,[],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    //Get the server config
    const config = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8"));

    //settings library
    switch (setting) {
      case "enable":
        if (config.welcomerenabled) {
          return bot.createEmbed("error","",`Error! Welcomer is already enabled!`,[],`${message.guild.name}`,bot)
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }
        config.welcomerenabled = true;
        fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`,JSON.stringify(config, null, 4),
          (err) => {
            if (err) return;
          }
        );
        bot.createEmbed("success","",`Welcomer has been enabled.`,[],`${message.guild.name}`,bot)
          .then((embed) => message.channel.send(embed))
          .catch((error) => console.error(error));
        break;
      case "disable":
        if (!config.welcomerenabled) {
          return bot.createEmbed("error","",`Error! Welcomer is already disabled!`,[],`${message.guild.name}`,bot)
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }
        config.welcomerenabled = false;
        fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`,JSON.stringify(config, null, 4),
          (err) => {
            if (err) return;
          }
        );
        bot.createEmbed("success","",`Welcomer has been enabled.`,[],`${message.guild.name}`,bot)
          .then((embed) => message.channel.send(embed))
          .catch((error) => console.error(error));
        break;
      case "channel":
        var targetchannel = message.mentions.channels.first();

        if (targetchannel == undefined) {
          return bot.createEmbed("error","",`Error! You didn't mention a channel!`,[],`${message.guild.name}`,bot)
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }

        if (targetchannel.id == config.welcomerchannel) {
          return bot.createEmbed("error","",`Error! That channel is already set as the welcomer channel!`,[],`${message.guild.name}`,bot)
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }

        config.welcomerchannel = targetchannel.id;
        bot.createEmbed("success","",`The welcomer channel has been set to **${targetchannel.name}**`,[],`${message.guild.name}`,bot)
          .then((embed) => message.channel.send(embed))
          .catch((error) => console.error(error));

        fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`,JSON.stringify(config, null, 4),
          (err) => {
            if (err) return;
          }
        );
        break;
      case "message":
        var setmessage = args.slice(1).join(" ");

        if (setmessage.length < 1) {
          return bot.createEmbed("error","",`Error! You forgot to include a message!`,[],`${message.guild.name}`,bot)
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }

        if (setmessage.length > 254) {
          return bot.createEmbed("error","",`Error! Your message is too long! It needs to be less than **254** characters.`,[],`${message.guild.name}`,bot)
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }

        if (setmessage == config.welcomermessage) {
          return bot.createEmbed("error","",`Error! Your message is the same as the current one!`,[],`${message.guild.name}`,bot)
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }

        config.welcomermessage = setmessage;

        fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`,JSON.stringify(config, null, 4),
          (err) => {
            if (err) return;
          }
        );

        bot.createEmbed("success","",`New welcomer message set!\n\nTo: \n${setmessage}`,[],`${message.guild.name}`,bot)
          .then((embed) => message.channel.send(embed))
          .catch((error) => console.error(error));

        break;
      case "placeholders":
        bot.createEmbed("warning","",`**Welcomer Message Placeholders**\n\nPlaceholders are words that are replaced by what they represent in the message. Here are some placeholders you can use.\n\n**{user}** - The user who joined\n**{usermention}** - Mention of the user who joined\n**{userdiscrim}** - The discriminator of the user who joined\n**{server}** - The server the user joined\n**{date}** - The date they joined`,[],`${message.guild.name}`,bot)
          .then((embed) => message.channel.send(embed))
          .catch((error) => console.error(error));
        break;
      case "test":
        //Check if enabled
        if (config.welcomerenabled == false) {
          return bot.createEmbed("error","",`Error! Your configuration didn't work. This was because you haven't enabled welcomer yet! You can do so by doing **sb!config-welcomer enable**`,[],`${message.guild.name}`,bot)
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }
        //Check if channel is set
        if (config.welcomerchannel == 0) {
          return bot.createEmbed("error","",`Error! Your configuration didn't work. This was because you haven't set a channel for your welcome messages. You can do so by doing **sb!config-welcomer channel <#CHANNEL>**`,[],`${message.guild.name}`,bot)
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }
        //Check if channel is accessible by bot or exists
        let testingchannel = bot.channels.cache.get("" + config.welcomerchannel + "");
        if (testingchannel == undefined) {
          return bot.createEmbed("error","",`Error! Your configuration didn't work. This is beacuse the channel you have set no longer exists. Please set a new channel by doing **sb!config-welcomer channel <#CHANNEL>**`,[],`${message.guild.name}`,bot)
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }
        //Check if the bot has perms to send messages in that channel
        let botmember = message.guild.members.get(bot.user.id);
        if (botmember.permissionsIn(message.guild.channels.get("" + config.welcomerchannel + "")).has("SEND_MESSAGES") == false) {
          return bot.createEmbed("error","",`Error! Your configuration didn't work. This is because the bot is unable to send messages in the configured channel you have set.`,[],`${message.guild.name}`,bot)
            .then((embed) => message.channel.send(embed))
            .catch((error) => console.error(error));
        }

        let themsg = format(config.welcomermessage, {
          user: "Dummy#1234",
          usermention: message.author,
          userdiscrim: "1234",
          server: message.guild.name,
          date: new Date(),
        });

        bot.channels.cache.get(config.welcomerchannel).send({
          embed: {
            color: bot.settings.color.yellow,
            description: themsg,
          },
        });
        message.react("✅");
        break;
      default:
        bot.createEmbed("error","",`Error! There isn't a welcomer config setting called **${setting}**`,[],`${message.guild.name}`,bot)
          .then((embed) => message.channel.send(embed))
          .catch((error) => console.error(error));
    }
  },
};
