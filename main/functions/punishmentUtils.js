const Punishment = require("../models/punishment.js");
const moment = require("moment");
const bot = require("../../app.js");
const mutils = require("./mongoUtils.js");
const ms = require("ms");

/** Punishment Logs
 * 
 * - ID 
 * - Type (ban, kick, mute, tempmute)
 * - Guild ID
 * - User ID
 * - Punisher ID
 * - Reason (optional)
 * - Duration (optional)
 * - Expires (optional)
 * 
 */

class PunishmentUtils {
  constructor(bot) {
    /*
    Check the database for any old timeouts which need to be rebooted
    */
    this.bot = bot;
    this.activeMutes = 0;
    this.timeouts = [];

    this.fetchAll()
      .then(allGuilds => {
        let removedMutes = 0;
        allGuilds.forEach(guild => {

          //If no guild tempmutes, return
          if(!guild.tempmutes[0]) return;

          //For each punishment, do this
          guild.tempmutes.forEach(punishment => {

            // If no expiry (punishment has been already passed), ignore
            if (!punishment.expiry) {
              return;
            }

            let discordMember, discordGuild;
            // If expired, remove
            if (this.expired(punishment.expiry)) {
              removedMutes++;

              //Remove expiry date
              delete guild.tempmutes[punishment.id - 1].expiry;

              (async function(arg) {

                //Save Config
                await arg.guildSave(guild.guildId, guild)
                .then(async() => {

                //Fetch from Discord
                await arg.memberFetch(guild.guildId, punishment.user)
                .then(async(data) => {

                  discordMember = data[0];
                  discordGuild = data[1];
                  // console.log(discordMember)

                  //Remove role & send message
                  await arg.unmute(discordGuild, guild.guildId, discordMember);

                })
                .catch(error => bot.log.post("error", error));

              })
              .catch(error => bot.log.post("error", error));

              })(this);


            } else {
              //If not expired, reboot
              this.activeMutes++;
              let present = moment();
              let timeout = setTimeout(() => {

                //Remove expiry date when expired
                delete guild.tempmutes[punishment.id - 1].expiry;
                this.guildSave(guild.guildId, guild);

                (async function(arg) {

                  //Fetch from Discord
                  await arg.memberFetch(guild.guildId, punishment.user).then((data) => {

                    discordMember = data[0];
                    discordGuild = data[1];

                    //Remove role & send message
                    arg.unmute(discordGuild, guild.guildId, discordMember);

                  });

                })(this);

                //Stop the timeout and remove it from timeouts array
                let timeout = this.timeouts.filter(timeout => timeout.id === punishment.id);
                clearTimeout(timeout.timeout);
                this.timeouts.splice(timeout, 1);

              }, (punishment.expiry - present.unix()) * 1000);
              this.timeouts.push({
                "id": punishment.id,
                "timeout": timeout
              });

            }

          })
        })

        //Console log changes
        this.bot.log.post("success", `[-] Removed ${removedMutes} expired mutes`);
        this.bot.log.post("success", `[+] Rebooted ${this.activeMutes} active mutes`);
      })
      // .catch(error => this.bot.log.post("error", error))
      .catch(error => this.bot.log.post("error", error));

  }

  /**
   * Async function to fetch a user from a guild
   * @param {*} guild
   * @param {*} user
   * @returns
   */
  async memberFetch(guild, user) {
    let dMember;
    let dGuild;
    try {
      await this.bot.guilds.fetch(guild)
        .then(async (guild) => {
          dMember = await guild.members.cache.get(user);
          dGuild = guild;
        })
        .catch((error) => this.bot.log.post("error", error))
      return [dMember, dGuild];
    } catch (error) {
      // this.bot.log.post("error", error);
      this.bot.log.post("error", error);
    }
  }

