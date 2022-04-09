module.exports = {
  name: "ban",
  category: "mod",
  description: "Permanently ban a user from the server.",
  usage: "<@USER> [REASON]",
  example: "@James#2307 Bullying",
  options: { permission: "STAFF", enabled: true, guildOnly: true },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    const config = await bot.mutils.getGuildById(message.guild.id);

    //Perm Check
    if (!message.member.permissions.has("BAN_MEMBERS")) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot);
    }

    //Arg check
    if (!args[0] || args[0] === "help")
    {
      return bot.helpEmbed("ban", bot)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    };

    //Variables            Fetch user              Removes everything but numbers
    let targetuser;
    try {
      targetuser = await bot.users.fetch(args[0].replace(/[^0-9]/g, ''), { force: true });
    } catch (error) {
      return message.reply("I cannot find that user.");
    }
    let reason = args.slice(1).join(" ");

    //Check if user is already banned
    if (message.guild.bans.fetch(targetuser, { force: true })) 
    {
      return message.reply(`${targetuser.username + targetuser.discriminator} is already banned from this guild.`)
    }

    //Ban the user
    message.guild.bans.create(targetuser, {
        reason: `Banned by ${message.author.tag}${reason ? ` with reason ${reason}.` : `.`}`
      })
      .then(async () => {

        //Log it to database
        await bot.punishments.new("ban", message.guild.id, targetuser.id, message.author.id, reason);

        //Send success message
        bot.createEmbed("success", "", `Sucessfully banned ${targetuser}${reason ? ` for \`${reason}\`.` : `.`}`, [], `${message.guild.name}`, message)
          .then((embed) => message.reply(embed))
          .catch((error) => bot.log.post("error", error))

        //Logging
        if (config.logging.enabled === true) {
          if (config.logging.level === "low" || config.logging.level === "medium" || config.logging.level === "high") {
            if (bot.efunctions.checkChannel(config.logging.channel, bot) === true) {
              let lchannel = bot.channels.cache.get(config.logging.channel);
              bot.eventEmbed("c70011", targetuser, "Member Banned", `**User tag:** ${targetuser.username + targetuser.discriminator}\n**User ID:** ${targetuser.id}\n**Ban Date:** ${new Date()}\n**Banned By:** ${message.author.tag} ${ reason ? `\n**Reason:** ${reason}` : ``}`, [], `${message.guild.name}`, bot)
                .then(embed => lchannel.send(embed))
                .catch(error => bot.log.post("error", error));
            }
          }
        }
      })
  },
};