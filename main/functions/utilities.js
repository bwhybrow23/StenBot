const fs = require("fs")
const logger = require("./console.js")

// /*
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

/*
  Reset Verification Message
*/
const resetVerif = (bot) => {

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
            "description": "Make sure to read <#526078002153521182> and then click the ✅ to get access to the rest of the discord.",
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
}

module.exports = {
    resetVerif
}