module.exports = {
  name: "ticket",
  category: "ticketing",
  description: "Create a ticket (if enabled)",
  usage: "<REASON>",
  example: "I need help!",
  permission: "EVERYONE",
  run: async (bot, message, args) => {

      const Discord = require("discord.js");
      if (!message.guild) return;
      const fs = require("fs");

      const config = await bot.mutils.getGuildById(message.guild.id);

      var reason = args.slice(0).join(" ");
      if (!reason || args[0] == "help") {
        return bot.helpEmbed("ticket", bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
      }
      var format = require("string-template");
      var tnum = Math.floor(Math.random() * 1000001);
      //var staffroleobj = message.guild.roles.get(config.staffrole);

      function errsend(msg) {
          message.channel.send({
              embed: {
                  color: bot.settings.color.red,
                  description: `Error! ${msg}`,
                  timestamp: Date.now(),
                  footer: {
                      icon_url: "https://i.imgur.com/BkZY6H8.png",
                      text: `${message.guild.name}`,
                  },
              },
          });
      }

      //Check if tickets are enabled
      if (!config.tickets_enabled) {
          return errsend("Tickets are not enabled in the servers config.");
      }

      if (config.staff_role == false) {
          return bot.createEmbed("error", "", `Error! A staff role has not been set. An owner or admin can set one using \`sb!config-staff role <@ROLE>\``, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.log.post("error", error));
      }

      let staffrole = message.guild.roles.cache.find(
          (r) => r.id === config.staff_role
      );

      if (staffrole == undefined) {
          return bot.createEmbed("error", "", `Error! The staff role that has been set is invalid. An owner or admin can set a new one using \`sb!config-staff role <@ROLE>\``, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => bot.log.post("error", error));
      }

      //Check if supplied sufficient reason
      if (reason.length < 1) {
          return errsend(
              "Make sure you include a reason for creating this ticket."
          );
      }
      if (reason.length > 200) {
          return errsend(
              "Your reason is too long! Make sure its less than **200** characters."
          );
      }

      function createChan(element) {
        if (element.constructor.name == "CategoryChannel") {
          if (element.name == "Tickets") {
            message.guild.channels.create(`ticket-${tnum}`, { type: "text" })
              .then((channel) => {
                channel.setParent(element.id);
                channel.setTopic("Ticket");
  
                //Channel permissions
                channel.createOverwrite(message.guild.roles.everyone.id, {
                  SEND_MESSAGES: false,
                  VIEW_CHANNEL: false
                });
                channel.createOverwrite(
                  message.guild.roles.cache.get(config.staff_role), {
                    SEND_MESSAGES: true,
                    VIEW_CHANNEL: true,
                    MANAGE_MESSAGES: true
                  }
                );
                channel.createOverwrite(message.author, {
                  SEND_MESSAGES: true,
                  VIEW_CHANNEL: true
                });
  
                //Fill in the placeholders <3
                var tMessage = [];
                if (config.tickets_message == "None") {
                  tMessage.push(
                    `**User:** ${message.author.tag}\n**Reason:** ${reason}`
                  );
                } else {
                  tMessage.push(
                    format(config.tickets_message, {
                      user: message.author.tag,
                      reason: reason,
                    })
                  );
                }
  
                channel.send({
                  embed: {
                    color: bot.settings.color.yellow,
                    description: `**New Ticket:**\n${tMessage[0]}`,
                  },
                });
                message.channel.send({
                  embed: {
                    color: bot.settings.color.green,
                    description: `Your ticket ${channel} has been created, ${message.member.displayName}`,
                  },
                });
  
                //Check if logging enabled
                const eventFunctions = require(`../../main/functions/eventUtils.js`);
  
                if (config.logging_enabled) {
                  if (eventFunctions.checkChannel(config.logging_channel, bot)) {
                    message.guild.channels.cache.get(config.logging_channel).send({
                      embed: {
                        color: bot.settings.color.yellow,
                        description: `**Ticket Created**\n**Created By:** ${message.author.tag}\n**Channel:** ${channel.name}\n**Id:** ${channel.id}\n\n**Reason:** ${reason}`,
                      },
                    });
                  }
                }
              });
          }
        }
      }
              createChan(message.guild.channels.cache.some(createChan)); //Run the beast
          }
      };