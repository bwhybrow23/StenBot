module.exports = {
  name: "invitelist",
  category: "general",
  description: "Get a list of all the invites in the Discord server.",
  usage: "sb!invitelist",
  permission: "EVERYONE",
  run: async (bot, message, args) => {
    const Discord = require("discord.js");

    let invites = await message.guild.fetchInvites().catch((error) => {
      return message.channel.send(
        "Sorry, I don't have the proper permissions to view invites!"
      );
    });

    invites = invites.array();

    let possibleinvites = [];
    invites.forEach(function (invites) {
      possibleinvites.push(`${invites.inviter.username} ||  ${invites.uses}`);
    });

    const lbEmbed = new Discord.RichEmbed()
      .setTitle(`**INVITE LIST**`)
      .setColor(bot.settings.color.yellow)
      .addField("Invites", `\`\`\`${possibleinvites.join("\n")}\`\`\``)
      .setFooter(`${message.guild.name}`, `https://i.imgur.com/BkZY6H8.png`);

    message.channel.send(lbEmbed);
  },
};
