module.exports = {
  name: "mute",
  category: "mod",
  description: "Mute a user to block them from sending messages.",
  usage: "<@USER> [REASON]",
  example: "@Lucy#5012 Spamming",
  options: { permission: "STAFF", enabled: true, guildOnly: true },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    const config = await bot.mutils.getGuildById(message.guild.id);

    //Perm Check
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot);
    }

    //Args Check
    var targetuser = message.mentions.members.first();
    if (!targetuser || args[0] === "help") {
      return bot.helpEmbed("mute", bot)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    let reason = args.slice(1).join(" ");
    let msg = `Succesfully muted **${targetuser.user.tag}**${reason ? ` with reason ${reason}.` : `.`}`;

    //Role Check by config
    let muteRole = message.guild.roles.cache.find(r => r.id === config.moderation.mute_role);
    if (!muteRole) {
      //Role check by search
      muteRole = message.guild.roles.cache.find(r => r.name === "Muted");

      //If search is sucessful, update config with mute role
      if(muteRole) {
        config.moderation.mute_role = muteRole.id;
        await bot.mutils.updateGuildByID(message.guild, config);
      }

      //If there's still no mute role, create it 
      if (!muteRole) {
        try {
          //Create role
          muteRole = await message.guild.roles.create({
            name: "Muted",
            color: "#000000",
            permissions: [],
            reason: "StenBot Muted Role"
          });

          //Overwrite permisisons
          message.guild.channels.cache.forEach(async (channel, id) => {
            await channel.permissionOverwrites.create(muteRole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false
            });
          });

          //Save new role to config
          config.moderation.mute_role = muteRole.id;
          await bot.mutils.updateGuildByID(message.guild, config);

        } catch (error) {
          message.reply("Error, check console");
          bot.log.post("error", error);
        }
      }
      
    }

    //Mute the user
    targetuser.roles.add(muteRole, `Temporarily muted by ${message.author.tag} ${reason ? `with reason: **${reason}` : ``}`);
    
    //Log to database
    await bot.punishments.new("mute", message.guild.id, targetuser.id, message.author.id, reason);

    //Success message
    bot.createEmbed("success", "", `${msg}`, [], `${message.guild.name}`, message)
      .then((embed) => message.reply(embed))
      .catch((error) => bot.log.post("error", error));

    //DM User
    bot.eventEmbed("c70011", targetuser.user, "You have been muted!", `**Mute Date:** ${new Date()}\n**Muted By:** ${message.author.tag}\n\n**Reason:** ${reason}`, [], `${message.guild.name}`, bot)
          .then((embed) => {
                try {
                  targetuser.send(embed);
                } catch (e) {
                  return;
                }
              })
          .catch(error => bot.log.post("error", error));;

    //Logging
    if (config.logging.enabled === true) {
      if (bot.efunctions.checkChannel(config.logging.channel, bot) === true) {
        let lchannel = bot.channels.cache.get(config.logging.channel);
        bot.eventEmbed("c70011", targetuser.user, "Member Muted", `**User tag:** ${targetuser.user.tag}\n**User ID:** ${targetuser.user.id}\n**Mute Date:** ${new Date()}\n**Muted By:** ${message.author.tag}\n\n**Reason:** ${reason}`, [], `${message.guild.name}`, bot)
          .then(embed => lchannel.send(embed))
          .catch(error => bot.log.post("error", error));;
      }
    }
  },
};