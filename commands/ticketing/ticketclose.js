module.exports = {
    name: "ticketclose",
    category: "ticketing",
    description: "Close an ongoing ticket.",
    example: ".ticketclose",
    permission: "STAFF",
    run: async (bot, message, args) => {
        
    const Discord = require("discord.js");
    const fs = require('fs')
    const config = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8"));

    if (message.channel.parent.name === "Tickets") {
        if (message.channel.name.startsWith("ticket-")) {
            if (config.loggingenabled) {
                if (checkChannel(config.loggingchannel)) {
                    message.guild.channels.get(config.loggingchannel).send({
                        embed: {
                            color: bot.settings.color.yellow,
                            description: `**Ticket Closed**\n**Channel:** ${message.channel.name}\n**ID:** ${message.channel.id}`
                        }
                    })
                };
            };
            message.channel.delete()
        }
    }
}};
