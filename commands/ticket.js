exports.run = (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");
    const config = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8"));

    var reason = args.slice(0).join(" ");
    var format = require("string-template");
    var tnum = Math.floor(Math.random() * 1000001);
    //var staffroleobj = message.guild.roles.get(config.staffrole);

    function errsend(msg) {
        message.channel.send({embed: {color: bot.settings.red, description: `Error! ${msg}`}});
    };

    //Check if tickets are enabled
    if (!config.ticketsenabled) { return errsend("Tickets are not enabled in the servers config.")};

    //Check if staff role is valid or set
    if (config.staffrole) {
        if (message.guild.roles.get(config.staffrole == undefined)) { return errsend("The staff role set is no longer valid.")};
    } else { return errsend("A staff role is not set in the servers config.") };

    //Check if supplied sufficient reason
    if (reason.length < 1) { return errsend("Make sure you include a reason for creating this ticket.") };
    if (reason.length > 200) { return errsend("Your reason is too long! Make sure its less than **200** characters.") };

    //Check for a category called tickets, if it does not exist create one
    function isCatTickets(element) {
        if (element.constructor.name != "CategoryChannel") { return false };
        if (element.name != "Tickets") { return false };
        return true;
    };
    if(!message.guild.channels.some(isCatTickets)) {
        message.guild.createChannel("Tickets", "category");

        message.reply("An error occured. Please try again.");
    };

    //Create channel into ticket category

    function createChan(element) {
        if (element.constructor.name == "CategoryChannel") {
            if(element.name == "Tickets") {
                message.guild.createChannel(`ticket-${tnum}`, "text").then(channel => {
                    channel.setParent(element.id);
                    channel.setTopic("Ticket");

                    //Remove everyone from the channel:
                    channel.overwritePermissions(message.guild.id, {
                        SEND_MESSAGES: false,
                        READ_MESSAGES: false
                      });
                    channel.overwritePermissions(message.guild.roles.get(config.staffrole), {
                        SEND_MESSAGES: true,
                        READ_MESSAGES: true,
                        MANAGE_MESSAGES: true
                      });
                    channel.overwritePermissions(message.author, {
                        SEND_MESSAGES: true,
                        READ_MESSAGES: true,
                        MANAGE_MESSAGES: true
                      });

                    //Fill in the placeholders <3
                    var tMessage = [];
                    if(config.ticketsmsg == 0) {
                        tMessage.push(`**User:** ${message.author.tag}\n**Reason:** ${reason}`);
                    } else {
                        tMessage.push(format(config.ticketsmsg, {
                            user: message.author.tag,
                            reason: reason
                        }));
                    };
                    
                    channel.send({embed: {color: bot.settings.yellow, description: `**New Ticket:**\n${tMessage[0]}`}});
                    message.channel.send({embed: {color: bot.settings.green, description: `Your ticket ${channel} has been created, ${message.member.displayName}`}});

                    //Check if logging enabled
                    var checkChannel=(id)=>{
                        let tchannel=bot.channels.get(id);
                        if (tchannel==undefined) {
                            return false;
                        } else {
                            return true;
                        };
                    };

                    if(config.loggingenabled) {
                        if(checkChannel(config.loggingchannel)) {
                        message.guild.channels.get(config.loggingchannel).send({embed: {color: bot.settings.yellow, description: `**Ticket Created**\n**Created By:** ${message.author.tag}\n**Channel:** ${channel.name}\n**Id:** ${channel.id}\n\n**Reason:** ${reason}`}});  
                        };
                    };
                });
            }
        }
    };
    createChan(message.guild.channels.some(createChan)); //Run the beast
    




};
