module.exports = {
    name: "achievement",
    category: "fun",
    description: "Create your own Minecraft achievement",
    example: ".achievement You've mined a block!",
    permission: "EVERYONE",
    run: async (bot, message, args) => {

    const Discord = require("discord.js");

    var achievement = args.join(" ");
    var request = require('request');
    var fs = require('fs');

    function isEmpty(obj) {
        if (obj == null) return true;
        if (obj.length > 0) return false;
        if (obj.length === 0) return true;
        if (typeof obj !== "object") return true;
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }
        return true;
    }

    let helpE = new Discord.RichEmbed()
    .setColor(bot.settings.color.blue)
    .setTitle("Command: Achievement")
    .addField("Description:", "Insert your own messgae into a Minecraft achievement text box.", true)
    .addField("Usage", "`.achievement <text>`", true)
    .addField("Example", "`.achievement You can spell!`")
    .setFooter(message.author.tag, message.author.avatarURL)
    .setTimestamp();

    if (isEmpty(achievement)) return message.channel.send(helpE);
    var download = function(uri, filename, callback) {
        request.head(uri, function(err, res, body) {
            //console.log('content-type:', res.headers['content-type']);
            //console.log('content-length:', res.headers['content-length']);
            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
    };
    var dir = `./data/images/achievements/${message.guild.id}-${message.author.id}.png`;
    download('https://www.minecraftskinstealer.com/achievement/a.php?i=13&h=Achievement%20unlocked&t=' + achievement, dir, function() {
        message.channel.send(`${message.author} has earned a new achievement.`, {
            file: dir
        });
    });
}};
