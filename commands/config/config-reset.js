module.exports = {
  name: "config-reset",
  category: "config",
  description: "Reset all config variables for your server.",
  usage: "sb!config-reset",
  permission: "ADMIN",
  run: (bot, message, args) => {
    const Discord = require("discord.js");
    const fs = require("fs");

    const ownersid = message.guild.ownerID;
    const adminperm = message.member.hasPermission("ADMINISTRATOR");

    //Check if they have required permissions
    if (adminperm != true) {
      return bot
        .createEmbed(
          "error",
          "",
          `Error! You are not the owner or admin of this guild.`,
          [],
          `${message.guild.name}`,
          bot
        )
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    let defaultContent = {
      welcomerenabled: false,
      welcomerchannel: 0,
      welcomermessage: "Welcome {user} to {server}!",
      userjoinenabled: false,
      userjoinedrole: 0,
      userjoinedname: 0,
      staffrole: false,
      staffadminenabled: false,
      stafflinkblocker: false,
      stafffilter: [],
      staffautoban: 0,
      loggingenabled: false,
      loggingchannel: 0,
      logginglevel: "medium",
      ticketsenabled: false,
      ticketsmsg: 0,
      economyenabled: false,
      economyrobbing: false,
      economypay: true,
      economysymbol: 0,
      musicenabled: false,
      selfroleslist: [],
      levellingenabled: false,
    };
    fs.unlinkSync(
      `./data/servers/server-${message.guild.id}/serverconfig.json`
    );
    fs.writeFileSync(
      `./data/servers/server-${message.guild.id}/serverconfig.json`,
      JSON.stringify(defaultContent, null, 4),
      (err) => {
        if (err) return;
      }
    );

    message.channel.send({
      embed: {
        color: bot.settings.color.green,
        description: "Server config has been reset.",
      },
    });
    bot
      .createEmbed(
        "success",
        "",
        `Server Config has been reset.`,
        [],
        `${message.guild.name}`,
        bot
      )
      .then((embed) => message.channel.send(embed))
      .catch((error) => console.error(error));
  },
};
