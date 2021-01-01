module.exports = {
    name: "api",
    category: "bot",
    description: "Generate an API token to use at https://benwhybrow.com/api",
    usage: "",
    example: "",
    permission: "EVERYONE",
    aliases: [],
    enabled: true,
    run: async (bot, message, args) => {

        if(message.channel.type === "guild") message.delete();

        bot.mutils.createUser(message.author.id).then(authToken => {
            return bot.createEmbed("success", "API Information", "Use the below token to connect to the [StenBot API](https://benwhybrow.com/api). It will be used a form of authentication to check that you can perform an action.", [{name: "API Token:", value: `**${authToken}**`}], message.author.tag, bot).then(embed => message.author.send(embed));
        });

}};