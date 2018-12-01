const discord = require ("discord.js");

exports.run = async (bot, msg, args) => {

    let sa = require ("superagent");

    let {body} = await sa
    .get(`https://icanhazdadjoke.com/slack`);

    let dadjokeEmbed = new discord.RichEmbed()
        .setColor("GREEN")
        .setDescription("**" + body.attachments.map(a => a.text) + "**")

    msg.channel.send(dadjokeEmbed);
	
}

module.exports.help = {
    name: "dadjoke"
  }
  