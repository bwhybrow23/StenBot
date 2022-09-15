const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tadd').setDescription('Add a user to an ongoing ticket.')
    .addUserOption(option => option.setName('user').setDescription('The user to add to the ticket.').setRequired(true)),
  category: 'ticketing',
  usage: '<@USER>',
  example: '@Lana#1505',
  options: { permission: 'EVERYONE', enabled: true, guildOnly: true },
  run: async (bot, interaction) => {

    const Discord = require('discord.js');

    const config = await bot.mutils.getGuildById(interaction.guild.id);

    function errsend(msg) {

      let errEmbed = new Discord.EmbedBuilder()
        .setColor(bot.settings.color.red)
        .setDescription(`Error! ${msg}`)
        .setTimestamp()
        .setFooter({ text: `${interaction.guild.name}`, icon_url: 'https://i.imgur.com/klY5xCe.png' });

      interaction.reply({ embeds: [errEmbed] });

    }

    //Check if tickets are enabled
    if (!config.tickets.enabled === true) {
      return errsend('Tickets are not enabled in the servers config.');
    }

    //Check if staff role is valid or set
    if (config.moderation.staff_role) {
      if (interaction.guild.roles.cache.get(config.moderation.staff_role === undefined)) {
        return errsend('The staff role set is no longer valid.');
      }
    } else {
      return errsend('A staff role is not set in the servers config.');
    }

    //if channel is in ticket cat
    if (interaction.channel.parent.name !== 'Tickets') {
      return errsend('The channel is not in the tickets category.');
    }

    //add user
    let toBeAdded = interaction.options.getUser('user');
    try {
      interaction.channel.permissionOverwrites.create(toBeAdded.id, {
        SendMessages: true,
        ViewChannel: true
      }, { reason: 'Adding user to ticket' });
    } catch (e) {
      errsend('Error in adding this user. Please check the console.');
      bot.log.post('error', e);
    }

    let embed = new Discord.EmbedBuilder()
      .setColor(bot.settings.color.green)
      .setDescription(`The user **${toBeAdded.tag}** has been added to the ticket.`)
      .setAuthor(interaction.guild, 'https://i.imgur.com/klY5xCe.png')
      .setTimestamp();

    interaction.reply({ embeds: [embed.toJSON()] });
  },
};