exports.run = async (bot, message, args) => {

    const Discord = require("discord.js");
    const superagent = require("superagent");

    const subc = args[0];

    if (subc === "help") {

        let embed = new Discord.RichEmbed()
            .setTitle("Help: Action")
            .setDescription(`Below are all the action commands you can use.`)
            .setColor(bot.settings.color.blue)
            .addField("`.action cuddle @user`", "Cuddle someone you really like.")
            .addField("`.action hug @user`", "Hug someone and make them feel happy.")
            .addField("`.action kiss @user`", "Give that special person a kiss.")
            .addField("`.action pat @user`", "Pat someone for being a good dog.")
            .addField("`.action poke @user`", "Back to the good ol' days of poking people.")
            .addField("`.action slap @user`", "Slap someone just for the sake of it.")
            .addField("`.action tickle @user`", "Tickle someone just to make them annoyed.")
            .setFooter(message.author.tag, message.author.avatarURL);

        message.channel.send(embed);

    } else {
        if (!subc) {

            let embed = new Discord.RichEmbed()
                .setTitle("Help: Action")
                .setDescription(`Below are all the action commands you can use.`)
                .setColor(bot.settings.color.blue)
                .addField("`.action cuddle @user`", "Cuddle someone you really like.")
                .addField("`.action hug @user`", "Hug someone and make them feel happy.")
                .addField("`.action kiss @user`", "Give that special person a kiss.")
                .addField("`.action pat @user`", "Pat someone for being a good dog.")
                .addField("`.action poke @user`", "Back to the good ol' days of poking people.")
                .addField("`.action slap @user`", "Slap someone just for the sake of it.")
                .addField("`.action tickle @user`", "Tickle someone just to make them annoyed.")
                .setFooter(message.author.tag, message.author.avatarURL);

            message.channel.send(embed);


        } else {

            if (subc === "hug") {

                let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
                if (!user) return message.channel.send("Make sure you mention someone!");

                const {
                    body
                } = await superagent
                    .get(`https://nekos.life/api/v2/img/hug`);

                let embed = new Discord.RichEmbed()
                    .setTitle("Action: Hug")
                    .setDescription(`**${message.author.username}** hugged **${message.mentions.users.first().username}**!`)
                    .setImage(body.url)
                    .setColor(bot.settings.color.yellow)
                    .setFooter(message.author.tag, message.author.avatarURL);

                message.channel.send(embed);

            } else {
                if (subc === "kiss") {
                    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
                    if (!user) return message.channel.send("Make sure you mention someone!");

                    const {
                        body
                    } = await superagent
                        .get(`https://nekos.life/api/v2/img/kiss`);

                    let embed = new Discord.RichEmbed()
                        .setTitle("Action: Kiss")
                        .setDescription(`**${message.author.username}** kissed **${message.mentions.users.first().username}**! :heart:`)
                        .setImage(body.url)
                        .setColor(bot.settings.color.yellow)
                        .setFooter(message.author.tag, message.author.avatarURL);

                    message.channel.send(embed);
                } else {
                    if (subc === "tickle") {
                        let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
                        if (!user) return message.channel.send("Make sure you mention someone!");

                        const {
                            body
                        } = await superagent
                            .get(`https://nekos.life/api/v2/img/tickle`);

                        let embed = new Discord.RichEmbed()
                            .setTitle("Action: Tickle")
                            .setDescription(`**${message.author.username}** tickled **${message.mentions.users.first().username}**!`)
                            .setImage(body.url)
                            .setColor(bot.settings.color.yellow)
                            .setFooter(message.author.tag, message.author.avatarURL);

                        message.channel.send(embed);
                    } else {
                        if (subc === "slap") {
                            let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
                            if (!user) return message.channel.send("Make sure you mention someone!");

                            const {
                                body
                            } = await superagent
                                .get(`https://nekos.life/api/v2/img/slap`);

                            let embed = new Discord.RichEmbed()
                                .setTitle("Action: Slap")
                                .setDescription(`**${message.author.username}** slapped **${message.mentions.users.first().username}**! *ouch*`)
                                .setImage(body.url)
                                .setColor(bot.settings.color.yellow)
                                .setFooter(message.author.tag, message.author.avatarURL);

                            message.channel.send(embed);
                        } else {
                            if (subc === "poke") {
                                let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
                                if (!user) return message.channel.send("Make sure you mention someone!");

                                const {
                                    body
                                } = await superagent
                                    .get(`https://nekos.life/api/v2/img/poke`);

                                let embed = new Discord.RichEmbed()
                                    .setTitle("Action: Poke")
                                    .setDescription(`**${message.author.username}** poked **${message.mentions.users.first().username}**!`)
                                    .setImage(body.url)
                                    .setColor(bot.settings.color.yellow)
                                    .setFooter(message.author.tag, message.author.avatarURL);

                                message.channel.send(embed);
                            } else {
                                if (subc === "pat") {
                                    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
                                    if (!user) return message.channel.send("Make sure you mention someone!");

                                    const {
                                        body
                                    } = await superagent
                                        .get(`https://nekos.life/api/v2/img/pat`);

                                    let embed = new Discord.RichEmbed()
                                        .setTitle("Action: Pat")
                                        .setDescription(`**${message.author.username}** patted **${message.mentions.users.first().username}**! *ouch*`)
                                        .setImage(body.url)
                                        .setColor(bot.settings.color.yellow)
                                        .setFooter(message.author.tag, message.author.avatarURL);

                                    message.channel.send(embed);
                                } else {
                                    if (subc === "cuddle") {
                                        let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
                                        if (!user) return message.channel.send("Make sure you mention someone!");

                                        const {
                                            body
                                        } = await superagent
                                            .get(`https://nekos.life/api/v2/img/cuddle`);

                                        let embed = new Discord.RichEmbed()
                                            .setTitle("Action: Cuddle")
                                            .setDescription(`**${message.author.username}** cuddled **${message.mentions.users.first().username}**!`)
                                            .setImage(body.url)
                                            .setColor(bot.settings.color.yellow)
                                            .setFooter(message.author.tag, message.author.avatarURL);

                                        message.channel.send(embed);
                                    }
                                }
                            }
                        }
                    }
                }


            }


        }
    }
}