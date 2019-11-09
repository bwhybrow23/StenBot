module.exports = {
  name: "ginvite",
  category: "bot",
  description: "Get an invite to a guild the bot is in (Mainly used for finding abuse)",
  example: ".ginvite 0110100001101001",
  permission: "BOT OWNER",
  run: async (bot, message, args) => {

    const Discord = require("discord.js");
   
    if (!message.author.id === bot.settings.ids.botOwner) return message.reply("You do not have sufficient permissions for this command.");
   
    let guildid = args[0]
    let guild = bot.guilds.get(guildid);
    if (!guild) return message.reply("The bot isn't a member of such guild!");
   
    let invitechannels = guild.channels.filter(c => c.permissionsFor(guild.me).has('CREATE_INSTANT_INVITE'))
    if (!invitechannels) return message.channel.send('I don\'t have permissions to create an invite link :/ ')
   
    invitechannels.random().createInvite()
     .then(invite => message.channel.send(`Found Invite: **https://discord.gg/${invite.code}**, Server name: **${guild.name}**`))
   
}};
