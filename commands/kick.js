const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

  let kickHelp = new Discord.RichEmbed()
      .setColor("#a905fc")
      .setTitle("Command: Kick")
      .addField("Description:", "Kicks a member from the server", true)
      .addField("Usage", ".kick <user> <reason>", true)
      .addField("Example", ".kick @Stentorian#1202 Being a Noob")
      .addField("Note", "The user can join back if they are invited back.");

  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!kUser) return message.channel.send(kickHelp);
  let kReason = args.join(" ").slice(22);
  if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Insufficient Permissions!");
  if (kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person cannot be kicked!");

  let kickEmbed = new Discord.RichEmbed()
      .setDescription("User Kicked")
      .setColor("#e59937")
      .addField("Kicked User", `${kUser} with ID: ${kUser.id}`)
      .addField("Kicked By", `<@${message.author.id}> with ID: ${message.author.id}`)
      .addField("Kicked In", message.channel)
      .addField("Kicked on", message.createdAt)
      .addField("Reason", kReason || "Unspecified");

  let kickResponseEmbed = new Discord.RichEmbed()
          .setColor("#21ff00")
          .setDescription(`${kUser} has successfully been kicked from the server!`);

  let kickChannel = message.guild.channels.find(`name`, "logs")
  if (!kickChannel) return message.channel.send("Can't find log channel! Please create a channel called #logs")

  message.delete().catch(O_o => {});
  message.guild.member(kUser).kick(kReason);
  kickChannel.send(kickEmbed);
  message.channel.send(kickResponseEmbed);
}

module.exports.help = {
  name: "kick"
}
