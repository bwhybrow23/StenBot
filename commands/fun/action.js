const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("action")
    .setDescription("Do various actions such as hug or kiss to yourself or another person")
    .addSubcommand(subCommand =>
      subCommand.setName("cuddle").setDescription("Cuddle with someone!")
      .addUserOption(option => option.setName("user").setDescription("The user to cuddle").setRequired(true))
    )
    .addSubcommand(subCommand =>
      subCommand.setName("feed").setDescription("Feed someone!")
      .addUserOption(option => option.setName("user").setDescription("The user to feed").setRequired(true))
    )
    .addSubcommand(subCommand =>
      subCommand.setName("hug").setDescription("Hug someone!")
      .addUserOption(option => option.setName("user").setDescription("The user to hug").setRequired(true))
    )
    .addSubcommand(subCommand =>
      subCommand.setName("kiss").setDescription("Kiss someone!")
      .addUserOption(option => option.setName("user").setDescription("The user to kiss").setRequired(true))
    )
    .addSubcommand(subCommand =>
      subCommand.setName("pat").setDescription("Pat someone!")
      .addUserOption(option => option.setName("user").setDescription("The user to pat").setRequired(true))
    )
    .addSubcommand(subCommand =>
      subCommand.setName("poke").setDescription("Poke someone!")
      .addUserOption(option => option.setName("user").setDescription("The user to poke").setRequired(true))
    )
    .addSubcommand(subCommand =>
      subCommand.setName("slap").setDescription("Slap someone!")
      .addUserOption(option => option.setName("user").setDescription("The user to slap").setRequired(true))
    )
    .addSubcommand(subCommand =>
      subCommand.setName("tickle").setDescription("Tickle someone!")
      .addUserOption(option => option.setName("user").setDescription("The user to tickle").setRequired(true))
    ),
  category: "fun",
  options: { permission: "EVERYONE", enabled: true, cooldown: 3, guildOnly: true },
  run: async (bot, interaction) => {

    const Discord = require("discord.js");

    const nekos = require('nekos.life');
    const neko = new nekos();

    const subc = interaction.option.getSubCommand();

    let url;
    let recipient = interaction.options.getUser("user");
    let userNick = interaction.user.username;

    switch (subc) {
      case "cuddle":

        if (recipient === interaction.user) return interaction.reply("You can't cuddle yourself!");

        await apiFetch("cuddle");
        if (!url) {
          await apiFetch("cuddle");
        }

        let cEmbed = new Discord.MessageEmbed()
          .setDescription(`${userNick} cuddles ${recipient.nickname}`)
          .setImage(url)
          .setColor(bot.settings.color.yellow)
          .setFooter({
            text: interaction.guild.name,
            iconURL: `https://i.imgur.com/klY5xCe.png"`
          });

        interaction.reply({
          embeds: [cEmbed.toJSON()]
        });
        break;
      case "feed":

        await apiFetch("feed");
        if (!url) {
          await apiFetch("feed");
        }

        let fEmbed = new Discord.MessageEmbed()
          .setDescription(`${userNick} feeds ${recipient.nickname}`)
          .setImage(url)
          .setColor(bot.settings.color.yellow)
          .setFooter({
            text: interaction.guild.name,
            iconURL: `https://i.imgur.com/klY5xCe.png"`
          });

        interaction.reply({
          embeds: [fEmbed.toJSON()]
        });
        break;
      case "hug":

        if (recipient === interaction.user) return interaction.reply("You can't hug yourself, you silly goose.");

        await apiFetch("hug");
        if (!url) {
          await apiFetch("hug");
        }

        let hEmbed = new Discord.MessageEmbed()
          .setDescription(`${userNick} hugs ${recipient.nickname}`)
          .setImage(url)
          .setColor(bot.settings.color.yellow)
          .setFooter({
            text: interaction.guild.name,
            iconURL: `https://i.imgur.com/klY5xCe.png"`
          });

        interaction.reply({
          embeds: [hEmbed.toJSON()]
        });
        break;

      case "kiss":

        if (recipient === interaction.user) return interaction.reply("You can't kiss yourself, you silly goose.");

        await apiFetch("kiss");
        if (!url) {
          await apiFetch("kiss");
        }

        let kEmbed = new Discord.MessageEmbed()
          .setDescription(`${userNick} kisses ${recipient.nickname}`)
          .setImage(url)
          .setColor(bot.settings.color.yellow)
          .setFooter({
            text: interaction.guild.name,
            iconURL: `https://i.imgur.com/klY5xCe.png"`
          });

        interaction.reply({
          embeds: [kEmbed.toJSON()]
        });
        break;

      case "pat":

        if (recipient === interaction.user) return interaction.reply("Whilst patting yourself is technically allowed, you're not allowed to do it :)");

        await apiFetch("pat");
        if (!url) {
          await apiFetch("pat");
        }

        let pEmbed = new Discord.MessageEmbed()
          .setDescription(`${userNick} pats ${recipient.nickname}`)
          .setImage(url)
          .setColor(bot.settings.color.yellow)
          .setFooter({
            text: interaction.guild.name,
            iconURL: `https://i.imgur.com/klY5xCe.png"`
          });

        interaction.reply({
          embeds: [pEmbed.toJSON()]
        });

        break;

      case "poke":

        await apiFetch("poke");
        if (!url) {
          await apiFetch("poke");
        }

        if (recipient === interaction.user) return interaction.reply("You're not allowed to poke yourself silly.");

        let poEmbed = new Discord.MessageEmbed()
          .setDescription(`${userNick} pokes ${recipient.nickname}`)
          .setImage(url)
          .setColor(bot.settings.color.yellow)
          .setFooter({
            text: interaction.guild.name,
            iconURL: `https://i.imgur.com/klY5xCe.png"`
          });

        interaction.reply({
          embeds: [poEmbed.toJSON()]
        });

        break;

      case "slap":

        if (recipient === interaction.user) return interaction.reply("You really think I'm gonna let you slap yourself? No ❤️");

        await apiFetch("slap");
        if (!url) {
          await apiFetch("slap");
        }

        let sEmbed = new Discord.MessageEmbed()
          .setDescription(`${userNick} slapped ${recipient.nickname}`)
          .setImage(url)
          .setColor(bot.settings.color.yellow)
          .setFooter({
            text: interaction.guild.name,
            iconURL: `https://i.imgur.com/klY5xCe.png"`
          });

        interaction.reply({
          embeds: [sEmbed.toJSON()]
        });
        break;

      case "tickle":

        if (recipient === interaction.user) return interaction.reply("I- no. No tickling yourself. Just ask someone else to tickle you if you wanna feel pain.");

        await apiFetch("tickle");
        if (!url) {
          await apiFetch("tickle");
        }

        let tEmbed = new Discord.MessageEmbed()
          .setDescription(`${userNick} tickles ${recipient.nickname}`)
          .setImage(url)
          .setColor(bot.settings.color.yellow)
          .setFooter({
            text: interaction.guild.name,
            iconURL: `https://i.imgur.com/klY5xCe.png"`
          });

        interaction.reply({
          embeds: [tEmbed.toJSON()]
        });

        break;

      default:
        break;
    }

    // Fetch function
    async function apiFetch(action) {
      await neko.sfw[action]()
        .then(data => url = data.url)
    }
  },
};