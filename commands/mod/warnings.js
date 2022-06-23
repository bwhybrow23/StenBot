const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warnings").setDescription("View all warnings on a user.")
    .addUserOption(option => option.setName("user").setDescription("The user to view warnings on.").setRequired(true)),
  category: "mod",
  options: { permission: "STAFF", enabled: true, cooldown: 0, guildOnly: true },
  run: async (bot, interaction) => {
    
    //Perm Check
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return bot.noPermsEmbed(`${interaction.guild.name}`, bot);
    };
    
    //Args Check
    var targetuser = interaction.options.getUser("user");
    
    let warnings;
    await bot.punishments.fetch(interaction.guild.id, targetuser.id)
    .then((punishments) => {
      warnings = punishments.warns;
    });
    
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
      let punisher = interaction.guild.members.cache.get(warning.punisher); 
    
      let dateObject = new Date(warning.date);
      let date = `${dateObject.toLocaleString("en-US", {day: "numeric"})}/${dateObject.toLocaleString("en-US", {month: "numeric"})}/${dateObject.toLocaleString("en-US", {year: "numeric"})}`
    
      embed.fields.push({
        name: `ID: ${warning.id} | ${punisher.user.tag} (${punisher.id})`,
        value: `${warning.reason} • ${date}`
      });
    })
    
    return interaction.reply({
      embeds: [embed]
    });
  },
}
