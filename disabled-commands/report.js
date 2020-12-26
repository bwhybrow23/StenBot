module.exports = {
  name: "report",
  category: "general",
  description: "Report a bug, user or server for things like abuse or general concern and it will be investigated.",
  usage: "sb!report <BUG | PLAYER> {@USER} <REASON>",
  permission: "EVERYONE",
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
    if (!message.guild) return;
    const colors = require("colors");

    var reporttype = args[0];

    let thedate = new Date();

    //Check if they included a report type.

    switch (reporttype) {
      //BUG REPORT
      case "bug":
        let report = args.slice(1).join(" ");
        if (report.length < 1) {
          return message.channel.send({
            embed: {
              color: bot.settings.color.red,
              description: "Error! You need to include the report message!",
            },
          });
        }
        //Bug report message
        const bugreport = new Discord.MessageEmbed()
          .setTitle("New Bug Report.")
          .setColor(bot.settings.color.yellow)
          .setDescription(
            `Platform: **Discord**\n\nUsername: **${message.author}**\nUser Id: **${message.author.id}**\nFrom Server: **${message.guild.name} | ${message.guild.id}**\nTime: **${thedate}**\n\nThe Bug: \n**${report}**`
          );

        bot.log.post("info", `A bug report has been created by ${message.author.tag} | ${message.author.id}`);
        bot.channels.cache.get("518729627586527232").send(bugreport);

        message.channel.send({
          embed: {
            color: bot.settings.color.green,
            description: "Your **bug** report has been created.",
          },
        });
        break;
      //PLAYER REPORT
      case "player":
        //Check if they have mentioned a user
        let member = message.mentions.members.first();
        if (member === undefined) {
          return message.channel.send({
            embed: {
              color: bot.settings.color.red,
              description: "Error! You forgot to mention a user to report!",
            },
          });
        }

        //Check if they included the reprot message
        let playerreportmsg = args.slice(2).join(" ");
        if (playerreportmsg.length < 1) {
          return message.channel.send({
            embed: {
              color: bot.settings.color.red,
              description: "Error! You need to include the report message!",
            },
          });
        }

        //PLayer report message
        const playerreport = new Discord.MessageEmbed()
          .setTitle("New Player Report.")
          .setColor(bot.settings.color.yellow)
          .setDescription(
            `Platform: **Discord**\n\nReporter Username: **${message.author}**\nReporter User Id: **${message.author.id}**\nFrom Server: **${message.guild.name} | ${message.guild.id}**\nTime: **${thedate}**\n\nReported User: **${member.user}**\nReported Users Id: **${member.id}**\nReport: \n**${playerreportmsg}**`
          );

        bot.channels.cache.get("518729627586527232").send(playerreport);
        bot.log.post("info", `A player report has been created by ${message.author.tag} | ${message.author.id}`);

        message.channel.send({
          embed: {
            color: bot.settings.color.green,
            description: "Your **player** report has been created.",
          },
        });
        break;

      default:
        message.channel.send({
          embed: {
            color: bot.settings.color.red,
            description: "Error! Invalid report type!",
          },
        });
        break;
    }
  },
};
