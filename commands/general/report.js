module.exports = {
    name: "report",
    category: "general",
    description: "Report a user, bug or server to the StenBot Team to be investigated.",
    usage: "",
    example: "",
    options: { permission: "EVERYONE", enabled: true, cooldown: 300, guildOnly: false },
    run: async (bot, message, args) => {
      const Discord = require("discord.js");
  
      const reportUtils = require("../../main/functions/reportUtils.js")
  
      //Get the current time
      const date = new Date();
  
      //Convert to a readable format
      const formatter = new Intl.DateTimeFormat("en", {
        timeStyle: "medium",
        dateStyle: "medium"
      });
  
      //Variables for Interactive Version
      let reObj = message.author;
      let rObj = "";
      let gObj = "";
      let reason = "";
      let evidence = "";
      let info = "";
      let steps = "";
      let rDate = formatter.format(date);
  
      //Interactive Version
      bot.createEmbed("warning", "New StenBot Report", `Please specify the type of report:\n\`Player, Server or Bug\``, [], `${message.author.username}`, bot)
        .then(embed => message.channel.send(embed))
        .catch(error => console.error(error))
      const tCollector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {
        max: 1,
        time: 300000
      });
      tCollector.on('collect', async message => {
        if (message.content == "Player" || message.content == "player") {
          //Player Report
          //Get Player ID
          bot.createEmbed("warning", "Player Report", `Please put the ID of the user you are reporting.\nExample: \`346246641595973633\`\nFor more information on how to get a user's ID, check [this](http://bit.ly/getdiscordid) link`, [], `${message.author.username}`, bot)
            .then(embed => message.channel.send(embed))
            .catch(error => console.error(error))
          const rCollector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {
            max: 1,
            time: 300000
          });
          rCollector.on('collect', async message => {
            let rObj = await bot.users.fetch(message.content);
  
            //Get Guild ID
            bot.createEmbed("warning", "Player Report", `Please put the ID of the guild you are reporting this user in.\nExample: \`455782308293771264\`\nFor more information on how to get a servers's ID, check [this](http://bit.ly/getdiscordid) link`, [], `${message.author.username}`, bot)
              .then(embed => message.channel.send(embed))
              .catch(error => console.error(error))
            const gCollector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {
              max: 1,
              time: 300000
            });
            gCollector.on('collect', async message => {
              let gObj = bot.guilds.cache.get(message.content);
  
              //Get Reason
              bot.createEmbed("warning", "Player Report", `Please provide the reason for reporting this user. Don't include evidence, you can include that in the next message. Just a small explanation of why the player has been reported.\nExample: \`Spamming bot commands\``, [], `${message.author.username}`, bot)
                .then(embed => message.channel.send(embed))
                .catch(error => console.error(error))
              const reasonCollector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {
                max: 1,
                time: 300000
              });
              reasonCollector.on('collect', async message => {
                let reason = message.content;
  
                //Get Evidence
                bot.createEmbed("warning", "Player Report", `Please provide any evidence to support this report. This could be [message links](http://bit.ly/getdiscordid) or screenshots (uploaded to a site like Imgur). Copy and pastes of messages aren't accepted.\nExample: \`https://discordapp.com/channels/455782308293771264/624316687537405954/747063135990710353 OR https://imgur.com/a/TIFX79B\``, [], `${message.author.username}`, bot)
                  .then(embed => message.channel.send(embed))
                  .catch(error => console.error(error))
                const evidenceCollector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {
                  max: 1,
                  time: 300000
                });
                evidenceCollector.on('collect', async message => {
                  let evidence = message.content;
  
                  //Send report with function
                  reportUtils.playerReport(bot, reObj, rObj, gObj, reason, evidence, rDate)
                    .then(embed => bot.channels.cache.get("518729627586527232").send(embed))
                    .catch(error => console.error(error));
  
                  //Report Sent Message
                  bot.createEmbed("success", "Player Report Sent", `Your player report has been sent and will be reviewed by the Staff Team of StenBot. Thank you for your help.`, [], `${message.author.username}`, bot)
                    .then(embed => message.channel.send(embed))
                    .catch(error => console.error(error))
                })
              })
            })
          })
        } else if (message.content == "Server" || message.content == "server") {
          //Server Report
          //Get Server ID
          bot.createEmbed("warning", "Server Report", `Please put the ID of the server you are reporting.\nExample: \`455782308293771264\`\nFor more information on how to get a servers's ID, check [this](http://bit.ly/getdiscordid) link`, [], `${message.author.username}`, bot)
            .then(embed => message.channel.send(embed))
            .catch(error => console.error(error))
          const gCollector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {
            max: 1,
            time: 300000
          });
          gCollector.on('collect', async message => {
            let gObj = await bot.guilds.cache.get(message.content);
            //Get Reason
            bot.createEmbed("warning", "Server Report", `Please provide the reason for reporting this server. Don't include evidence, you can include that in the next message. Just a small explanation of why the server has been reported.\nExample: \`Spamming bot commands\``, [], `${message.author.username}`, bot)
              .then(embed => message.channel.send(embed))
              .catch(error => console.error(error))
            const reasonCollector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {
              max: 1,
              time: 300000
            });
            reasonCollector.on('collect', async message => {
              let reason = message.content;
  
              //Get Evidence
              bot.createEmbed("warning", "Server Report", `Please provide any evidence to support this report. This could be [message links](http://bit.ly/getdiscordid) or screenshots (uploaded to a site like Imgur). Copy and pastes of messages aren't accepted.\nExample: \`https://discordapp.com/channels/455782308293771264/624316687537405954/747063135990710353 OR https://imgur.com/a/TIFX79B\``, [], `${message.author.username}`, bot)
                .then(embed => message.channel.send(embed))
                .catch(error => console.error(error))
              const evidenceCollector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {
                max: 1,
                time: 300000
              });
              evidenceCollector.on('collect', async message => {
                let evidence = message.content;
  
                //Send report with function
                reportUtils.serverReport(bot, reObj, gObj, reason, evidence, rDate)
                  .then(embed => bot.channels.cache.get("518729627586527232").send(embed))
                  .catch(error => console.error(error));
  
                //Report Sent Message
                bot.createEmbed("success", "Server Report Sent", `Your server report has been sent and will be reviewed by the Staff Team of StenBot. Thank you for your help.`, [], `${message.author.username}`, bot)
                  .then(embed => message.channel.send(embed))
                  .catch(error => console.error(error))
              })
            })
          })
        } else if (message.content == "Bug" || message.content == "bug") {
          //Bug Report
          //Get Server ID
          bot.createEmbed("warning", "Server Report", `Please put the ID of the server you are reporting this bug from.\nExample: \`455782308293771264\`\nFor more information on how to get a servers's ID, check [this](http://bit.ly/getdiscordid) link`, [], `${message.author.username}`, bot)
            .then(embed => message.channel.send(embed))
            .catch(error => console.error(error))
          const gCollector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {
            max: 1,
            time: 300000
          });
          gCollector.on('collect', async message => {
            let gObj = await bot.guilds.cache.get(message.content);
            //Get Info
            bot.createEmbed("warning", "Bug Report", `Please provide some information about the bug you are reporting. Just a little summary. Example: \`Bot doesn't recognise when I do the command sb!server\``, [], `${message.author.username}`, bot)
              .then(embed => message.channel.send(embed))
              .catch(error => console.error(error))
            const infoCollector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {
              max: 1,
              time: 300000
            });
            infoCollector.on('collect', async message => {
              let info = message.content;
  
              //Get Steps
              bot.createEmbed("warning", "Bug Report", `Please provide a detailed list of steps on how this bug occured. Please only keep it to one message and if needs be, use a website like https://hasteb.in/ to paste longer messages. Example: https://hasteb.in/ikibahod.sql`, [], `${message.author.username}`, bot)
                .then(embed => message.channel.send(embed))
                .catch(error => console.error(error))
              const stepsCollector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {
                max: 1,
                time: 300000
              });
              stepsCollector.on('collect', async message => {
                let steps = message.content;
  
                //Get Evidence
                bot.createEmbed("warning", "Bug Report", `Please provide evidence to support your bug report. If you're going to upload screenshots, please use a website like Imgur to upload them to. Example: \`https://imgur.com/a/TIFX79B\``, [], `${message.author.username}`, bot)
                  .then(embed => message.channel.send(embed))
                  .catch(error => console.error(error))
                const evidenceCollector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {
                  max: 1,
                  time: 300000
                });
                evidenceCollector.on('collect', async message => {
                  let evidence = message.content;
  
                  //Send report with function
                  reportUtils.bugReport(bot, reObj, gObj, info, steps, evidence, rDate)
                    .then(embed => bot.channels.cache.get("518729627586527232").send(embed))
                    .catch(error => console.error(error));
  
                  //Report Sent Message
                  bot.createEmbed("success", "Bug Report Sent", `Your bug report has been sent and will be reviewed by the Developers of StenBot. Thank you for your help.`, [], `${message.author.username}`, bot)
                    .then(embed => message.channel.send(embed))
                    .catch(error => console.error(error))
                })
              })
            })
          })
        }
      })
  
    }
  };