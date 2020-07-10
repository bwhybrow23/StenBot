module.exports = {
  name: "bash",
  category: "bot",
  description: "Runs a command in a bash terminal from within StenBot.",
  usage: "sb!bash <COMMAND>",
  permission: "BOT OWNER",
  run: async (bot, message, args) => {
    const Discord = require(`discord.js`);

    if (message.author.id !== bot.settings.ids.botOwner) {
      bot.noPermsEmbed(`${message.guild.name}`, bot);
    }
    const exec = require("child_process").exec;
    var StartTime = Date.now();
    let msg = await message.channel.send("Getting results...");
    exec(args.join(" "), {}, (error, stdout, stderr) => {
      var Embed = new Discord.RichEmbed();
      Embed.setTitle("Bash Results")
        .addField("Input", args.join(" "), true)
        .addField("ExecTime", Date.now() - StartTime + "ms", true)
        .addField("Errors", error ? error : "None", true)
        .addField("stdout", stdout ? stdout : "None")
        .addField("stderr", stderr ? stderr : "None")
        .setFooter(`Bash Command`, bot.user.displayURL)
        .setTimestamp();
      msg.edit(Embed);
    });
  },
};
