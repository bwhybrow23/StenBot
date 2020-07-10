module.exports = {
  name: "sync",
  category: "bot",
  description: "Sync all servers to replace missing files.",
  usage: "sb!sync",
  permission: "BOT OWNER",
  run: async (bot, message, args) => {
    const Discord = require("discord.js");
    const fs = require("fs");

    //Check if its sent in the admin server
    if (message.author.id != 346246641595973633) {
      bot
        .noPermsEmbed(`${message.guild.name}`, bot)
        .then((embed) => message.channel.send(embed))
        .catch((error) => console.error(error));
    }

    let amountsynced = 0;

    function syncServers(g) {
      //Loop through all guilds for server root
      bot.guilds.forEach((g) => {
        //Check if guild  files exist
        let guildexists = fs.existsSync(`./data/servers/server-${g.id}`);
        //If it dont create all the files
        if (guildexists == false) {
          fs.mkdir(`./data/servers/server-${g.id}`, (err) => {
            if (err && err.code != "EEXIST") return;
          });

          //Create the servers users directory
          fs.mkdir(`./data/servers/server-${g.id}/users`, (err) => {
            if (err && err.code != "EEXIST") return;
          });

          //Inside the servers directory, we will create the tempbans folder
          fs.mkdir(`./data/servers/server-${g.id}/tempbans`, (err) => {
            if (err && err.code != "EEXIST") return;
          });

          //Create server stats file and set its contents to the servers stats
          let date = new Date();
          let stats = {
            joined: date,
            created: g.createdAt,
            blacklisted: false,
          };
          fs.writeFileSync(
            `./data/servers/server-${g.id}/serverstats.json`,
            JSON.stringify(stats, null, 4),
            (err) => {
              if (err) return;
            }
          );
          //Create server configuration file and set it to default contents
          let defaultContent = {
            welcomerenabled: false,
            welcomerchannel: 0,
            welcomermessage: "Welcome {user} to {server}!",
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
            logginglevel: "medium",
            ticketsenabled: false,
            ticketsmsg: 0,
            economyenabled: false,
            economyrobbing: false,
            economypay: true,
            economysymbol: 0,
            musicenabled: false,
            selfroleslist: [],
            levellingenabled: false,
          };
          fs.writeFileSync(
            `./data/servers/server-${g.id}/serverconfig.json`,
            JSON.stringify(defaultContent, null, 4),
            (err) => {
              if (err) return;
            }
          );

          //levelling system
          let levelDefault = {};
          fs.writeFileSync(
            `./data/servers/server-${g.id}/levelling.json`,
            JSON.stringify(levelDefault, null, 4),
            (err) => {
              if (err) return;
            }
          );

          //Check if files were generated successfully.
          var locations = [
            "/",
            "/users",
            "/tempbans",
            "/serverstats.json",
            "/serverconfig.json",
            "/levelling.json",
          ];
          let gsuccess = true;

          locations.forEach(function (loc) {
            if (fs.existsSync(`./data/servers/server-${g.id}${loc}`) == false) {
              gsuccess = false;
            }
          });
          //If generation failed
          if (gsuccess == false) {
            //Delete folder and contents
            var decursive = function (path) {
              if (fs.existsSync(path)) {
                fs.readdirSync(path).forEach(function (file, index) {
                  var curPath = path + "/" + file;
                  if (fs.lstatSync(curPath).isDirectory()) {
                    decursive(curPath);
                  } else {
                    fs.unlinkSync(curPath);
                  }
                });
                fs.rmdirSync(path);
              }
            };
            //Run func
            decursive(`./data/servers/server-${g.id}`);
          } else {
            console.log(`[SYNC]`.blue, `Synced guild ${g.name} | ${g.id}`.cyan);
          }

          //Counter
          amountsynced = amountsynced + 1;

          if (gsuccess == false) {
            return false;
          } else {
            return true;
          }
        }
      });
    }

    let attempt = 1;
    while (syncServers(message.guild) == false) {
      syncServers(message.guild);
      attempt = attempt + 1;
    }

    //Round up the goodies
    console.log(
      `[SYNC]`.blue,
      `${amountsynced} servers have been synced in ${attempt} attempts.`.cyan
    );
    bot
      .createEmbed(
        "success",
        "",
        `**${amountsynced}** servers have been synced in ${attempt} attempts.`,
        [],
        `${message.guild.name}`,
        bot
      )
      .then((embed) => message.channel.send(embed))
      .catch((error) => console.error(error));
  },
};
