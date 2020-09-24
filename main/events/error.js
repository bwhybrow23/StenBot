module.exports = async (bot, error) => {
    bot.logger("error", `An error event was sent by Discord.js: \n${JSON.stringify(error)}`);
}