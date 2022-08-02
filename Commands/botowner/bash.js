const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bash').setDescription('Runs a command in a bash terminal from within StenBot.')
    .addStringOption(option => option.setName('command').setDescription('The command to run').setRequired(true)),
  category: 'botowner',
  usage: '<COMMAND>',
  example: 'apt-get update',
  options: { permission: 'BOTOWNER', enabled: true, guildOnly: true },
  run: async (bot, interaction) => {

    //Permission Check
    if (interaction.user.id !== bot.settings.ids.botOwner) {
      return;
    }

    let input = interaction.options.getString('command');

    //Begin execution of command
    const exec = require('child_process').exec;
    var StartTime = Date.now();
    await interaction.reply('Getting results...');
    exec(input, {}, (error, stdout) => {
      if (!stdout) {
        return stdout = 'None';
      }
      interaction.editReply({
        embeds: [{
          title: 'Bash Results',
          fields: [{
            name: 'Input',
            value: '```' + input + '```'
          }, {
            name: 'ExecTime',
            value: Date.now() - StartTime + 'ms',
            inline: true
          }, {
            name: 'Errors',
            value: error ? error : 'None',
            inline: true
          }, {
            name: 'Output',
            value: '```' + stdout + '```'
          }],
          footer: {
            text: interaction.guild.name,
            icon_url: 'https://i.imgur.com/klY5xCe.png'
          },
          timestamp: Date.now()
        }],
        content: 'Output:'
      });

    });
  },
};