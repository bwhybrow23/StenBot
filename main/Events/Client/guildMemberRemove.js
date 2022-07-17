module.exports = {
  name: 'guildMemberRemove',
  once: false,
  async execute(bot, member) {

    const Discord = require('discord.js');
    const config = await bot.mutils.getGuildById(member.guild.id);
    if (!config) return;
    var format = require('string-template');
    const fs = require('fs');

    if (member.user === bot.user) return;

    //Update bot-data.json
    let botdata = require('../../../Data/Global/bot-data.json');
    botdata.stats.totalGuilds = bot.guilds.cache.size;
    botdata.stats.totalUsers = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
    fs.writeFileSync('./Data/Global/bot-data.json', JSON.stringify(botdata, null, 4), (err) => {
      if (err) return bot.log.post('error', err);
    });

    //Leave Module
    //Check if leave is enabled
    if (config.gatekeeper.leave_enabled === true) {
      //Check if there is a channel set
      if (config.gatekeeper.leave_channel != 0) {
        //Check if channel is valid
        let leavechannel = bot.channels.cache.get(config.gatekeeper.leave_channel);
        if (leavechannel != undefined) {
          //Check if the bot has perms to welcome
          let botasmember = member.guild.members.cache.get(bot.user.id);
          if (
            botasmember.permissionsIn(member.guild.channels.cache.get('' + config.gatekeeper.leave_channel + '')).has('SEND_MESSAGES') === true
          ) {
            //Get the current time
            const date = new Date();
            //Convert to a readable format
            const dFormatter = new Intl.DateTimeFormat('en', {
              dateStyle: 'medium'
            });
            const tFormatter = new Intl.DateTimeFormat('en', {
              timeStyle: 'medium'
            });
            //Fill in place holders
            let themsg = format(config.gatekeeper.leave_message, {
              user: member.user.tag,
              usermention: member.user,
              username: member.user.name,
              usertag: member.user.discriminator,
              server: member.guild.name,
              date: dFormatter.format(date),
              time: tFormatter.format(date),
              memberCount: member.guild.memberCount,
              userCount: member.guild.members.cache.filter(member => !member.user.bot).size
            });

            let leaveEmbed = new Discord.EmbedBuilder()
              .setColor(bot.settings.color.yellow)
              .setDescription(themsg);

            //Send the message.
            bot.channels.cache.get(config.gatekeeper.leave_channel).send({ embeds: [leaveEmbed.toJSON()] });
          }
        }
      }
    }

    if (config.logging.enabled === true) {
      if (config.logging.level === 'low' || config.logging.level === 'medium' || config.logging.level === 'high') {
        if (bot.efunctions.checkChannel(config.logging.channel, bot)) {
          let lchannel = bot.channels.cache.get(config.logging.channel);
          bot.eventEmbed('c9c600', member.user, 'Member Left', `**Name:** ${member.user.tag}\n**Id:** ${member.id}\n**Created At:** ${member.user.createdAt}`, [], `${lchannel.guild.name}`, bot)
            .then(embed => lchannel.send(embed))
            .catch(error => bot.log.post('error', error));
        }
      }
    }
  }
};