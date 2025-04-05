/* eslint-disable no-case-declarations */
import { SlashCommandBuilder } from '@discordjs/builders';
import { PermissionFlagsBits } from 'discord-api-types/v10';
import format from 'string-template';
import defaultConfig from '../../Data/Global/defaultConfig.js';

export default {
  data: new SlashCommandBuilder()
    .setName('config').setDescription('Configure StenBot to your liking!')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand(subcommand => subcommand.setName('view').setDescription('View the current configuration.'))
    .addSubcommandGroup(subcommandGroup => subcommandGroup.setName('welcome').setDescription('Configure the welcome message for new users.')
      .addSubcommand(subcommand => subcommand.setName('enabled').setDescription('Enable or disable the welcome message.')
        .addBooleanOption(option => option.setName('enabled').setDescription('Whether or not to enable the welcome message.').setRequired(true))
      )
      .addSubcommand(subcommand => subcommand.setName('channel').setDescription('Set the channel to send the welcome message to.')
        .addChannelOption(option => option.setName('channel').setDescription('The channel to send the welcome message to.').setRequired(true))
      )
      .addSubcommand(subcommand => subcommand.setName('message').setDescription('Set the welcome message.')
        .addStringOption(option => option.setName('message').setDescription('The welcome message.').setRequired(true))
      )
      .addSubcommand(subcommand => subcommand.setName('placeholders').setDescription('View the placeholders that can be used.'))
      .addSubcommand(subcommand => subcommand.setName('test').setDescription('Test your configuration to see if it works!'))
    )
    .addSubcommandGroup(subcommandGroup => subcommandGroup.setName('leave').setDescription('Configure the leave message for new users.')
      .addSubcommand(subcommand => subcommand.setName('enabled').setDescription('Enable or disable the leave message.')
        .addBooleanOption(option => option.setName('enabled').setDescription('Whether or not to enable the leave message.').setRequired(true))
      )
      .addSubcommand(subcommand => subcommand.setName('channel').setDescription('Set the channel to send the leave message to.')
        .addChannelOption(option => option.setName('channel').setDescription('The channel to send the leave message to.').setRequired(true))
      )
      .addSubcommand(subcommand => subcommand.setName('message').setDescription('Set the leave message.')
        .addStringOption(option => option.setName('message').setDescription('The leave message.').setRequired(true))
      )
      .addSubcommand(subcommand => subcommand.setName('placeholders').setDescription('View the placeholders that can be used.'))
      .addSubcommand(subcommand => subcommand.setName('test').setDescription('Test your configuration to see if it works!'))
    )
    .addSubcommandGroup(subcommandGroup => subcommandGroup.setName('userjoin').setDescription('Configure settings related to a user joining.')
      .addSubcommand(subcommand => subcommand.setName('enabled').setDescription('Enable or disable the user join module.')
        .addBooleanOption(option => option.setName('enabled').setDescription('Whether or not to enable the user join module.').setRequired(true))
      )
      .addSubcommand(subcommand => subcommand.setName('role').setDescription('Set the role to give to a user when they join.')
        .addRoleOption(option => option.setName('role').setDescription('The role to give to a user when they join.').setRequired(true))
      )
      .addSubcommand(subcommand => subcommand.setName('nickname').setDescription('Set the nickname to give to a user when they join.')
        .addStringOption(option => option.setName('nickname').setDescription('The nickname to give to a user when they join.').setRequired(true))
      )
    )
    .addSubcommandGroup(subcommandGroup => subcommandGroup.setName('moderation').setDescription('Configure settings related to server moderation.')
      .addSubcommand(subcommand => subcommand.setName('staff-role').setDescription('Set the role to give to staff members.')
        .addRoleOption(option => option.setName('role').setDescription('The staff member role.').setRequired(true))
      )
      .addSubcommand(subcommand => subcommand.setName('link-blocker').setDescription('Enable/disable the link blocker.')
        .addBooleanOption(option => option.setName('enabled').setDescription('Whether or not to enable the link blocker.').setRequired(true))
      )
      .addSubcommand(subcommand => subcommand.setName('word-filter').setDescription('Configure the word filter.')
        .addStringOption(option => option.setName('action').setDescription('Action for what you want to do to the filter').setRequired(true).addChoices({ name: 'Add', value: 'wordfilter_add' }, { name: 'Remove', value: 'wordfilter_remove' }, { name: 'Clear', value: 'wordfilter_clear' }))
        .addStringOption(option => option.setName('word').setDescription('The word to add/remove from the filter.').setRequired(true))
      )
    )
    .addSubcommandGroup(subcommandGroup => subcommandGroup.setName('logging').setDescription('Configure settings related to logging.')
      .addSubcommand(subcommand => subcommand.setName('enabled').setDescription('Enable or disable logging.')
        .addBooleanOption(option => option.setName('enabled').setDescription('Whether or not to enable logging.').setRequired(true))
      )
      .addSubcommand(subcommand => subcommand.setName('channel').setDescription('Set the channel to send logs to.')
        .addChannelOption(option => option.setName('channel').setDescription('The channel to send logs to.').setRequired(true))
      )
      .addSubcommand(subcommand => subcommand.setName('level').setDescription('Set the logging level.')
        .addStringOption(option => option.setName('level').setDescription('The logging level.').setRequired(true).addChoices({ name: 'Low', value: 'log_low' }, { name: 'Medium', value: 'log_medium' }, { name: 'High', value: 'log_high' }))
      )
      .addSubcommand(subcommand => subcommand.setName('ignore-list').setDescription('Configure the ignore list.')
        .addStringOption(option => option.setName('action').setDescription('Action for what you want to do to the ignore list').setRequired(true).addChoices({ name: 'Add', value: 'ignorelist_add' }, { name: 'Remove', value: 'ignorelist_remove' }, { name: 'Clear', value: 'ignorelist_clear' }))
        .addChannelOption(option => option.setName('channel').setDescription('The channel to add/remove from the ignore list.').setRequired(true))
      )
    )
    .addSubcommandGroup(subcommandGroup => subcommandGroup.setName('tickets').setDescription('Configure settings related to tickets.')
      .addSubcommand(subcommand => subcommand.setName('enabled').setDescription('Enable or disable ticketing.')
        .addBooleanOption(option => option.setName('enabled').setDescription('Whether or not to enable ticketing.').setRequired(true))
      )
      .addSubcommand(subcommand => subcommand.setName('message').setDescription('Set the message that is sent in the channel when a ticket is created.')
        .addStringOption(option => option.setName('message').setDescription('The message that is sent in the channel when a ticket is created.').setRequired(true))
      )
      .addSubcommand(subcommand => subcommand.setName('placeholders').setDescription('View the placeholders that can be used.'))
    ),
  category: 'general',
  usage: '<SUBCOMMAND> <ARGS>',
  example: 'ticketing enable',
  options: { permission: 'EVERYONE', enabled: true, cooldown: 0, guildOnly: true },
  run: async (bot, interaction) => {

    if (interaction.member.permissions.has('ADMINISTRATOR') === false) {
      return bot.noPermsEmbed(`${interaction.guild.name}`, bot)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
    }

    //Find config or create if one doesn't exist
    let config = await bot.mutils.getGuildById(interaction.guild.id);
    if(!config) async() => {
      defaultConfig.info.id = interaction.guild.id;
      defaultConfig.info.name = interaction.guild.name;
      defaultConfig.info.owner_id = interaction.guild.ownerId;
      await bot.mutils.createGuild(defaultConfig);
    };

    //Get server name
    let servertag = interaction.guild.name;

    //View config
    if (!interaction.options.getSubcommand() || interaction.options.getSubcommand() === 'view') {

      //Welcomer channel? Default = undefined
      let welcomerchannel = config.gatekeeper.welcome_channel;
      if (welcomerchannel === 0) {
        welcomerchannel = 'Not Set';
      } else {
        welcomerchannel = `<#${welcomerchannel}>`;
      }
      //Leave Channel? Default = undefined
      let leavechannel = config.gatekeeper.leave_channel;
      if (leavechannel === 0) {
        leavechannel = 'Not Set';
      } else {
        leavechannel = `<#${leavechannel}>`;
      }
      //User on-join role default 0
      let userjoinrole = config.userjoin.role;
      if (userjoinrole === 0) {
        userjoinrole = 'Not Set';
      } else {
        userjoinrole = `<@&${userjoinrole}>`;
      }
      //User onjoin set nick default undefined
      let userjoinnick = config.userjoin.nickname;
      if (userjoinnick === 0) {
        userjoinnick = 'Not Set';
      }
      //Staff role default false
      let staffrole = config.moderation.staff_role;
      if (staffrole === '0') {
        staffrole = 'Not Set';
      } else {
        staffrole = `<@&${staffrole}>`;
      }
      //word filter by default is empty
      let stafffilter = config.moderation.filter;
      let stafffilter1 = [];
      if (stafffilter.length === 0) {
        stafffilter1.push('Empty');
      } else {
        stafffilter.forEach(word => {
          stafffilter1.push(`${word} `);
        });
      }
      //Logging channel by default is 0
      let logchannel = config.logging.channel;
      if (logchannel === 0) {
        logchannel = 'Not Set';
      } else {
        logchannel = `<#${logchannel}>`;
      }
      let loggingignore = config.logging.ignore;
      let loggingignore1 = [];
      if (loggingignore.length === 0) {
        loggingignore1.push('Empty');
      } else {
        loggingignore.forEach(id => {
          loggingignore1.push(`<#${id}> `);
        });
      }
      //Ticket message by default is undefined
      let ticketmessage = config.tickets.message;
      if (ticketmessage === 0) {
        ticketmessage = 'Default';
      }

      //Embed
      return bot.createEmbed('warning', `${servertag} Configuration`, 'Your Configuration', [{
        name: 'Gatekeeper Welcomer',
        value: `Enabled: **${config.gatekeeper.welcome_enabled ? 'Yes' : 'No'} **\nWelcomer Channel: **${welcomerchannel}**\nWelcomer Message: \`\`\`${config.gatekeeper.welcome_message}\`\`\``,
      }, {
        name: 'Gatekeeper Leave',
        value: `Enabled: **${config.gatekeeper.leave_enabled ? 'Yes' : 'No'} **\nLeave Channel: **${leavechannel}**\nLeave Message: \`\`\`${config.gatekeeper.leave_message}\`\`\``,
      }, {
        name: 'User Join',
        value: `Enabled: **${config.userjoin.enabled ? 'Yes' : 'No'}**\nAdd Role: **${userjoinrole}**\nSet Nick: **${userjoinnick}**`,
      }, {
        name: 'Moderation',
        value: `Staff Role: **${staffrole}**\nLink Blocker: **${config.moderation.link_block ? 'Enabled' : 'Disabled'}**\nWord Filter: **${stafffilter1}**`,
      }, {
        name: 'Logging',
        value: `Enabled: **${config.logging.enabled ? 'Yes' : 'No'}**\nLogging Channel: **${logchannel}**\nLevel: **${config.logging.level}**\nIgnore List: **${loggingignore1}**`,
      }, {
        name: 'Tickets',
        value: `Enabled: **${config.tickets.enabled ? 'Yes' : 'No'}**\nTicket Message: \`\`\`${ticketmessage}\`\`\``,
      }, ], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));

    }

    //Grab Args
    let category = interaction.options.getSubcommandGroup();
    let subcommand = interaction.options.getSubcommand();

    switch (category) {
    case 'welcome':

      switch (subcommand) {

      case 'enabled':

        //Enable
        if (interaction.options.getBoolean('enabled') === true) {

          if (config.gatekeeper.welcome_enabled) {
            return bot.createEmbed('error', '', 'Error! Welcomer is already enabled!', [], `${interaction.guild.name}`, interaction)
              .then((embed) => interaction.reply({ embeds: embed }))
              .catch((error) => bot.log.post('error', error));
          }
          config.gatekeeper.welcome_enabled = true;
          bot.mutils.updateGuildById(interaction.guild.id, config);
          bot.createEmbed('success', '', 'Welcomer has been enabled.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));

        } else if (interaction.options.getBoolean('enabled') === false) {
          //Disable
          if (!config.gatekeeper.welcome_enabled) {
            return bot.createEmbed('error', '', 'Error! Welcomer is already disabled!', [], `${interaction.guild.name}`, interaction)
              .then((embed) => interaction.reply({ embeds: embed }))
              .catch((error) => bot.log.post('error', error));
          }
          config.gatekeeper.welcome_enabled = false;
          bot.mutils.updateGuildById(interaction.guild.id, config);
          bot.createEmbed('success', '', 'Welcomer has been disabled.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));

        }

        break;

      case 'channel':

        let targetchannel = interaction.options.getChannel('channel');

        if (targetchannel.id === config.gatekeeper.welcome_channel) {
          return bot.createEmbed('error', '', 'Error! That channel is already set as the welcomer channel!', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }

        config.gatekeeper.welcome_channel = targetchannel.id;
        bot.mutils.updateGuildById(interaction.guild.id, config);
        bot.createEmbed('success', '', `The welcomer channel has been set to **#${targetchannel.name}**`, [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));

        break;

      case 'message':

        let setmessage = interaction.options.getString('message');

        if (setmessage.length < 1 || setmessage === 'None') {
          config.gatekeeper.welcome_message = 'Welcome {user} to {server}!';
          bot.mutils.updateGuildById(interaction.guild.id, config);
          return bot.createEmbed('success', '', 'The welcomer message has been reset.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }

        if (setmessage.length > 254) {
          return bot.createEmbed('error', '', 'Error! Your message is too long! It needs to be less than **254** characters.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }

        if (setmessage === config.gatekeeper.welcome_interaction) {
          return bot.createEmbed('error', '', 'Error! Your message is the same as the current one!', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }

        config.gatekeeper.welcome_message = setmessage;
        bot.mutils.updateGuildById(interaction.guild.id, config);
        bot.createEmbed('success', '', `New welcomer message set!\n\nTo: \n${setmessage}`, [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));

        break;

      case 'placeholders':

        bot.createEmbed('warning', '', '**Welcomer Message Placeholders**\n\nPlaceholders are words that are replaced by what they represent in the message. Here are some placeholders you can use.\n\n**{user}** - The user who joined\n**{usermention}** - Mention of the user who joined\n**{userdiscrim}** - The discriminator of the user who joined\n**{server}** - The server the user joined\n**{date}** - The date they joined\n**{time}** - The time they joined\n**{memberCount}** - Number of Members (including bots)\n**{userCount}** - Number of users (excluding bots)', [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));

        break;

      case 'test':

        //Check if enabled
        if (config.gatekeeper.welcome_enabled === false) {
          return bot.createEmbed('error', '', 'Error! Your configuration didn\'t work. This was because you haven\'t enabled welcomer yet! You can do so by doing **/config-gatekeeper welcome enable**', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }
        //Check if channel is set
        if (config.gatekeeper.welcome_channel === 0) {
          return bot.createEmbed('error', '', 'Error! Your configuration didn\'t work. This was because you haven\'t set a channel for your welcome messages. You can do so by doing **/config-gatekeeper welcome channel <#CHANNEL>**', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }
        //Check if channel is accessible by bot or exists
        let testingchannel = bot.channels.cache.get('' + config.gatekeeper.welcome_channel + '');
        if (testingchannel === undefined) {
          return bot.createEmbed('error', '', 'Error! Your configuration didn\'t work. This is beacuse the channel you have set no longer exists. Please set a new channel by doing **/config-gatekeeper welcome channel <#CHANNEL>**', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }
        //Check if the bot has perms to send messages in that channel
        let botmember = interaction.guild.members.cache.get(bot.user.id);
        if (botmember.permissionsIn(interaction.guild.channels.cache.get('' + config.gatekeeper.welcome_channel + '')).has('SendMessages') === false) {
          return bot.createEmbed('error', '', 'Error! Your configuration didn\'t work. This is because the bot is unable to send messages in the configured channel you have set.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }

        //Get the current time
        const date = new Date();
        //Convert to a readable format
        const dFormatter = new Intl.DateTimeFormat('en', {
          dateStyle: 'medium'
        });
        const tFormatter = new Intl.DateTimeFormat('en', {
          timeStyle: 'medium'
        });

        let themsg = format(config.gatekeeper.welcome_message, {
          user: interaction.user.tag,
          usermention: interaction.user,
          username: interaction.user.name,
          usertag: interaction.user.discriminator,
          server: interaction.guild.name,
          date: dFormatter.format(date),
          time: tFormatter.format(date),
          memberCount: interaction.guild.memberCount,
          userCount: interaction.guild.members.cache.filter(member => !member.user.bot).size
        });

        bot.channels.cache.get(config.gatekeeper.welcome_channel).send({
          embeds: [{
            color: bot.settings.color.yellow,
            description: themsg,
          }],
        });
        interaction.react('✅');

        break;

      default:

        interaction.reply({ content: 'Error! Please use a valid subcommand!', flags: MessageFlags.Ephemeral });

        break;

      }

      break;

    case 'leave':

      switch (subcommand) {

      case 'enabled':

        //Enable
        if (interaction.options.getBoolean('enabled') === true) {

          if (config.gatekeeper.leave_enabled) {
            return bot.createEmbed('error', '', 'Error! Leave is already enabled!', [], `${interaction.guild.name}`, interaction)
              .then((embed) => interaction.reply({ embeds: embed }))
              .catch((error) => bot.log.post('error', error));
          }
          config.gatekeeper.leave_enabled = true;
          bot.mutils.updateGuildById(interaction.guild.id, config);
          bot.createEmbed('success', '', 'Leave has been enabled.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));

        } else if (interaction.options.getBoolean('enabled') === false) {
          //Disable
          if (!config.gatekeeper.leave_enabled) {
            return bot.createEmbed('error', '', 'Error! Leave is already disabled!', [], `${interaction.guild.name}`, interaction)
              .then((embed) => interaction.reply({ embeds: embed }))
              .catch((error) => bot.log.post('error', error));
          }
          config.gatekeeper.leave_enabled = false;
          bot.mutils.updateGuildById(interaction.guild.id, config);
          bot.createEmbed('success', '', 'Leave has been disabled.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));

        }

        break;

      case 'channel':

        let targetchannel = interaction.options.getChannel('channel');

        if (targetchannel.id === config.gatekeeper.leave_channel) {
          return bot.createEmbed('error', '', 'Error! That channel is already set as the leave channel!', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }

        config.gatekeeper.leave_channel = targetchannel.id;
        bot.mutils.updateGuildById(interaction.guild.id, config);
        bot.createEmbed('success', '', `The leave channel has been set to **#${targetchannel.name}**`, [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));

        break;

      case 'message':

        let setmessage = interaction.options.getString('message');

        if (setmessage.length < 1 || setmessage === 'None') {
          config.gatekeeper.leave_message = 'Welcome {user} to {server}!';
          bot.mutils.updateGuildById(interaction.guild.id, config);
          return bot.createEmbed('success', '', 'The leave message has been reset.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }

        if (setmessage.length > 254) {
          return bot.createEmbed('error', '', 'Error! Your message is too long! It needs to be less than **254** characters.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }

        if (setmessage === config.gatekeeper.leave_interaction) {
          return bot.createEmbed('error', '', 'Error! Your message is the same as the current one!', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }

        config.gatekeeper.leave_message = setmessage;
        bot.mutils.updateGuildById(interaction.guild.id, config);
        bot.createEmbed('success', '', `New leave message set!\n\nTo: \n${setmessage}`, [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));

        break;

      case 'placeholders':
        bot.createEmbed('warning', '', '**Leave Message Placeholders**\n\nPlaceholders are words that are replaced by what they represent in the message. Here are some placeholders you can use.\n\n**{user}** - The user who left\n**{usermention}** - Mention of the user who left\n**{userdiscrim}** - The discriminator of the user who left\n**{server}** - The server the user left\n**{date}** - The date they left\n**{time}** - The time they left\n**{memberCount}** - Number of Members (including bots)\n**{userCount}** - Number of users (excluding bots)', [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));
        break;

      case 'test':
        //Check if enabled
        if (config.gatekeeper.leave_enabled === false) {
          return bot.createEmbed('error', '', 'Error! Your configuration didn\'t work. This was because you haven\'t enabled leave yet! You can do so by doing **/config-gatekeeper leave enable**', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }
        //Check if channel is set
        if (config.gatekeeper.leave_channel === 0) {
          return bot.createEmbed('error', '', 'Error! Your configuration didn\'t work. This was because you haven\'t set a channel for your welcome messages. You can do so by doing **/config-gatekeeper leave channel <#CHANNEL>**', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }
        //Check if channel is accessible by bot or exists
        let testingchannel = bot.channels.cache.get('' + config.gatekeeper.leave_channel + '');
        if (testingchannel === undefined) {
          return bot.createEmbed('error', '', 'Error! Your configuration didn\'t work. This is beacuse the channel you have set no longer exists. Please set a new channel by doing **/config-gatekeeper leave channel <#CHANNEL>**', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }
        //Check if the bot has perms to send messages in that channel
        let botmember = interaction.guild.members.cache.get(bot.user.id);
        if (botmember.permissionsIn(interaction.guild.channels.cache.get('' + config.gatekeeper.leave_channel + '')).has('SendMessages') === false) {
          return bot.createEmbed('error', '', 'Error! Your configuration didn\'t work. This is because the bot is unable to send messages in the configured channel you have set.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }

        //Get the current time
        const date = new Date();
        //Convert to a readable format
        const dFormatter = new Intl.DateTimeFormat('en', {
          dateStyle: 'medium'
        });
        const tFormatter = new Intl.DateTimeFormat('en', {
          timeStyle: 'medium'
        });

        let themsg = format(config.gatekeeper.leave_message, {
          user: interaction.user.tag,
          usermention: interaction.user,
          username: interaction.user.name,
          usertag: interaction.user.discriminator,
          server: interaction.guild.name,
          date: dFormatter.format(date),
          time: tFormatter.format(date),
          memberCount: interaction.guild.memberCount,
          userCount: interaction.guild.members.cache.filter(member => !member.user.bot).size
        });

        bot.channels.cache.get(config.gatekeeper.leave_channel).send({
          embeds: [{
            color: bot.settings.color.yellow,
            description: themsg,
          }],
        });
        interaction.react('✅');
        break;

      default:

        interaction.reply({ content: 'Error! Please use a valid subcommand!', flags: MessageFlags.Ephemeral });

        break;

      }

      break;

    case 'userjoin':

      switch (subcommand) {

      case 'enabled':

        if (interaction.options.getBoolean('enabled') === true) {
          //Enable
          if (config.userjoin.enabled === true) {
            return bot.createEmbed('error', '', 'Error! Userjoin is already enabled.', [], `${interaction.guild.name}`, interaction)
              .then((embed) => interaction.reply({ embeds: embed }))
              .catch((error) => bot.log.post('error', error));
          }
          config.userjoin.enabled = true;
          bot.mutils.updateGuildById(interaction.guild.id, config);
          bot.createEmbed('success', '', 'Userjoin has been enabled!', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));

        } else if (interaction.options.getBoolean('enabled') === false) {
          //Disable
          if (config.userjoin.enabled === false) {
            return bot.createEmbed('error', '', 'Error! Userjoin is already disabled!', [], `${interaction.guild.name}`, interaction)
              .then((embed) => interaction.reply({ embeds: embed }))
              .catch((error) => bot.log.post('error', error));
          }
          config.userjoin.enabled = true;
          bot.mutils.updateGuildById(interaction.guild.id, config);
          bot.createEmbed('success', '', 'Userjoin has been disabled!', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));

        }

        break;

      case 'role':

        let targetrole = interaction.options.getRole('role');

        if (config.userjoin.enabled === false) {
          return bot.createEmbed('error', '', 'Error! Userjoin is not enabled. You can enable it with **/config-userjoin enable**', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }
        if (!targetrole || targetrole === 'None') {
          config.userjoin.role = '0';
          bot.mutils.updateGuildById(interaction.guild.id, config);
          return bot.createEmbed('success', '', 'The userjoin role has been reset.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }

        let botmember = interaction.guild.members.cache.get(bot.user.id);
        let comparedpos = targetrole.comparePositionTo(botmember.roles.highest);

        if (comparedpos > 0) {
          return bot.createEmbed('error', '', 'Error! That role is higher than the bot, therefore the bot cannot add the role to a user. Please fix this by moving the role below the bot\'s highest role.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }

        if (targetrole.id === config.userjoin.role) {
          return bot.createEmbed('error', '', 'Error! That role is already set as the auto-role.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }

        config.userjoin.role = targetrole.id;
        bot.mutils.updateGuildById(interaction.guild.id, config);
        bot.createEmbed('success', '', `Auto-role is set to **${targetrole.name}**.`, [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));

        break;

      case 'nickname':

        let name = interaction.options.getString('nickname');

        if (!name || name === 'None' || name == null) {
          config.userjoin.nickname = 'None';
          bot.mutils.updateGuildById(interaction.guild.id, config);
          return bot.createEmbed('success', '', 'The userjoin nickname has been reset.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }

        if (name.length > 32) {
          return bot.createEmbed('error', '', 'Error! The name is too long! It has to be less than **32** characters!', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }

        config.userjoin.nickname = name;
        bot.mutils.updateGuildById(interaction.guild.id, config);
        bot.createEmbed('success', '', `Auto-name is set to **${name}**`, [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));

        break;

      default:

        interaction.reply({ content: 'Error! Please use a valid subcommand!', flags: MessageFlags.Ephemeral });

        break;

      }

      break;

    case 'moderation':

      switch (subcommand) {

      case 'staff-role':

        let targetrole = interaction.options.getRole('role');
        if (targetrole === undefined) {
          config.moderation.staff_role = '0';
          bot.mutils.updateGuildById(interaction.guild.id, config);
          return bot.createEmbed('success', '', 'Your server\'s staff role has now been removed.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }

        config.moderation.staff_role = targetrole.id;
        bot.mutils.updateGuildById(interaction.guild.id, config);
        bot.createEmbed('success', '', 'Your servers staff role has been set! Users with this role can now use staff commands!', [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));

        break;

      case 'link-blocker':

        if (interaction.options.getBoolean('enabled') === true) {
          //Enable
          if (config.staff_linkblock === true) {
            return bot.createEmbed('error', '', 'Error! Link blocker is already enabled.', [], `${interaction.guild.name}`, interaction)
              .then((embed) => interaction.reply({ embeds: embed }))
              .catch((error) => bot.log.post('error', error));
          }

          config.moderation.link_block = true;
          bot.mutils.updateGuildById(interaction.guild.id, config);
          return bot.createEmbed('success', '', 'Link blocker has been enabled.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));

        } else if (interaction.options.getBoolean('enabled') === false) {
          //Disable
          if (config.staff_linkblock === false) {
            return bot.createEmbed('error', '', 'Error! Link blocker is already disabled.', [], `${interaction.guild.name}`, interaction)
              .then((embed) => interaction.reply({ embeds: embed }))
              .catch((error) => bot.log.post('error', error));
          }

          config.moderation.link_block = false;
          bot.mutils.updateGuildById(interaction.guild.id, config);
          bot.createEmbed('success', '', 'Link blocker has been disabled.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));

        }

        break;

      case 'word-filter':

        let action = interaction.options.getString('action');

        let word = interaction.options.getString('word');
        let lowerWord = word.toLowerCase();
        let filter = config.moderation.filter;

        switch (action) {

        case 'wordfilter_add':

          if (filter.includes(lowerWord)) {
            return bot.createEmbed('error', '', 'Error! That word is already in the filter!', [], `${interaction.guild.name}`, interaction)
              .then((embed) => interaction.reply({ embeds: embed }))
              .catch((error) => bot.log.post('error', error));
          }

          config.moderation.filter.push(lowerWord);
          bot.mutils.updateGuildById(interaction.guild.id, config);
          bot.createEmbed('success', '', `The word **${word}** has been added to the filter!`, [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));

          break;

        case 'wordfilter_remove':

          if (!filter.includes(lowerWord)) {
            return bot.createEmbed('error', '', `Error! The word **${lowerWord}** is not in the filter.`, [], `${interaction.guild.name}`, interaction)
              .then((embed) => interaction.reply({ embeds: embed }))
              .catch((error) => bot.log.post('error', error));
          }

          let indexofword = filter.indexOf(lowerWord);

          config.moderation.filter.splice(indexofword, 1);
          bot.mutils.updateGuildById(interaction.guild.id, config);
          bot.createEmbed('success', '', `The word **${word}** has been removed from the filter!`, [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));

          break;


        case 'wordfilter_clear':

          config.moderation.filter = [];
          bot.mutils.updateGuildById(interaction.guild.id, config);
          bot.createEmbed('success', '', 'The logging ignore list has been succesfully cleared.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));

          break;

        }

        break;


      default:

        interaction.reply({ content: 'Error! Please use a valid subcommand!', flags: MessageFlags.Ephemeral });

        break;

      }

      break;

    case 'logging':

      switch (subcommand) {

      case 'enabled':

        if (interaction.options.getBoolean('enabled') === true) {
          //Enable
          if (config.logging.enabled === true) {
            return bot.createEmbed('error', '', 'Error! Logging is already enabled.', [], `${interaction.guild.name}`, interaction)
              .then((embed) => interaction.reply({ embeds: embed }))
              .catch((error) => bot.log.post('error', error));
          }

          config.logging.enabled = true;
          bot.mutils.updateGuildById(interaction.guild.id, config);
          bot.createEmbed('success', '', 'Logging is now enabled.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));

        } else if (interaction.options.getBoolean('enabled') === false) {
          //Disable
          if (config.logging.enabled === false) {
            bot.createEmbed('error', '', 'Error! Logging is already disabled', [], `${interaction.guild.name}`, interaction)
              .then((embed) => interaction.reply({ embeds: embed }))
              .catch((error) => bot.log.post('error', error));
          }

          config.logging.enabled = true;
          bot.mutils.updateGuildById(interaction.guild.id, config);
          bot.createEmbed('success', '', 'Logging is now disabled.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));

        }

        break;

      case 'channel':

        let targetchannel = interaction.options.getChannel('channel');

        if (!targetchannel || targetchannel === 'None' || targetchannel == null) {
          config.logging.channel = '0';
          bot.mutils.updateGuildById(interaction.guild.id, config);
          return bot.createEmbed('success', '', 'Your logging channel has been removed', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }

        if (targetchannel.id === config.logging.channel) {
          return bot.createEmbed('error', '', 'Error! That channel is already set as the log channel.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }

        config.logging.channel = targetchannel.id;
        bot.mutils.updateGuildById(interaction.guild.id, config);
        bot.createEmbed('success', '', `Your logging channel has been set to **${targetchannel.name}**`, [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));

        break;

      case 'level':

        var level = interaction.options.getString('level');

        switch (level) {
        case 'log_low':
          if (config.logging.level === 'low') {
            return bot.createEmbed('error', '', 'Error! Logging is already set to that level.', [], `${interaction.guild.name}`, interaction)
              .then((embed) => interaction.reply({ embeds: embed }))
              .catch((error) => bot.log.post('error', error));
          }

          config.logging.level = 'low';
          bot.mutils.updateGuildById(interaction.guild.id, config);
          bot.createEmbed('success', '', 'Logging level has been set to **LOW**.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
          break;

        case 'log_medium':
          if (config.logging.level === 'medium') {
            return bot.createEmbed('error', '', 'Error! Logging is already set to that level.', [], `${interaction.guild.name}`, interaction)
              .then((embed) => interaction.reply({ embeds: embed }))
              .catch((error) => bot.log.post('error', error));
          }

          config.logging.level = 'medium';
          bot.mutils.updateGuildById(interaction.guild.id, config);
          bot.createEmbed('success', '', 'Logging level has been set to **MEDIUM**.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
          break;

        case 'log_high':
          if (config.logging.level === 'high') {
            return bot.createEmbed('error', '', 'Error! Logging is already set to that level.', [], `${interaction.guild.name}`, interaction)
              .then((embed) => interaction.reply({ embeds: embed }))
              .catch((error) => bot.log.post('error', error));
          }

          config.logging.level = 'high';
          bot.mutils.updateGuildById(interaction.guild.id, config);
          bot.createEmbed('success', '', 'Logging level has been set to **HIGH**.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
          break;

        }

        break;

      case 'ignore-list':

        let action = interaction.options.getString('action');

        switch (action) {

        case 'ignorelist_add':


          if (config.logging.ignore.includes(targetchannel.id)) {
            return bot.createEmbed('error', '', 'Error! This channel is already in the ignored list.', [], `${interaction.guild.name}`, interaction)
              .then((embed) => interaction.reply({ embeds: embed }))
              .catch((error) => bot.log.post('error', error));
          }

          config.logging.ignore.push(targetchannel.id);
          bot.mutils.updateGuildById(interaction.guild.id, config);
          bot.createEmbed('success', '', `The channel <#${targetchannel.id}> has been successfully added to the logging ignore list!`, [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));

          break;

        case 'ignorelist_remove':

          if (!config.logging.ignore.includes(targetchannel.id)) {
            return bot.createEmbed('error', '', 'Error! This channel is currently not in the ignored list.', [], `${interaction.guild.name}`, interaction)
              .then((embed) => interaction.reply({ embeds: embed }))
              .catch((error) => bot.log.post('error', error));
          }

          let index = config.logging.ignore.indexOf(targetchannel.id);

          config.logging.ignore.splice(index, 1);
          bot.mutils.updateGuildById(interaction.guild.id, config);
          bot.createEmbed('success', '', `The channel <#${targetchannel.id}> has been successfully removed from the logging ignore list!`, [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));

          break;

        case 'ignorelist_clear':

          config.logging.ignore = [];
          bot.mutils.updateGuildById(interaction.guild.id, config);
          bot.createEmbed('success', '', 'The logging ignore list has been succesfully cleared.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));

          break;

        }

        break;

      default:

        interaction.reply({ content: 'Error! Please use a valid subcommand!', flags: MessageFlags.Ephemeral });

        break;

      }

      break;

    case 'tickets':

      switch (subcommand) {

      case 'enabled':

        if (interaction.options.getBoolean('enabled') === true) {
          if (config.tickets.enabled === true) {
            return bot.createEmbed('error', '', 'Error! Tickets are already enabled.', [], `${interaction.guild.name}`, interaction)
              .then((embed) => interaction.reply({ embeds: embed }))
              .catch((error) => bot.log.post('error', error));
          }

          config.tickets.enabled = true;
          bot.mutils.updateGuildById(interaction.guild.id, config);

          if (!interaction.guild.channels.cache.some(isCatTickets)) {
            interaction.guild.channels.create('Tickets', {
              type: 'category',
              reason: 'Category for StenBot Tickets'
            });
          }

          bot.createEmbed('success', '', 'Tickets have been enabled.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));

        } else if (interaction.options.getBoolean('enabled') === false) {
          if (config.tickets.enabled === false) {
            return bot.createEmbed('error', '', 'Error! Tickets are already disabled.', [], `${interaction.guild.name}`, interaction)
              .then((embed) => interaction.reply({ embeds: embed }))
              .catch((error) => bot.log.post('error', error));
          }
          config.tickets.enabled = false;
          bot.mutils.updateGuildById(interaction.guild.id, config);
          //Find and delete tickets category
          interaction.guild.channels.cache.find(c => c.name === 'Tickets' && c.type === 'category').delete();

          bot.createEmbed('success', '', 'Tickets have been disabled.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }

        break;

      case 'message':

        let tmessage = interaction.options.getString('message');

        if (tmessage.length < 1 || tmessage === 'None') {
          config.tickets.message = '**User:** ${user}\n**Reason:** ${reason}';
          bot.mutils.updateGuildById(interaction.guild.id, config);
          return bot.createEmbed('success', '', 'The ticket message has been reset.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }

        if (tmessage.length > 256) {
          return bot.createEmbed('error', '', 'Error! The message you have provided is too long! Make sure it is less than **256** characters.', [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply({ embeds: embed }))
            .catch((error) => bot.log.post('error', error));
        }

        config.tickets.message = tmessage;
        bot.mutils.updateGuildById(interaction.guild.id, config);
        bot.createEmbed('success', '', 'Ticket message set!', [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));

        break;

      case 'placeholders':

        bot.createEmbed('warning', '', '**Ticket Message Placeholders**\n\nPlaceholders are words that are replaced by what they represent in the message. Here are some placeholders you can use.\n\n**{user}** - The user who created the ticket\n**{reason}** - The reason for the ticket.', [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));

        break;

      default:

        interaction.reply({ content: 'Error! Please use a valid subcommand!', flags: MessageFlags.Ephemeral });

        break;

      }

      break;

    default:
      break;

    }

    //Check for a category called tickets, if it does not exist create one
    function isCatTickets(element) {
      if (element.constructor.name != 'CategoryChannel') {
        return false;
      }
      if (element.name != 'Tickets') {
        return false;
      }
      return true;
    }

  },
};