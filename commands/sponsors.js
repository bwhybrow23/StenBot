exports.run = (bot, message, args) => {

    const Discord = require("discord.js");

    let subc = args[0];

    //TO BE COMPLETED
    let mainEmbed = new Discord.RichEmbed()
        .setColor(bot.settings.blue)
        .setTitle("Sponsors")
        .setDescription("Type in the following to view the sponsor message for each company.")
        .addField("Companies:", "`.sponsors kewlhost` - KewlHost \n`.sponsors shadow` - Shadow\n")
        .setFooter(message.author.tag, message.author.displayAvatarURL);

    let khEmbed = new Discord.RichEmbed()
        .setColor(bot.settings.yellow)
        .setTitle("Sponsor - KewlHost")
        .setDescription("KewlHost is a cheap hosting company founded by Samb8104. Ranging from Minecraft server hosting to Application Hosting, KewlHost has it all. With prices from $1.50, you wont wanna miss out!\nCheck out the Discord here: https://discord.kewlhost.co.uk/")
        .addField("Offer Code", "Use code `StenBot` for 15% off your first order with KewlHost!")
        .setFooter(message.author.tag, message.author.displayAvatarURL);

    let shadowEmbed = new Discord.RichEmbed()
        .setColor(bot.settings.yellow)
        .setTitle("Sponsor - Shadow")
        .setDescription("Shadow is a Virtual Gaming PC provider created by Blade Inc. They provide top of the range Gaming PCs for a very cheap monthly price. With their PC's they also offer special deals or games that you can get for using Shadow.\nCheck out their website here: https://shadow.tech/")
        .addField("Offer Code", "Use code `BENZK7UF` for 10% off your first month of Shadow!")
        .setFooter(message.author.tag, message.author.displayAvatarURL);

    let errorEmbed = new Discord.RichEmbed()
        .setColor(bot.settings.red)
        .setDescription(`I cannot find a sponsor under the name of \`${subc}\``)
        .setFooter(message.author.tag, message.author.displayAvatarURL);

    let googleEmbed = new Discord.RichEmbed()
        .setColor(bot.settings.red)
        .setDescription(`I cannot find a sponsor under the name of \`google\`. I wished that was a thing.`)
        .setFooter(message.author.tag, message.author.displayAvatarURL);

    if (!subc || subc === "help") {
        message.channel.send(mainEmbed);
    } else if (subc === "kewlhost") {
        message.channel.send(khEmbed);
    } else if (subc === "shadow") {
        message.channel.send(shadowEmbed);
    } else if (subc === "google") {
        message.channel.send(googleEmbed);
    } else {
        message.channel.send(errorEmbed);
    }

    // message.channel.send(mainEmbed).then(message => {
    //     message.react('🇰').then(reaction => {
    //         message.react('🇸');
    //     });

    //     const filter = (reaction, user) => {
    //         return ['🇰', '🇸'].includes(reaction.emoji.name) && user.id === message.author.id;
    //     };

    //     message.awaitReactions(filter, {
    //             max: 1
    //         })
    //         .then(collected => {
    //             let bot = false;
    //             const reaction = collected.first();
    //             if (reaction.users.first().bot) bot = true;
    //             if (bot = true) return;

    //             if (reaction.emoji.name === '🇰') {
    //                 message.channel.send(khEmbed);
    //             } else {
    //                 if (reaction.emoji.name === '🇸') {
    //                     message.channel.send(shadowEmbed);
    //                 }
    //             };
    //         });
    // });
}