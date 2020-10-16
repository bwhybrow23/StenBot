module.exports = {
  name: "bash",
  category: "botowner",
  description: "Runs a command in a bash terminal from within StenBot.",
  usage: "<COMMAND>",
  example: "apt-get update",
  permission: "BOT OWNER",
  run: async (bot, message, args) => {

    const Discord = require(`discord.js`);
    if (!message.guild) return;

    if (message.author.id !== bot.settings.ids.botOwner) {
      bot.noPermsEmbed(`${message.guild.name}`, bot);
    }

    let cmd = args.join(" ");
    if (!cmd || cmd == undefined || args[0] == "help") {
      return bot.helpEmbed("bash", bot)
      .then((embed) => message.channel.send(embed))
      .catch((error) => bot.logger("error", error));
    }

    const exec = require("child_process").exec;
    var StartTime = Date.now();
    let msg = await message.channel.send("Getting results...");
    exec(cmd, {}, (error, stdout) => {
      var Embed = new Discord.MessageEmbed();
      if (!stdout) {
        return stdout = "None"
      }
      Embed.setTitle("Bash Results")
        .addField("Input", '```' + args.join(" ") + '```')
        .addField("ExecTime", Date.now() - StartTime + "ms", true)
        .addField("Errors", error ? error : "None", true)
        .addField("Output", '```' + stdout + '```')
        .setFooter(`${message.guild.name}`, 'https://i.imgur.com/BkZY6H8.png')
        .setTimestamp();
      msg.edit(Embed);
    });
  },
};
