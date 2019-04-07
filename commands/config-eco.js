exports.run = (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");
    const checker = require("typechecker");

    let servertag = message.guild.name;

    const ownersid = message.guild.ownerID;
    const adminperm = message.member.hasPermission("ADMINISTRATOR");


    var access = true;

    if (adminperm == false) {
        var access = false;
    };

    if (access == false) {
        if (ownersid == message.author.id) {
            var access = true;
        };
    };

    if (access == false) {
        return message.channel.send({
            embed: {
                color: bot.settings.red,
                description: `Error! You are not the owner or an admin!`
            }
        });
    };

    //Check if they included a setting
    let setting = args[0];

    if (setting == undefined) {
        return message.channel.send({
            embed: {
                color: bot.settings.red,
                description: `Error! You forgot to include a economy setting.`
            }
        });
    };

    //Get the server config
    const config = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8"));

    //Settings library
    switch (setting) {
        case "enable":

        if (config.economyenabled==true) {
          return message.channel.send({embed: {color: bot.settings.yellow, description: `Oh no. Looks like economy commands are already enabled!`}});
        };
        config.economyenabled =true;

        fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
            if (err) return;
        });

        message.channel.send({embed: {color: bot.settings.green, description: `Economy commands have been enabled!`}});
            break;
       case "disable":

        if (config.economyenabled==false) {
              return message.channel.send({embed: {color: bot.settings.yellow, description: `Oh no. Looks like economy commands are already disabled!`}});
        };
        config.economyenabled =false;

        fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => {
            if (err) return;
        });

        message.channel.send({embed: {color: bot.settings.green, description: `Economy have been disabled!`}});
            break;
        case "robbing":

            var status = args[1];
            if (status == undefined) { return message.channel.send({embed: {color: bot.settings.yellow, description: `Please put either **enable** or **disable**.`}})};

            if (status == "enable") {
              if (config.economyrobbing == true) { return message.channel.send({embed: {color: bot.settings.yellow, description: `Robbing is already enabled!`}})};
              config.economyrobbing = true;
              fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => { if (err) return;});
              message.channel.send({embed: {color: bot.settings.green, description: `Economy robbing has been enabled.`}});
            } else if (status == "disable") {
              if (config.economyrobbing == false) {return message.channel.send({embed: {color: bot.settings.yellow, description: `Robbing is already disabled`}})};
              config.economyrobbing = false;
              fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => { if (err) return;});
              message.channel.send({embed: {color: bot.settings.green, description: `Economy robbing commands have been disabled!`}});
            };

            break;
            case "pay":

                var status = args[1];
                if (status == undefined) { return message.channel.send({embed: {color: bot.settings.yellow, description: `Please put either **enable** or **disable**.`}})};

                if (status == "enable") {
                  if (config.economyrobbing == true) { return message.channel.send({embed: {color: bot.settings.yellow, description: `Payments are already enabled!`}})};
                  config.economyrobbing = true;
                  fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => { if (err) return;});
                  message.channel.send({embed: {color: bot.settings.green, description: `Payments have been enabled.`}});
                } else if (status == "disable") {
                  if (config.economyrobbing == false) {return message.channel.send({embed: {color: bot.settings.yellow, description: `Payments are already disabled`}})};
                  config.economyrobbing = false;
                  fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => { if (err) return;});
                  message.channel.send({embed: {color: bot.settings.green, description: `Payment commands have been disabled!`}});
                };

                break;
            case "currency":

                var symbol = args[1];

                if (symbol == undefined) { return message.channel.send({embed: {color: bot.settings.yellow, description: `Please enter a currency symbol!`}})};
                if (symbol.length > 5) { return message.channel.send({embed: {color: bot.settings.yellow, description: `The symbol you have entered is too long!`}})};

                config.economysymbol = String(symbol);

                fs.writeFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, JSON.stringify(config, null, 4), (err) => { if (err) return;});

                message.channel.send({embed:{color: bot.settings.yellow, description: `Economy symbol has been set to **${symbol}**`}});
                break;
        default:
            message.channel.send({
                embed: {
                    color: bot.settings.red,
                    description: `Error! No economy setting called **${setting}**`
                }
            });
    };
};
