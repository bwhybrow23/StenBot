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
    let formattedMsg = msg.replace(/\\n/g, '\n');

    let guildsSent = [];

    bot.guilds.cache.forEach(async (guild) => {
      bot.createEmbed('info', 'Message from StenBot\'s Owner', formattedMsg, [], `You have been sent this message as you are the server owner of ${guild.name}.`, interaction)
        .then(async (embed) => {
          await bot.users.cache.get(guild.ownerId).send({ embeds: embed });
        })
        .catch((error) => bot.log.post('error', error));

      guildsSent.push(guild.name);

      await sleep(3000);
    });

    await interaction.reply({ content: `Sent the message to the owners of the following servers:\n- ${guildsSent.join('\n- ')}`, flags: MessageFlags.Ephemeral });

    function sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }

  }
};