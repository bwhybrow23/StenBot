module.exports = async (bot, oldRole, newRole) => {
  const Discord = require("discord.js");
  const ColorAPIURL = "http://thecolorapi.com/id?format=json&hex=";
  const fetch = require("node-fetch");

  let config = await bot.mutils.getGuildById(newRole.guild.id);
  if(!config) return;
  
  if (config.logging.enabled === true) {
    if (config.logging.level === "high") {
      if (bot.efunctions.checkChannel(config.logging.channel, bot) === true) {
        let lchannel = bot.channels.cache.get(config.logging.channel);
        if (oldRole.name !== newRole.name) {
          bot.eventEmbed("006187", "None", "Role Name Changed", `**Old Name:** ${oldRole.name}\n**New Name:** ${newRole.name}\n**ID:** ${newRole.id}`, [], `${newRole.guild.name}`, bot)
            .then(embed => lchannel.send(embed))
            .catch(error => bot.log.post("error", error));
        } else if (oldRole.hexColor !== newRole.hexColor) {
          //We use substr(1) to remove the '#' from the hex
          let oldRes = await fetch(
            ColorAPIURL + oldRole.hexColor.substr(1)
          );
          let oldjson = await oldRes.json();
          let newRes = await fetch(
            ColorAPIURL + newRole.hexColor.substr(1)
          );
          let newjson = await newRes.json();

          let oldColor = oldjson.name.value;
          let newColor = newjson.name.value;
          bot.eventEmbed("006187", "None", "Role Colour Changed", `**Name:** <@&${newRole.id}>\n**Id:** ${newRole.id}\n\n**Before:** ${oldRole.hexColor} (${oldRole.hexColor === "#000000" ? "default" : oldColor})\n**After:** ${newRole.hexColor} (${newRole.hexColor === "#000000" ? "default" : newColor}) \n\n_**NOTE:** Colors are named to the exact color or the closest to it. Search them online to find out what they are._`, [], `${newRole.guild.name}`, bot)
            .then(embed => lchannel.send(embed))
            .catch(error => bot.log.post("error", error));
        }
      }
    }
  }
};