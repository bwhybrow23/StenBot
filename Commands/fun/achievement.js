import { SlashCommandBuilder } from '@discordjs/builders';

export default {
  data: new SlashCommandBuilder()
    .setName('achievement').setDescription('Create your own Minecraft achievement!')
    .addStringOption(option => option.setName('achievement').setDescription('The text for the achievement.').setRequired(true)),
  category: 'fun',
  usage: '<MESSAGE>',
  example: 'Being a successful failure!',
  description: 'Create your own Minecraft achievement',
  options: { permission: 'EVERYONE', enabled: true, cooldown: 5, guildOnly: false },
  run: async (bot, interaction) => {

    const achievement = interaction.options.getString('achievement');

    let string = 'https://minecraftskinstealer.com/achievement/13/Achievement%20unlocked/' + achievement;

    interaction.reply({ files: [{ attachment: string, name: 'achievement.png' }] });

  },
};