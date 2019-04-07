exports.run = (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");

    let servertag = message.guild.name;

    const ownersid = message.guild.ownerID;
    const adminperm = message.member.hasPermission("ADMINISTRATOR");

    //Set up the embed
    const serverconfigfile = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8"));

    //Set the undefined ect variables to proper english
    //Welcomer channel? Default = undefined
    var welcomerchannel = serverconfigfile.welcomerchannel;
    if (welcomerchannel == 0) {
        var welcomerchannel = "Not Set";
    };
    //User on-join role default 0
    var userjoinrole = serverconfigfile.userjoinedrole;
    if (userjoinrole == 0) {
        var userjoinrole = "Not Set";
    };
    //User onjoin set nick default undefined
    var userjoinnick = serverconfigfile.userjoinedname;
    if (userjoinnick == 0) {
        var userjoinnick = "Not Set";
    };
    //Staff role default false
    var staffrole = serverconfigfile.staffrole;
    if (staffrole == false) {
        var staffrole = "Not Set";
    };
    //word filter by default is empty
    var stafffilter = serverconfigfile.stafffilter;
    if (stafffilter.length == 0) {
        var stafffilter = "Empty";
    };
    //autoban by default is undefined
    var staffban = serverconfigfile.staffautoban;
    if (staffban == 0) {
        var staffban = "None"
    };
    //Logging channel by default is 0
    var logchannel = serverconfigfile.loggingchannel;
    if (logchannel == 0) {
        var logchannel = "Not Set";
    };
    //Ticket message by default is undefined
    var ticketmessage = serverconfigfile.ticketsmsg;
    if (ticketmessage == 0) {
        var ticketmessage = "Default";
    };
    //Economy symbol by default is 0
    var ecosymbol = serverconfigfile.economysymbol;
    if (serverconfigfile.economysymbol == 0) {
        var ecosymbol = "$";
    };

    //ugly
    const configmsg = new Discord.RichEmbed()
        .setTitle(`${servertag} Configuration`)
        .setColor(bot.settings.yellow)
        .setDescription(`Your configuration`)
        .addField(`Welcomer`, `Enabled: **${serverconfigfile.welcomerenabled ? "Yes" : "No"} **\nWelcomer Channel: **${welcomerchannel}**\nWelcomer Message: **${serverconfigfile.welcomermessage}**`)
        .addField(`User Join`, `Enabled: **${serverconfigfile.userjoinenabled ? "Yes" : "No"}**\nAdd Role: **${userjoinrole}**\nSet Nick: **${userjoinnick}**`)
        .addField(`Staff`, `Staff Role: **${staffrole}**\nAdmin Commands: **${serverconfigfile.staffadminenabled ? "Enabled" : "Disabled"}**\nLink Blocker: **${serverconfigfile.stafflinkblocker ? "Enabled" : "Disabled"}**\nWord Filter: **${stafffilter}**\nAutoBan: **${staffban}**`)
        .addField(`Logging`, `Enabled: **${serverconfigfile.loggingenabled ? "Yes" : "No"}**\nLogging Channel: **${logchannel}**\nLevel: **${serverconfigfile.logginglevel}**`)
        .addField(`Tickets`, `Enabled: **${serverconfigfile.ticketsenabled ? "Yes" : "No"}**\nTicket Message: **${ticketmessage}**`)
        .addField(`Economy`, `Enabled: **${serverconfigfile.economyenabled ? "Yes" : "No"}**\nRobbing: **${serverconfigfile.economyrobbing ? "Enabled" : "Disabled"}**\nPayments: **${serverconfigfile.economypay ? "Enabled" : "Disabled"}**\nSymbol: **${ecosymbol}**`)
        .addField(`Music`, `Enabled: **${serverconfigfile.musicenabled ? "Yes" : "No"}**`)
        .setFooter(servertag)


    //Check if they have required permissions
    if (adminperm === true) {
        message.channel.send(configmsg);
        return;
    };
    if (ownersid == message.author.id) {

        message.channel.send(configmsg);
        return;
    };
    message.channel.send({
        embed: {
            color: bot.settings.red,
            description: `Error! You are not the owner or an admin!`
        }
    });

};
