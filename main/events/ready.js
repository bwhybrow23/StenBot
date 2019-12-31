module.exports = (bot) => {
	
	const utils = require("../functions/utilities.js");
	
    let date = new Date;
    console.log('[SYSTEM]'.grey, `StenBot Started Successfully. Version: ${bot.settings.version}`.green);

    //playing statuses
    let guildSize = bot.guilds.size;
    var presences = [
        "StenDevelopment",
        ".help",
        "With Code",
        `On ${guildSize} servers!`,
        `Version ${bot.settings.version}`
    ]

    //changes playing status every X seconds
    //    bot.user.setActivity(utils.randItemFromArray(presences)).then(() => {
    //        setTimeout(() => {
    //            bot.user.setActivity(utils.randItemFromArray(presences))
    //        }, 600000)
    //    });

    //filler for playing status (if above errors)
    bot.user.setPresence({
        game: {
            name: `On ${guildSize} servers!`,
            type: 'STREAMING',
            url: 'https://www.twitch.tv/stentorianyt'
        }
    });

    //VERIFICATION FOR SUPPORT DISCORD
    if (bot.settings.options.verifEnabled) {
        utils.resetVerif(bot)
    };
}