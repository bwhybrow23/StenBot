const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('invitelist').setDescription('Get a list of all the invites in the Discord server.'),
  category: 'general',
  usage: '',
  example: '',
  options: { permission: 'EVERYONE', enabled: true, guildOnly: true },
  run: async (bot, interaction) => {

    const Discord = require('discord.js');

    let invites = await interaction.guild.invites.fetch().catch(() => {
      return interaction.reply({ content: 'Sorry, I don\'t have the proper permissions to view invites!', ephemeral: true });
    });

    let possibleinvites = [];
    if (!invites) {
      possibleinvites.push('No invites!');
    } else {
      invites.forEach(function(invite) {
        if (!invite.inviter) return;
        possibleinvites.push(`${invite.code} || ${(invite.inviter.username) + '#' + (invite.inviter.discriminator)} ||  ${invite.uses} uses`);
      });
    }

    const lbEmbed = new Discord.MessageEmbed()
      .setTitle('**INVITE LIST**')
      .setColor(bot.settings.color.yellow)
      .addField('Invites', `\`\`\`${possibleinvites.join('\n')}\`\`\``)
      .setFooter({ text: `${interaction.guild.name}`, iconURL: 'https://i.imgur.com/klY5xCe.png' });

    interaction.reply({ embeds: [lbEmbed.toJSON()] });
  },
};