const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

  let banHelp = new Discord.RichEmbed()
      .setColor("#a905fc")
      .setTitle("Command: Ban")
      .addField("Description:", "Ban a member forever", true)
      .addField("Usage", ".ban <user> <reason>", true)
      .addField("Example", ".ban @Stentorian#1202 Being a Noob")
      .addField("Note", "To unban the user you have banned, you need to navigate to Server Settings > Bans");

  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!bUser) return message.channel.send(banHelp);
  let bReason = args.join(" ").slice(22);
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Insufficient Permissions!");
  if (bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person cannot be banned!");

  let banEmbed = new Discord.RichEmbed()
      .setDescription("User Banned")
      .setColor("#ff0400")
      .addField("Banned User", `${bUser} with ID: ${bUser.id}`)
      .addField("Banned By", `<@${message.author.id}> with ID: ${message.author.id}`)
      .addField("Banned In", message.channel)
      .addField("Banned on", message.createdAt)
      .addField("Reason", bReason || "Unspecified");

  let banResponseEmbed = new Discord.RichEmbed()
      .setColor("#21ff00")
      .setDescription(`${bUser} has successfully been banned from the server!`);


  let banChannel = message.guild.channels.find(`name`, "logs")
  if (!banChannel) return message.channel.send("Can't find log channel! Please create a channel called #logs")


  message.delete().catch(O_o => {});
  message.guild.member(bUser).ban(bReason);
  banChannel.send(banEmbed);
  message.channel.send(banResponseEmbed);
}

module.exports.help = {
  name: "ban"
}
