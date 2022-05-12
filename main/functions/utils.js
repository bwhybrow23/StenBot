module.exports = {

  resetVerif: (bot) => {
    const fs = require("fs");

    let botData = JSON.parse(fs.readFileSync("./data/global/bot-data.json"));
    let serverGuild = bot.guilds.cache.get(bot.settings.ids.mainGuild);

    let serverChannel = serverGuild.channels.cache.find((channel) => {
      if (channel.name === "verification") {
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
            text: "If you have any issues DM Stentorian#6969 on Discord!",
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

  //Change time (in secs) to readable format
  formatTime: function (seconds) {

    function pad(s){
      return (s < 10 ? '0' : '') + s;
    }
    var hours = Math.floor(seconds / (60*60));
    var minutes = Math.floor(seconds % (60*60) / 60);
    var seconds = Math.floor(seconds % 60);
  
    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);

  },

  capitalize: function (string) {
    if (typeof string !== "string") return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
};