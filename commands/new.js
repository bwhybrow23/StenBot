const Discord = require("discord.js");

module.exports.run = async (bot, message, args, prefix) => {

    function clean(text) {
        if (typeof(text) === "string")
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
    }

    const ticketReason = message.content.split(" ").slice(1).join(" ");
    if (!message.guild.roles.some(x => x.name === "Support Team")) return message.channel.send(`This server doesn't have a \`Support Team\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
    if (message.guild.channels.some(x => x.name === `ticket-${message.author.username}`, "text")) return message.channel.send(`You already have a ticket open.`);
    message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {
        let role = message.guild.roles.find(x => x.name === "Support Team");
        let role2 = message.guild.roles.find(x => x.name === "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });

        message.channel.send(`:white_check_mark: Your ticket has been created, #${c.name}.`);

        const ticketEmbed = new Discord.RichEmbed()
        .setColor("GREEN")
        .setDescription(`Dear ${message.author},\nThanks for reaching out to our Support Team!\nThey will get back to you as soon as possible!`)
        .addField(`Subject`, ticketReason || "Undefined")
        .setFooter(`StenBot | \`.invite\` | By Stentorian#0001`);

        c.send(ticketEmbed);
    });
}

module.exports.help = {
  name: "new"
}