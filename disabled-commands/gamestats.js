module.exports = {
  name: "gamestats",
  category: "fun",
  description: "Find out information about a player on a certain game.",
  usage: "sb!gamestats <GAME> <PLATFORM> <NAME>",
  permission: "EVERYONE",
  run: async (bot, message, args) => {
    const Discord = require("discord.js");
    const Fortnite = require("fortnite");
    const ft = new Fortnite(bot.settings.connections.fortniteToken);

    let game = args[0];
    //Check if the user has given a game or no
    switch (game) {
      default:
      case "help":
        let helpEmbed = new Discord.MessageEmbed()
          .setTitle("Help: Action")
          .setDescription(`Below are all the gamestats commands you can use.`)
          .setColor(bot.settings.color.blue)
          .addField(
            "`sb!gamestats fortnite {pc | xbl | psn} {IN-GAME NAME}`",
            "Get Fortnite Stats per Platform"
          )
          .setFooter(message.author.tag, message.author.avatarURL);

        message.channel.send(helpEmbed);
        break;
      case "fortnite":
        let platform = args[1] || "pc";
        let user = args[2];
        let data = await ft.user(user, platform);

        let embed = new Discord.MessageEmbed()
          .setColor(bot.settings.color.blue)
          .setTitle("Fortnite Stats")
          .setDescription(`You can find all of your stats [here](${data.url})`)
          .addField("Username", data.username, true)
          .addField("Platform", data.platform, true)
          .addBlankField(true)
          .addField("Solo Wins", data.stats.solo.wins, true)
          .addField("Solo Kills", data.stats.solo.kills, true)
          .addField("Solo KD", data.stats.solo.kd, true)
          .addField("Duos Wins", data.stats.duo.wins, true)
          .addField("Duo Kills", data.stats.duo.kills, true)
          .addField("Duo KD", data.stats.duo.kd, true)
          .addField("Squad Wins", data.stats.squad.wins, true)
          .addField("Squad Kills", data.stats.squad.kills, true)
          .addField("Squad KD", data.stats.squad.kd, true)
          .setFooter(message.author.tag, message.author.avatarURL);

        message.channel.send(embed);
        break;
    }
  },
};
