module.exports = {
    name: "config-reset",
    category: "config",
    description: "Reset all config variables for your server.",
    usage: "",
    example: "",
    options: { permission: "ADMIN", aliases: ["c-reset"], enabled: true, guildOnly: true },
    run: async (bot, interaction) => {
  
      const Discord = require("discord.js");
  
      if (message.member.permissions.has("ADMINISTRATOR") === false) {
        return bot.noPermsEmbed(`${interaction.guild.name}`, bot)
          .then((embed) => interaction.reply(embed))
          .catch((error) => bot.log.post("error", error));
      }
  
      //Confirmation
      bot.createEmbed("warning", "", `Are you sure you would like to reset the config of this server?\n React with :white_check_mark: if you are sure, or :x: to cancel resetting. \nThis will automatically cancel if there isn't a response in 30 seconds.`, [], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply(embed).then((m) => {
          m.react('✅').then(r => {
            m.react('❌');
          });
  
          m.awaitReactions((reaction, user) => user.id === interaction.user.id && (reaction.emoji.name === '✅' || reaction.emoji.name === '❌'), {
            max: 1,
            time: 30000
          }).then(collected => {
  
            if (collected.first().emoji.name === '✅') {
  
              bot.mutils.updateGuildById(interaction.guild.id, {
                info: {
                  id: interaction.guild.id,
                  name: interaction.guild.name,
                  owner_id: interaction.guild.ownerId,
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
                  role: "0",
                  nickname: "None"
                },
                moderation: {
                  staff_role: "0",
                  link_block: false,
                  filter: [],
                  mute_role: ""
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
  
              bot.createEmbed("success", "", `Server Config has been reset.`, [], `${interaction.guild.name}`, interaction)
                .then((embed) => interaction.reply(embed))
                .catch((error) => bot.log.post("error", error));
            }
            if (collected.first().emoji.name === '❌') {
              interaction.reply('Reset Cancelled.');
            }
          }).catch(() => {
            interaction.reply('No reaction after 30 seconds, reset cancelled');
          });
        }))
        .catch((error) => bot.log.post("error", error));
    },
  };