module.exports = {
  name: "haveibeenpwned",
  category: "fun",
  description:
    "Use HaveIBeenPwned.com's API to check if your email and passwords have been leaked.",
  usage: "sb!haveibeenpwned steve@doe.com",
  permission: "EVERYONE",
  run: async (bot, message, args) => {
    const Discord = require("discord.js");
    const superagent = require("superagent");

    let helpE = new Discord.RichEmbed()
      .setColor(bot.settings.color.blue)
      .setTitle("Command: Haveibeenpwned")
      .addField(
        "Description:",
        "Check with secure servers at [haveibeenpwned.com](https://haveibeenpwned.com) to see if your email has been leaked.",
        true
      )
      .addField("Usage", "`sb!haveibeenpwned <email>`", true)
      .addField("Example", "`sb!haveibeenpwned info@benwhybrow.com`")
      .setFooter(message.author.tag, message.author.avatarURL)
      .setTimestamp();

    if (!args[0]) return message.channel.send(helpE);

    await message.delete(300);
    let { body } = await superagent
      .get(`https://haveibeenpwned.com/api/v2/breachedaccount/${args[0]}`)
      .catch((err) => {
        message.author.send(`Phew.. no results found for \`\`${args[0]}\`\``);
      });

    let out = `Oh NO! breaches found for: ${args[0]}`;
    let po = 0;
    const format = body.forEach((i) => {
      po++;
      out += `\n${po}.   ${i.Name}   breached on:   ${i.BreachDate}`;
    });
    message.author.send(out);
  },
};
