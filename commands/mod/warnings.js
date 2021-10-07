module.exports = {
  name: "warnings",
  category: "mod",
  description: "View all warnings on a user.",
  usage: "<@USER>",
  example: "@Becca#4109",
  options: { permission: "STAFF", enabled: true, cooldown: 0, guildOnly: true },
  run: async (bot, message, args) => {
    
    const Discord = require("discord.js");
    
    //Perm Check
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot);
    };
    
    //Args Check
    var targetuser = message.mentions.members.first();
    if (!targetuser || args[0] == "help") {
      return bot.helpEmbed("warnings", bot)
        .then((embed) => message.reply(embed))
        .catch((error) => bot.log.post("error", error));
    };
    
    let warnings;
    await bot.punishments.fetch(message.guild.id, targetuser.id)
    .then((punishments) => {
      warnings = punishments.warns;
    })
    
    let embed = {
      "color": 4325423,
      "timestamp": Date.now(),
      "footer": {
        "text": `${Object.keys(warnings).length} total warn(s)`
      },
      "author": {
        "name": `${targetuser.user.username}'s Warnings`,
        "icon_url": targetuser.user.displayAvatarURL()
      },
      "fields": []
    };
    
    warnings.forEach((warning) => {
      let punisher = message.guild.members.cache.get(warning.punisher); 
    
      let dateObject = new Date(warning.date);
      let date = `${dateObject.toLocaleString("en-US", {day: "numeric"})}/${dateObject.toLocaleString("en-US", {month: "numeric"})}/${dateObject.toLocaleString("en-US", {year: "numeric"})}`
    
      embed.fields.push({
        name: `ID: ${warning.id} | ${punisher.user.tag} (${punisher.id})`,
        value: `${warning.reason} • ${date}`
      });
    })
    
    return message.channel.send({
      embeds: [embed]
    });
  },
}
