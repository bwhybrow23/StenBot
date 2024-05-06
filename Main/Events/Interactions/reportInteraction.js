import { ModalBuilder, TextInputBuilder, ActionRowBuilder, ButtonBuilder } from 'discord.js';
import reportUtils from '../../Functions/reportUtils.js';

export default {
  name: 'interactionCreate',
  once: false,
  async execute(bot, interaction) {

    if (!interaction) return;
    // if(interaction.user.id != interaction.message.author.id) return;

    //Interactive Components

    // Modals
    //User Modal
    const userModal = new ModalBuilder()
      .setCustomId('userModal')
      .setTitle('User Report');
    //Text Input Components
    const userIdInput = new TextInputBuilder()
      .setCustomId('userId')
      .setLabel('What is the ID of the user?')
      .setStyle('Short')
      .setRequired(true);
    const reasonInput = new TextInputBuilder()
      .setCustomId('reason')
      .setLabel('What is the reason for this report?')
      .setStyle('Paragraph')
      .setRequired(true);
    const evidenceInput = new TextInputBuilder()
      .setCustomId('evidence')
      .setLabel('What evidence do you have?')
      .setStyle('Paragraph')
      .setRequired(true);
    //Action Rows
    const playerIdActionRow = new ActionRowBuilder().addComponents(userIdInput);
    const reasonActionRow = new ActionRowBuilder().addComponents(reasonInput);
    const evidenceActionRow = new ActionRowBuilder().addComponents(evidenceInput);
    //Add inputs to modal
    userModal.addComponents(playerIdActionRow, reasonActionRow, evidenceActionRow);

    //Server Modal
    const serverModal = new ModalBuilder()
      .setCustomId('serverModal')
      .setTitle('Server Report');
    //Text Input Components
    const serverIdInput = new TextInputBuilder()
      .setCustomId('serverId')
      .setLabel('What is the ID of the server?')
      .setStyle('Short')
      .setRequired(true);
    //Action Rows
    const serverIdActionRow = new ActionRowBuilder().addComponents(serverIdInput);
    //Add inputs to modal
    serverModal.addComponents(serverIdActionRow, reasonActionRow, evidenceActionRow);

    //Bug Modal
    const bugModal = new ModalBuilder()
      .setCustomId('bugModal')
      .setTitle('Bug Report');
    //Text Input Components
    const bugSummaryInput = new TextInputBuilder()
      .setCustomId('bugSummary')
      .setLabel('Please provide a summary of the bug.')
      .setStyle('Paragraph')
      .setRequired(true);
    const bugStepsInput = new TextInputBuilder()
      .setCustomId('bugSteps')
      .setLabel('Please provide steps to reproduce the bug.')
      .setStyle('Paragraph')
      .setRequired(true);
    const bugEvidenceInput = new TextInputBuilder()
      .setCustomId('bugEvidence')
      .setLabel('Please provide any evidence of the bug.')
      .setStyle('Paragraph')
      .setRequired(true);
    //Action Rows
    const bugSummaryActionRow = new ActionRowBuilder().addComponents(bugSummaryInput);
    const bugStepsActionRow = new ActionRowBuilder().addComponents(bugStepsInput);
    const bugEvidenceActionRow = new ActionRowBuilder().addComponents(bugEvidenceInput);
    //Add inputs to modal
    bugModal.addComponents(bugSummaryActionRow, bugStepsActionRow, bugEvidenceActionRow);

    //Buttons
    const tRow = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('user')
          .setLabel('User')
          .setStyle('Primary')
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId('server')
          .setLabel('Server')
          .setStyle('Primary')
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId('bug')
          .setLabel('Bug')
          .setStyle('Primary')
          .setDisabled(true),
      );
    //Button clicked => Modal
    if (interaction.customId === 'user') {
      interaction.message.edit({ components: [tRow] });
      interaction.showModal(userModal);
    } else if (interaction.customId === 'server') {
      interaction.message.edit({ components: [tRow] });
      interaction.showModal(serverModal);
    } else if (interaction.customId === 'bug') {
      interaction.message.edit({ components: [tRow] });
      interaction.showModal(bugModal);
    }

    //Date to readable format
    const formatter = new Intl.DateTimeFormat('en', {
      timeStyle: 'medium',
      dateStyle: 'medium'
    });
    const rDate = formatter.format(new Date());

    if (interaction.customId === 'userModal') {

      if (interaction.type != InteractionType.ModalSubmit) return;

      //User Report
      const rObj = bot.users.cache.get(interaction.fields.getTextInputValue('userId'));
      if (!rObj) {
        interaction.editReply({ content: 'A user with this ID cannot be found. Please refer to [this guide](http://bit.ly/getdiscordid) for more information.', ephemeral: true });
        return;
      }

      reportUtils.playerReport(bot, interaction.user, rObj, interaction.guild, interaction.fields.getTextInputValue('reason'), interaction.fields.getTextInputValue('evidence'), rDate)
        .then(embed => bot.channels.cache.get('518729627586527232').send({ embeds: [embed.toJSON()] }))
        .catch(error => bot.log.post('error', error));

      //Success message
      bot.createEmbed('success', 'User Report Sent', 'Your user report has been sent and will be reviewed by the Staff Team of StenBot. Thank you for your help.', [], `${interaction.user.tag}`, interaction)
        .then(embed => interaction.reply({ embeds: embed, ephemeral: true }))
        .catch(error => bot.log.post('error', error));

      return;

    } else if (interaction.customId === 'serverModal') {

      if (interaction.type != InteractionType.ModalSubmit) return;

      //Server Report
      const gObj = bot.guilds.cache.get(interaction.fields.getTextInputValue('serverId'));
      if (!gObj) {
        interaction.deferReply();
        interaction.followUp({ content: 'A user with this ID cannot be found. Please refer to [this guide](http://bit.ly/getdiscordid) for more information.', ephemeral: true });
        return;
      }

      reportUtils.serverReport(bot, interaction.user, gObj, interaction.fields.getTextInputValue('reason'), interaction.fields.getTextInputValue('evidence'), rDate)
        .then(embed => bot.channels.cache.get('518729627586527232').send({ embeds: [embed.toJSON()] }))
        .catch(error => bot.log.post('error', error));

      //Success message
      bot.createEmbed('success', 'Server Report Sent', 'Your server report has been sent and will be reviewed by the Staff Team of StenBot. Thank you for your help.', [], `${interaction.user.tag}`, interaction)
        .then(embed => interaction.reply({ embeds: embed, ephemeral: true }))
        .catch(error => bot.log.post('error', error));

      return;

    } else if (interaction.customId === 'bugModal') {

      if (interaction.type != InteractionType.ModalSubmit) return;

      //Bug Report
      reportUtils.bugReport(bot, interaction.user, interaction.guild, interaction.fields.getTextInputValue('bugSummary'), interaction.fields.getTextInputValue('bugSteps'), interaction.fields.getTextInputValue('bugEvidence'), rDate)
        .then(embed => bot.channels.cache.get('518729627586527232').send({ embeds: [embed.toJSON()] }))
        .catch(error => bot.log.post('error', error));

      //Success message
      bot.createEmbed('success', 'Bug Report Sent', 'Your bug report has been sent and will be reviewed by the Staff Team of StenBot. Thank you for your help.', [], `${interaction.user.tag}`, interaction)
        .then(embed => interaction.reply({ embeds: embed, ephemeral: true }))
        .catch(error => bot.log.post('error', error));

      return;

    }

  }
};