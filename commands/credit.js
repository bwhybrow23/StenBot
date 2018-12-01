const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  let creditEmbed = new Discord.RichEmbed()
      .setDescription("StenBot Credit")
      .setColor("#a905fc")
      .addField("Founder/Coder", `Stentorian#1202`)
      .addField("Logo Design", `Quēkǒu#9231`)
      .addField("Problem Solver", `dode5656#5324`)
      .addField("Side Man", `๖̶̶̶ۣۣۜۜ͜ζ͜͡Tod™#4797`)

  message.delete().catch(O_o => {});
  message.channel.send(creditEmbed);
}

module.exports.help = {
  name: "credit"
}
