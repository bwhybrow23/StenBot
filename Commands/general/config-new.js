/* eslint-disable no-case-declarations */
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder  } from 'discord.js';
import { PermissionFlagsBits } from 'discord-api-types/v10';
// import format from 'string-template';
// import defaultConfig from '../../Data/Global/defaultConfig.js';

export default {
  data: new SlashCommandBuilder()
    .setName('config').setDescription('Configure the server settings for StenBot.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  category: 'general',
  usage: '',
  example: '',
  options: { permission: 'EVERYONE', enabled: false, cooldown: 5, guildOnly: true },
  run: async (bot, interaction) => {

    if (interaction.member.permissions.has('ADMINISTRATOR') === false) {
      return bot.noPermsEmbed(`${interaction.guild.name}`, bot)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
    }

    // //Find config or create if one doesn't exist
    // let config = await bot.mutils.getGuildById(interaction.guild.id);
    // if(!config) async() => {
    //   defaultConfig.info.id = interaction.guild.id;
    //   defaultConfig.info.name = interaction.guild.name;
    //   defaultConfig.info.owner_id = interaction.guild.ownerId;
    //   await bot.mutils.createGuild(defaultConfig);
    // };

    //Get server name
    let servertag = interaction.guild.name;

    // //View config
    // //Welcomer channel? Default = undefined
    // let welcomerchannel = config.gatekeeper.welcome_channel;
    // if (welcomerchannel === 0) {
    //   welcomerchannel = 'Not Set';
    // } else {
    //   welcomerchannel = `<#${welcomerchannel}>`;
    // }
    // //Leave Channel? Default = undefined
    // let leavechannel = config.gatekeeper.leave_channel;
    // if (leavechannel === 0) {
    //   leavechannel = 'Not Set';
    // } else {
    //   leavechannel = `<#${leavechannel}>`;
    // }
    // //User on-join role default 0
    // let userjoinrole = config.userjoin.role;
    // if (userjoinrole === 0) {
    //   userjoinrole = 'Not Set';
    // } else {
    //   userjoinrole = `<@&${userjoinrole}>`;
    // }
    // //User onjoin set nick default undefined
    // let userjoinnick = config.userjoin.nickname;
    // if (userjoinnick === 0) {
    //   userjoinnick = 'Not Set';
    // }
    // //Staff role default false
    // let staffrole = config.moderation.staff_role;
    // if (staffrole === '0') {
    //   staffrole = 'Not Set';
    // } else {
    //   staffrole = `<@&${staffrole}>`;
    // }
    // //word filter by default is empty
    // let stafffilter = config.moderation.filter;
    // let stafffilter1 = [];
    // if (stafffilter.length === 0) {
    //   stafffilter1.push('Empty');
    // } else {
    //   stafffilter.forEach(word => {
    //     stafffilter1.push(`${word} `);
    //   });
    // }
    // //Logging channel by default is 0
    // let logchannel = config.logging.channel;
    // if (logchannel === 0) {
    //   logchannel = 'Not Set';
    // } else {
    //   logchannel = `<#${logchannel}>`;
    // }
    // let loggingignore = config.logging.ignore;
    // let loggingignore1 = [];
    // if (loggingignore.length === 0) {
    //   loggingignore1.push('Empty');
    // } else {
    //   loggingignore.forEach(id => {
    //     loggingignore1.push(`<#${id}> `);
    //   });
    // }
    // //Ticket message by default is undefined
    // let ticketmessage = config.tickets.message;
    // if (ticketmessage === 0) {
    //   ticketmessage = 'Default';
    // }
    // //Embed
    // bot.createEmbed('warning', `${servertag} Configuration`, 'Your Configuration', [{
    //   name: 'Gatekeeper Welcomer',
    //   value: `Enabled: **${config.gatekeeper.welcome_enabled ? 'Yes' : 'No'} **\nWelcomer Channel: **${welcomerchannel}**\nWelcomer Message: \`\`\`${config.gatekeeper.welcome_message}\`\`\``,
    // }, {
    //   name: 'Gatekeeper Leave',
    //   value: `Enabled: **${config.gatekeeper.leave_enabled ? 'Yes' : 'No'} **\nLeave Channel: **${leavechannel}**\nLeave Message: \`\`\`${config.gatekeeper.leave_message}\`\`\``,
    // }, {
    //   name: 'User Join',
    //   value: `Enabled: **${config.userjoin.enabled ? 'Yes' : 'No'}**\nAdd Role: **${userjoinrole}**\nSet Nick: **${userjoinnick}**`,
    // }, {
    //   name: 'Moderation',
    //   value: `Staff Role: **${staffrole}**\nLink Blocker: **${config.moderation.link_block ? 'Enabled' : 'Disabled'}**\nWord Filter: **${stafffilter1}**`,
    // }, {
    //   name: 'Logging',
    //   value: `Enabled: **${config.logging.enabled ? 'Yes' : 'No'}**\nLogging Channel: **${logchannel}**\nLevel: **${config.logging.level}**\nIgnore List: **${loggingignore1}**`,
    // }, {
    //   name: 'Tickets',
    //   value: `Enabled: **${config.tickets.enabled ? 'Yes' : 'No'}**\nTicket Message: \`\`\`${ticketmessage}\`\`\``,
    // }, ], `${interaction.guild.name}`, interaction)
      // .then((embed) => interaction.reply({ embeds: embed }))
      // .catch((error) => bot.log.post('error', error));

    //Embed
    bot.createEmbed('warning', `${servertag} Configuration`, 'Using the below menu, you can configure the settings for StenBot to tailor to your server\'s needs.', [{
      name: 'Gatekeeper',
      value: 'Configure the welcome and leave messages for your server.'
    }, {
      name: 'User Join',
      value: 'Configure the role and nickname settings for new users.'
    }, {
      name: 'Moderation',
      value: 'Configure the moderation settings - staff role, link blocker, word filter, etc.'
    }, {
      name: 'Logging',
      value: 'Configure the logging settings - level, channels, etc.'
    }, {
      name: 'Tickets',
      value: 'Configure and setup the ticket settings.'
    }, ], `${interaction.guild.name}`, interaction)

    let embed = new EmbedBuilder()
      .setColor(bot.settings.color.yellow)
      .setTitle(`${servertag} Configuration`)
      .setDescription('Using the below menu, you can configure the settings for StenBot to tailor to your server\'s needs.')
      .setThumbnail(bot.user.avatarURL())
      .setFooter({
        text: `${servertag}`,
        iconURL: interaction.guild.iconURL(),
      })
      .setTimestamp()
      .addFields([
        { name: 'Gatekeeper', value: 'Configure the welcome and leave messages for your server.' },
        { name: 'User Join', value: 'Configure the role and nickname settings for new users.' },
        { name: 'Moderation', value: 'Configure the moderation settings - staff role, link blocker, word filter, etc.' },
        { name: 'Logging', value: 'Configure the logging settings - level, channels, etc.' },
        { name: 'Tickets', value: 'Configure and setup the ticket settings.' },
      ]);

    let row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('config_gatekeeper')
          .setLabel('Gatekeeper')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('config_userjoin')
          .setLabel('User Join')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('config_moderation')
          .setLabel('Moderation')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('config_logging')
          .setLabel('Logging')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('config_tickets')
          .setLabel('Tickets')
          .setStyle(ButtonStyle.Primary),
      );
    
    interaction.reply({ embeds: [embed], components: [row], flags: MessageFlags.Ephemeral })
      .catch((error) => bot.log.post('error', error));

  },
};