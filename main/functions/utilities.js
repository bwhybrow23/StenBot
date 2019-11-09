module.exports = {
    getMember: function(message, toFind = '') {
        toFind = toFind.toLowerCase();

        let target = message.guild.members.get(toFind);
        
        if (!target && message.mentions.members)
            target = message.mentions.members.first();

        if (!target && toFind) {
            target = message.guild.members.find(member => {
                return member.displayName.toLowerCase().includes(toFind) ||
                member.user.tag.toLowerCase().includes(toFind)
            });
        }
            
        if (!target) 
            target = message.member;
            
        return target;
    },

    formatDate: function(date) {
        return new Intl.DateTimeFormat('en-US').format(date)
    },

    promptMessage: async function (message, author, time, validReactions) {
        // We put in the time as seconds, with this it's being transfered to MS
        time *= 1000;

        // For every emoji in the function parameters, react in the good order.
        for (const reaction of validReactions) await message.react(reaction);

        // Only allow reactions from the author, 
        // and the emoji must be in the array we provided.
        const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

        // And ofcourse, await the reactions
        return message
            .awaitReactions(filter, { max: 1, time: time})
            .then(collected => collected.first() && collected.first().emoji.name);
    },

    resetVerif: (bot) => {

        const fs = require("fs")
        const logger = require("./console.js")

        let botData = JSON.parse(fs.readFileSync("./data/global/bot-data.json"))
        let serverGuild = bot.guilds.get(bot.settings.ids.mainGuild)
    
        let serverChannel = serverGuild.channels.find(channel => {
            if (channel.name == "verification") {
                return channel
            }
        })
    
        serverChannel.fetchMessage(botData.verifMsgID).then(message => {
            message.delete()
        })
    
        serverChannel.send({
            "embed": {
                "title": "SERVER VERIFICATION",
                "description": "Make sure to read <#624316687537405954> and then click the ✅ to get access to the rest of the discord.",
                "color": bot.settings.color.yellow,
                "footer": {
                    "icon_url": "https://cdn.discordapp.com/icons/455782308293771264/f1b9f8fab440a16edb3c4cabc5904e17.webp?size=256",
                    "text": "If you have any issues DM Stentorian#9524 on Discord!"
                }
            }
        }).then(message => {
            botData.verifMsgID = message.id
            fs.writeFileSync("./data/global/bot-data.json", JSON.stringify(botData, null, 4));
            message.react("✅");
            //   .then(reaction => {
            // message.react("🎮").then(reaction => {
            //   message.react("⚙")
            // })
            //   })
            logger.post("success", "Verification message reset.")
        })

    //   Message counter increase
    // */
    // const messageCounter = (authorId) => {
    //     const messageCount = JSON.parse(fs.readFileSync("./storage/discord/messageCount.json"))
    //     var exist = false
    //     messageCount.records.forEach(record => {
    //       if (record.id == authorId) {
    //         exist = true
    //         record.messages = record.messages + 1
    //       }
    //     })
    //     if (exist === false) {
    //       messageCount.records.push({
    //         id: authorId,
    //         messages: 1
    //       })
    //     }
    //     fs.writeFileSync("./storage/discord/messageCount.json", JSON.stringify(messageCount, null, 4))
    // }
    
}};
