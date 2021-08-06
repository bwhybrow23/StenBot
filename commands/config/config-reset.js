module.exports = {
    name: "config-reset",
    category: "config",
    description: "Reset all config variables for your server.",
    usage: "",
    example: "",
    options: { permission: "ADMIN", aliases: ["c-reset"], enabled: true, guildOnly: true },
    run: async (bot, message, args) => {
  
      const Discord = require("discord.js");
  
      if (message.member.hasPermission("ADMINISTRATOR") == false) {
        return bot.noPermsEmbed(`${message.guild.name}`, bot)
          .then((embed) => message.channel.send(embed))
          .catch((error) => bot.log.post("error", error));
      }
  
      //Confirmation
      bot.createEmbed("warning", "", `Are you sure you would like to reset the config of this server?\n React with :white_check_mark: if you are sure, or :x: to cancel resetting. \nThis will automatically cancel if there isn't a response in 30 seconds.`, [], `${message.guild.name}`, message)
        .then((embed) => message.channel.send(embed).then((m) => {
          m.react('✅').then(r => {
            m.react('❌');
          });
  
          m.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'), {
            max: 1,
            time: 30000
          }).then(collected => {
  
            if (collected.first().emoji.name == '✅') {
  
              bot.mutils.updateGuildById(message.guild.id, {
                info: {
                  id: guild.id,
                  name: guild.name,
                  owner_id: guild.ownerID,
                  blacklisted: false
                },
                gatekeeper: {
                  welcome_enabled: false,
                  welcome_channel: "0",
                  welcome_message: "Welcome {user} to {server}",
                  leave_enabled: false,
                  leave_channel: "0",
                  leave_message: "Goodbye {user} from {server}"
                },
                userjoin: {
                  enabled: false,
                  roles: [],
                  nickname: "None"
                },
                moderation: {
                  staff_role: "0",
                  link_block: false,
                  filter: []
                },
                logging: {
                  enabled: false,
                  channel: "0",
                  level: "medium",
                  ignore: []
                },
                tickets: {
                  enabled: false,
                  message: "**User:** {user}\n**Reason:** {reason}"
                }
              });
  
              bot.createEmbed("success", "", `Server Config has been reset.`, [], `${message.guild.name}`, message)
                .then((embed) => message.channel.send(embed))
                .catch((error) => bot.log.post("error", error));
            }
            if (collected.first().emoji.name == '❌') {
              message.reply('Reset Cancelled.');
            }
          }).catch(() => {
            message.reply('No reaction after 30 seconds, reset cancelled');
          });
        }))
        .catch((error) => bot.log.post("error", error));
    },
  };