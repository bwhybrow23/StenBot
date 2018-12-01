const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  let muteHelpEmbed = new Discord.RichEmbed()
  .setColor("#a905fc")
  .setTitle("Command: Tempmute")
  .addField("Description", "Temporarily restrics aformentioned user from talking for the specified time!", true)
  .addField("Usage", ".tempmute @<user> <time> <reason>", true)
  .addField("Example", ".tempmute @Stentorian#1202 10m Noob")
  .addField("Note", "This command requires a muted role that the bot creates if one is not there!");

  if(!args[0]) return message.channel.send(muteHelpEmbed);

  let tempMuteEmbed = new Discord.RichEmbed()
      .setDescription("User Temp Muted")
      .setColor("#e59937")
      .addField("Muted User", `${mute} with ID: ${mute.id}`)
      .addField("Muted By", `<@${message.author.id}> with ID: ${message.author.id}`)
      .addField("Muted In", message.channel)
      .addField("Muted on", message.createdAt)

  let mute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  if(mute.hasPermission("KICK_MEMBERS")) return message.reply("Can't mute this person!");

  let muterole = message.guild.roles.find(`name`, "muted");

//start of createrole
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000"
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
        })
      })
    }catch (e){
      console.log(e.stack);
    }
  }
//end of createrole
  let mutetime = args[1];
  if(!mutetime) return message.channel.send(muteHelpEmbed);

  await(mute.addRole(muterole.id));
  message.reply(`<@${mute.id}> has been muted for ${ms(ms(mutetime))}`);

  await(mute.addRole(muterole.id));
  message.channel.send(tempMuteEmbed);

  setTimeout(function(){
    mute.removeRole(muterole.id);
    message.channel.send(`<@${mute.id}> has recieved their full mute time. They have now been unmuted!`);
  }, ms(mutetime));

  //end of module
}

module.exports.help = {
  name: "tempmute"
}
