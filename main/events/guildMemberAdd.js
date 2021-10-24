const { messages } = require("dbots/lib/Utils/DBotsError");

module.exports = async (bot, member) => {

    const Discord = require("discord.js");
    const config = await bot.mutils.getGuildById(member.guild.id);
    if(!config) return;
    const fs = require("fs");
    var format = require("string-template");
  
    if (member.user === bot.user) return;

    //Update bot-data.json
    let botdata = require("../../data/global/bot-data.json");
    botdata.stats.totalGuilds = bot.guilds.cache.size;
    botdata.stats.totalUsers = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
    fs.writeFileSync(`./data/global/bot-data.json`, JSON.stringify(botdata, null, 4), (err) => {
      if (err) return bot.log.post("error", err);
     });
  
    //Welcomer
    //Check if welcomer is enabled
    if (config.gatekeeper.welcome_enabled === true) {
      //Check if there is a channel set
      if (config.gatekeeper.welcome_channel != 0) {
        //Check if channel is valid
        let welcomerschannel = bot.channels.cache.get(config.gatekeeper.welcome_channel);
        if (welcomerschannel != undefined) {
          //Check if the bot has perms to welcome
          let botasmember = member.guild.members.cache.get(bot.user.id);
          if (
            botasmember.permissionsIn(member.guild.channels.cache.get("" + config.gatekeeper.welcome_channel + "")).has("SEND_MESSAGES") === true
          ) {
            //Get the current time
            const date = new Date();
            //Convert to a readable format
            const dFormatter = new Intl.DateTimeFormat("en", {
              dateStyle: "medium"
            });
            const tFormatter = new Intl.DateTimeFormat("en", {
              timeStyle: "medium"
            });
            //Fill in place holders
            let themsg = format(config.gatekeeper.welcome_message, {
              user: member.user.tag,
              usermention: member.user,
              username: member.user.name,
              usertag: member.user.discriminator,
              server: member.guild.name,
              date: dFormatter.format(date),
              time: tFormatter.format(date),
              memberCount: member.guild.memberCount,
              userCount: member.guild.members.cache.filter(member => !member.user.bot).size
            });
  
            let welcomeEmbed = new Discord.MessageEmbed()
              .setColor(bot.settings.color.yellow)
              .setDescription(themsg);
  
            //Send the message.
            bot.channels.cache.get(config.gatekeeper.welcome_channel).send({embeds: [welcomeEmbed.toJSON()]});
          }
        }
      }
    }
  
    //Check if user settings are enabled
    if (config.userjoin.enabled === true) {
      //Check if Theres a role set
      if (config.userjoin.role != 0) {
        //Add the role to the member
        let toaddrole = member.guild.roles.cache.get(config.userjoin.role);
        if(!toaddrole) {
          try {
            member.guild.owner.send("Hi! This is StenBot just DM'ing you to let you know that the role you have configured for new members in your server cannot be found. /nThis may be because it has been deleted. Please re-add the role by doing `sb!config-userjoin role <@ROLE>`. \n\nThank you for your understanding and if you have any further questions, please contact Stentorian#9524 or run the `sb!invite` command for the support server.");
          } catch (error) {
            return;
          }
        } else {
          member.roles.add(toaddrole);
        }
      }
    }
  
    //Check if user names are set
    if (config.userjoin.nickname != 0) {
      if (config.userjoin.nickname != "None") {
        //Change
        member.setNickname(config.userjoin.nickname).catch();
      }
    }
  
    if (config.logging.enabled === true) {
      if (config.logging.level === "low" || config.logging.level === "medium" || config.logging.level === "high") {
        if (bot.efunctions.checkChannel(config.logging.channel, bot) === true) {
          let lchannel = bot.channels.cache.get(config.logging.channel);
          bot.eventEmbed("c9c600", member.user, "Member Joined", `**Name:** ${member.user.tag}\n**Id:** ${member.id}\n**Created At:** ${member.user.createdAt}`, [], `${lchannel.guild.name}`, bot)
            .then(embed => lchannel.send(embed))
            .catch(error => bot.log.post("error", error));
        }
      }
    }

    //Refresh Cache
    try {
      await member.guild.members.fetch();
    } catch (e) {
      console.log(e);
    }
  
  };