import { SlashCommandBuilder } from '@discordjs/builders';
import Discord from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Returns a list of commands, or a specific command\'s information.')
    .addStringOption((option) =>
      option
        .setName('category')
        .setDescription('A category to give a list of commands for.')
        .addChoices({ name: 'admin', value: 'admin'}, { name: 'bot', value: 'bot'}, { name: 'eco', value: 'eco'}, { name: 'fun', value: 'fun'}, { name: 'general', value: 'general'}, { name: 'mod', value: 'mod'}, { name: 'ticketing', value: 'ticketing' } )
    ),
  category: 'general',
  usage: '[CATEGORY]',
  example: 'eco',
  options: { permission: 'EVERYONE', enabled: true, guildOnly: false },
  run: async (bot, interaction) => {

    let prefix = '/';

    //Capitalize function
    const capitalize = (s) => {
      if (typeof s !== 'string') return '';
      return s.charAt(0).toUpperCase() + s.slice(1);
    };

    if (interaction.options.getString('category') != null) {
      //Category Help

      let category = interaction.options.getString('category');

      //Embed to Send
      const embed = new Discord.EmbedBuilder()
        .setColor(bot.settings.color.blue)
        .setTitle(capitalize(category))
        .setFooter({
          text: 'Help Command | Syntax: <> = required, [] = optional',
          iconURL: bot.user.avatarURL(),
        })
        .setTimestamp();

      //Get Commands
      bot.commands.forEach((cmd) => {
        if (cmd.category != category) return;
        embed.addFields([{ name: `\`${prefix}${cmd.data.name} ${cmd.usage}\``, value: `${cmd.data.description}` }]);
      });

      if (!embed.fields || category === 'botowner') {
        embed.setDescription('No commands found under that category.');
      }

      return interaction.reply({ embeds: [embed.toJSON()] });
    } else {
      //General Help

      //Main Embed
      let embed = new Discord.EmbedBuilder()
        .setTitle('All Commands')
        .setDescription(`Prefix: \`${prefix}\``)
        .setColor(bot.settings.color.blue)
        .addFields([ { name: 'Admin Commands', value: `\`${prefix}help admin\``, inline: true}, { name: 'Bot Commands', value: `\`${prefix}help bot\``, inline: true}, { name: 'Config Commands', value: `\`${prefix}help config\``, inline: true}, { name: 'Economy Commands', value: `\`${prefix}help eco\``, inline: true}, { name: 'Fun Commands', value: `\`${prefix}help fun\``, inline: true}, { name: 'General Commands', value: `\`${prefix}help general\``, inline: true}, { name: 'Moderation Commands', value: `\`${prefix}help mod\``, inline: true}, { name: 'Ticketing Commands', value: `\`${prefix}help ticketing\``, inline: true} ])
        .setFooter({ text: 'Help Command', iconURL: bot.user.avatarURL() })
        .setTimestamp();

      interaction.reply({ embeds: [embed.toJSON()] });
    }
  },
};