exports.run = (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");
    var format = require("string-template");
    const download = require('image-downloader');

    //Accesschecking:
    const ownersid = message.guild.ownerID;
    const adminperm = message.member.hasPermission("ADMINISTRATOR");
    var access = true;
    if (adminperm == false) {
        var access = false;
    };
    if (access == false) {
        if (ownersid == message.author.id) {
            var access = true;
        };
    };
    if (access == false) {
        return message.channel.send({
            embed: {
                color: bot.settings.red,
                description: `Error! You are not the owner or an admin!`
            }
        });
    };
    //Check if they included a setting
    let setting = args[0];
    if (setting == undefined) {
        return message.channel.send({
            embed: {
                color: bot.settings.red,
                description: 'Error! You forgot to include an account command! `.account [command]`'
            }
        });
    };
    //Get the server config
    const config = JSON.parse(fs.readFileSync(`./data/servers/server-${message.guild.id}/serverconfig.json`, "utf8"));
    //actions library
    switch (setting) {
        case "create":
            //Creating a Kewl Account Command
            //Check if an account already exists
            let accountexists = fs.existsSync(`./data/accounts/${message.author.id}.json`);
            if (accountexists == true) {
                return message.channel.send({embed: {color: bot.settings.red, description: `You already have Kewl Account.`}});
            };

            //Create new account file since it doesnt exist!
            //Create the user config file
            var currentDate = new Date()
            userconfigfile = {
                accountcreated: currentDate,
                accounttype: "normal",
                gallerycap: 8,
                galleryused: 0,
                gallerynames: []
            };

            fs.writeFileSync(`./data/accounts/${message.author.id}.json`, JSON.stringify(userconfigfile, null, 4), (err) => {
                if (err) return;
            });

            //Create the gallery folder for the pictures :D
            fs.mkdir(`./data/galleries/${message.author.id}`, err => {
                if (err && err.code != 'EEXIST') return;
            });

            //And return..
            message.channel.send({embed: {color: bot.settings.green, description: `Your Kewl Account has been created! :white_check_mark:`}});

            break;

        case "gallery":

            var galleryaction = args[1];
            switch (galleryaction) {
                case "info":
                    //kewl Account and gallery information command
                    //Check if they have an account.
                    let accountexists = fs.existsSync(`./data/accounts/${message.author.id}.json`);
                    if (accountexists == false) {
                        return message.channel.send({embed: {color: bot.settings.red, description: `Please create a Kewl Account first!`}});
                    };

                    //Get account information
                    const accountconfig = JSON.parse(fs.readFileSync(`./data/accounts/${message.author.id}.json`, "utf8"));
                    //Get a english answer if they dont have any pictures to list:
                    var gallerylist = [];
                    if (accountconfig.gallerynames.length < 1) {
                        gallerylist.push("None.");
                    } else {
                        gallerylist = accountconfig.gallerynames;
                    };  

                    var stringedgallerylist = toString(gallerylist)
                    var gallerylistedited = stringedgallerylist.replace(",", "\n");

                    //Print account/gallery details
                    message.channel.send({embed: {color: bot.settings.yellow, description: `**Account Information:**\n\n**Account Created:** ${accountconfig.accountcreated}\n**Account Type:** ${accountconfig.accounttype}\n**Gallery Usage:** ${accountconfig.galleryused}/${accountconfig.gallerycap}\n**Gallery Pics:**\n${gallerylistedited}`}});


                    break;
                case "upload":
                    //Upload a picture to gallery
                    //Check if they have an account.
                    let accountexistant = fs.existsSync(`./data/accounts/${message.author.id}.json`);
                    if (accountexistant == false) {
                        return message.channel.send({embed: {color: bot.settings.red, description: `Please create a Kewl Account first!`}});
                    };

                    //Get account information
                    const accountconfiguration = JSON.parse(fs.readFileSync(`./data/accounts/${message.author.id}.json`, "utf8"));
                    //Check if they attached a file to the command:
                    if (message.attachments.array().length < 1) {
                        return message.channel.send({embed: {color: bot.settings.red, description: `Make sure you attach a file to this command!`}});
                    };

                    //Check if they attached too many files:
                    if (message.attachments.array().length > 1) {
                        return message.channel.send({embed: {color: bot.settings.red, description: `Only upload 1 file at a time! Please make sure there is only 1 attachment!`}});
                    };

                    //Check if uploaded this exceeds cap
                    if ((accountconfiguration.galleryused + 1) > accountconfiguration.gallerycap) {
                        return message.channel.send({embed: {color: bot.settings.red, description:  `You have reached your gallery cap. Consider donating to support development to raise the cap.`}});
                    };

                    //Check if they included a name:
                    var picalias = args.slice(2).join(" ");
                    //console.log(picalias)
                    if (picalias.length < 1) { return message.channel.send({embed: {color: bot.settings.red, description:  `Please include a name for the photo.`}}); };
                    if (picalias.length > 16) { return message.channel.send({embed: {color: bot.settings.red, description: `The name is above 16 characters.`}}); }; 

                    //Check if the name is only numbers and letters.
                    var alphanumericregex  = /[^a-z\d]/i;
                    var isValid = !(alphanumericregex.test(picalias));
                    if (isValid == false) {
                        return message.channel.send({embed: {color: bot.settings.red, description: `The name can only inclued numbers and letters.`}})
                    };

                    //Check if the file is under 2MB
                    if (message.attachments.array()[0].filesize > 2000000) {
                        return message.channel.send({embed: {color: bot.settings.red, description: `The file is larger than 2MB in size!`}});
                    };

                    picextension = message.attachments.array()[0].filename.replace(/^.*\./, '');
                    //Check if there is a file that already has that name
                    if (fs.existsSync(`./data/galleries/${message.author.id}/${picalias}.${picextension}`) == true) {
                        return message.channel.send({embed: {color: bot.settings.red, description: `You already have a file with that filename in your gallery!`}});
                    };


                    //Increase used amount
                    accountconfiguration.galleryused = accountconfiguration.galleryused + 1;
                    //Add the photos name to the gallerynames
                    accountconfiguration.gallerynames.push(picalias + "." + picextension);
                    
                    //Download image and place into users gallery.

                    const downloadoptions = {
                        url: message.attachments.array()[0].url,
                        dest: `./data/galleries/${message.author.id}/${picalias}.${picextension}`                  
                      }
                       
                    download.image(downloadoptions)
                        .then(({ filename, image }) => {

                        })
                        .catch((err) => {
                          console.error(err)
                        });

                    //Save our changes to the users configuration
                    fs.writeFileSync(`./data/accounts/${message.author.id}.json`, JSON.stringify(accountconfiguration, null, 4), (err) => {
                        if (err) return;
                    });

                    //Sucess message
                    message.channel.send({embed: {color: bot.settings.green, description:`Sucessfully uploaded image to gallery.`}});
                    break;

                case "remove":
                    //Remove an uploaded picture to gallery

                    break;
                default:
                    message.channel.send({embed: {color: bot.settings.red, description: `There is no gallery action called ${galleryaction}`}})
                    break;
            };
            
            break;
        default:
            message.channel.send({
                embed: {
                    color: bot.settings.red,
                    description: `Error! No account command called **${setting}**`
                }
            });
    };
};