  /**
   * Fetch all guilds
   * @returns 
   */
  fetchAll() {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await Punishment.find({}));
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * Adds a new punishment to the database
   * @param {*} type 
   * @param {*} guild
   * @param {*} user 
   * @param {*} punisher 
   * @param {*} reason 
   * @param {*} duration 
   * @returns 
   */
  new(type, guild, user, punisher, reason, duration) {
    return new Promise(async (resolve, reject) => {
      //Define variables first to avoid conflicts
      let present, guildObj, data, id, newPresent, timeout, discordGuild, discordMember;

      try {
        if (!guild) {
          reject("Please specify a guild ID.");
        }
        if (!user) {
          reject("Please specify a user ID.");
        }
        if (!punisher) {
          reject("Please specify a punisher ID.");
        }
        present = moment();

        //Switch statement for each type of punishment
        switch (type) {

          case "kick":
          case "ban":
          case "mute":
          case "warn":

            let types = type + "s";

            guildObj = await Punishment.findOne({ guildId: guild });

            // Create the punishment data
            data = {
              "id": guildObj[types].length + 1,
              "date": Date.now(),
              "user": user,
              "punisher": punisher
            };
            if (reason) {
              data.reason = reason;
            };

            //Push it to outstanding data and save
            guildObj[types].push(data);
            await this.guildSave(guild, guildObj);
            
            resolve();

            break;

          case "tempmute":

            if (!duration) {
              reject("Please specify a punishment duration.");
            }
            present.add(ms(duration), "ms");

            guildObj = await Punishment.findOne({ guildId: guild });
            id = guildObj.tempmutes.length + 1;

            // Create the punishment data
            data = {
              "id": id,
              "date": Date.now(),
              "user": user,
              "punisher": punisher,
              "duration": duration,
              "expiry": present.unix()
            }
            if (reason) {
              data.reason = reason;
            }

            //Push it to outstanding data and save
            guildObj.tempmutes.push(data);
            await this.guildSave(guild, guildObj);

            //Set up timer
            newPresent = moment();
            this.activeMutes++;

            timeout = setTimeout(async () => {

              //Remove expiry date when expired
              delete guildObj.tempmutes[id - 1].expiry;
              await this.guildSave(guild, guildObj);

              //Remove the muted role from the user
              discordGuild = await this.bot.guilds.fetch(guild);
              await this.memberFetch(discordGuild, user)
              .then((output) => discordMember = output[0]);

              this.unmute(guild, guildObj.guildId, discordMember);

              //Stop the timeout and remove it from timeouts array
              timeout = this.timeouts.filter(timeout => timeout.id === id);
              clearTimeout(timeout.timeout);
              this.timeouts.splice(timeout, 1);

            }, (present.unix() - newPresent.unix()) * 1000)

            this.timeouts.push({
              "id": id,
              "timeout": timeout
            });

            resolve();

            break;

          default:
            reject(`Invalid punishment: ${type}`);
            break;
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * Unmute the user
   * @param {*} guild 
   * @param {*} guildId
   * @param {*} user 
   * @returns 
   */
  unmute(guild, guildId, user) {
    return new Promise(async (resolve, reject) => {

      let guildConfig = await this.bot.mutils.getGuildById(guildId);

      //Remove role from user
      try {
        user.roles.remove(guildConfig.moderation.mute_role, 'Temp-mute duration has expired.');
      } catch (error) {
        //Don't do anything cuz the case probably is the role just isn't on the user
      }

      //Send unmute message to log channel
      if (guildConfig.logging.enabled === true) {
        if (guildConfig.logging.level === "low" || guildConfig.logging.level === "medium" || guildConfig.logging.level === "high") {
          if (this.bot.efunctions.checkChannel(guildConfig.logging.channel, this.bot) === true) {
            let lchannel = this.bot.channels.cache.get(guildConfig.logging.channel);
            this.bot.eventEmbed("7ae727", user.user, "Member Auto-Unmuted", `**User tag:** ${user.user.tag}\n**User ID:** ${user.user.id}\n**Unmute Date:** ${new Date()}`, [], `${user.guild.name}`, this.bot)
              .then(embed => lchannel.send(embed))
              .catch(error => this.bot.log.post("error", error));
          }
        }
      }

      resolve();
    })
  }

  /**
   * Checks if a temp-mute expiry is expired
   * @param {*} expiry 
   * @returns 
   */
  expired(expiry) {
    const present = moment();
    if (present.unix() > expiry) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Remove a punishment from the database (returns undefined on success)
   * @param {*} id 
   * @param {*} guild 
   * @returns 
   */
  removeSync(type, id, guild) {
    return new Promise(async (resolve, reject) => {
      try {

        let guildObj = await Punishment.findOne({ guildId: guild });
        let types = type + "s";

        delete guildObj[types].filter(punishment => punishment.id === id);
        await this.guildSave(guild, guildObj);

        resolve();
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * Output all punishments logged on a user
   * @param {*} guild
   * @param {*} user 
   * @returns 
   */
  fetch(guild, user) {
    return new Promise(async (resolve, reject) => {

      //Arg Check
      if (!guild) {
        reject("Please specify a guild ID.");
      }
      if (!user) {
        reject("Please specify a user ID");
      }

      //Create basis object
      let data = {
        bans: [],
        kicks: [],
        mutes: [],
        tempmutes: [],
        warns: []
      }

      //Fetch guild punishments
      let guildObj = await Punishment.findOne({ guildId: guild });

      //Filter guild punishments and push them to object
      data.bans = guildObj.bans.filter(ban => ban.user === user);
      data.kicks = guildObj.kicks.filter(kick => kick.user === user);
      data.mutes = guildObj.mutes.filter(mute => mute.user === user);
      data.tempmutes = guildObj.tempmutes.filter(mute => mute.user === user);
      data.warns = guildObj.warns.filter(warn => warn.user === user);

      resolve(data);

    })

    // return new Promise(async (resolve, reject) => {
    //   try {

    //     //Variables
    //     let guildObj = await Punishment.findOne({ guildId: guild.id });
    //     let punishments = guildObj.moderation.punishments;
    //     let uPunishments = punishments.filter(punishment => punishment.user === user);

    //     //If the user has no punishments, send empty
    //     if (!uPunishments) {
    //       resolve();
    //     }

    //     //Check all user's punishments
    //     let currentPunishment;
    //     uPunishments.forEach((punishment) => {
    //       //For every punishment without an expiry date, remove
    //       if (!punishment.expiry) return;

    //       currentPunishment = punishment;
    //     })
    //     resolve(currentPunishment);

    //   } catch (error) {
    //     reject(error)
    //   }
    // })
  }

  /**
   * Save changes
   * @param {*} guild 
   * @param {*} data 
   * @returns 
   */
  async guildSave(guildId, data) {
    const guild = await Punishment.findOne({ guildId: guildId });
    guild.bans = data.bans;
    guild.kicks = data.kicks;
    guild.mutes = data.mutes;
    guild.tempmutes = data.tempmutes;
    guild.warns = data.warns;
    
    await guild.save();
    return guild;
  }

  /*  addTimeSync(id, guild, time) {
      return new Promise(async (resolve, reject) => {
        try {

          //Arg Check
          if(!time) {
            reject("Provide a valid timeframe");
          }

          //Fetch all relevant variables
          let guildObj = await mutils.getGuildById(guild);
          let punishmentObj = guildObj.moderation.punishments.filter(punishment => punishment.id === id)
          let pTimeout = this.timeouts.filter(timeout => timeout.id === id);

          //Set up new duration
          let newDuration = moment();
          //Add new duration to it 
          newDuration.add(ms(time), "ms");

          //Cancel current timeout and remove from array
          clearTimeout(pTimeout.timeout);
          this.timeouts.splice(pTimeout, 1);

          //Create new timeout

          resolve();

        } catch (error) {
          reject(error)
        }
      })
    } */

}

module.exports = {
  PunishmentUtils
}