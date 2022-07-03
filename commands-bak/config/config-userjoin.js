module.exports = {
  name: "config-userjoin",
  category: "config",
  description: "Change all config variables related to when users join your server.",
  usage: "<SUBCOMMAND>",
  example: "enable",
  options: { permission: "ADMIN", aliases: ["c-userjoin"], enabled: true, guildOnly: true },
  run: async (bot, interaction) => {

    const Discord = require("discord.js");

    if (message.member.permissions.has("ADMINISTRATOR") === false) {
      return bot.noPermsEmbed(`${interaction.guild.name}`, bot)
        .then((embed) => interaction.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    //Check if they included a setting
    let setting = args[0];

    if (!setting) {
      return bot.createEmbed("error", "", `Error! You forgot to include a userjoin config setting.`, [], `${interaction.guild.name}`, interaction)
        .then((embed) => interaction.reply(embed))
        .catch((error) => bot.log.post("error", error));
    }

    //Get the server config
    let config = await bot.mutils.getGuildById(interaction.guild.id);

    //settings library
    switch (setting) {
      case "enable":
        if (config.userjoin.enabled === true) {
          return bot.createEmbed("error", "", `Error! Userjoin is already enabled.`, [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply(embed))
            .catch((error) => bot.log.post("error", error));
        }
        config.userjoin.enabled = true;
        bot.mutils.updateGuildById(interaction.guild.id, config);
        bot.createEmbed("success", "", `Userjoin has been enabled!`, [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply(embed))
          .catch((error) => bot.log.post("error", error));
        break;

      case "disable":
        if (config.userjoin.enabled === false) {
          return bot.createEmbed("error", "", `Error! Userjoin is already disabled!`, [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply(embed))
            .catch((error) => bot.log.post("error", error));
        }
        config.userjoin.enabled = true;
        bot.mutils.updateGuildById(interaction.guild.id, config)
        bot.createEmbed("success", "", `Userjoin has been disabled!`, [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply(embed))
          .catch((error) => bot.log.post("error", error));
        break;

      case "role":
        var targetrole = message.mentions.roles.first();

        if (config.userjoin.enabled === false) {
          return bot.createEmbed("error", "", `Error! Userjoin is not enabled. You can enable it with **/config-userjoin enable**`, [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply(embed))
            .catch((error) => bot.log.post("error", error));
        }
        if (!targetrole || targetrole === "None") {
          config.userjoin.role = "0"
          bot.mutils.updateGuildById(interaction.guild.id, config);
          return bot.createEmbed("success", "", `The userjoin role has been reset.`, [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply(embed))
            .catch((error) => bot.log.post("error", error));
        }

        let botmember = interaction.guild.members.cache.get(bot.user.id);
        let comparedpos = targetrole.comparePositionTo(botmember.roles.highest);

        if (comparedpos > 0) {
          return bot.createEmbed("error", "", `Error! That role is higher than the bot, therefore the bot cannot add the role to a user. Please fix this by moving the role below the bot's highest role.`, [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply(embed))
            .catch((error) => bot.log.post("error", error));
        }

        if (targetrole.id === config.userjoin.role) {
          return bot.createEmbed("error", "", `Error! That role is already set as the auto-role.`, [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply(embed))
            .catch((error) => bot.log.post("error", error));
        }

        config.userjoin.role = targetrole.id;
        bot.mutils.updateGuildById(interaction.guild.id, config);
        bot.createEmbed("success", "", `Auto-role is set to **${targetrole.name}**.`, [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply(embed))
          .catch((error) => bot.log.post("error", error));

        break;
      case "name":
        var name = args.slice(1).join(" ");

        if (!name || name === "None") {
          config.userjoin.nickname = "None";
          bot.mutils.updateGuildById(interaction.guild.id, config);
          return bot.createEmbed("success", "", `The userjoin nickname has been reset.`, [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply(embed))
            .catch((error) => bot.log.post("error", error));
        }

        if (name.length > 32) {
          return bot.createEmbed("error", "", `Error! The name is too long! It has to be less than **32** characters!`, [], `${interaction.guild.name}`, interaction)
            .then((embed) => interaction.reply(embed))
            .catch((error) => bot.log.post("error", error));
        }

        config.userjoin.nickname = name;
        bot.mutils.updateGuildById(interaction.guild.id, config);
        bot.createEmbed("success", "", `Auto-name is set to **${name}**`, [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply(embed))
          .catch((error) => bot.log.post("error", error));

        break;
      default:
        return bot.createEmbed("error", "", `Error! There isn't a userjoin config setting called **${setting}**`, [], `${interaction.guild.name}`, interaction)
          .then((embed) => interaction.reply(embed))
          .catch((error) => bot.log.post("error", error));
    }
  },
};