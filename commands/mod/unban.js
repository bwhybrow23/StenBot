module.exports = {
    name: "unban",
    category: "mod",
    description: "Unban a user",
    usage: "sb!unban <@USER ID> <REASON>",
    permission: "STAFF",
    run: async (bot, message, args) => {

        const Discord = require("discord.js");
        if (!message.guild) return;
        const fs = require("fs");
  
        var config = JSON.parse(
            fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8")
        );
  
        if (config.staffrole == false) {
            return bot.createEmbed("error", "", `Error! A staff role has not been set. An owner or admin can set one using \`sb!config-staff role <@ROLE>\``, [], `${message.guild.name}`, bot)
                .then((embed) => message.channel.send(embed))
                .catch((error) => bot.logger("error", error));
        }
  
        let staffrole = message.guild.roles.cache.find(
            (r) => r.id === config.staffrole
        );
  
        if (staffrole == undefined) {
            return bot.createEmbed("error", "", `Error! The staff role that has been set is invalid. An owner or admin can set a new one using \`sb!config-staff role <@ROLE>\``, [], `${message.guild.name}`, bot)
                .then((embed) => message.channel.send(embed))
                .catch((error) => bot.logger("error", error));
        }
  
        if (!message.member.roles.cache.has(config.staffrole)) {
            return bot.noPermsEmbed(`${message.guild.name}`, bot);
        }
  
        var targetuser = args[0];
  
        if (targetuser == undefined || typeof targetuser === 'number') {
            return bot.createEmbed("error", "", `Error! You forgot to give the User's ID! You must get the user's ID and not their name.`, [], `${message.guild.name}`, bot)
                .then((embed) => message.channel.send(embed))
                .catch((error) => bot.logger("error", error));
        }
  
        var reason = args.slice(1).join(" ");
  
        if (reason.length < 1) {
            return bot.createEmbed("error", "", `Error! You forgot to include a reason!`, [], `${message.guild.name}`, bot)
                .then((embed) => message.channel.send(embed))
                .catch((error) => bot.logger("error", error));
        }
  
        message.guild.members.unban(targetuser, {
                reason: `By ${message.author.tag}\nReason: ${reason}`
            })
            .catch(console.error)
            .then(
                bot.createEmbed("success", "", `Succesfully unbanned the User with the ID of **529716686803173412** for **${reason}**`, [], `${message.guild.name}`, bot)
                .then((embed) => message.channel.send(embed))
                .catch((error) => bot.logger("error", error)));
    },
  };