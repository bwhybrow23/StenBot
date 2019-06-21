module.exports = async (bot, member) => {

    const Discord = require("discord.js");
    const fs = require("fs");
    const config = JSON.parse(fs.readFileSync(`./data/servers/server-${member.guild.id}/serverconfig.json`, "utf8"));
    var format = require("string-template");
    const efunctions = require("../functions/eventfunctions.js");

    //Welcomer
    //Check if welcomer is enabled
    if (config.welcomerenabled == true) {
        //Check if there is a channel set
        if (config.welcomerchannel != 0) {

            //Check if channel is valid
            let welcomerschannel = bot.channels.get(config.welcomerchannel);
            if (welcomerschannel != undefined) {

                //Check if the bot has perms to welcome
                let botasmember = member.guild.members.get(bot.user.id);
                if (botasmember.permissionsIn(member.guild.channels.get("" + config.welcomerchannel + "")).has("SEND_MESSAGES") == true) {

                    //Fill in place holders
                    let themsg = format(config.welcomermessage, {
                        user: member.user.tag,
                        usermention: member.user,
                        userdiscrim: member.user.discriminator,
                        server: member.guild.name,
                        date: new Date()
                    });

                    let welcomeEmbed = new Discord.RichEmbed()
                    .setColor(bot.settings.yellow)
                    .setDescription(themsg);

                    //Send the message.
                    bot.channels.get(config.welcomerchannel).send(welcomeEmbed);
                };
            };
        };
    };

    //Check if user settings are enabled
    if (config.userjoinenabled == true) {
        //Check if Theres a role set
        if (config.userjoinedrole != 0) {

            //Add the role to the member
            let toaddrole = member.guild.roles.get(config.userjoinedrole);
            member.addRole(toaddrole).catch();
        };
    };

    //Chek if user names are set
    if (config.userjoinedname != 0) {

        //Changeeee
        member.setNickname(config.userjoinedname).catch();
    };

    if (config.loggingenabled==true) {
      if (efunctions.checkChannel(config.loggingchannel, bot) == true) {
        let lchannel=bot.channels.get(config.loggingchannel);
        lchannel.send({embed: {color: bot.settings.yellow, description:`**Member Joined**\n**Name:** ${member.user.tag}\n**Id:** ${member.id}`, footer: {icon_url: member.user.avatarURL, text: 'Member Joined'}, timestamp: new Date()}})
      };
    };
};