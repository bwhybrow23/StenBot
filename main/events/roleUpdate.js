module.exports = async (bot, oldRole, newRole) => {
  const Discord = require("discord.js");
  const efunctions = require("../functions/eventUtils.js");
  const ColorAPIURL = "http://thecolorapi.com/id?format=json&hex=";
  const request = require("superagent");

  let config = efunctions.getConfig(newRole.guild.id);
  if (config.loggingenabled == true) {
    if (config.logginglevel == "high") {
      if (efunctions.checkChannel(config.loggingchannel, bot) == true) {
        let lchannel = bot.channels.cache.get(config.loggingchannel);
        if (oldRole.name !== newRole.name) {
          lchannel.send({
            embed: {
              color: bot.settings.color.yellow,
              description: `**Role Name Changed**\n**Before:** ${oldRole.name}\n**After:** ${newRole.name}\n**ID:** ${newRole.id}`,
              footer: { text: "Role Name Changed" },
              timestamp: new Date(),
            },
          });
        } else if (oldRole.hexColor !== newRole.hexColor) {
          //We use substr(1) to remove the '#' from the hex
          let oldjson = await request.get(
            ColorAPIURL + oldRole.hexColor.substr(1)
          );
          let newjson = await request.get(
            ColorAPIURL + newRole.hexColor.substr(1)
          );

          let oldColor = oldjson.body.name.value;
          let newColor = newjson.body.name.value;
          lchannel.send({
            embed: {
              color: bot.settings.color.yellow,
              description: `**Role Color Changed**\n**Before:** ${
                oldRole.hexColor
              } (${
                oldRole.hexColor === "#000000" ? "default" : oldColor
              })\n**After:** ${newRole.hexColor} (${
                newRole.hexColor === "#000000" ? "default" : newColor
              })\n**ID:** ${
                newRole.id
              }\n**_NOTE:_ Colors are named to the exact color or the closest to it. Search them online to find out what they are.**`,
              footer: { text: "Role Color Changed" },
              timestamp: new Date(),
            },
          });
        }
      }
    }
  }
};
