module.exports = {
    name: "tadd",
    category: "ticketing",
    description: "Add a user to an ongoing ticket.",
    example: ".tadd @Dave",
    permission: "STAFF",
    run: async (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");
    const config = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8"));

    function errsend(msg) {
        message.channel.send({
            embed: {
                color: bot.settings.color.red,
                description: `Error! ${msg}`
            }
        });
    };

    //Check if tickets are enabled
    if (!config.ticketsenabled) {
        return errsend("Tickets are not enabled in the servers config.")
    };

    //Check if staff role is valid or set
    if (config.staffrole) {
        if (message.guild.roles.get(config.staffrole == undefined)) {
            return errsend("The staff role set is no longer valid.")
        };
    } else {
        return errsend("A staff role is not set in the servers config.")
    };

    //if channel is in ticket cat
    if(message.channel.parent.name !== "Tickets") {
        return errsend("The channel is not in the tickets category.")
    };

    //add user
    let toBeAdded = message.mentions.members.first();
    try{channel.overwritePermissions(toBeAdded.id, {
        SEND_MESSAGES: true,
        READ_MESSAGES: true
    });
    } catch(e) {
        return errsend("Error in adding this user. Please check the console.")
        console.log('[SYSTEM]'.grey, e);
    };
    
    let embed = new Discord.RichEmbed()
    .setColor(bot.setting.green)
    .setDescription(`The user ${toBeAdded.tag} has been added to the ticket.`)
    .setAuthor(message.author.tag, message.author.displayURL)
    .setTimestamp();

    message.channel.send(embed);

}};
