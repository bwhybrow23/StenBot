module.exports = {
    name: "achievement",
    category: "fun",
    description: "Create your own Minecraft achievement",
    usage: "<MESSAGE>",
    example: "Being a successful failure!",
    options: { permission: "EVERYONE", enabled: true, cooldown: 15, guildOnly: false },
    run: async (bot, message, args) => {
  
      const Discord = require("discord.js");
  
      var achievement = args.join(" ");
      var request = require("request");
      var fs = require("fs");
  
      if (!achievement || args[0] == "help") {
        return bot.helpEmbed("achievement", bot)
          .then((embed) => message.channel.send(embed))
          .catch((error) => bot.log.post("error", error));
      }
  
      var download = function(uri, filename, callback) {
        request.head(uri, function(err, res, body) {
          request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
        });
      };
      var dir = `./data/images/temp/${message.author.id}.png`;
  
      function downloadJS() {
        download("https://minecraftskinstealer.com/achievement/13/Achievement%20unlocked/" + achievement, dir, function() {
          message.channel.send(`${message.author} has earned a new achievement.`, {
            files: [{
              attachment: dir,
              name: `${message.author.id}.png`
            }]
          });
        });
      }
  
      //Delete file
      function deleteJS() {
        fs.stat(
          `././data/images/temp/${message.author.id}.png`,
          function(err, stats) {
            if (err) {
              return console.error(err);
            }
  
            fs.unlink(
              `././data/images/temp/${message.server.id}-${message.author.id}.png`,
              function(err) {
                if (err) return bot.log.post("error", err);
              }
            );
          }
        );
      }
  
      downloadJS();
  
      setTimeout(deleteJS, 30000);
    },
  };