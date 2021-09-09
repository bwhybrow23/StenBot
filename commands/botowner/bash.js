module.exports = {
  name: "bash",
  category: "botowner",
  description: "Runs a command in a bash terminal from within StenBot.",
  usage: "<COMMAND>",
  example: "apt-get update",
  options: { permission: "BOTOWNER", enabled: true, guildOnly: true },
  run: async (bot, message, args) => {

    const Discord = require(`discord.js`);

    //Permission Check
    if (message.author.id !== bot.settings.ids.botOwner) {
      return;
    };

    //Gather args and check them
    let input = args.join(" ");
    if (!input) {
      return message.reply("No input provided");
    }

    //Begin execution of command
    const exec = require("child_process").exec;
    var StartTime = Date.now();
    let msg = await message.channel.send("Getting results...");
    exec(input, {}, (error, stdout) => {
      if (!stdout) {
        return stdout = "None"
      }
      msg.edit({
        embeds: [{
          title: "Bash Results",
          fields: [{
            name: "Input",
            value: '```' + args.join(" ") + '```'
          }, {
            name: "ExecTime",
            value: Date.now() - StartTime + "ms",
            inline: true
          }, {
            name: "Errors",
            value: error ? error : "None",
            inline: true
          }, {
            name: "Output",
            value: '```' + stdout + '```'
          }],
          footer: {
            text: message.guild.name,
            icon_url: "https://i.imgur.com/klY5xCe.png"
          },
          timestamp: Date.now()
        }],
        content: "Output:"
      });

    });
  },
};