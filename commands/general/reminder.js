module.exports = {
  name: "reminder",
  category: "general",
  description: "Manage StenBot Reminders",
  usage: "<SUBCOMMAND> [ARGS]",
  example: "list",
  options: { permission: "EVERYONE", enabled: true, cooldown: 3, guildOnly: true },
  run: async (bot, message, args) => {
    const Discord = require("discord.js");
    const mongoose = require("mongoose");
    const Timeout = require("../../main/models/timeouts");
    const moment = require("moment");
    const ms = require("ms");
    const TimeoutUtils = require("../../main/functions/timeoutUtils");
    
    //Capitalize function
    const capitalize = (s) => {
      if (typeof s !== "string") return "";
      return s.charAt(0).toUpperCase() + s.slice(1);
    };
    
    let command = "reminder";
    let user = message.author.id;
    let reminders;
    
    const subcommand = args[0];
    switch (subcommand) {
      case "list":
    
        reminders = await Timeout.find({
          user,
          command
        });
    
        let listEmbed = {
          "title": `${message.author.tag}'s Reminders`,
          "description": "Here is a list of all your reminders, including reoccuring ones.",
          "color": bot.settings.color.yellow,
          "fields": [],
          "footer": {
            "icon_url": message.author.avatarURL(),
            "text": "StenBot Reminders"
          }
        }
    
        await reminders.forEach(async (reminder, i) => {
          let data = {
            name: `ID: ${i+1} | ${reminder.message}`,
            value: `**Expiry:** ${moment(moment.unix(reminder.expires)).format("H:mm DD/MM/YYYY z")} \n**Reoccuring:** ${reminder.reoccuring ? "Yes" : "No"}`
          }
          if (reminder.reoccuring === true) {
            data.value += `\n**Reoccurs Every:** ${capitalize(moment.duration(reminder.reoccuringPeriod).humanize())}`
          }
          listEmbed.fields.push(data);
        });
    
        if (reminders.length === 0) {
          message.reply("You do not currently have any ongoing reminders.");
        } else {
          message.reply({
            embeds: [listEmbed]
          })
        }
    
        break;
    
      case "add":
    
        /**
         * Usage: sb!reminder add [-r <REOCCURING TIME>] <TIME> <MESSAGE> 
         * Args:              0   1   2                   3     4
         */
    
        let time;
        let rMessage;
        let reoccuring = false;
        let reoccuringPeriod;
    
        //Check if reoccuring
        if (args[1] === "-r") {
          if (!args[2] || !args[3] || !args[4]) {
            return message.reply("**Arguments:**\n`sb!reminder add [-r <REOCCURING TIME>] <TIME> <MESSAGE>`");
          }
          reoccuring = true;
          reoccuringPeriod = ms(args[2]);
    
          time = ms(args[3]);
          rMessage = args.slice(4).join(" ");
        } else {
          if (!args[1] || !args[2]) {
            return message.reply("**Arguments:**\n`sb!reminder add [-r <REOCCURING TIME>] <TIME> <MESSAGE>`");
          }
          time = ms(args[1]);
          rMessage = args.slice(2).join(" ");
        }
    
        //Check if user can be DM'd
        if (!message.channel.type === "DM") {
          //If not already in a DM with the user, check
    
          //Send reply in guild
          message.reply("I am going to DM you to check you have open DMs. Please ignore the message.");
    
          //Try to send user a DM
          try {
            message.author.send("Just checking to see if I can message you :)");
          } catch (error) {
            //Error message to user
            return message.reply("I'm afraid there was an issue when I tried to DM you. Please make sure your DMs are open and try again. If they are open and you still get issues. Please use `sb!invite` for the link to the support server.");
          }
    
        }
    
        // Do the stuffs
        bot.timeouts.new(message.author.id, "reminder", time, reoccuring, reoccuringPeriod, rMessage);
    
        //User output
        let addEmbed = {
          "title": `Reminder successfully created!`,
          "color": bot.settings.color.green,
          "fields": [{
              "name": "Time:",
              "value": capitalize(moment.duration(time).humanize())
            },
            {
              "name": "Message:",
              "value": rMessage
            },
            {
              "name": "Reoccuring:",
              "value": reoccuring ? "Yes" : "No"
            }
          ],
          "footer": {
            "icon_url": message.author.avatarURL(),
            "text": "StenBot Reminders"
          }
        }
        if (reoccuring === true) {
          addEmbed.fields.push({
            "name": "Reoccuring Period",
            "value": capitalize(moment.duration(reoccuringPeriod).humanize())
          })
        }
    
        message.reply({
          embeds: [addEmbed]
        });
    
        break;
    
      case "remove":
    
        /**
         * Usage: sb!reminders remove <ID>
         */
    
        reminders = await Timeout.find({
          user,
          command
        });
        if (reminders.length === 0) {
          message.reply("You do not currently have any ongoing reminders.");
        }
    
        //Arg check
        if (!args[1]) {
          return message.reply("**Arguments:**\n`sb!reminder remove <ID>`\n\n*ID can be found with `sb!reminder list`*");
        }
    
        //Fetch ID from message
        let wantedReminder;
        try {
          wantedReminder = parseInt(args[1]) - 1;
        } catch (error) {
          return message.reply("Not a valid number.");
        }
    
        let reminder = reminders[wantedReminder];
        await bot.timeouts.removeSync(reminder._id)
          .then(() => {
            return message.reply(`Reminder ID ${wantedReminder + 1} has been successfully deleted.`);
          })
          .catch((error) => {
            message.reply("An error has occured. Please retry and/or contact Stentorian if the issue persists.")
            return bot.log.post("error", error);
          })
    
        break;
    
      default:
        return bot.helpEmbed("reminder", bot)
          .then((embed) => message.reply(embed))
          .catch((error) => bot.log.post("error", error));
    
        break;
    }
  },
};