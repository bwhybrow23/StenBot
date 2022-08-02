const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info').setDescription('Find out about all information related to the bot\'s connection to Discord.'),
  category: 'bot',
  usage: '',
  example: '',
  options: { permission: 'EVERYONE', aliases: ['ping', 'status', 'stats', 'uptime'], enabled: true, cooldown: 10, guildOnly: false },
  run: async (bot, interaction) => {

    const Discord = require('discord.js');
    const fs = require('fs');

    const memusage = JSON.parse(fs.readFileSync('./Data/Global/bot-data.json', 'utf8'));
    const packageJSON = require('../../package.json');

    let ping = Math.floor(bot.ws.ping);
    let memUsed = Math.floor(memusage.info.memoryUsage);
    let uptime = new Date(process.uptime() * 1000).toISOString().substr(11, 8);
    let totalGuilds = bot.guilds.cache.size;
    let totalMembers = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
    let totalCommands = require('../../Data/Global/bot-data.json').stats.commands.total;

    let embed = new Discord.EmbedBuilder()
      .setColor(4886754)
      .setTitle('StenBot Info')
      .setThumbnail(bot.user.avatarURL())
      .setDescription('Here you can find all information about StenBot!')
      .addFields([ { name: '\u200b', value: '**Connection Info:**', inline: false }, { name: 'Ping:', value: `${ping.toString()}ms`, inline: true }, { name: 'Memory Usage:', value: `${memUsed.toString()}MB`, inline: true }, { name: 'Uptime:', value: `${uptime}s`, inline: true }, { name: '\u200b', value: '**Bot Stats:**', inline: false }, { name: 'Total Guilds:', value: totalGuilds.toString(), inline: true }, { name: 'Total Members:', value: totalMembers.toString(), inline: true }, { name: 'Total Commands:', value: totalCommands.toString(), inline: true }, { name: 'Version:', value: packageJSON.version.toString(), inline: true } ])
      .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() });

    return interaction.reply({ embeds: [embed.toJSON()] });

  }
};