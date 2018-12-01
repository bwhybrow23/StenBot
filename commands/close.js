const Discord = require("discord.js");

module.exports.run = async (bot, message, args, prefix) => {

if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);

if (!message.member.roles.find(x => x.name === "Support Team")) return message.reply('You do not have permission to close this support ticket. If you would like this ticket to be closed, please speak to a member of the Support Team.');
else {
  const ticketCloseReason = message.content.split(" ").slice(1).join(" ");
  if(!ticketCloseReason) return message.channel.send("Please specify a reason for closing the ticket.");
  else{
  message.channel.send(`Closing Ticket`);
  message.channel.delete();

  let closeTicketEmbed = new Discord.RichEmbed()
  .setDescription("Ticket Closed")
      .setColor("#ffff00")
      .addField("Ticket Name", `ticket-${message.author.username}`)
      .addField("Closed By", `<@${message.author.username}> with ID: ${message.author.id}`)
      .addField("Closed on", message.createdAt)
      .addField("Reason", ticketCloseReason || "Unspecified");

    }
  }
}

module.exports.help = {
  name: "close"
}
