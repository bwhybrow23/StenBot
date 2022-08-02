const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mcping').setDescription('Ping a Minecraft server to find out more information about it')
    .addStringOption(option => option.setName('server').setDescription('The server to ping.').setRequired(true)),
  category: 'fun',
  usage: '<SERVER IP>[:PORT]',
  example: 'play.hypixel.net',
  options: { permission: 'EVERYONE', aliases: ['mc'], enabled: true, cooldown: 5, guildOnly: false },
  run: async (bot, interaction) => {

    const Discord = require('discord.js');
    const fetch = require('node-fetch');
    const url = 'https://mcapi.us/server/status?ip=';

    let address = interaction.options.getString('server').split(':');
    let ip = address[0];
    let port;
    if (address[1]) {
      port = address[1];
    }
    let request;

    if (port) {
      request = await fetch(url + ip + `&port=${port}`);
    } else if (!port) {
      request = await fetch(url + ip);
    }

    let res = await request.json();
    if (res.status === 'error' && res.error === 'server timeout') {
      bot.createEmbed('error', '', 'Error! The status couldn\'t be fetched, perhaps an invalid IP or Port.', [], `${interaction.guild.name}`, interaction, true)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
    }

    var players = 0;
    if (res.players.now) {
      players += res.players.now;
    } else {
      players += 0;
    }

    let motd;
    if (!res.motd_json) {
      motd = 'None';
    } else {
      motd = res.motd_json.trim();
    }

    if (res.online) {
      let onlineEmbed = new Discord.EmbedBuilder()
        .setColor(1295876)
        .setTitle('Server Status:')
        .addFields([ { name: 'IP:', value: `${address}`, inline: true }, { name: 'Status:', value: 'Online', inline: true }, { name: 'Player Count:', value: `${players}/${res.players.max}`, inline: true }, { name: 'Server Version:', value: res.server.name, inline: true }, { name: 'MOTD:', value: `\`\`\`${motd}\`\`\``, inline: true } ])
        .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });
      interaction.reply({ embeds: [onlineEmbed.toJSON()] });
    }

    if (!res.online) {
      bot.createEmbed('error', 'Server Status:', '', [{
        name: 'IP',
        value: `${ip}`
      }, {
        name: 'Status',
        value: 'Offline'
      }, ], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
    }
  },
};