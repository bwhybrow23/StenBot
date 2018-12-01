const Discord = require("discord.js")

  module.exports.run = async (bot, message, args) => {
    
    //EMBEDS
    let categoriesEmbed = new Discord.RichEmbed()
    .addField("StenBot Commands", "StenBot's Prefix is `.`")
    .addField("Moderation Commands", "`.help mod`", true)
    .addField("General Commands", "`.help general`", true)
    .addField("Fun Commands", "`.help fun`", true)
    .addField("Bot Owner Commands", "`.help botowner`", true);

    let modEmbed = new Discord.RichEmbed()
    .setColor("#303fc9")
    .setTitle("Moderation Commands")
    .setDescription("These commands are for Staff members or anyone that has permission on the server!")
    .addField("`.ban {@user} {reason}`", "Bans mentioned user from the server!")
    .addField("`.bans`", "Displays how many bans the server has")
    .addField("`.embed {message}`", "Embeds {message} into a Discord RichEmbed to look cool!")
    .addField("`.kick @{user} {reason}`", "Kicks mentioned user from the server!")
    .addField("`.tempmute @{user} {time} {reason (optional)}`", "Mutes mentioned player for the specified time!")
    .addField("`.warn {@user} {reason`}", "Warns the mentioned member with a reason!")
    .addField("`.warns {@user}`", "Displays number of warns for the mentioned user!");

    let generalEmbed = new Discord.RichEmbed()
    .setColor("#303fc9")
    .setTitle("General Commands")
    .setDescription("These are general commands that can be done on any server")
    .addField("`.botinfo`", "Displays all information about the bot")
    .addField("`.credit`", "Displays credits for the bot. Some shoutouts to people who have helped")
    .addField("`.donate`", "Help support the bot and donate to keep it going!")
    .addField("`.help`", "Displays the Default Help Message")
    .addField("`.ping`", "Displays the bot latency info")
    .addField("`.serverinfo`", "Displays information about the server")
    .addField("`.twitch`", "Gives Haydn's Twitch Channel Link")
    .addField("`.twitter`", "Supplies a link to Haydn's Twitch where you can follow him!")
    .addField("`.youtube`", "tells you Haydn's YouTube channel link so you can subscribe to him!");

    let funEmbed = new Discord.RichEmbed()
    .setColor("#303fc9")
    .setTitle("Fun Commands")
    .setDescription("These are commands just for fun!")
    .addField("`.8ball {question}`", "Ask the bot a question and it will give you an answer")
    .addField("`.dog`", "Sends a randomised photo of a CUTE LIL DOGGO!")
    .addField("`.dsearch {word}`", "Do some searching in the dictionary for a word!")
    .addField("`.poll {question}`", "Creates a poll in the channel the command is ran in!")
    .addField("`.cat`", "Sends a randomised photo of a CUTE LIL PUSSY! (cat)");
  
    let botownerEmbed = new Discord.RichEmbed()
    .setColor("#303fc9")
    .setTitle("Bot Owner Commands")
    .setDescription("these commands can only be used by the Bot Owner (Stentorian#1202)")
    .addField("`.checkinvite`", "Check whether any members have a Discord invite in their playing status on the server the command is ran in")
    .addField("`.reload`", "Reload bot")
    .addField("`.eval {code}`", "Some secret shit that could expose the bot.");
    
    //delete command message
    message.delete().catch();

    //send list of categories
    if(!args[0]) return message.channel.send(categoriesEmbed);

    //checks for specified help menu
    if(args[0] === "mod") return message.channel.send(modEmbed);
    if(args[0] === "general") return message.channel.send(generalEmbed);
    if(args[0] === "fun") return message.channel.send(funEmbed);
    if(args[0] === "botowner") return message.channel.send(botownerEmbed);

    //send list of categories again
    if(!args[0]) return message.channel.send(categoriesEmbed);
    
  }

  module.exports.help = {
    name: "help"
  }
