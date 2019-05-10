exports.run = (bot, message, args) => {

    const Discord = require("discord.js");

    let userimage = message.author.avatarURL;
    let usertag = message.author.tag;

    //Help Defautl Message
    let helpembed = new Discord.RichEmbed()
        .setTitle('Hey! What\'s up?')
        .setColor(bot.settings.green)
        .setDescription(`\nTo learn more about StenBot enter one of the following menus after the help command.\n\n**config**\n**config-2**\n**info**\n**gaming**\n**fun**\n**economy**\n**support**\n**music**\n**roles**\n**staff**\n**admin**\n**account**`)
        .setFooter(usertag, userimage)

    //Create embed function:
    var createEmbed = (title, description) => {
        let embed = new Discord.RichEmbed()
            .setTitle(title)
            .setColor(bot.settings.green)
            .setDescription(description)
            .setFooter(usertag + " Learn More - docs.benwhybrow.xyz", userimage)
        return embed;
    };

    let menu = args[0];

    switch (menu) {
        case 'config':

            message.channel.send(createEmbed('Configuration Commands', '`.config-reset` - Resets your server config to defaults.\n`.config` - View your servers configuration.\n`.config-welcomer (enable/disable)` - Enable or disable welcomer\n`.config-welcomer placeholders` - Shows message placeholders\n`.config-welcomer channel [#channel]` - Set the welcomers channel\n`.config-welcomer message [message]` - Set the welcomer message\n`.config-welcomer test` - Test your welcomer configuration\n`.config-userjoin (enable/disable)` - Enable or disable the user join bot.settings\n`.config-userjoin role [@role]` - Set the role on join\n`.config-userjoin name [name]` - Set the users nickname on join\n`.config-staff role [@role]` - Set the servers staff role\n`.config-staff admin enable` - Enable admin commands\n`.config-staff linkblock enable` - Enable linkblocker\n`.config-staff filteradd [word]` - Add a word to the chat fitler\n`.config-staff fitlerremove [word]` - Remove a word from the chat filter\n`.config-staff warncap [points amount]` - Set a warnings cap'));
            break;
        case 'config-2':
            //.config-log enable` - Enable server logging but a channel will still need to be set\n\n`.config-log channel [#channel]` - Set the logging channel\n`config-log level (low/medium/high)` - Set the logging detail level, default medium\n
            message.channel.send(createEmbed('Configuration Commands Page 2', '\n`.config-tickets enable` - Enable or disable tickets\n`.config-tickets message [message]` - Set the ticket creation message that is sent in the ticket\n\n`.config-eco enable` - Enable or disable economy\n`.config-eco robbing enable` - Enable or disable economy robbing\n`.config-eco pay disable` - Enable/Disable economy pay, default enabled\n`.config-eco currency [symbol]` - Set the currency symbol\n`.config-music enable` - Enable/disable music commands\n`.config-log channel [#channel]` - Sets logger channel.\n`.config-log level [low|medium|high]` - Set logging level\n`.config-log (enable/disable)` - Enable or disable logging\n'));
            break;
        case 'info':

            message.channel.send(createEmbed('Informational Commands', '`.help [Optional: menu]` - Shows the help menu list or a help menu\n`.user [Optional: @user]` - Show information about you or the mentioned user\n\n`.server` - View information about the server your in\n`.status` - Displays StenBot statistics\n`.about` - View additional information about StenBot\n'));
            break;
        case 'gaming':

            message.channel.send(createEmbed('Gaming Commands', '`.gamestats fortnite [platform] [your account]` - Shows your fortnite account stats\n`.gamestats overwatch [your account]` - Shows your overwatch account stats\n`.mcping [server ip] [Optional: port]` - Pings a minecraft server and shows the results'));
            break;
        case 'fun':

            message.channel.send(createEmbed('Fun Commands', '`.animal (cat/dog/fox)` - Get a random picture of the specified animal\n`.coinflip` - Generate heads or tails\n`.marry [@user]` - Marry a user, requires their permission\n`.divorce` - Divorce from your marriage\n`.unscramble` - Generates a word and scrambles it, you then have to unscramble it in a certain amount of time\n\n`.stealpic [@user]` - Uploads the mentioned users profile picture\n\n`.a (bite/cuddle/facedesk/highfive/hug/kiss/pat/poke/slap/smile/stare)` - Shows a random gif based on the action\n\n'));
            break;
        case 'economy':

            message.channel.send(createEmbed('Economy Commands', '`.balance [Optional: @user]` - Displays the balance of you or the mentioned user\n\n`.pay [@user] [amount]` - Pay a user some funds from your account\n`.daily` - Gives you a random amount of credits every 24 hours\n`.loot` - Gives you credits on how active you are, used every 12 hours\n`.slots [amount to gamble]` - Lose your money or double it\n`.rob [@user]` - Steal a fraction of a users balance, or get fined\n'));
            break;
        case 'support':

            message.channel.send(createEmbed('Support Commands', '`.report bug [the bug]` - Report a bug, and please try to specify how to reproduce it\n`.report player [@user] [report]` - Report a user\n`.ticket [reason]` - Create a support ticket\n`.ticketclose` - Close a ticket'));
            break;
        case 'music':

            message.channel.send(createEmbed('Music Commands', '`.mplay [keywords/link]` - Play a song from youtube\n`.mskip` - Skip a song in the queue\n`.mpause` - Pause the music\n`.mresume` - Resume the music if paused\n`.mqueue` - View the queue and the currently playing song\n`.mstop` - Stop the music and clear the queue'));
            break;
        case 'roles':

            message.channel.send(createEmbed('Roles Command', '`.listroles` - List all the roles in the server\n`.selfroles` - List all the self roles you can add\n`.selfrole [rolename]` - Add a role from the setup self roles list\n`.addrole [@role]` -  Add a self assignable role\n`.removerole [@role]` - Remove a role from the self assignable roles'));
            break;
        case 'staff':

            message.channel.send(createEmbed('Staff Commands', '`.kick [@user] [reason]` - Kick the mentioned user\n`.ban [@user] [reason]` - Ban the mentioned user\n`.clear [amount]` - Bulk delete a certain amount of messages\n`.clearuser [amount] [@user]` - Clear a certain amount of messages from a user\n\n`.tempmute [@user] [time in minutes] [reason]` - Temporarily mute a user\n*Coming Soon!*\n`.tempban [time in hours] [@user] [reason]` - Temporarily ban a user'));
            break;
        case 'admin':

            message.channel.send(createEmbed('Admin Commands', '`.say [message]` - Sends a message in embed.\n`.delchannel [#channel]` - Delete a channel quickly\n`.delrole [@role]` - Delete a role quickly\n`.txtcreate [name] [Optional: Topic]` - Quickly create a text channel\n`.vccreate [name] [Optional: User limit]` - Quickly create a voice channel\n\n*Coming Soon!*\n`.gcreate  [time in minutes(m) or time in hours (h)] [#channel] [prize/name]` - Create a giveaway'));
            break;
        case 'account':

            message.channel.send(createEmbed('Account Commands', '`.account create` - Creates a StenBot Account for your discord account\n`.account gallery info` - Shows your account gallery information\n`.account gallery upload [alias/name]` - Upload an image to your gallery.\n`.account gallery remove [name]` - Removes photo from your gallery\n`.gallery [name of photo]` - Quickly post a photo from your gallery'))
            break;
        case 'dev':

            if (message.guild.id != 451793622430646272) {
                return message.channel.send({
                    embed: {
                        color: bot.settings.red,
                        description: 'Error! You do not have permission to view this menu!'
                    }
                });
            };

            message.channel.send(createEmbed('Developer Commands', '`.blacklist [serverid]` - Blacklist a whole server\n`.sync` - For development purposes only, sync all servers'));
            break;
        default:

            message.channel.send(helpembed);
            break;
    };


};
