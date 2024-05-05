import { SlashCommandBuilder } from '@discordjs/builders';

export default {
  data: new SlashCommandBuilder()
    .setName('gsay').setDescription('Sends a message to all the owners of the servers that the bot is in.')
    .addStringOption(option => option.setName('message').setDescription('The message to send').setRequired(true)),
  category: 'botowner',
  usage: '<interaction>',
  example: 'Hello Everyone!',
  options: { permission: 'BOTOWNER', enabled: true, guildOnly: true },
  run: async (bot, interaction) => {

    //Permission Check
    if (interaction.user.id !== bot.settings.ids.botOwner) {
      return;
    }

    let msg = interaction.options.getString('message');

    bot.guilds.cache.forEach(async (guild) => {
      bot.createEmbed('info', 'interaction from StenBot Owner', `You have been sent this interaction by the owner of StenBot (Stentorian#6969) to inform you. The bot has seen that you are the server owner of **${guild.name}** so it has been sent to you. Feel free to communicate the below interaction to other people.`, [{
        name: 'Server Name',
        value: `${guild.name}`
      }, {
        name: 'interaction',
        value: `${msg}`
      }], `${interaction.guild.name}`, interaction)
        .then(async (embed) => {
          await bot.users.cache.get(guild.ownerId).send(embed);
        })
        .catch((error) => bot.log.post('error', error));

      interaction.reply(`Your interaction has been sent to **${guild.name}** succesfully.`);

      await sleep(3000);
    });

    function sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }

  }
};