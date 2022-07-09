const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('achievement').setDescription('Create your own Minecraft achievement!')
    .addStringOption(option => option.setName('achievement').setDescription('The text for the achievement.').setRequired(true)),
  category: 'fun',
  usage: '<MESSAGE>',
  example: 'Being a successful failure!',
  description: 'Create your own Minecraft achievement',
  options: { permission: 'EVERYONE', enabled: true, cooldown: 5, guildOnly: false },
  run: async (bot, interaction) => {

    const Discord = require('discord.js');
    const achievement = interaction.options.getString('achievement');

    let string = 'https://minecraftskinstealer.com/achievement/13/Achievement%20unlocked/' + achievement;
    let attachment = new Discord.MessageAttachment(string, 'achievement.png');

    interaction.reply({ files: [attachment] });

  },
};