import { SlashCommandBuilder } from '@discordjs/builders';
import * as Punishment from '../../Main/Models/punishment.js';

export default {
  data: new SlashCommandBuilder()
    .setName('sync').setDescription('Checks all guilds for configs and creates if they\'re outdated or missing.'),
  category: 'botowner',
  usage: '',
  example: '',
  options: { permission: 'BOTOWNER', enabled: true, guildOnly: true },
  run: async (bot, interaction) => {

    //Permission Check
    if (interaction.user.id !== bot.settings.ids.botOwner) {
      return;
    }

    let amountSynced = 0;
    let punishmentSynced = 0;
    let syncedServers;
    let syncedPunishments;

    //Loop through all guilds for server root
    await Promise.all(bot.guilds.cache.map(async (g) => {

      //Objects to save
      let guildData = {
        info: {
          id: g.id,
          name: g.name,
          owner_id: g.ownerId,
          blacklisted: false
        },
        gatekeeper: {
          welcome_enabled: false,
          welcome_channel: '0',
          welcome_message: 'Welcome {user} to {server}',
          leave_enabled: false,
          leave_channel: '0',
          leave_message: 'Goodbye {user} from {server}'
        },
        userjoin: {
          enabled: false,
          role: '0',
          nickname: 'None'
        },
        moderation: {
          staff_role: '0',
          link_block: false,
          filter: [],
          mute_role: ''
        },
        logging: {
          enabled: false,
          channel: '0',
          level: 'medium',
          ignore: []
        },
        tickets: {
          enabled: false,
          message: '**User:** {user}\n**Reason:** {reason}'
        }
      };
  
      let punishmentData = {
        guildId: g.id,
        bans: [],
        kicks: [],
        mutes: [],
        tempmutes: [],
        warns: []
      };

      //Guild Config
      //Check if guild config exist
      var config = await bot.mutils.getGuildById(g.id);
      if (!config) {

        //Create config
        await bot.mutils.createGuild(guildData);

        bot.log.post('info', `Synced guild ${g.name} | ${g.id}`);
        syncedServers += `\n${g.name} | ${g.id}`;

        //Counter
        amountSynced++;

      }

      //Punishments
      var punishments = await Punishment.findOne({ guildId: g.id });
      if (!punishments) {

        //Create config
        punishments = new Punishment(punishmentData);
        await punishments.save();

        bot.log.post('info', `Synced guild (punishment) ${g.name} | ${g.id}`);
        syncedPunishments += `\n${g.name} | ${g.id}`;

        punishmentSynced++;

      }


    }));

    //Round up the goodies
    bot.log.post('info', `${amountSynced} server(s) have been guild config synced and ${punishmentSynced} have punishment objects.`);
    bot.createEmbed('success', `**${amountSynced}** server(s) have been guild config synced and **${punishmentSynced}** server(s) now have punishment objects.`, `\`\`\`${syncedServers}\`\`\`\n\`\`\`${syncedPunishments}\`\`\``, [], `${interaction.guild.name}`, interaction)
      .then((embed) => interaction.reply(embed))
      .catch((error) => bot.log.post('error', error));

  }
};