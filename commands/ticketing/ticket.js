const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket").setDescription("Create a ticket")
    .addStringOption(option => option.setName("reason").setDescription("The reason for the ticket.").setRequired(true)),
  category: "ticketing",
  options: { permission: "EVERYONE", aliases: ["t"], enabled: true, guildOnly: true },
  run: async (bot, interaction) => {

const config = await bot.mutils.getGuildById(interaction.guild.id);

var reason = interaction.options.getString("reason");

var format = require("string-template");
var tnum = Math.floor(Math.random() * 1000001);

function errsend(msg) {
  interaction.reply({
    embeds: [{
      color: bot.settings.color.red,
      description: `Error! ${msg}`,
      timestamp: Date.now(),
      footer: {
        icon_url: "https://i.imgur.com/klY5xCe.png",
        text: `${interaction.guild.name}`,
      },
    }, ]
  });
}

//Check if tickets are enabled
if (!config.tickets.enabled) {
  return errsend("Tickets are not enabled in the servers config.");
}

if (config.moderation.staff_role === "0") {
  return bot.createEmbed("error", "", `Error! A staff role has not been set. An owner or admin can set one using \`sb!config-moderation role <@ROLE>\``, [], `${interaction.guild.name}`, interaction)
    .then((embed) => interaction.reply(embed))
    .catch((error) => bot.log.post("error", error));
}

let staffrole = interaction.guild.roles.cache.find(
  (r) => r.id === config.moderation.staff_role
);

if (staffrole === undefined) {
  return bot.createEmbed("error", "", `Error! The staff role that has been set is invalid. An owner or admin can set a new one using \`sb!config-moderation role <@ROLE>\``, [], `${interaction.guild.name}`, interaction)
    .then((embed) => interaction.reply(embed))
    .catch((error) => bot.log.post("error", error));
}

//Check if supplied sufficient reason
if (reason.length < 1) {
  return errsend(
    "Make sure you include a reason for creating this ticket."
  );
}
if (reason.length > 200) {
  return errsend(
    "Your reason is too long! Make sure its less than **200** characters."
  );
}

function createChan(element) {
  if (element.constructor.name === "CategoryChannel") {
    if (element.name === "Tickets") {
      interaction.guild.channels.create(`ticket-${tnum}`, {
          type: "GUILD_TEXT"
        })
        .then((channel) => {
          channel.setParent(element.id);
          channel.setTopic(`${interaction.user.tag}'s Ticket`);

          //Channel permissions
          channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false
          });

          channel.permissionOverwrites.create(
            interaction.guild.roles.cache.get(config.moderation.staff_role), {
              SEND_MESSAGES: true,
              VIEW_CHANNEL: true,
              MANAGE_MESSAGES: true
            }
          );

          channel.permissionOverwrites.create(interaction.user, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true
          });

          //Fill in the placeholders
          var tMessage = [];
          tMessage.push(
            format(config.tickets.message, {
              user: interaction.user.tag,
              reason: reason,
            })
          );
          // }

          channel.send({
            embeds: [{
              color: bot.settings.color.yellow,
              description: `**New Ticket:**\n${tMessage[0]}`,
            }],
            content: `<@&${config.moderation.staff_role}>`
          });

          interaction.reply({
            embeds: [{
              color: bot.settings.color.green,
              description: `Your ticket ${channel} has been created, ${message.member.displayName}`,
            }],
          });

          //Check if logging enabled
          const eventFunctions = require(`../../main/functions/eventUtils.js`);

          if (config.logging.enabled) {
            if (eventFunctions.checkChannel(config.logging.channel, bot)) {
              interaction.guild.channels.cache.get(config.logging.channel).send({
                embeds: [{
                  color: bot.settings.color.yellow,
                  description: `**Ticket Created**\n**Created By:** ${interaction.user.tag}\n**Channel:** ${channel.name}\n**Id:** ${channel.id}\n\n**Reason:** ${reason}`,
                }],
              });
            }
          }
        });
    }
  }
}
  createChan(interaction.guild.channels.cache.some(createChan)); //Run the beast
}

};