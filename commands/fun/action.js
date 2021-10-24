module.exports = {
    name: "action",
    category: "fun",
    description: "Do various actions such as hug or kiss.",
    usage: "<ACTION> <@USER>",
    example: "hug @Sam#9215",
    options: { permission: "EVERYONE", enabled: true, cooldown: 3, guildOnly: true },
    run: async (bot, message, args) => {
  
      const Discord = require("discord.js");
  
      const nekos = require('nekos.life');
      const neko = new nekos();
  
      const subc = args[0];
  
      let user;
      let url;
      let argsMsg = args.slice(1).join(" ");
      let userNick = message.author.username;
  
      switch (subc) {
        case "cuddle":
          try {
            user = message.mentions.users.first();
          } catch (error) {
            return message.channel.send("Make sure you mention someone!");
          }
  
          if (user === message.author) return message.channel.send("You can't cuddle yourself, you silly goose.");
  
          await apiFetch("cuddle");
          if (!url) {
            await apiFetch("cuddle");
          }
  
          let cEmbed = new Discord.MessageEmbed()
            .setDescription(`${userNick} cuddles ${argsMsg}`)
            .setImage(url)
            .setColor(bot.settings.color.yellow)
            .setFooter(message.guild.name, `https://i.imgur.com/klY5xCe.png"`);
  
          message.channel.send({embeds: [cEmbed.toJSON()]});
          break;
        case "feed":
          try {
            user = message.mentions.users.first();
          } catch (error) {
            return message.channel.send("Make sure you mention someone!");
          }
  
          await apiFetch("feed");
          if (!url) {
            await apiFetch("feed");
          }
  
          let fEmbed = new Discord.MessageEmbed()
            .setDescription(`${userNick} feeds ${argsMsg}`)
            .setImage(url)
            .setColor(bot.settings.color.yellow)
            .setFooter(message.guild.name, `https://i.imgur.com/klY5xCe.png"`);
  
          message.channel.send({embeds: [fEmbed.toJSON()]});
          break;
        case "hug":
          try {
            user = message.mentions.users.first();
          } catch (error) {
            return message.channel.send("Make sure you mention someone!");
          }
  
          if (user === message.author) return message.channel.send("You can't hug yourself, you silly goose.");
  
          await apiFetch("hug");
          if (!url) {
            await apiFetch("hug");
          }
  
          let hEmbed = new Discord.MessageEmbed()
            .setDescription(`${userNick} hugs ${argsMsg}`)
            .setImage(url)
            .setColor(bot.settings.color.yellow)
            .setFooter(message.guild.name, `https://i.imgur.com/klY5xCe.png"`);
  
          message.channel.send({embeds: [hEmbed.toJSON()]});
          break;
  
        case "kiss":
          try {
            user = message.mentions.users.first();
          } catch (error) {
            return message.channel.send("Make sure you mention someone!");
          }
  
          if (user === message.author) return message.channel.send("You can't kiss yourself, you silly goose.");
  
          await apiFetch("kiss");
          if (!url) {
            await apiFetch("kiss");
          }
  
          let kEmbed = new Discord.MessageEmbed()
            .setDescription(`${userNick} kisses ${argsMsg}`)
            .setImage(url)
            .setColor(bot.settings.color.yellow)
            .setFooter(message.guild.name, `https://i.imgur.com/klY5xCe.png"`);
  
          message.channel.send({embeds: [kEmbed.toJSON()]});
          break;
  
        case "pat":
          try {
            user = message.mentions.users.first();
          } catch (error) {
            return message.channel.send("Make sure you mention someone!");
          }
  
          if (user === message.author) return message.channel.send("Whilst patting yourself is technically allowed, you're not allowed to do it :)");
  
          await apiFetch("pat");
          if (!url) {
            await apiFetch("pat");
          }
  
          let pEmbed = new Discord.MessageEmbed()
            .setDescription(`${userNick} pats ${argsMsg}`)
            .setImage(url)
            .setColor(bot.settings.color.yellow)
            .setFooter(message.guild.name, `https://i.imgur.com/klY5xCe.png"`);
  
          message.channel.send({embeds: [pEmbed.toJSON()]});
  
          break;
  
        case "poke":
          try {
            user = message.mentions.users.first();
          } catch (error) {
            return message.channel.send("Make sure you mention someone!");
          }
  
          await apiFetch("poke");
          if (!url) {
            await apiFetch("poke");
          }
  
          if (user === message.author) return message.channel.send("You're not allowed to poke yourself silly.");
  
          let poEmbed = new Discord.MessageEmbed()
            .setDescription(`${userNick} pokes ${argsMsg}`)
            .setImage(url)
            .setColor(bot.settings.color.yellow)
            .setFooter(message.guild.name, `https://i.imgur.com/klY5xCe.png"`);
  
          message.channel.send({embeds: [poEmbed.toJSON()]});
  
          break;
  
        case "slap":
          try {
            user = message.mentions.users.first();
          } catch (error) {
            return message.channel.send("Make sure you mention someone!");
          }
  
          if (user === message.author) return message.channel.send("You really think I'm gonna let you slap yourself? No ❤️");
  
          await apiFetch("slap");
          if (!url) {
            await apiFetch("slap");
          }
  
          let sEmbed = new Discord.MessageEmbed()
            .setDescription(`${userNick} slapped ${argsMsg}`)
            .setImage(url)
            .setColor(bot.settings.color.yellow)
            .setFooter(message.guild.name, `https://i.imgur.com/klY5xCe.png"`);
  
          message.channel.send({embeds: [sEmbed.toJSON()]});
          break;
  
        case "tickle":
          try {
            user = message.mentions.users.first();
          } catch (error) {
            return message.channel.send("Make sure you mention someone!");
          }
  
          if (user === message.author) return message.channel.send("I- no. No tickling yourself. Just ask someone else to tickle you if you wanna feel pain.");
  
          await apiFetch("tickle");
          if (!url) {
            await apiFetch("tickle");
          }
  
          let tEmbed = new Discord.MessageEmbed()
            .setDescription(`${userNick} tickles ${argsMsg}`)
            .setImage(url)
            .setColor(bot.settings.color.yellow)
            .setFooter(message.guild.name, `https://i.imgur.com/klY5xCe.png"`);
  
          message.channel.send({embeds: [tEmbed.toJSON()]});
  
          break;
  
        default:
        case "help":
  
          let helpEmbed = new Discord.MessageEmbed()
            .setTitle("Help: Action")
            .setDescription(`Below are all the action commands you can use.`)
            .setColor(bot.settings.color.blue)
            .addField("`sb!action cuddle @user`", "A cuddle a day keeps the sadness away!")
            .addField("`sb!action feed @user`", "Here comes the aeroplane *nyerm*")
            .addField("`sb!action hug @user`", "Everyone needs a hug, so give someone a hug!")
            .addField("`sb!action kiss @user`", "*kisses softly*")
            .addField("`sb!action pat @user`", "Some people deserve a pat for doing a good job.")
            .addField("`sb!action poke @user`", "*pokes* hehe")
            .addField("`sb!action slap @user`", "Give someone a good ol' right hander.")
            .addField("`sb!action tickle @user`", "TICKLE MONSTER TIME")
            .setFooter(message.author.tag, message.author.avatarURL);
  
          message.channel.send({embeds: [helpEmbed]});
  
          break;
      }
  
      // Fetch function
      async function apiFetch(action) {
        await neko.sfw[action]()
          .then(data => url = data.url)
      }
    },
  };