module.exports = {
    name: 'threadCreate',
    once: false,
    async execute(bot, threadChannel) {

        threadChannel.join();

    }
};