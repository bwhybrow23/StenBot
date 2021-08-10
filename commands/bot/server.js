module.exports = {
  name: "server",
  category: "bot",
  description: "Gather information about a specific server (or the server the command is ran in)",
  usage: "[SERVER ID]",
  example: "455782308293771264",
  options: { permission: "EVERYONE", aliases: ["server-info", "serverinfo"], enabled: true, guildOnly: true },
  run: async (bot, message, args) => {

    const Discord = require("discord.js");

    let guild, id;
    if(!args[0]) {
      guild = message.guild;
    } else {
      try {
        id = parseInt(args[0]);
      } catch (e) {
        bot.log.post("error", e);
      }
      if(!id) {
        return bot.createEmbed("error", "", "Specified server ID is invalid. Please make sure that it is a valid server ID.", [], message.author.tag, message)
          .then((embed) => message.reply(embed));
      }
      try { 
        guild = await bot.guilds.fetch(args[0], true, true);
      }
      catch (e) {
        return bot.createEmbed("error", "", "Specified server cannot be found. Please make sure the bot is in the server.", [], message.author.tag, message)
          .then((embed) => message.reply(embed));
      }
    }

    //Fetch members
    guild.members.fetch();

    let txtChannelCount = 0;
    let vcChannelChannel = 0;
    guild.channels.cache.forEach(channel => {
      if (channel.type == "GUILD_TEXT") return txtChannelCount++;
      if (channel.type == "GUILD_VOICE" || "GUILD_STAGE_VOICE") return vcChannelChannel++;
    });

    let embed = new Discord.MessageEmbed()
      .setColor(bot.settings.color.blue)
      .setThumbnail(guild.iconURL())
      .addField(`Name:`, `${guild.name}`, true)
      .addField(`Owner:`, `${bot.users.cache.get(guild.ownerId).tag}`, true)
      .addField(`ID:`, `${guild.id}`, true)
      .addField(`Text Channels:`, `${txtChannelCount}`, true)
      .addField(`Voice Channels:`, `${vcChannelChannel}`, true)
      .addField(`Roles:`, `${guild.roles.cache.size}`, true)
      .addField(`Member Count:`, `${guild.memberCount}`, true)
      .addField(`Bot Count:`, `${guild.members.cache.filter(member => member.user.bot).size}`, true)
      .setFooter(`Created`)
      .setTimestamp(guild.createdAt);

    message.channel.send({ embeds: [embed.toJSON()]});

    

  }
};