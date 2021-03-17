module.exports = {
  name: "warnings",
  category: "mod",
  description: "View all warnings on a user.",
  usage: "<@USER>",
  example: "@Jayse#6969",
  options: { permission: "STAFF", enabled: true, cooldown: 0, guildOnly: true },
  run: async (bot, message, args) => {
    
    const Discord = require("discord.js");

    var config = await bot.mutils.getGuildById(message.guild.id);
    
    //Perm Check
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return bot.noPermsEmbed(`${message.guild.name}`, bot);
    };
    
    //Args Check
    var targetuser = message.mentions.members.first();
    if (!targetuser || args[0] == "help") {
      return bot.helpEmbed("warnings", bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    };
    
    let warnings = config.moderation.warnings.filter(function(warning) {
      return warning.user = targetuser.id;
    });
    
    if (Object.keys(warnings).length < 0) {
      return bot.createEmbed("error", "", "Error! This user has no warnings.", [], `${message.guild.name}`, message)
        .then((embed) => message.channel.send(embed))
        .catch((error) => bot.log.post("error", error));
    }
    
    let embed = {
      "color": 4325423,
      "timestamp": Date.now(),
      "footer": {
        "text": `${Object.keys(warnings).length} total warns`
      },
      "author": {
        "name": `${targetuser.user.username}'s Warnings`,
        "icon_url": targetuser.user.displayAvatarURL()
      },
      "fields": []
    };
    
    warnings.forEach((warning, index) => {
      let issuer = message.guild.members.cache.get(warning.issuer);
    
      let dateObject = new Date(warning.timestamp);
      let date = `${dateObject.toLocaleString("en-US", {day: "numeric"})}/${dateObject.toLocaleString("en-US", {month: "numeric"})}/${dateObject.toLocaleString("en-US", {year: "numeric"})}`
    
      embed.fields.push({
        name: `ID: ${index + 1} | ${issuer.user.tag} (${issuer.id})`,
        value: `${warning.reason} • ${date}`
      });
    })
    
    message.channel.send({
      embed: embed
    });
  },
}