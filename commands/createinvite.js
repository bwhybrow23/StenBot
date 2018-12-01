const Discord = require("discord.js");

exports.run = async (anko, message, args) => {

  if (!message.member.hasPermission("CREATE_INSTANT_INVITE")) return message.reply("I'm afraid that you don't have permission to do that. If you believe this is a mistake please contact an admin.");

  message.channel.createInvite({maxAge: 0}).then(invite => {
    let inviteEmbed = new Discord.RichEmbed()
    .setColor("GREEN")
    .setDescription(`**Permanent Invite Link**: ${invite}`);

    message.channel.send(inviteEmbed);
  });
}

exports.help = {
  name: 'createinvite',
}