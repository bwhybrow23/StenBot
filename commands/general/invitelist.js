module.exports = {
  name: "invitelist",
  category: "general",
  description: "Get a list of all the invites in the Discord server.",
  usage: "",
  example: "",
  options: { permission: "EVERYONE", enabled: true, guildOnly: true },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");

    let invites = await message.guild.invites.fetch().catch((error) => {
      return message.channel.send("Sorry, I don't have the proper permissions to view invites!");
    });

    let possibleinvites = [];
    if(!invites) {
      possibleinvites.push(`No invites!`)
    } else {
      invites.forEach(function(invite) {
        if(!invite.inviter) return;
        possibleinvites.push(`${invite.code} || ${(invite.inviter.username) + '#' + (invite.inviter.discriminator)} ||  ${invite.uses} uses`);
      });
    }

    const lbEmbed = new Discord.MessageEmbed()
      .setTitle(`**INVITE LIST**`)
      .setColor(bot.settings.color.yellow)
      .addField("Invites", `\`\`\`${possibleinvites.join("\n")}\`\`\``)
      .setFooter(`${message.guild.name}`, `https://i.imgur.com/klY5xCe.png`);

    message.channel.send({embeds: [lbEmbed.toJSON()]});
  },
};