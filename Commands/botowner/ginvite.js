import { SlashCommandBuilder } from '@discordjs/builders';

export default {
  data: new SlashCommandBuilder()
    .setName('ginvite').setDescription('Get an invite to a guild the bot is in.')
    .addStringOption(option => option.setName('guild').setDescription('The guild to get an invite to').setRequired(true)),
  category: 'botowner',
  usage: '<SERVER ID>',
  example: '712815477344305262',
  options: { permission: 'BOTOWNER', enabled: true, guildOnly: true },
  run: async (bot, interaction) => {

    //Permission Check
    if (interaction.user.id !== bot.settings.ids.botOwner) {
      return;
    }

    let guildid = interaction.options.getString('guild');
    let guild = bot.guilds.cache.get(guildid);
    if (!guild) {
      return bot.createEmbed('error', '', 'Error! The bot isn\'t in a guild with that ID.', [], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply(embed))
        .catch((error) => bot.log.post('error', error));
    }

    let invitechannels = guild.channels.cache.filter((channel) =>
      channel.permissionsFor(bot.application.id).has('CREATE_INSTANT_INVITE')
    );

    if (!invitechannels) {
      return bot.createEmbed('error', '', 'Error! I don\'t have permission to create an invite in that guild.', [], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply(embed))
        .catch((error) => bot.log.post('error', error));
    }

    invitechannels.random().createInvite()
      .then((invite) =>
        interaction.reply({ content: `Server name: **${guild.name}**\nInvite: https://discord.gg/${invite.code}`, flags: MessageFlags.Ephemeral })
      );
  },
};