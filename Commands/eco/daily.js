import { SlashCommandBuilder } from '@discordjs/builders';
import ecoUtils from '../../Main/Functions/ecoUtils.js';

export default {
  data: new SlashCommandBuilder()
    .setName('daily').setDescription('Claim your daily reward!'),
  category: 'eco',
  usage: '',
  example: '',
  options: { permission: 'EVERYONE', enabled: false, cooldown: 60, guildOnly: false },
  run: async (bot, interaction) => {

    const person = interaction.user;

    // Calculate random number
    function randomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Check if there is an ongoing daily
    let check = await bot.timeouts.check(person.id, 'daily');
    if (check != false) {
      return bot.createEmbed('error', '', `You've already redeemed your daily money for today. \nCome back in **${check}** and you'll be able to redeem it again.`, [], '', interaction)
        .then((embed) => interaction.reply({ embeds: embed }))
        .catch((error) => bot.log.post('error', error));
    }

    //Add daily money to user's balance
    await ecoUtils.getUser(person.id).then(async (user) => {
      let reward = randomInteger(100, 1000);
      let newBal = user.balance + reward;
      ecoUtils.updateUser(person.id, newBal).then(async () => {
        // Create a new daily for the user
        await bot.timeouts.new(person.id, 'daily');
        return bot.createEmbed('success', '', `You have claimed your daily reward of **${reward}**. Come back in 24 hours to claim it again!`, [], '', interaction)
          .then((embed) => interaction.reply({ embeds: embed }))
          .catch((error) => bot.log.post('error', error));
      });
    });


  }
};