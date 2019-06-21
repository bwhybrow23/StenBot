module.exports = async (bot, guild) => {

    const Discord = require("discord.js");
    const fs = require("fs");

    //When bot joins new server, create that servers file system.
    //Check if the server is blacklisted
        var serverstats = undefined;
        try {
            var serverstats = JSON.parse(fs.readFileSync(`./data/servers/server-${guild.id}/serverstats.json`, "utf8"));
        } catch (err) {
            var serverstats = undefined;
        };

        //Leave the guild if its blacklisted
        if (serverstats != undefined) {
            if (serverstats.blacklisted === true) {
                guild.leave();
                console.log("[System]".grey + `Left guild: ${guildname} | ${guild.id} because this server was blacklisted!`);
            } else {
                return;
            };
        };
        console.log("[SYSTEM]".grey + `Joined guild ${guild.name} | ${guild.id}`);

        //Create the servers root dir
        fs.mkdir(`./data/servers/server-${guild.id}`, err => {
            if (err && err.code != 'EEXIST') return;
        });

        //Create the servers users directory
        fs.mkdir(`./data/servers/server-${guild.id}/users`, err => {
            if (err && err.code != 'EEXIST') return;
        });

        //Inside the servers directory, we will create the tempbans folder Done as functions as this does not always work !
        function tempbanCreate(guild) { 
          fs.mkdir(`./data/servers/server-${guild.id}/tempbans`, err => {
            if (err && err.code != 'EEXIST') tempbanCreate(guild);
          });
        };
        tempbanCreate(guild);

        //Create server stats file and set its contents to the servers stats
        let date = new Date;
        let stats = {
            joined: date,
            created: guild.createdAt,
            blacklisted: false
        };
        fs.writeFileSync(`./data/servers/server-${guild.id}/serverstats.json`, JSON.stringify(stats, null, 4), (err) => {
            if (err) return;
        });

        //Create server configuration file and set it to default contents
        let defaultContent = {
            welcomerenabled: false,
            welcomerchannel: 0,
            welcomermessage: 'Welcome {user} to {server}!',
            userjoinenabled: false,
            userjoinedrole: 0,
            userjoinedname: 0,
            staffrole: false,
            staffadminenabled: false,
            stafflinkblocker: false,
            stafffilter: [],
            staffautoban: 0,
            loggingenabled: false,
            loggingchannel: 0,
            logginglevel: 'medium',
            ticketsenabled: false,
            ticketsmsg: 0,
            economyenabled: false,
            economyrobbing: false,
            economypay: true,
            economysymbol: 0,
            musicenabled: false,
            selfroleslist: []
        };
        fs.writeFileSync(`./data/servers/server-${guild.id}/serverconfig.json`, JSON.stringify(defaultContent, null, 4), (err) => {
            if (err) return;
        });
};