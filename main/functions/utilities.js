module.exports = {
  getMember: function(message, toFind = "") {
    toFind = toFind.toLowerCase();

    let target = message.guild.cache.members.get(toFind);

    if (!target && message.mentions.members)
      target = message.mentions.members.first();

    if (!target && toFind) {
      target = message.guild.cache.members.find((member) => {
        return (
          member.displayName.toLowerCase().includes(toFind) ||
          member.user.tag.toLowerCase().includes(toFind)
        );
      });
    }

    if (!target) target = message.member;

    return target;
  },

  msToTime: function(ms) {
    days = Math.floor(ms / 86400000); // 24*60*60*1000
    daysms = ms % 86400000; // 24*60*60*1000
    hours = Math.floor(daysms / 3600000); // 60*60*1000
    hoursms = ms % 3600000; // 60*60*1000
    minutes = Math.floor(hoursms / 60000); // 60*1000
    minutesms = ms % 60000; // 60*1000
    sec = Math.floor(minutesms / 1000);

    let str = "";
    if (days) str = str + days + "d";
    if (hours) str = str + hours + "h";
    if (minutes) str = str + minutes + "m";
    if (sec) str = str + sec + "s";

    return str;
  },

  formatDate: function(date) {
    return new Intl.DateTimeFormat("en-US").format(date);
  },

  promptMessage: async function(message, author, time, validReactions) {
    // We put in the time as seconds, with this it's being transfered to MS
    time *= 1000;

    // For every emoji in the function parameters, react in the good order.
    for (const reaction of validReactions) await message.react(reaction);

    // Only allow reactions from the author,
    // and the emoji must be in the array we provided.
    const filter = (reaction, user) =>
      validReactions.includes(reaction.emoji.name) && user.id == author.id;

    // And ofcourse, await the reactions
    return message
      .awaitReactions({ filter, 
        max: 1,
        time: time,
      })
      .then((collected) => collected.first() && collected.first().emoji.name);
  },

  resetVerif: (bot) => {
    const fs = require("fs");

    let botData = JSON.parse(fs.readFileSync("./data/global/bot-data.json"));
    let serverGuild = bot.guilds.cache.get(bot.settings.ids.mainGuild);

    let serverChannel = serverGuild.channels.cache.find((channel) => {
      if (channel.name == "verification") {
        return channel;
      }
    });

    serverChannel.messages.fetch(botData.verifMsgID).then((message) => {
      message.delete();
    });

    serverChannel
      .send({
        embeds: [{
          title: "SERVER VERIFICATION",
          description: "Make sure to read <#624316687537405954> and then click the ✅ to get access to the rest of the discord.",
          color: bot.settings.color.yellow,
          footer: {
            icon_url: bot.user.avatarURL({
              format: "png"
            }),
            text: "If you have any issues DM Stentorian#9524 on Discord!",
          },
        }],
      })
      .then((message) => {
        botData.verifMsgID = message.id;
        fs.writeFileSync(
          "./data/global/bot-data.json",
          JSON.stringify(botData, null, 4)
        );
        message.react("✅");
        //   .then(reaction => {
        // message.react("🎮").then(reaction => {
        //   message.react("⚙")
        // })
        //   })
        bot.log.post("success", "Verification message reset.");
      });
  },

  promptMessage: async function(message, author, time, validReactions) {
    // We put in the time as seconds, with this it's being transfered to MS
    time *= 1000;

    // For every emoji in the function parameters, react in the good order.
    for (const reaction of validReactions) await message.react(reaction);

    // Only allow reactions from the author,
    // and the emoji must be in the array we provided.
    const filter = (reaction, user) =>
      validReactions.includes(reaction.emoji.name) && user.id == author.id;

    // And ofcourse, await the reactions
    return message
      .awaitReactions({ filter, 
        max: 1,
        time: time
      })
      .then((collected) => collected.first() && collected.first().emoji.name);
  }
};