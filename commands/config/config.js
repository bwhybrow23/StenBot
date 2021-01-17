module.exports = {
  name: "config",
  category: "config",
  description: "View all config variables.",
  usage: "",
  example: "",
  options: { permission: "ADMIN", aliases: ["conf", "c", "settings"], enabled: true, guildOnly: true },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");

    let servertag = message.guild.name;

    if (message.member.hasPermission("ADMINISTRATOR") === false) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }

    //Set up the embed
    const serverconfigfile = await bot.mutils.getGuildById(message.guild.id);

    //Set the undefined ect variables to proper english
    //Welcomer channel? Default = undefined
    var welcomerchannel = serverconfigfile.welcomer_channel;
    if (welcomerchannel == 0) {
      var welcomerchannel = "Not Set";
    } else {
      var welcomerchannel = welcomerchannel;
    }
    //Leave Channel? Default = undefined
    var leavechannel = serverconfigfile.leave_channel;
    if (leavechannel == 0) {
      var welcomerchannel = "Not Set";
    } else {
      var welcomerchannel = `<#${welcomerchannel}>`;
    }
    //User on-join role default 0
    var userjoinrole = serverconfigfile.userjoin_role;
    if (userjoinrole == 0) {
      var userjoinrole = "Not Set";
    } else {
      var userjoinrole = `<@&${userjoinrole}>`;
    }
    //User onjoin set nick default undefined
    var userjoinnick = serverconfigfile.userjoin_nickname;
    if (userjoinnick == 0) {
      var userjoinnick = "Not Set";
    }
    //Staff role default false
    var staffrole = serverconfigfile.staff_role;
    if (staffrole == false) {
      var staffrole = "Not Set";
    } else {
      var staffrole = `<@&${staffrole}>`;
    }
    //word filter by default is empty
    var stafffilter = serverconfigfile.staff_filter;
    let stafffilter1 = [];
    if (stafffilter.length == 0) {
      stafffilter1.push("Empty");
    } else {
      stafffilter.forEach(word => {
        stafffilter1.push(`${word} `);
      });
    }
    //autoban by default is undefined
    // var staffban = serverconfigfile.staff_autoban;
    // if (staffban == 0) {
    //   var staffban = "None";
    // }
    //Logging channel by default is 0
    var logchannel = serverconfigfile.logging_channel;
    if (logchannel == 0) {
      var logchannel = "Not Set";
    } else {
      var logchannel = `<#${logchannel}>`;
    }
    var loggingignore = serverconfigfile.logging_ignore;
    let loggingignore1 = [];
    if (loggingignore.length == 0) {
      loggingignore1.push("Empty");
    } else {
      loggingignore.forEach(id => {
        loggingignore1.push(`<#${id}> `);
      });
    }

    //Ticket message by default is undefined
    var ticketmessage = serverconfigfile.tickets_message;
    if (ticketmessage == 0) {
      var ticketmessage = "Default";
    }

    //Check if they have required permissions
      return bot.createEmbed("warning", `${servertag} Configuration`, `Your Configuration`, [{
          name: "Welcomer",
          value: `Enabled: **${serverconfigfile.welcomer_enabled ? "Yes" : "No"} **\nWelcomer Channel: **${welcomerchannel}**\nWelcomer Message: **${serverconfigfile.welcomer_message}**`,
        }, {
          name: "Leave",
          value: `Enabled: **${serverconfigfile.leave_enabled ? "Yes" : "No"} **\nLeave Channel: **${leavechannel}**\nLeave Message: **${serverconfigfile.leave_message}**`,
        }, {
          name: "User Join",
          value: `Enabled: **${serverconfigfile.userjoin_enabled ? "Yes" : "No"}**\nAdd Role: **${userjoinrole}**\nSet Nick: **${userjoinnick}**`,
        }, {
          name: "Staff",
          value: `Staff Role: **${staffrole}**\nAdmin Commands: **${serverconfigfile.staff_admin ? "Enabled" : "Disabled"}**\nLink Blocker: **${serverconfigfile.staff_linkblock ? "Enabled" : "Disabled"}**\nWord Filter: **${stafffilter1}**`,
        }, {
          name: "Logging",
          value: `Enabled: **${serverconfigfile.logging_enabled ? "Yes" : "No"}**\nLogging Channel: **${logchannel}**\nLevel: **${serverconfigfile.logging_level}**\nIgnore List: **${loggingignore1}**`,
        }, {
          name: "Tickets",
          value: `Enabled: **${serverconfigfile.tickets_enabled ? "Yes" : "No"}**\nTicket Message: **${ticketmessage}**`,
        }, ], `${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
  },
};