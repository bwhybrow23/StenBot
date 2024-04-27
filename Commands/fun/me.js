import { SlashCommandBuilder } from '@discordjs/builders';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('me').setDescription('Find out some information the bot knows about you or another person.')
    .addUserOption(option => option.setName('user').setDescription('The user to check the information of.')),
  category: 'fun',
  usage: '[@USER]',
  example: '@Danny#7013',
  options: { permission: 'EVERYONE', aliases: ['user', 'whois'], enabled: true, guildOnly: true },
  run: async (bot, interaction) => {

    import Discord from 'discord.js';

    let member, user;
    if (interaction.options.getUser('user')) {
      member = await interaction.guild.members.fetch({ user: interaction.options.getUser('user').id, force: true });
      user = await (bot.users.fetch(interaction.options.getUser('user').id, true, true));
    } else {
      member = interaction.member;
      user = interaction.user;
    }

    let userStatus;
    if (!member.guild.presences.status) userStatus = 'N/A';
    switch (member.presence.status) {
    case 'dnd':
      userStatus = 'Do Not Disturb';
      break;
    case 'online':
      userStatus = 'Online';
      break;
    case 'idle':
      userStatus = 'Idle';
      break;
    case 'offline':
      userStatus = 'Offline';
      break;
    default:
      userStatus = member.presence.status;
      break;
    }

    let activities = [];
    member.presence.activities.forEach(activity => {
      if (activity.type === 'CUSTOM') {
        if (!activity.emoji) {
          activities.push(`:speech_balloon: \`${activity.state}\``);
        } else if (!activity.state) {
          activities.push(`:speech_balloon: \`${activity.emoji}\``);
        } else {
          activities.push(`:speech_balloon: \`${activity.emoji} ${activity.state}\``);
        }
      } else if (activity.type === 'PLAYING') {
        activities.push(`:video_game: \`${activity.name}\``);
      } else if (activity.type === 'LISTENING') {
        if (activity.name != 'Spotify') return;
        activities.push(`:musical_note: \`${activity.details} - ${activity.state}\``);
      } else {
        activities.push('Not playing');
      }
    });
    if (!activities[0]) {
      activities.push('Not playing');
    }

    let roles = member.roles.cache.filter(r => r.id !== interaction.guild.id).map(roles => `\`${roles.name}\``).join(' **|** ');

    let meEmbed = new Discord.EmbedBuilder()
      .setThumbnail(user.displayAvatarURL())
      .setColor(14672927)
      .addFields([ { name: 'Full Username', value: user.tag, inline: true}, { name: 'ID', value: user.id, inline: true}, { name: 'Nickname', value: member.nickname !== null ? `Nickname: ${member.nickname}` : 'None', inline: true}, { name: 'Roles', value: `${roles.length} in total.`, inline: true}, { name: 'Account Created', value: user.createdAt.toDateString(), inline: true}, { name: 'Joined Guild', value: member.joinedAt.toDateString(), inline: true}, { name: 'Status', value: userStatus, inline: true}, { name: 'Activities', value: activities.join('\n'), inline: true} ])
      .setFooter({ text: `Information about ${user.username}` })
      .setTimestamp();

    interaction.reply({ embeds: [meEmbed.toJSON()] });

  }
};