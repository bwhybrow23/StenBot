const Discord = require("discord.js")
const superagent = require("superagent")

module.exports.run = async (bot, message, args) => {

   let {
      body
  } = await superagent
     .get(`http://aws.random.cat/meow`);

  const catEmbed = new Discord.RichEmbed()
    .setTitle('Aww... Kitty!')
    .setColor("#ff9900")
    .setImage(body.file)

message.channel.send(catEmbed);

}

module.exports.help = {
  name: "cat"
}
