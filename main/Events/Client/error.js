module.exports = {
    name: 'error',
    once: false,
    async execute(bot, error) {
        bot.log.post('error', `An error event was sent by Discord.js: \n${JSON.stringify(error)}`);
    }
};