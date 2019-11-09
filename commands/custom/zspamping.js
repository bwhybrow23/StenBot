exports.run = (bot, message, args) => {

    const Discord = require("discord.js");

    if(message.author.id !== bot.settings.ids.botOwner) return message.channel.send("Insufficient Permissions");
    if(message.guild.id !== `533345289579266093`) return message.channel.send("Insufficient Permissions");

    // var interval = setInterval (function () {
    //     bot.sendMessage(message.channel, "<@272805134629601280>")
    //   }, 1 * 100); 

    function intervalFunc() {
        message.channel.send("<@272805134629601280>")
      }
      
    setInterval(intervalFunc, 5000);

}