exports.run = (bot, message, args) => {

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
    
    let achievementHelp = new Discord.RichEmbed()
        .setColor("#a905fc")
        .setTitle("Command: Achievement")
        .addField("Description:", "Make yourself a Minecraft Achievement!", true)
        .addField("Usage", "`.achievement <achievement>`", true)
        .addField("Example", "`.achievement Mining All the Diamonds`")
        .addField("Note", "Please do not spam this command and it may be a bit slow due to how it makes the image.")
        .setFooter(`${message.author.tag}`, `${message.author.avatarURL}`);

    if (isEmpty(achievement)) return message.channel.send(achievementHelp);
    var download = function(uri, filename, callback) {
        request.head(uri, function(err, res, body) {
            //console.log('content-type:', res.headers['content-type']);
            //console.log('content-length:', res.headers['content-length']);
            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
    };
    var dir = `./data/images/achievement/${message.guild.id}-${message.author.id}.png`;
    download('https://www.minecraftskinstealer.com/achievement/a.php?i=13&h=Achievement%20unlocked&t=' + achievement, dir, function() {
        message.channel.send(`${message.author} has earned a new achievement.`, {
            file: dir
        });
    });
};