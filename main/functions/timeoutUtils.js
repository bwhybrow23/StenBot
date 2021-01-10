const Timeout = require("../models/timeouts");
const moment = require('moment');

class TimeoutUtils {
  constructor(bot) {
    /*
    Check the database for any old timeouts which need to be rebooted
    */
    this.bot = bot;
    this.activeTimeouts = 0;

    this.fetchAll()
      .then(allTimeouts => {
        let removedTimeouts = 0;
        allTimeouts.forEach(timeout => {
          if (this.expired(timeout.expires)) {
            removedTimeouts++;
            this.removeSync(timeout.user, timeout.command);
          } else {
            this.activeTimeouts++;
            let present = moment();
            setTimeout(() => {
              this.removeSync(timeout.user, timeout.command);
            }, (timeout.expires - present.unix()) * 1000)
          }
        })
        bot.log.post("success", `[-] Removed ${removedTimeouts} expired timeouts`);
        bot.log.post("success", `[+] Rebooted ${this.activeTimeouts} active timeouts`)
      })
      .catch(error => bot.log.post("error", error))
  }

  //Fetch all timeouts (including expired if still in database)
  fetchAll() {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await Timeout.find({}))
      } catch (error) {
        reject(error)
      }
    })
  }

  //Adds a new timeout to the database
  new(user, command) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!user) {
          reject("Please specify a user ID.")
        }
        let present = moment();
        //Specify the expiry time for each of the commands here using momentjs manipulation syntax https://momentjs.com/docs/#/manipulating/
        //Adding new commands is just adding a new case to this switch statement with a new expiry
        switch (command) {
          case "daily":
            present.add(1, "d");
            break;
          case "rob":
            present.add(2, "h");
            break;
          default:
            reject(`Invalid command: ${command}`)
        }
        //Save new timeout
        const timeout = new Timeout({
          user,
          command,
          expires: present.unix()
        })
        await timeout.save();

        let newPresent = moment();
        this.activeTimeouts++;

        setTimeout(() => {
          this.removeSync(user, command);
        }, (present.unix() - newPresent.unix()) * 1000)
        resolve(timeout)

      } catch (error) {
        reject(error)
      }
    })
  }

  //Checks if a timeout expiry is expired
  expired(expiry) {
    const present = moment()
    if (present.unix() > expiry) {
      return true
    } else {
      return false
    }
  }

  //Remove a timeout from the database (returns undefined on success)
  removeSync(user, command) {
    return new Promise(async (resolve, reject) => {
      try {
        await Timeout.findOneAndDelete({
          user,
          command
        })
        resolve();
      } catch (error) {
        reject(error)
      }
    })
  }

  //Checks if a timeout exists and if it does, returns how long is left on it
  check(user, command) {
    return new Promise(async (resolve, reject) => {
      try {
        let timeout = await Timeout.findOne({
          user,
          command
        });
        if (timeout) {

          let present = moment();
          let untilExpiry = moment.duration((timeout.expires - present.unix()) * 1000);
          // resolve(untilExpiry.humanize(true))
          resolve(`${untilExpiry.hours()}h ${untilExpiry.minutes()}m ${untilExpiry.seconds()}s`);

        } else {
          resolve(false)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

}

module.exports = {
  TimeoutUtils
}