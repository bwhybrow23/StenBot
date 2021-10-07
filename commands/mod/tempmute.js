module.exports = {
  name: "tempmute",
  category: "mod",
  description: "Temporarily mute a user for a period of time.",
  usage: "<@USER> <TIME> [REASON]",
  example: "@Jess#8022 1d Being annoying",
  options: { permission: "STAFF", aliases: ["tmute"], enabled: true, guildOnly: true },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    const ms = require("ms");

    const config = await bot.mutils.getGuildById(message.guild.id);

    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot);
    }

    //Args Check
    let targetuser = message.mentions.members.first();
    if (!targetuser || args[0] == "help") {
      return bot.helpEmbed("tempmute", bot)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    let reason = args.slice(2).join(" ");
    let msg = `Succesfully tempmuted **${targetuser.user.tag}** for **${args[1]}** ${reason ? `for **${reason}**.` : `.`}`;

    //Role Check by config
    let muteRole = message.guild.roles.cache.find(r => r.id == config.moderation.mute_role);
    if (!muteRole) {
      //Role check by search
      muteRole = message.guild.roles.cache.find(r => r.name == "Muted");

      //If search is sucessful, update config with mute role
      if(muteRole) {
        config.moderation.mute_role = muteRole.id;
        await bot.mutils.updateGuildById(message.guild.id, config);
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
          await bot.mutils.updateGuildByID(message.guild.id, config);

        } catch (e) {
          message.reply("Error, check console");
          bot.log.post("error", error);
        }
      }
      
    }

    //Check if user is already muted
    await bot.punishments.fetch(message.guild.id, targetuser.id)
    .then((punishments) => {
      punishments.tempmutes.forEach(punishment => {
        if(!punishment.expiry) return;

        if(punishment.expiry) {
          return message.reply("This user already has an ongoing mute. Please unmute them and try again.");
        }
      })
    })
    
    //Mute the user
    targetuser.roles.add(muteRole, `Temporarily muted by ${message.author.tag} for the duration of ${args[1]} ${reason ? `with reason: **${reason}` : ``}`);

    //Log to database
    await bot.punishments.new("tempmute", message.guild.id, targetuser.id, message.author.id, reason, args[1]);

    //Success message 
    bot.createEmbed("success", "", `${msg}`, [], `${message.guild.name}`, message)
      .then((embed) => message.reply(embed))
      .catch((error) => bot.log.post("error", error));

    //DM User
    bot.eventEmbed("c70011", targetuser.user, "You have been temporarily muted!", `**Mute Date:** ${new Date()}\n**Muted By:** ${message.author.tag}\n\n**Reason:** ${reason ? `${reason}\n` : `None provided\n`}**Duration:** ${args[1]}`, [], `${message.guild.name}`, bot)
      .then((embed) => {
                try {
                  targetuser.send(embed)
                } catch (e) {
                  return;
                }
              })
      .catch(error => bot.log.post("error", error))

    //Logging
    if (config.logging.enabled == true) {
      if (bot.efunctions.checkChannel(config.logging.channel, bot) == true) {
        let lchannel = bot.channels.cache.get(config.logging.channel);
        bot.eventEmbed("c70011", targetuser.user, "Member Temporarily Muted", `**User tag:** ${targetuser.user.tag}\n**User ID:** ${targetuser.user.id}\n**Mute Date:** ${new Date()}\n**Muted By:** ${message.author.tag}\n\n**Reason:** ${reason ? `${reason}\n` : `None provided\n`}**Duration:** ${args[1]}`, [], `${message.guild.name}`, bot)
          .then(embed => lchannel.send(embed))
          .catch(error => bot.log.post("error", error))
      }
    }

  },
};