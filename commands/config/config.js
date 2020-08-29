module.exports = {
  name: "config",
  category: "config",
  description: "View all config variables.",
  usage: "sb!config",
  permission: "ADMIN",
  run: (bot, message, args) => {

    const Discord = require("discord.js");
    if (!message.guild) return;
    const fs = require("fs");

    let servertag = message.guild.name;

    const ownersid = message.guild.ownerID;
    const adminperm = message.member.hasPermission("ADMINISTRATOR");

    //Set up the embed
    const serverconfigfile = JSON.parse(
      fs.readFileSync(
        `./data/servers/server-${message.guild.id}/serverconfig.json`,
        "utf8"
      )
    );

    //Set the undefined ect variables to proper english
    //Welcomer channel? Default = undefined
    var welcomerchannel = serverconfigfile.welcomerchannel;
    if (welcomerchannel == 0) {
      var welcomerchannel = "Not Set";
    }
    //User on-join role default 0
    var userjoinrole = serverconfigfile.userjoinedrole;
    if (userjoinrole == 0) {
      var userjoinrole = "Not Set";
    }
    //User onjoin set nick default undefined
    var userjoinnick = serverconfigfile.userjoinedname;
    if (userjoinnick == 0) {
      var userjoinnick = "Not Set";
    }
    //Staff role default false
    var staffrole = serverconfigfile.staffrole;
    if (staffrole == false) {
      var staffrole = "Not Set";
    }
    //word filter by default is empty
    var stafffilter = serverconfigfile.stafffilter;
    if (stafffilter.length == 0) {
      var stafffilter = "Empty";
    }
    //autoban by default is undefined
    var staffban = serverconfigfile.staffautoban;
    if (staffban == 0) {
      var staffban = "None";
    }
    //Logging channel by default is 0
    var logchannel = serverconfigfile.loggingchannel;
    if (logchannel == 0) {
      var logchannel = "Not Set";
    }
    //Ticket message by default is undefined
    var ticketmessage = serverconfigfile.ticketsmsg;
    if (ticketmessage == 0) {
      var ticketmessage = "Default";
    }

    //Check if they have required permissions
    if (adminperm === true) {
      bot.createEmbed("warning",`${servertag} Configuration`,`Your Configuration`,[{name: "Welcomer",value: `Enabled: **${serverconfigfile.welcomerenabled ? "Yes" : "No"} **\nWelcomer Channel: **${welcomerchannel}**\nWelcomer Message: **${serverconfigfile.welcomermessage}**`,},{name: "User Join",value: `Enabled: **${serverconfigfile.userjoinenabled ? "Yes" : "No"}**\nAdd Role: **${userjoinrole}**\nSet Nick: **${userjoinnick}**`,},{name: "Staff",value: `Staff Role: **${staffrole}**\nAdmin Commands: **${serverconfigfile.staffadminenabled ? "Enabled" : "Disabled"}**\nLink Blocker: **${serverconfigfile.stafflinkblocker ? "Enabled" : "Disabled"}**\nWord Filter: **${stafffilter}**\nAutoBan: **${staffban}**`,},{name: "Logging",value: `Enabled: **${serverconfigfile.loggingenabled ? "Yes" : "No"}**\nLogging Channel: **${logchannel}**\nLevel: **${serverconfigfile.logginglevel}**`,},{name: "Tickets",value: `Enabled: **${serverconfigfile.ticketsenabled ? "Yes" : "No"}**\nTicket Message: **${ticketmessage}**`,},{name: "Music",value: `Enabled: **${serverconfigfile.musicenabled ? "Yes" : "No"}**`,},],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
      return;
    }
    if (ownersid == message.author.id) {
      bot.createEmbed("warning",`${servertag} Configuration`,`Your Configuration`,[{name: "Welcomer",value: `Enabled: **${serverconfigfile.welcomerenabled ? "Yes" : "No"} **\nWelcomer Channel: **${welcomerchannel}**\nWelcomer Message: **${serverconfigfile.welcomermessage}**`,},{name: "User Join",value: `Enabled: **${serverconfigfile.userjoinenabled ? "Yes" : "No"}**\nAdd Role: **${userjoinrole}**\nSet Nick: **${userjoinnick}**`,},{name: "Staff",value: `Staff Role: **${staffrole}**\nAdmin Commands: **${serverconfigfile.staffadminenabled ? "Enabled" : "Disabled"}**\nLink Blocker: **${serverconfigfile.stafflinkblocker ? "Enabled" : "Disabled"}**\nWord Filter: **${stafffilter}**\nAutoBan: **${staffban}**`,},{name: "Logging",value: `Enabled: **${serverconfigfile.loggingenabled ? "Yes" : "No"}**\nLogging Channel: **${logchannel}**\nLevel: **${serverconfigfile.logginglevel}**`,},{name: "Tickets",value: `Enabled: **${serverconfigfile.ticketsenabled ? "Yes" : "No"}**\nTicket Message: **${ticketmessage}**`,},{name: "Music",value: `Enabled: **${serverconfigfile.musicenabled ? "Yes" : "No"}**`,},],`${message.guild.name}`,bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.logger("error", error));
      return;
    }
    bot.noPermsEmbed(`${message.guild.name}`, bot)
      .then((embed) => message.channel.send(embed))
      .catch((error) => bot.logger("error", error));
  },
};
