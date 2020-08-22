module.exports = {
  name: "ticket",
  category: "ticketing",
  description: "Create a ticket (if enabled)",
  usage: "sb!ticket <REASON>",
  permission: "EVERYONE",
  run: async (bot, message, args) => {
      const Discord = require("discord.js");
      const fs = require("fs");

      const config = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8"));

      var reason = args.slice(0).join(" ");
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
      if (!config.ticketsenabled) {
          return errsend("Tickets are not enabled in the servers config.");
      }

      if (config.staffrole == false) {
          return bot.createEmbed("error", "", `Error! A staff role has not been set. An owner or admin can set one using \`sb!config-staff role <@ROLE>\``, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => console.error(error));
      }

      let staffrole = message.guild.roles.cache.find(
          (r) => r.id === config.staffrole
      );

      if (staffrole == undefined) {
          return bot.createEmbed("error", "", `Error! The staff role that has been set is invalid. An owner or admin can set a new one using \`sb!config-staff role <@ROLE>\``, [], `${message.guild.name}`, bot)
              .then((embed) => message.channel.send(embed))
              .catch((error) => console.error(error));
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
                  message.guild.roles.cache.get(config.staffrole), {
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
                if (config.ticketsmsg == 0) {
                  tMessage.push(
                    `**User:** ${message.author.tag}\n**Reason:** ${reason}`
                  );
                } else {
                  tMessage.push(
                    format(config.ticketsmsg, {
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
                var checkChannel = (id) => {
                  let tchannel = bot.channels.cache.get(id);
                  if (tchannel == undefined) {
                    return false;
                  } else {
                    return true;
                  }
                };
  
                if (config.loggingenabled) {
                  if (checkChannel(config.loggingchannel)) {
                    message.guild.channels.cache.get(config.loggingchannel).send({
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