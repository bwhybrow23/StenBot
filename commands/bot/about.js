module.exports = {
  name: "about",
  category: "bot",
  description: "Gives some information about StenBot.",
  usage: "",
  example: "",
  permission: "EVERYONE",
  run: async (bot, message) => {

    const Discord = require("discord.js");
    if (!message.guild) return;

    return bot.createEmbed("info", "Bot Information", "", [{ name: "Bot Name", value: `${bot.user.tag}` }, { name: "Founded By", value: "Ben Whybrow (Stentorian#9524)" }, { name: "Created On", value: `${bot.user.createdAt}` }, { name: "Why was StenBot Created?", value: "It was mainly created to save me from the pain of creating multiple bots for clients. I also don't like some of the features that are included with major Discord bots. It started as a copy and paste bot that i was going to publish \"Open Source\" on Github. Then I recieved some help from a friend called Samb8104 who gave me some old code from a bot he was working on and I was able to add per server configs and cool features that you're seeing today!",}], `${message.guild.name}`, bot)
      .then((embed) => message.channel.send(embed))
      .catch((error) => bot.logger("error", error));
  
  }
};
