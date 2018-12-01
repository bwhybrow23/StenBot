const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let reportHelpEmbed = new Discord.RichEmbed()
      .setColor("#a905fc")
      .setTitle("Command: Report")
      .addField("Description:", "Report a bad player", true)
      .addField("Usage", ".report @<user> <reason>", true)
      .addField("Example", ".report @Stentorian#1202 Too OP")
      .addField("Note", "The staff are instantly notified and you might not be notified of any punishments made to that player.");


  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!rUser) return message.channel.send(reportHelpEmbed);
  let reason = args.join(" ").slice(22);

  let reportEmbed = new Discord.RichEmbed()
      .setDescription("A new report has came in!")
      .setColor("#a905fc")
      .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
      .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
      .addField("Channel", message.channel)
      .addField("Time", message.createdAt)
      .addField("Reason", reason || "Unspecified");

  let reportResponseEmbed = new Discord.RichEmbed()
      .setColor("#21ff00")
      .setDescription("Your report has successfully been submitted! It will be overlooked as soon as possible!")

  let reportschannel = message.guild.channels.find(`name`, "reports");
  if (!reportschannel) return message.channel.send("Couldn't find reports channel. Create a new text channel called #reports")

  message.delete().catch(O_o => {});
  reportschannel.send(reportEmbed);
  message.channel.send(reportResponseEmbed);
}

module.exports.help = {
  name: "report"
}
