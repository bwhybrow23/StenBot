/* eslint-disable no-case-declarations */
import { SlashCommandBuilder } from '@discordjs/builders';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('blacklist').setDescription('Blacklist a server or user from StenBot')
    .addSubcommand(subcommand => subcommand.setName('server').setDescription('Blacklist a server from StenBot')
      .addStringOption(option => option.setName('server').setDescription('The server to blacklist').setRequired(true))
      .addStringOption(option => option.setName('reason').setDescription('The reason for blacklisting the server'))
    )
    .addSubcommand(subcommand => subcommand.setName('user').setDescription('Blacklist a user from StenBot')
      .addUserOption(option => option.setName('user').setDescription('The user to blacklist').setRequired(true))
      .addStringOption(option => option.setName('reason').setDescription('The reason for blacklisting the server'))
    ),
  category: 'botowner',
  usage: '<SERVER|USER> <SERVER ID|@USER> <REASON>',
  example: 'user @Dave#1230 Abuse',
  options: { permission: 'BOTOWNER', enabled: true, guildOnly: true },
  run: async (bot, interaction) => {
  
    //Permission Check
    if (interaction.user.id !== bot.settings.ids.botOwner) {
      return;
    }
  
    var subcommand = interaction.options.getSubcommand();
  
    switch (subcommand) {
    case 'server':
      var targetserver = interaction.options.getString('server');
  
      if (targetserver === '455782308293771264') {
        return bot.createEmbed('error', '', 'Error! You do not have permission to blacklist the bot\'s main guild.', [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply(embed))
          .catch((error) => bot.log.post('error', error));
      }
  
      var reason = interaction.options.getString('reason');
      if (!reason || reason == null) {
        reason = 'N/A';
      }
  
      //Attempt to read the server's config
      try {
        var targetserverfile = await bot.mutils.getGuildById(interaction.guild.id);
      } catch (err) {
        return bot.createEmbed('error', '', 'Error! I cannot find the server for the ID you provided.', [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply(embed))
          .catch((error) => bot.log.post('error', error));
      }
  
      //Get the target guilds guild object
      const targetguild = bot.guilds.cache.get(targetserver);
      if (!targetguild) {
        return interaction.reply({ content: 'Error! The bot isn\'t in a guild with that ID.', ephemeral: true });
      }
  
      //Blacklist server
      await bot.mutils.updateGuildById(targetserverfile, {
        info: {
          blacklisted: true
        }
      }).then(async () => {
  
        //Black list success interaction
        await bot.createEmbed('success', '', `Success!\nServer: **${targetguild.name} | ${targetguild.id}** has been blacklisted.`, [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply(embed))
          .catch((error) => bot.log.post('error', error));
  
        //Log interaction
        await bot.createEmbed('warning', '', `Server **${targetguild.name} | ${targetguild.id}** has been blacklisted by **${interaction.author.tag}** with the reason of **${reason}**`, [], `${interaction.guild.name}`, interaction)
          .then((embed) => bot.guilds.cache.get('455782308293771264').channels.cache.get('565273737201713153').send(embed))
          .catch((error) => bot.log.post('error', error));
  
        //DM Guild Owner
        await bot.createEmbed('error', '', `I'm afraid that your server **${targetguild.name}** has been blacklisted from StenBot for the reason **${reason}**. If you believe this is an error, please contact **Stentorian#6969** or join the **[Discord](https://discord.benwhybrow.com)**.`, [], `${interaction.guild.name}`, interaction)
          .then((embed) => targetguild.owner.send(embed))
          .catch((error) => bot.log.post('error', error));
  
        //Leave the blacklisted guild
        targetguild.leave();
      });
  
      break;
  
    case 'user':
  
      //Get user and reason and check them
      var targetuser = interaction.getUserOption('user');

      // eslint-disable-next-line no-redeclare
      var reason = interaction.options.getString('reason');
      if (!reason || reason == null) {
        reason = 'N/A';
      }
  
      //Check if Ben
      if (targetuser === '346246641595973633') return interaction.reply('You can\'t blacklist Ben, you dumbass.');
  
      //Modify database
      await bot.mutils.blacklistUser({
        user_id: targetuser.id,
        reason: reason,
        blacklisted: true
      }).then(async () => {
        //Black list success interaction
        await bot.createEmbed('success', '', `Success!\nUser: **${targetuser.tag} | ${targetuser.id}** has been blacklisted.`, [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply(embed))
          .catch((error) => bot.log.post('error', error));
  
        //Log interaction
        await bot.createEmbed('warning', '', `User **${targetuser.tag} | ${targetuser.id}** has been blacklisted by **${interaction.author.tag}** with the reason of **${reason}**`, [], `${interaction.guild.name}`, interaction)
          .then((embed) => bot.guilds.cache.get('455782308293771264').channels.cache.get('565273737201713153').send(embed))
          .catch((error) => bot.log.post('error', error));
  
        //DM Guild Owner
        await bot.createEmbed('error', '', `I'm afraid that you have been blacklisted from using StenBot for the reason **${reason}**. If you believe this is an error, please contact **Stentorian#6969** or join the **[Discord](https://discord.benwhybrow.com)**.`, [], `${interaction.guild.name}`, interaction)
          .then((embed) => {
            try {
              targetuser.send(embed);
            } catch (e) {
              return;
            }
          })
          .catch((error) => bot.log.post('error', error));
      });
  
  
      break;
  
    default:
      break;
    }
  
  
  }
};