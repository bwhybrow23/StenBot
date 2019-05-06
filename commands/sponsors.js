exports.run = (bot, message, args) => {

    const Discord = require("discord.js");

    //TO BE COMPLETED
    let mainEmbed = new Discord.RichEmbed()
    .setColor(bot.settings.blue)
    .setTitle("Sponsors")
    .setDescription("React to this message in order to see the sponsor message for the company you pick.")
    .addField("Companies:\n🇰 - KewlHost Ltd.\n🇸 - Shadow")
    .setFooter(message.author.tag, message.author.displayAvatarURL);

    let khEmbed = new Discord.RichEmbed()
    .setColor(bot.settings.yellow)
    .setTitle("Sponsor - KewlHost")
    .setDescription("KewlHost is a cheap hosting company founded by Samb8104. Ranging from Minecraft server hosting to Application Hosting, KewlHost has it all. With prices from $1.50, you wont wanna miss out!\nCheck out the Discord here: https://discord.gg/sRw3JgZ")
    .addField("Offer Code", "Use code `StenBot` for 15% off your first order with KewlHost!")
    .setFooter(message.author.tag, message.author.displayAvatarURL);

    let shadowEmbed = new Discord.RichEmbed()
    .setColor(bot.settings.yellow)
    .setTitle("Sponsor - Shadow")
    .setDescription("Shadow is a Virtual Gaming PC provider created by Blade Inc. They provide top of the range Gaming PCs for a very cheap monthly price. With their PC's they also offer special deals or games that you can get for using Shadow.")
    .addField("Offer Code", "Use code `BENZK7UF` for 10% off your first month of Shadow!")
    .setFooter(message.author.tag, message.author.displayAvatarURL);

    message.channel.send(mainEmbed).then(message => {
        message.react('🇰').then(reaction => { message.react('🇸'); });

        const filter = (reaction, user) => {
			return ['🇰', '🇸'].includes(reaction.emoji.name) && user.id === message.author.id;
        };

        message.awaitReactions(filter, { max: 1 })
            .then(collected => {
                const reaction = collected.first();

                if (reaction.emoji.name === '🇰') {
                    message.channel.send(khEmbed);
                } else {
                     if (reaction.emoji.name === '🇸') {
                    message.channel.send(shadowEmbed);
                }};
            });
    });
}