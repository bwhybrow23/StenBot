/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable no-async-promise-executor */
const Timeout = require('../Models/timeouts');
const moment = require('moment');

class TimeoutUtils {
  constructor(bot) {
    /*
    Check the database for any old timeouts which need to be rebooted
    */
    this.bot = bot;
    this.activeTimeouts = 0;

    //Fetch all timeouts
    this.fetchAll()
      .then(allTimeouts => {
        let removedTimeouts = 0;
        //For each timeout
        allTimeouts.forEach(timeout => {
          //If not expired, 
          if (this.expired(timeout.expires)) {
            //Reschedule if reoccuring
            if (timeout.reoccuring === true) {
              this.updateSync(timeout._id, timeout.reoccuringPeriod);
              this.startTimer(timeout);
              this.activeTimeouts++;
            } else {
              //Check if reminder
              if (timeout.command === 'reminder') {
                //Send reminder message
                let targetuser = this.bot.users.cache.get(timeout.user);

                //Prevent bot from crashing on closed DMs
                try {
                  targetuser.send({
                    embeds: [{
                      'title': 'Reminder!',
                      'description': `${timeout.message}\n\nI am aware this is late, there was bot issues. *sorry*`,
                      'thumbnail': {
                        'url': 'https://i.imgur.com/kLRvtVg.png'
                      },
                      'color': this.bot.settings.color.yellow,
                      'footer': {
                        'icon_url': 'https://i.imgur.com/klY5xCe.png',
                        'text': `Reminder set ${moment(timeout.createdAt).fromNow()}`
                      }
                    }]
                  });
                } catch (error) {
                  return;
                }
              }
              //Remove if not
              removedTimeouts++;
              this.removeSync(timeout._id);
            }
          } else {
            //Set up new timeout for ones that haven't expired
            this.activeTimeouts++;
            let present = moment();
            setTimeout(() => {
              this.removeSync(timeout._id);
            }, (timeout.expires - present.unix()) * 1000);
          }
        });
        bot.log.post('success', `[-] Removed ${removedTimeouts} expired timeouts`);
        bot.log.post('success', `[+] Rebooted ${this.activeTimeouts} active timeouts`);
      })
      .catch(error => bot.log.post('error', error));
  }

  //Fetch all timeouts (including expired if still in database)
  fetchAll() {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await Timeout.find({}));
      } catch (error) {
        reject(error);
      }
    });
  }

  //Adds a new timeout to the database
  new(user, command, time, reoccuring, reoccuringPeriod, message) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!user) {
          reject('Please specify a user ID.');
        }
        let present = moment();
        //Specify the expiry time for each of the commands here using momentjs manipulation syntax https://momentjs.com/docs/#/manipulating/
        //Adding new commands is just adding a new case to this switch statement with a new expiry
        switch (command) {
        case 'daily':
          present.add(1, 'd');
          break;

        case 'rob':
          present.add(2, 'h');
          break;

        case 'reminder':
          if (!time) reject('Please specify a timeframe.');
          present.add(time, 'ms');

          //Save new reminder
          const timeout = new Timeout({
            user,
            command,
            expires: present.unix(),
            reoccuring: reoccuring,
            reoccuringPeriod: reoccuringPeriod,
            message: message
          });
          await timeout.save();

          let newPresent = moment();
          this.activeTimeouts++;

          setTimeout(async () => {
            let timeoutObj = await Timeout.findOne({
              '_id': timeout._id,
              'command': 'reminder'
            });
            if(!timeoutObj) return;

            if (timeout.reoccuring === true) {
              this.updateSync(timeout._id, timeout.reoccuringPeriod);
              this.startTimer(timeout);
            } else {
              this.removeSync(timeout._id);
            }

            //Send the message
            let targetuser = this.bot.users.cache.get(user);

            //Prevent bot from crashing on closed DMs
            try {
              targetuser.send({
                embeds: [{
                  'title': 'Reminder!',
                  'description': `${timeout.message}`,
                  'thumbnail': {
                    'url': 'https://i.imgur.com/kLRvtVg.png'
                  },
                  'color': this.bot.settings.color.yellow,
                  'footer': {
                    'icon_url': 'https://i.imgur.com/klY5xCe.png',
                    'text': `Reminder set ${moment(timeout.createdAt).fromNow()}`
                  }
                }]
              });
            } catch (error) {
              return;
            }


          }, (present.unix() - newPresent.unix()) * 1000);
          resolve(timeout);
          break;

        default:
          reject(`Invalid command: ${command}`);
          break;
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  //Checks if a timeout expiry is expired
  expired(expiry) {
    const present = moment();
    if (present.unix() > expiry) {
      return true;
    } else {
      return false;
    }
  }

  //Remove a timeout from the database (returns undefined on success)
  removeSync(id) {
    return new Promise(async (resolve, reject) => {
      try {
        await Timeout.findOneAndDelete({
          '_id': id
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  //Update a timeout from the database
  updateSync(id, expiry) {
    return new Promise(async (resolve, reject) => {
      let present = moment();
      try {
        //Fetch timeout data
        const timeoutData = await Timeout.findOne({
          '_id': id
        });
        if(!timeoutData) return;
        //Add expiry to present
        present.add(expiry, 'ms');
        //Set new expiry
        timeoutData.expiry = present.unix();
        //Save
        timeoutData.save();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  //Start a timer for an updated timeout
  startTimer(data) {
    return new Promise(async (resolve, reject) => {
      let present = moment();
      present.add(data.reoccuringPeriod, 'ms');
      let newPresent = moment();
      setTimeout(async () => {
        let timeoutObj = await Timeout.findOne({
          '_id': data._id,
          'command': 'reminder'
        });
        if(!timeoutObj) return;

        if (data.reoccuring === true) {
          this.updateSync(data._id, data.reoccuringPeriod);
          this.startTimer(data);
        } else {
          this.removeSync(data._id);
        }

        //Send the message
        let targetuser = this.bot.users.cache.get(data.user);

        //Prevent bot from crashing on closed DMs
        try {
          targetuser.send({
            embeds: [{
              'title': 'Reminder!',
              'description': `${data.message}`,
              'thumbnail': {
                'url': 'https://i.imgur.com/kLRvtVg.png'
              },
              'color': this.bot.settings.color.yellow,
              'footer': {
                'icon_url': 'https://i.imgur.com/klY5xCe.png',
                'text': `Reminder set ${moment(data.createdAt).fromNow()}`
              }
            }]
          });
        } catch (error) {
          return;
        }

      }, (present.unix() - newPresent.unix()) * 1000);
      resolve();
    });
  }

  //Checks if a timeout exists and if it does, returns how long is left on it
  check(id, command) {
    return new Promise(async (resolve, reject) => {
      try {
        let timeout = await Timeout.findOne({
          'user': id,
          'command': command
        });
        if (timeout) {

          let present = moment();
          let untilExpiry = moment.duration((timeout.expires - present.unix()) * 1000);
          // resolve(untilExpiry.humanize(true))
          resolve(`${untilExpiry.hours()}h ${untilExpiry.minutes()}m ${untilExpiry.seconds()}s`);

        } else {
          resolve(false);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

}

module.exports = {
  TimeoutUtils
};