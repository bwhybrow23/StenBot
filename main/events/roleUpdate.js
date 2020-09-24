module.exports = async (bot, oldRole, newRole) => {
  const Discord = require("discord.js");
  const efunctions = require("../functions/eventUtils.js");
  const ColorAPIURL = "http://thecolorapi.com/id?format=json&hex=";
  const request = require("superagent");

  let config = await bot.mutils.getGuildById(newRole.guild.id)
  if (config.logging_enabled == true) {
    if (config.logging_level == "high") {
      if (efunctions.checkChannel(config.logging_channel, bot) == true) {
        let lchannel = bot.channels.cache.get(config.logging_channel);
        if (oldRole.name !== newRole.name) {
          bot.eventEmbed("006187", "None", "Role Name Changed", `**Old Name:** ${oldRole.name}\n**New Name:** ${newRole.name}\n**ID:** ${newRole.id}`, [], `${newRole.guild.name}`, bot)
              .then(embed => lchannel.send(embed))
              .catch(error => console.error(error))
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
          bot.eventEmbed("006187", "None", "Role Colour Changed", `**Name:** ${newRole.name}\n**Id:** ${newRole.id}\n\n**Before:** ${oldRole.hexColor} (${oldRole.hexColor === "#000000" ? "default" : oldColor})\n**After:** ${newRole.hexColor} (${newRole.hexColor === "#000000" ? "default" : newColor})\n**_NOTE:_ Colors are named to the exact color or the closest to it. Search them online to find out what they are.**`, [], `${newRole.guild.name}`, bot)
              .then(embed => lchannel.send(embed))
              .catch(error => console.error(error))
        }
      }
    }
  }
};
