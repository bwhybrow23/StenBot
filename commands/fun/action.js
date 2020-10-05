module.exports = {
    name: "action",
    category: "fun",
    description: "Do various actions such a hug or kiss.",
    usage: "sb!action <ACTION> <@USER>",
    permission: "EVERYONE",
    run: async (bot, message, args) => {

        const Discord = require("discord.js");
        if (!message.guild) return;
        const fetch = require("node-fetch");

        const subc = args[0];

        let user;
        let url;

        switch (subc) {
            case "cuddle":
                try {
                    user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
                } catch (error) {
                    return message.channel.send("Make sure you mention someone!");
                }

                const cBody = await fetch(`https://nekos.life/api/v2/img/cuddle`)
                .then(res => res.json())
                .then(json => url = json.url)

                let cEmbed = new Discord.MessageEmbed()
                    .setTitle("Action: Cuddle")
                    .setDescription(`**${message.author.username}** cuddled **${user.user.username}**!`)
                    .setImage(url)
                    .setColor(bot.settings.color.yellow)
                    .setFooter(message.guild.name, `https://i.imgur.com/BkZY6H8.png"`);

                message.channel.send(cEmbed);
                break;
            case "hug":
                try {
                    user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
                } catch (error) {
                    return message.channel.send("Make sure you mention someone!");
                }

                const hBody = await fetch(`https://nekos.life/api/v2/img/hug`)
                .then(res => res.json())
                .then(json => url = json.url)

                let hEmbed = new Discord.MessageEmbed()
                    .setTitle("Action: Hug")
                    .setDescription(`**${message.author.username}** hugged **${user.user.username}**!`)
                    .setImage(url)
                    .setColor(bot.settings.color.yellow)
                    .setFooter(message.guild.name, `https://i.imgur.com/BkZY6H8.png"`);

                message.channel.send(hEmbed);
                break;

            case "kiss":
                try {
                    user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
                } catch (error) {
                    return message.channel.send("Make sure you mention someone!");
                }

                const kBody = await fetch(`https://nekos.life/api/v2/img/kiss`)
                .then(res => res.json())
                .then(json => url = json.url)

                let kEmbed = new Discord.MessageEmbed()
                    .setTitle("Action: Kiss")
                    .setDescription(`**${message.author.username}** kissed **${user.user.username}**! :heart:`)
                    .setImage(url)
                    .setColor(bot.settings.color.yellow)
                    .setFooter(message.guild.name, `https://i.imgur.com/BkZY6H8.png"`);

                message.channel.send(kEmbed);
                break;

            case "pat":
                try {
                    user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
                } catch (error) {
                    return message.channel.send("Make sure you mention someone!");
                }

                const pBody = await fetch(`https://nekos.life/api/v2/img/pat`)
                .then(res => res.json())
                .then(json => url = json.url)

                let pEmbed = new Discord.MessageEmbed()
                    .setTitle("Action: Pat")
                    .setDescription(`**${message.author.username}** patted **${user.user.username}**! *ouch*`)
                    .setImage(url)
                    .setColor(bot.settings.color.yellow)
                    .setFooter(message.guild.name, `https://i.imgur.com/BkZY6H8.png"`);

                message.channel.send(pEmbed);

                break;

            case "poke":
                try {
                    user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
                } catch (error) {
                    return message.channel.send("Make sure you mention someone!");
                }

                const poBody = await fetch(`https://nekos.life/api/v2/img/poke`)
                .then(res => res.json())
                .then(json => url = json.url)

                let poEmbed = new Discord.MessageEmbed()
                    .setTitle("Action: Poke")
                    .setDescription(`**${message.author.username}** poked **${user.user.username}**!`)
                    .setImage(url)
                    .setColor(bot.settings.color.yellow)
                    .setFooter(message.guild.name, `https://i.imgur.com/BkZY6H8.png"`);

                message.channel.send(poEmbed);

                break;

            case "slap":
                try {
                    user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
                } catch (error) {
                    return message.channel.send("Make sure you mention someone!");
                }

                const sBody = await fetch(`https://nekos.life/api/v2/img/slap`)
                .then(res => res.json())
                .then(json => url = json.url)

                let sEmbed = new Discord.MessageEmbed()
                    .setTitle("Action: Slap")
                    .setDescription(`**${message.author.username}** slapped **${user.user.username}**! *ouch*`)
                    .setImage(url)
                    .setColor(bot.settings.color.yellow)
                    .setFooter(message.guild.name, `https://i.imgur.com/BkZY6H8.png"`);

                message.channel.send(sEmbed);
                break;

            case "tickle":
                try {
                    user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
                } catch (error) {
                    return message.channel.send("Make sure you mention someone!");
                }

                const tBody = await fetch(`https://nekos.life/api/v2/img/tickle`)
                .then(res => res.json())
                .then(json => url = json.url)

                let tEmbed = new Discord.MessageEmbed()
                    .setTitle("Action: Tickle")
                    .setDescription(`**${message.author.username}** tickled **${user.user.username}**!`)
                    .setImage(url)
                    .setColor(bot.settings.color.yellow)
                    .setFooter(message.guild.name, `https://i.imgur.com/BkZY6H8.png"`);

                message.channel.send(tEmbed);

                break;

            default:
            case "help":

                let helpEmbed = new Discord.MessageEmbed()
                    .setTitle("Help: Action")
                    .setDescription(`Below are all the action commands you can use.`)
                    .setColor(bot.settings.color.blue)
                    .addField("`sb!action cuddle @user`", "A cuddle a day keeps the sadness away!")
                    .addField("`sb!action hug @user`", "Everyone needs a hug, so give someone a hug!")
                    .addField("`sb!action kiss @user`", "*kisses softly*")
                    .addField("`sb!action pat @user`", "Some people deserve a pat for doing a good job.")
                    .addField("`sb!action poke @user`", "*pokes* hehe")
                    .addField("`sb!action slap @user`", "Give someone a good ol' right hander.")
                    .addField("`sb!action tickle @user`", "TICKLE MONSTER TIME")
                    .setFooter(message.author.tag, message.author.avatarURL);

                message.channel.send(helpEmbed);

                break;
        }
    },
};