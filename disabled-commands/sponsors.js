module.exports = {
  name: "sponsors",
  category: "bot",
  description: "View all of StenBot's Sponsors.",
  usage: "sb!sponsors kewlhost",
  permission: "BOT OWNER",
  run: async (bot, message, args) => {
    const Discord = require("discord.js");

    let subc = args[0];

    //TO BE COMPLETED
    let mainEmbed = new Discord.MessageEmbed()
      .setColor(bot.settings.color.blue)
      .setTitle("Sponsors")
      .setDescription(
        "Type in the following to view the sponsor message for each company."
      )
      .addField(
        "Companies:",
        "`sb!sponsors kewlhost` - KewlHost \n`sb!ponsors shadow` - Shadow \n`sb!ponsors honey` - Honey \n`sb!ponsors Brave` - Brave Browser"
      )
      .setFooter(message.author.tag, message.author.displayAvatarURL());

    let khEmbed = new Discord.MessageEmbed()
      .setColor(bot.settings.color.yellow)
      .setTitle("Sponsor - KewlHost")
      .setURL(`https://discord.kewlhost.co.uk/`)
      .setDescription(
        "KewlHost is a cheap hosting company founded by Samb8104. Ranging from Minecraft server hosting to Application Hosting, KewlHost has it all. With prices from $1.50, you wont wanna miss out!\nCheck out the Discord here: https://discord.kewlhost.co.uk/"
      )
      .addField(
        "Offer Code",
        "Use code `BEN` for 15% off your first order with KewlHost!"
      )
      .setFooter(message.author.tag, message.author.displayAvatarURL());

    let shadowEmbed = new Discord.MessageEmbed()
      .setColor(bot.settings.color.yellow)
      .setTitle("Sponsor - Shadow")
      .setURL(`https://shop.shadow.tech/gben/invite/BENZK7UF`)
      .setDescription(
        "Shadow is a Virtual Gaming PC provider created by Blade Inc. They provide top of the range Gaming PCs for a very cheap monthly price. With their PC's they also offer special deals or games that you can get for using Shadow.\nCheck out their website here: https://shadow.tech/"
      )
      .addField(
        "Offer Code",
        "Use code `BENZK7UF` for 10% off your first month of Shadow!"
      )
      .setFooter(message.author.tag, message.author.displayAvatarURL());

    let honeyEmbed = new Discord.MessageEmbed()
      .setColor(bot.settings.color.yellow)
      .setTitle("Sponsor - Honey")
      .setURL(`https://joinhoney.com/ref/28rmyvq`)
      .setDescription(
        "Honey is a browser extension that is supported in most major browsers (Chrome, Firefox, Brave, etc) to apply the latest and greatest of promotion codes automatically when you're at the checkout on your favorite online store. It works on sites such as eBay, Udemy and Microsoft just to name a few. Signup today for FREE and start saving money!"
      )
      .addField("Referral Link", "https://joinhoney.com/ref/28rmyvq")
      .setFooter(message.author.tag, message.author.displayAvatarURL());

    let braveEmbed = new Discord.MessageEmbed()
      .setColor(bot.settings.color.yellow)
      .setTitle("Sponsor - Brave Browser")
      .setURL(`https://brave.com/ste252`)
      .setDescription(
        "Brave is a browser focused around creating a safer and faster internet. With its built in ad-blocker, own rewards program and it's Chromium back end, why not check it out. It's free! Download it for 30 days and if you don't like it, then just uninstall it!"
      )
      .addField("Referral Link", "https://brave.com/ste252")
      .setFooter(message.author.tag, message.author.displayAvatarURL());

    let errorEmbed = new Discord.MessageEmbed()
      .setColor(bot.settings.color.red)
      .setDescription(`I cannot find a sponsor under the name of \`${subc}\``)
      .setFooter(message.author.tag, message.author.displayAvatarURL());

    let googleEmbed = new Discord.MessageEmbed()
      .setColor(bot.settings.color.red)
      .setDescription(
        `I cannot find a sponsor under the name of \`google\`. I wished that was a thing.`
      )
      .setFooter(message.author.tag, message.author.displayAvatarURL());

    if (!subc || subc === "help") {
      message.channel.send(mainEmbed);
    } else if (subc === "kewlhost") {
      message.channel.send(khEmbed);
    } else if (subc === "shadow") {
      message.channel.send(shadowEmbed);
    } else if (subc === "honey") {
      message.channel.send(honeyEmbed);
    } else if (subc === "brave") {
      message.channel.send(braveEmbed);
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
  },
};