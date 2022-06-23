module.exports = {
  name: "config",
  category: "config",
  description: "View all config variables.",
  usage: "",
  example: "",
  options: { permission: "ADMIN", aliases: ["conf", "c", "settings"], enabled: true, guildOnly: true },
  run: async (bot, interaction) => {

    const Discord = require("discord.js");

    let servertag = interaction.guild.name;

    if (message.member.permissions.has("ADMINISTRATOR") === false) {
      return bot.noPermsEmbed(`${interaction.guild.name}`, bot)
        .then((embed) => interaction.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    //Set up the embed
    const config = await bot.mutils.getGuildById(interaction.guild.id);

    //Set the undefined ect variables to proper english
    //Welcomer channel? Default = undefined
    var welcomerchannel = config.gatekeeper.welcome_channel;
    if (welcomerchannel === 0) {
      var welcomerchannel = "Not Set";
    } else {
      var welcomerchannel = `<#${welcomerchannel}>`;
    }
    //Leave Channel? Default = undefined
    var leavechannel = config.gatekeeper.leave_channel;
    if (leavechannel === 0) {
      var leavechannel = "Not Set";
    } else {
      var leavechannel = `<#${leavechannel}>`;
    }
    //User on-join role default 0
    var userjoinrole = config.userjoin.role;
    if (userjoinrole === 0) {
      var userjoinrole = "Not Set";
    } else {
      var userjoinrole = `<@&${userjoinrole}>`;
    }
    //User onjoin set nick default undefined
    var userjoinnick = config.userjoin.nickname;
    if (userjoinnick === 0) {
      var userjoinnick = "Not Set";
    }
    //Staff role default false
    var staffrole = config.moderation.staff_role;
    if (staffrole === "0") {
      var staffrole = "Not Set";
    } else {
      var staffrole = `<@&${staffrole}>`;
    }
    //word filter by default is empty
    var stafffilter = config.moderation.filter;
    let stafffilter1 = [];
    if (stafffilter.length === 0) {
      stafffilter1.push("Empty");
    } else {
      stafffilter.forEach(word => {
        stafffilter1.push(`${word} `);
      });
    }
    //autoban by default is undefined
    // var staffban = config.staff_autoban;
    // if (staffban == 0) {
    //   var staffban = "None";
    // }
    //Logging channel by default is 0
    var logchannel = config.logging.channel;
    if (logchannel === 0) {
      var logchannel = "Not Set";
    } else {
      var logchannel = `<#${logchannel}>`;
    }
    var loggingignore = config.logging.ignore;
    let loggingignore1 = [];
    if (loggingignore.length === 0) {
      loggingignore1.push("Empty");
    } else {
      loggingignore.forEach(id => {
        loggingignore1.push(`<#${id}> `);
      });
    }
    //Ticket message by default is undefined
    var ticketmessage = config.tickets.message;
    if (ticketmessage === 0) {
      var ticketmessage = "Default";
    }

    //Embed
      return bot.createEmbed("warning", `${servertag} Configuration`, `Your Configuration`, [{
          name: "Gatekeeper Welcomer",
          value: `Enabled: **${config.gatekeeper.welcome_enabled ? "Yes" : "No"} **\nWelcomer Channel: **${welcomerchannel}**\nWelcomer Message: \`\`\`${config.gatekeeper.welcome_message}\`\`\``,
        }, {
          name: "Gatekeeper Leave",
          value: `Enabled: **${config.gatekeeper.leave_enabled ? "Yes" : "No"} **\nLeave Channel: **${leavechannel}**\nLeave Message: \`\`\`${config.gatekeeper.leave_message}\`\`\``,
        }, {
          name: "User Join",
          value: `Enabled: **${config.userjoin.enabled ? "Yes" : "No"}**\nAdd Role: **${userjoinrole}**\nSet Nick: **${userjoinnick}**`,
        }, {
          name: "Moderation",
          value: `Staff Role: **${staffrole}**\nLink Blocker: **${config.moderation.link_block ? "Enabled" : "Disabled"}**\nWord Filter: **${stafffilter1}**`,
        }, {
          name: "Logging",
          value: `Enabled: **${config.logging.enabled ? "Yes" : "No"}**\nLogging Channel: **${logchannel}**\nLevel: **${config.logging.level}**\nIgnore List: **${loggingignore1}**`,
        }, {
          name: "Tickets",
          value: `Enabled: **${config.tickets.enabled ? "Yes" : "No"}**\nTicket Message: \`\`\`${ticketmessage}\`\`\``,
        }, ], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply(embed))
        .catch((error) => bot.log.post("error", error));
  },
};